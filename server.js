const express = require('express');
const mysql = require("mysql")
const app = express();
var session = require('express-session')
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { json } = require('express');
const fs = require('fs');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(express.static('public'));

// login - db
const db = mysql.createPool({
    host: "172.18.0.2",
    port: "3306",
    user: "root",
    password: "password",
    database: "login-db",
  });
// Parse a SHA - 256 cookie.
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


// Get a list of users.
app.get('/', (req, res) => {
    db.query(`SELECT * from users where name='${req.session.username}';`, function(err,rows){
      res.render('', { data: rows,title: 'Homepage',username: req.session.username ,role:req.session.role})
    })
})

app.get('/contact_admin',(req,res)=>{
    res.render('contact_admin',{username:req.session.username,role:req.session.role})
})
// Renders the services page.
app.get('/services',(req,res)=>{
    res.render('services',{username:req.session.username,role:req.session.role})
})
// Renders the team page.
app.get('/team',(req,res)=>{
    res.render('team',{username:req.session.username,role:req.session.role})
})
// Renders the booking page.
app.get('/booking',(req,res)=>{
    res.render('booking',{username: req.session.username,role:req.session.role})
})
// Renders the about page.
app.get('/about',(req,res)=>{
    res.render('about',{username: req.session.username,role:req.session.role})
})
app.get('/j_smith',(req,res)=>{
    res.render('j_smith',{username: req.session.username,role:req.session.role})
})
app.get('/k_asin',(req,res)=>{
    res.render('k_asin',{username: req.session.username,role:req.session.role})
})
app.get('/t_hightower',(req,res)=>{
    res.render('t_hightower',{username: req.session.username,role:req.session.role})
})
// Renders the contact page.
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Homepage',
        username: req.session.username
        ,role:req.session.role
      });
  });
// Renders the agenda page.
app.get('/agenda',checkLogin, (req, res) => {
    db.query('Select * from staff', function(err,rows){
      res.render('agenda', { data: rows,title: 'Contacts',username: req.session.username,role:req.session.role  })
    })
});
// renders show contacts while selecting everything from staff table.
app.get('/show_contacts',checkLogin, (req, res) => {
    db.query('Select * from staff', function(err,rows){
      res.render('show_contacts', { data: rows,title: 'Contacts',username: req.session.username ,role:req.session.role })
    })
});

app.get("/results",checkLogin,(req,res)=>{
    const message = req.session.message;
    req.session.message = null; // clear the message from the session
    db.query(`select firstName,lastName,phone, startime1 as time,nextapp1 as date from patient where  (nextapp1<> '' and nextapp1 > now())  union
    select firstName,lastName,phone, startime2 as time,nextapp2 as date from patient where  (nextapp2 <> '' and nextapp2 > now())  union 
    select firstName,lastName,phone, startime3 as time,nextapp3 as date from patient where  (nextapp3 <> '' and nextapp3 > now()) order by date asc limit 1`,function(err,data1){
        if(err){
            console.log(err)
        }else{
            db.query(`SELECT * from users where name='${req.session.username}';`,function(err,data2){
                if(err){
                    console.log(err)
                }else{

                    res.render('results',{results1:data1,results2:data2,username:req.session.username,message,role:req.session.role})
                }
            })
        }

    })
})

