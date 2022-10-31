const express = require('express');
const mysql = require("mysql")
const app = express();
var session = require('express-session')
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs")
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login-db",
    
})

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        username: req.session.username 
      });
  });
  app.get("/results", (req, res) => {
    db.query('SELECT * FROM users ', function (err, rows) {
          res.render('results', { data: rows ,username: req.session.username })
        
      })
    })
app.get('/add_client', (req, res) => {
    res.render('add_client', {
        title: 'Add Client',
        username: req.session.username 
      });
  });
app.get("/login", (req, res) => {
    return res.render("login",{username: req.session.username });
  });
app.get("/register", (req, res) => {
    return res.render("register",{username: req.session.username });
  });

app.post("/login", urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var sql = `SELECT COUNT(*) FROM users WHERE name='${username}' and password ='${password}';`;
    let session
    db.query(sql, (err, result) => {
        if (result[0]["COUNT(*)"] < 1) {
            res.render("login", { message: "User does not exist" });
        } else {
            session=req.session;
            session.username= username;
            return res.redirect('results');
        }
    })        
})   

app.post("/register", urlencodedParser, (req, res) => {    
        const username =req.body.username
        const password=req.body.password
        const email=req.body.email
        var sql = `INSERT INTO users (name, password, email) VALUES ("${username}", "${password}", "${email}")`;
            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    return res.render('register', {
                        message: "username Added",
                       
                    })
                }
            })        
        })     
app.get("/logout", (req, res) => {
  req.session.destroy();

  return res.render("index");
});
app.post("/add_client",urlencodedParser, (req, res) => {    
    const f_name =req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const phone = req.body.phone
    const doctor=req.body.doctor
    const cost= req.body.cost
    var sql = `INSERT INTO patient (firstName, lastName, email, phone, doctor,cost) VALUES ("${f_name}", "${lastName}", "${email}", "${phone}","${doctor}","${cost}")`;
        db.query(sql, (err, result) => {
            if(err) {
                console.log(err)
            } else {
                return res.render('add_client', {
                    message: "client Added",
                    username: req.session.username 
                   
                })
            }
        })        
    })
app.get('/show_customers', (req, res) => {
    db.query('Select * from patient', function(err,rows){
      res.render('show_customers', { data: rows,username: req.session.username  })
    })
});

const server = app.listen(7000, () => {
    console.log(`Express running → http://localhost:7000/`);
  });