const express = require('express');
const mysql = require("mysql")
const app = express();
var session = require('express-session')
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { json } = require('express');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login-db",
    multipleStatements: true
    
})

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


app.get('/', (req, res) => {
    db.query(`SELECT * from users where name='${req.session.username}';`, function(err,rows){
      res.render('', { data: rows,title: 'Homepage',username: req.session.username  })
    })
});
app.get('/booking',(req,res)=>{
    res.render('booking')
})
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
app.get("/results",(req,res)=>{
    db.query(`SELECT * FROM patient WHERE nextapp > NOW() ORDER BY nextapp LIMIT 1;`,function(err,data1){
        if(err){
            console.log(err)
        }else{
            db.query(`SELECT * from users where name='${req.session.username}';`,function(err,data2){
                if(err){
                    console.log(err)
                }else{
                    res.render('results',{results1:data1,results2:data2,username:req.session.username})
                }
            })
        }

    })
})
app.get('/Admin_dashboard', (req, res) => {
    db.query(`SELECT * from users where name='${req.session.username}';`, function(err,rows){
        if(err){
            console.log(err)
        }else{
            db.query(`select * from users`,function(err,data2){
                if(err){
                    console.log(err)
                }else{
                    res.render('Admin_dashboard', {results1:rows,results2:data2,title: 'Admin Dashboard',username: req.session.username});
                }
            })
        }
  });
})
app.get('/analytics', (req, res) => {
    db.query(`SELECT * from patient ;`, function(err,data1){
        if(err){
            console.log(err)
        }else{
            db.query(`SELECT YEAR(walkin) AS Year, MONTHNAME(walkin) AS Month, SUM(cost) AS Count_Of_Sales FROM patient GROUP BY YEAR(walkin), MONTHNAME(walkin)`,function(err,data2){
                if(err){
                    console.log(err)
                }else{
                   db.query(`SELECT cost_1,cost_2,cost_3,doctor_t1,doctor_t2,doctor_t3 FROM patient`,function(err,data3){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(data3)
                        res.render('analytics', {results1:data1,results2:data2,result3:data3,title: 'Admin Dashboard',username: req.session.username});
                    }
                   })
                }
            })
        }
  });
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
        db.query(`select name from users where name = ?`,[username],(err,result)=>{
            if(result.length){
                return res.render('register', {
                    message: "Username taken! Try another one!",
                   
                })
            }
            else{
            db.query(sql, (err, result2) => {
                if(err) {
                    console.log(err)
                } else {
                    return res.render('register', {
                        message: "username Added",
                       
                    })
                }
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
      res.render('show_customers', { data1: rows,username: req.session.username  })
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
app.get("/invoice/:data?",(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("invoice", {
      data: formData,
      username: req.session.username,
      title: 'invoice'
    });
})

app.get("/edit_user/:data?",(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("edit_user", {
      data: formData,
      username: req.session.username,
      title: 'Edit'
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
      const cost_1=req.body.cost_1
      const cost_2=req.body.cost_2
      const cost_3=req.body.cost_3
      const treatement_1=req.body.Treatment1   
      const treatement_2=req.body.Treatment2
      const treatement_3=req.body.Treatment3   
      const notes_1=req.body.notes_1 
      const notes_2=req.body.notes_2
      const notes_3=req.body.notes_3
      const doctor_t1=req.body.doctor_t1
      const doctor_t2=req.body.doctor_t2
      const doctor_t3=req.body.doctor_t3
      const t1_desc=req.body.t1_desc
      const t2_desc=req.body.t2_desc
      const t3_desc=req.body.t3_desc
      let query = `UPDATE patient SET cost_1='${cost_1}',cost_2='${cost_2}',t1_desc='${t1_desc}',t2_desc='${t2_desc}',t3_desc='${t3_desc}',cost_3='${cost_3}',firstName='${firstName}',lastName='${lastName}',age='${age}',phone='${phone}',sex='${sex}',address='${address}',walkin='${walkin}',email='${email}',nextapp='${nextapp}',doctor_t1='${doctor_t1}',doctor_t2='${doctor_t2}',doctor_t3='${doctor_t3}',cost='${cost}',treatement_1='${treatement_1}',treatement_2='${treatement_2}',treatement_3='${treatement_3}',notes_1='${notes_1}',notes_2='${notes_2}',notes_3='${notes_3}' where id='${id}' `;
      db.query(query, (err, data) => {
        if (err) {
          console.log("not able to update", err.message);
          return;
        }
        res.render("", {message: "client Edited", username: req.session.username });
      });
    });
  
    app.post("/edit_user/:data?",urlencodedParser, (req, res) => {
        const id = req.body.id;
        const username = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        let query = `UPDATE users SET id='${id}',name='${username}',email='${email}',password='${password}',role='${role}' where id='${id}' `;
        db.query(query, (err, data) => {
          if (err) {
            console.log("not able to update", err.message);
            return;
          }
          res.render("", { data:data , message: "client Edited", username: req.session.username });
        });
      });


const server = app.listen(7000, () => {
    console.log(`Express running → http://localhost:7000/`);
  });