app.get("/appointments",checkLogin,(req,res)=>{
    db.query(`select * from patient where nextapp1 is not null or nextapp2 is not null or nextapp3 is not null`,function(err,data1){
        if(err){
            console.log(err)
        }else{
            db.query(`SELECT * from users where name='${req.session.username}';`,function(err,data2){
                if(err){
                    console.log(err)
                }else{
                    db.query(`select firstName,lastName,nextapp1 as date from patient where  (nextapp1<> '' and nextapp1 > now())  union
                    select firstName,lastName,nextapp2 as date from patient where  (nextapp2 <> '' and nextapp2 > now())  union 
                    select firstName,lastName,nextapp3 as date from patient where  (nextapp3 <> '' and nextapp3 > now()) order by date asc limit 3` ,function(err,data3){
                        if(err){
                            console.log(err)
                        }else{
            
                            res.render('appointments',{results1:data1,results2:data2,results3:data3,username:req.session.username,role:req.session.role})
                        }
                    })
                }
            })
        }

    })
})
app.get('/Admin_dashboard', checkLogin,(req, res) => {
    db.query(`SELECT * from users where name='${req.session.username}';`, function(err,rows){
        if(err){
            console.log(err)
        }else{
            db.query(`select * from users`,function(err,data2){
                if(err){
                    console.log(err)
                }else{
                    db.query(`select count(*) as count from patient union all select sum(cost)as sum from patient where pay_t1='paid' or pay_t2='paid' or pay_t3='paid' `,function(err,data3){
                        if(err){
                            console.log(err)
                        }else{ 
                            db.query(`select walkin  from patient where  EXTRACT(MONTH FROM walkin) = 4 or EXTRACT(MONTH FROM walkin) = 5;`,function(err,data4){
                            if(err){
                                console.log(err)
                            }else{
                                const marchCustomers = data4.filter((customer) => {
                                    return new Date(customer.walkin).getMonth() === 3; // May is zero-indexed
                                  });
                                  const aprilCustomers = data4.filter((customer) => {
                                    return new Date(customer.walkin).getMonth() === 4; // April is zero-indexed
                                  });
                                  const patientNumber = data3[0].count
                                  const sum = data3[1].count
                                console.log(patientNumber,sum)
                             
                            res.render('Admin_dashboard', {results1:rows,results2:data2,results3:data3,results4:data4,marchCustomers,aprilCustomers,patientNumber,sum,title: 'Admin Dashboard',username: req.session.username,role:req.session.role});
                        }
                })
            }
            })
        }
    })
}
  });
})
app.get('/analytics',checkLogin, (req, res) => {
    db.query(`SELECT * from patient ;`, function(err,data1){
        if(err){
            console.log(err)
        }else{
            db.query(`SELECT MONTHNAME(nextapp1) AS Month, SUM(cost_1) AS monthly_intake FROM patient where pay_t1='paid' GROUP BY MONTHNAME(nextapp1)  UNION 
            SELECT MONTHNAME(nextapp2) AS Month, SUM(cost_2 ) AS monthly_intake FROM patient where pay_t2='paid' GROUP BY MONTHNAME(nextapp2) UNION 
            SELECT MONTHNAME(nextapp3) AS Month, SUM(cost_3) AS monthly_intake FROM patient where pay_t3='paid' GROUP BY MONTHNAME(nextapp3) ORDER BY Month`,function(err,data2){
                if(err){
                    console.log(err)
                }else{
                   db.query(`SELECT cost_1,doctor_t1 FROM patient where pay_t1='paid' UNION
                            SELECT cost_2,doctor_t2 FROM patient where pay_t2='paid' UNION
                   SELECT cost_3,doctor_t3 FROM patient where pay_t3='paid'`,function(err,data3){
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.render('analytics', {results1:data1,results2:data2,result3:data3,title: 'Admin Dashboard',username: req.session.username,role:req.session.role});
                    }
                   })
                }
            })
        }
  });
})
app.get('/profile', checkLogin,(req, res) =>  {
    db.query(`SELECT * from users where name='${req.session.username}';`, function (err, result) {
        res.render('profile', { data: result ,username: req.session.username ,role:req.session.role})
        
      }) 
    })

app.get('/delete_client',checkLogin, (req, res) => {

    db.query('Select * from patient', function(err,rows){
        res.render('delete_client', {
            title: 'delete Client',
            username: req.session.username,role:req.session.role,
            data:rows
          });
      });
    })


app.post("/delete_client",urlencodedParser,checkLogin,(req,res)=>{
    const name = req.body.searchName
    var sql = `delete FROM patient WHERE firstName='${name}';`
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            req.session.message = 'Client Deleted!';
            return res.redirect('results')
        }
    })        
    })
app.post("/agenda",checkLogin,urlencodedParser,(req,res)=>{
    const FirstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const phone = req.body.phone
    const position = req.body.position
    var sql=`INSERT INTO staff (FirstName, LastName,Position,email,phone) VALUES ("${FirstName}", "${lastName}","${position}","${email}", "${phone}")`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            return res.render('agenda', {
                message: "contact added",
                username: req.session.username,role:req.session.role
            })
        }
    })        
})

app.get('/add_client',checkLogin, (req, res) => {
    res.render('add_client', {
        title: 'Add Client',
        username: req.session.username ,role:req.session.role
      });
  });
app.post("/add_client",checkLogin,urlencodedParser, (req, res) => {    
    const f_name =req.body.firstName
    const lastName=req.body.lastName
    const age =req.body.age
    const sex= req.body.sex
    const address=req.body.address
    const walkin=req.body.walkin
    const email=req.body.email
    const phone = req.body.phone

    const query = `SELECT COUNT(*) AS count FROM patient WHERE firstName = ? AND lastName = ? `;
    db.query(query, [f_name, lastName], (err, results) => {
        if (err) throw err;
      
        const count = results[0].count;
      
        if (count > 0) {
          return res.render("add_client",{message:"Client already exists!",username: req.session.username })
        } else {
            var sql = `INSERT INTO patient (firstName, lastName,age,sex,address,walkin, email, phone) VALUES ("${f_name}", "${lastName}","${age}","${sex}","${address}","${walkin}", "${email}", "${phone}")`;
            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                        fs.mkdir(`./clients/${f_name} ${lastName}`, (err) => {
                        return res.render('add_client', {
                            message: "client Added",
                            username: req.session.username,role:req.session.role })
                      })
                }    
            })
        }
    })
})


