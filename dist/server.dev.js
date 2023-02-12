"use strict";

var express = require('express');

var mysql = require("mysql");

var app = express();

var session = require('express-session');

var cookieParser = require('cookie-parser');

var bodyParser = require("body-parser");

var bcrypt = require("bcryptjs");

var _require = require('express'),
    json = _require.json;

var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.set('view engine', 'pug');
app.use(express["static"](__dirname + '/public'));
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login-db",
  multipleStatements: true
});
app.use(cookieParser());
app.use(session({
  secret: "Shh, its a secret!"
}));
app.get('/', function (req, res) {
  db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, rows) {
    res.render('', {
      data: rows,
      title: 'Homepage',
      username: req.session.username
    });
  });
});
app.get('/booking', function (req, res) {
  res.render('booking');
});
app.get('/contact', function (req, res) {
  res.render('contact', {
    title: 'Homepage',
    username: req.session.username
  });
});
app.get('/agenda', function (req, res) {
  db.query('Select * from staff', function (err, rows) {
    res.render('Agenda', {
      data: rows,
      title: 'Contacts',
      username: req.session.username
    });
  });
});
app.get("/results", function (req, res) {
  db.query("SELECT * FROM patient WHERE nextapp > NOW() ORDER BY nextapp LIMIT 1;", function (err, data1) {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, data2) {
        if (err) {
          console.log(err);
        } else {
          res.render('results', {
            results1: data1,
            results2: data2,
            username: req.session.username
          });
        }
      });
    }
  });
});
app.get('/Admin_dashboard', function (req, res) {
  db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      db.query("select * from users", function (err, data2) {
        if (err) {
          console.log(err);
        } else {
          res.render('Admin_dashboard', {
            results1: rows,
            results2: data2,
            title: 'Admin Dashboard',
            username: req.session.username
          });
        }
      });
    }
  });
});
app.get('/analytics', function (req, res) {
  db.query("SELECT * from patient ;", function (err, data1) {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT YEAR(walkin) AS Year, MONTHNAME(walkin) AS Month, SUM(cost) AS Count_Of_Sales FROM patient GROUP BY YEAR(walkin), MONTHNAME(walkin)", function (err, data2) {
        if (err) {
          console.log(err);
        } else {
          db.query("SELECT cost_1,cost_2,cost_3,doctor_t1,doctor_t2,doctor_t3 FROM patient", function (err, data3) {
            if (err) {
              console.log(err);
            } else {
              console.log(data3);
              res.render('analytics', {
                results1: data1,
                results2: data2,
                result3: data3,
                title: 'Admin Dashboard',
                username: req.session.username
              });
            }
          });
        }
      });
    }
  });
});
app.get('/profile', function (req, res) {
  db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, rows) {
    res.render('profile', {
      data: rows,
      username: req.session.username
    });
  });
});
app.get('/delete_client', function (req, res) {
  res.render('delete_client', {
    title: 'delete Client',
    username: req.session.username
  });
});
app.post("/delete_client", urlencodedParser, function (req, res) {
  var name = req.body.searchName;
  var sql = "delete FROM patient WHERE firstName='".concat(name, "';");
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      return res.render('delete_client', {
        message: "delete client",
        username: req.session.username
      });
    }
  });
});
app.get('/add_client', function (req, res) {
  res.render('add_client', {
    title: 'Add Client',
    username: req.session.username
  });
});
app.get("/login", function (req, res) {
  return res.render("login", {
    username: req.session.username
  });
});
app.get("/register", function (req, res) {
  return res.render("register", {
    username: req.session.username
  });
});
app.post("/login", urlencodedParser, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var sql = "SELECT COUNT(*) FROM users WHERE name='".concat(username, "' and password ='").concat(password, "';");
  var session;
  db.query(sql, function (err, result) {
    if (result[0]["COUNT(*)"] < 1) {
      res.render("login", {
        message: "User does not exist"
      });
    } else {
      session = req.session;
      session.username = username;
      return res.redirect('results');
    }
  });
});
app.post("/register", urlencodedParser, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var sql = "INSERT INTO users (name, password, email) VALUES (\"".concat(username, "\", \"").concat(password, "\", \"").concat(email, "\")");
  db.query("select name from users where name = ?", [username], function (err, result) {
    if (result.length) {
      return res.render('register', {
        message: "Username taken! Try another one!"
      });
    } else {
      db.query(sql, function (err, result2) {
        if (err) {
          console.log(err);
        } else {
          return res.render('register', {
            message: "username Added"
          });
        }
      });
    }
  });
});
app.get("/logout", function (req, res) {
  req.session.destroy();
  return res.render("index");
});
app.post("/add_client", urlencodedParser, function (req, res) {
  var f_name = req.body.firstName;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var sex = req.body.sex;
  var address = req.body.address;
  var walkin = req.body.walkin;
  var email = req.body.email;
  var phone = req.body.phone;
  var doctor = req.body.doctor;
  var cost = req.body.cost;
  var sql = "INSERT INTO patient (firstName, lastName,age,sex,address,walkin, email, phone, doctor,cost) VALUES (\"".concat(f_name, "\", \"").concat(lastName, "\",\"").concat(age, "\",\"").concat(sex, "\",\"").concat(address, "\",\"").concat(walkin, "\", \"").concat(email, "\", \"").concat(phone, "\",\"").concat(doctor, "\",\"").concat(cost, "\")");
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      return res.render('add_client', {
        message: "client Added",
        username: req.session.username
      });
    }
  });
});
app.get('/show_customers', function (req, res) {
  db.query('Select * from patient', function (err, rows) {
    res.render('show_customers', {
      data1: rows,
      username: req.session.username
    });
  });
});
app.post("/add_contact", urlencodedParser, function (req, res) {
  var FirstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phone = req.body.phone;
  var position = req.body.position;
  var sql = "INSERT INTO staff (FirstName, LastName,Position,email,phone) VALUES (\"".concat(FirstName, "\", \"").concat(lastName, "\",\"").concat(position, "\",\"").concat(email, "\", \"").concat(phone, "\")");
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      return res.render('agenda', {
        message: "Contact Added",
        username: req.session.username
      });
    }
  });
});
app.get("/edit/:data?", function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("edit", {
    data: formData,
    username: req.session.username,
    title: 'Edit'
  });
});
app.get("/invoice/:data?", function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("invoice", {
    data: formData,
    username: req.session.username,
    title: 'invoice'
  });
});
app.get("/edit_user/:data?", function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("edit_user", {
    data: formData,
    username: req.session.username,
    title: 'Edit'
  });
});
app.post("/edit/:data?", urlencodedParser, function (req, res) {
  var id = req.body.id;
  var firstName = req.body.name;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var sex = req.body.sex;
  var address = req.body.address;
  var walkin = req.body.walkin;
  var email = req.body.email;
  var phone = req.body.phone;
  var doctor = req.body.doctor;
  var cost = req.body.cost;
  var nextapp = req.body.nextapp;
  var cost_1 = req.body.cost_1;
  var cost_2 = req.body.cost_2;
  var cost_3 = req.body.cost_3;
  var treatement_1 = req.body.Treatment1;
  var treatement_2 = req.body.Treatment2;
  var treatement_3 = req.body.Treatment3;
  var notes_1 = req.body.notes_1;
  var notes_2 = req.body.notes_2;
  var notes_3 = req.body.notes_3;
  var doctor_t1 = req.body.doctor_t1;
  var doctor_t2 = req.body.doctor_t2;
  var doctor_t3 = req.body.doctor_t3;
  var t1_desc = req.body.t1_desc;
  var t2_desc = req.body.t2_desc;
  var t3_desc = req.body.t3_desc;
  var query = "UPDATE patient SET cost_1='".concat(cost_1, "',cost_2='").concat(cost_2, "',t1_desc='").concat(t1_desc, "',t2_desc='").concat(t2_desc, "',t3_desc='").concat(t3_desc, "',cost_3='").concat(cost_3, "',firstName='").concat(firstName, "',lastName='").concat(lastName, "',age='").concat(age, "',phone='").concat(phone, "',sex='").concat(sex, "',address='").concat(address, "',walkin='").concat(walkin, "',email='").concat(email, "',nextapp='").concat(nextapp, "',doctor_t1='").concat(doctor_t1, "',doctor_t2='").concat(doctor_t2, "',doctor_t3='").concat(doctor_t3, "',cost='").concat(cost, "',treatement_1='").concat(treatement_1, "',treatement_2='").concat(treatement_2, "',treatement_3='").concat(treatement_3, "',notes_1='").concat(notes_1, "',notes_2='").concat(notes_2, "',notes_3='").concat(notes_3, "' where id='").concat(id, "' ");
  db.query(query, function (err, data) {
    if (err) {
      console.log("not able to update", err.message);
      return;
    }

    res.render("", {
      message: "client Edited",
      username: req.session.username
    });
  });
});
app.post("/edit_user/:data?", urlencodedParser, function (req, res) {
  var id = req.body.id;
  var username = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  var query = "UPDATE users SET id='".concat(id, "',name='").concat(username, "',email='").concat(email, "',password='").concat(password, "',role='").concat(role, "' where id='").concat(id, "' ");
  db.query(query, function (err, data) {
    if (err) {
      console.log("not able to update", err.message);
      return;
    }

    res.render("", {
      data: data,
      message: "client Edited",
      username: req.session.username
    });
  });
});
var server = app.listen(7000, function () {
  console.log("Express running \u2192 http://localhost:7000/");
});