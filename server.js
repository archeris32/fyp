const express = require('express');
const mysql = require("mysql")
const app = express();
var session = require('express-session')
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { json } = require('express');
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
    db.query(`SELECT * from users where name='${req.session.username}';`, function(err,rows){
      res.render('', { data: rows,title: 'Homepage',username: req.session.username  })
    })
});
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Homepage',
        username: req.session.username 
      });
  });
app.get('/agenda', (req, res) => {
    db.query('Select * from staff', function(err,rows){
      res.render('Agenda', { data: rows,title: 'Contacts',username: req.session.username  })
    })
});

app.get("/results", (req, res) => {
    db.query('select * from patient order by nextapp asc limit 1', function (err, data) {
          res.render('results', { data: data ,username: req.session.username })
        
      })
    })

app.get('/profile', (req, res) =>  {
    db.query(`SELECT * from users where name='${req.session.username}';`, function (err, rows) {
          res.render('profile', { data: rows ,username: req.session.username })
        
      }) 
    })


app.get('/delete_client', (req, res) => {
        res.render('delete_client', {
            title: 'delete Client',
            username: req.session.username 
          });
      });

app.post("/delete_client",urlencodedParser,(req,res)=>{
    const name = req.body.searchName
    var sql = `select * FROM patient WHERE firstName='${name}';`
    db.query(sql, (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.render('delete_client', { data: rows,username: req.session.username  })
    }
      })  
    })
app.post("/delete_client",urlencodedParser,(req,res)=>{
    const name = req.body.searchName
    var sql = `delete FROM patient WHERE firstName='${name}';`
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            return res.render('delete_client', {
                message: "delete client",
                username: req.session.username 
               
            })
        }
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
    const age =req.body.age
    const sex= req.body.sex
    const address=req.body.address
    const walkin=req.body.walkin
    const email=req.body.email
    const phone = req.body.phone
    const doctor=req.body.doctor
    const cost= req.body.cost
    var sql = `INSERT INTO patient (firstName, lastName,age,sex,address,walkin, email, phone, doctor,cost) VALUES ("${f_name}", "${lastName}","${age}","${sex}","${address}","${walkin}", "${email}", "${phone}","${doctor}","${cost}")`;
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
app.post("/add_contact",urlencodedParser,(req,res)=>{
    const FirstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const phone = req.body.phone
    const position = req.body.position
    var sql=`INSERT INTO staff (FirstName, LastName,Position,email,phone) VALUES ("${FirstName}", "${lastName}","${position}","${email}", "${phone}")`;
        db.query(sql,(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                return res.render('agenda',{
                    message:"Contact Added",
                    username: req.session.username 
                })
            }
        })
})

app.get("/edit/:data?",(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("edit", {
      data: formData,
      username: req.session.username,
      title: 'Edit'
    });
})
app.get('/Admin_dashboard', (req, res) => {
    db.query(`SELECT * from users where name='${req.session.username}';`, function(err,rows){
    res.render('Admin_dashboard', {
        data:rows,
        title: 'Admin Dashboard',
        username: req.session.username 
      });
  });
})
app.post("/edit/:data?",urlencodedParser, (req, res) => {
      const id = req.body.id;
      const firstName = req.body.name;
      const lastName = req.body.lastName;
      const age = req.body.age;
      const sex = req.body.sex;
      const address = req.body.address;
      const walkin = req.body.walkin;
      const email = req.body.email;
      const phone = req.body.phone;
      const doctor = req.body.doctor;
      const cost = req.body.cost;
      const nextapp= req.body.nextapp
      let query = `UPDATE patient SET firstName='${firstName}',lastName='${lastName}',age='${age}',phone='${phone}',sex='${sex}',address='${address}',walkin='${walkin}',email='${email}',nextapp='${nextapp}',email='${email}',phone='${phone}',doctor='${doctor}',cost='${cost}' where id='${id}' `;
      db.query(query, (err, data) => {
        if (err) {
          console.log("not able to update", err.message);
          return;
        }
        res.render("results", { data:data , message: "client Edited", username: req.session.username });
      });
    });
  
  


const server = app.listen(7000, () => {
    console.log(`Express running ??? http://localhost:7000/`);
  });