app.get("/register", (req, res) => {
    return res.render("register",{username: req.session.username,role:req.session.role });
  });
app.get("/login", (req, res) => {
    return res.render("login",{username: req.session.username,role:req.session.role });
  });
app.post("/login", urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body
    var sql = `SELECT COUNT(*) FROM users WHERE name='${username}' and password ='${password}';`;
    var sql1 = `SELECT * FROM users WHERE name='${username}' and password ='${password}';`
    let session
    db.query(sql, (err, result) => {
        if (result[0]["COUNT(*)"] < 1) {
            res.render("login", { message: "User does not exist" });
        } else {
            db.query(sql1,(err,result2)=>{
            session=req.session;
            session.username= username;
            session.role= result2[0]['role']
            return res.redirect('results');
            })
           
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
                    data:result
                   
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
app.get('/show_customers',checkLogin, (req, res) => {
    db.query('Select * from patient', function(err,rows){
      res.render('show_customers', { data1: rows,username: req.session.username,role:req.session.role  })
    })
});


app.get("/edit/:data?",checkLogin,(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("edit", {
      data: formData,
      username: req.session.username,role:req.session.role,
      title: 'Edit'
    });
})
app.get("/invoice/:data?",checkLogin,(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("invoice", {
      data: formData,
      username: req.session.username,
      title: 'invoice'
    });
})
app.get("/prescription/:data?",checkLogin,(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("prescription", {
      data: formData,
      username: req.session.username,role:req.session.role,
      title: 'prescription'
    });
})
app.get("/consent/:data?",checkLogin,(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("consent", {
      data: formData,
      username: req.session.username,role:req.session.role,
      title: 'consent'
    });
})

app.get("/edit_user/:data?",checkLogin,(req, res,) => {
    const formData =JSON.parse(req.params.data);
    return res.render("edit_user", {
      data: formData,
      username: req.session.username,role:req.session.role,
      title: 'Edit'
    });
})

app.post("/edit/:data?",checkLogin,urlencodedParser, (req, res) => {
      const id = req.body.id;
      const firstName = req.body.name;
      const lastName = req.body.lastName;
      const age = req.body.age;
      const address = req.body.address;
      const walkin = req.body.walkin;
      const email = req.body.email;
      const phone = req.body.phone;
      const cost = req.body.cost;
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
      const pay_t1=req.body.pay_t1
      const pay_t2=req.body.pay_t2
      const pay_t3=req.body.pay_t3
      const nextapp1=req.body.nextapp1
      const nextapp2=req.body.nextapp2
      const nextapp3=req.body.nextapp3
      const start_time1=req.body.startime1
      const start_time2=req.body.startime2
      const start_time3=req.body.startime3
      const query=`UPDATE patient SET startime1='${start_time1}',startime2='${start_time2}',startime3='${start_time3}', nextapp1='${nextapp1}',nextapp2='${nextapp2}',nextapp3='${nextapp3}',cost_1='${cost_1}',cost_2='${cost_2}',t1_desc='${t1_desc}',t2_desc='${t2_desc}',t3_desc='${t3_desc}',cost_3='${cost_3}',firstName='${firstName}',lastName='${lastName}',age='${age}',phone='${phone}',address='${address}',walkin='${walkin}',email='${email}',doctor_t1='${doctor_t1}',doctor_t2='${doctor_t2}',doctor_t3='${doctor_t3}',cost='${cost}',treatement_1='${treatement_1}',treatement_2='${treatement_2}',treatement_3='${treatement_3}',notes_1='${notes_1}',notes_2='${notes_2}',notes_3='${notes_3}', pay_t1='${pay_t1}',pay_t2='${pay_t2}',pay_t3='${pay_t3}' where id='${id}' `

        db.query(query, (err, data) => {
          
                    res.render("", {message: "client Edited", username: req.session.username ,role:req.session.role});
                })
            })
            
           
        
    
app.post("/edit_user/:data?",checkLogin,urlencodedParser, (req, res) => {
    const id = req.body.id;
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    let query = `UPDATE users SET id='${id}',name='${username}',email='${email}',password='${password}',role='${role}' where name='${username}' `;
    db.query(query, (err, data) => {
        if (err) {
        console.log("not able to update", err.message);
        return;
        }
        res.render("", { data:data , message: "client Edited", username: req.session.username,role:req.session.role });
    });
    });

function checkLogin(req,res,next){
    if (!req.session.username){
        return res.render('login',{message:"Login first"})
    }
    else{
        next();
    }
}

const server = app.listen(7000, () => {
    console.log(`Express running → http://localhost:7000/`);
  });

  