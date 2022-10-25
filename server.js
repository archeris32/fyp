const express = require('express');
const mysql = require("mysql")
const app = express();
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
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage'
      });
  });
  app.get("/results", (req, res) => {
    db.query('SELECT * FROM users ', function (err, rows) {
          res.render('results', { data: rows })
        
      })
    })
app.get('/add_client', (req, res) => {
    res.render('add_client', {
        title: 'Add Client'
      });
  });


app.post("/add_client",urlencodedParser, (req, res) => {    
    const f_name =req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const phone = req.body.email
    const doctor=req.body.doctor
    const cost= req.body.cost
    var sql = `INSERT INTO patient (firstName, lastName, email, phone, doctor,cost) VALUES ("${f_name}", "${lastName}", "${email}", "${phone}","${doctor}","${cost}")`;
        db.query(sql, (err, result) => {
            if(err) {
                console.log(err)
            } else {
                return res.render('add_client', {
                    message: 'Client registered!'
                })
            }
        })        
    })
  app.get('/show_customers', (req, res) => {
    db.query('Select * from patient', function(err,rows){
      res.render('show_customers', { data: rows })
    })
    

       
    });

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });