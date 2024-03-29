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

var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(express["static"]('public')); // Set environment variables '172.18.0.2'   'password'

process.env.DB_HOST = '172.18.0.2';
process.env.DB_USER = 'root';
process.env.DB_PASS = 'password'; // login - db

var db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: "3306",
  database: "login-db"
}); // Parse a SHA - 256 cookie.

app.use(cookieParser());
app.use(session({
  secret: "Shh, its a secret!"
})); // ROUTES
// Get a list of users.

app.get('/', function (req, res) {
  db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, rows) {
    res.render('', {
      data: rows,
      title: 'Homepage',
      username: req.session.username,
      role: req.session.role
    });
  });
}); // Renders the contact admin page.

app.get('/contact_admin', function (req, res) {
  res.render('contact_admin', {
    username: req.session.username,
    role: req.session.role
  });
}); // Renders the services page.

app.get('/services', function (req, res) {
  res.render('services', {
    username: req.session.username,
    role: req.session.role
  });
}); // Renders the team page.

app.get('/team', function (req, res) {
  res.render('team', {
    username: req.session.username,
    role: req.session.role
  });
}); // Renders the booking page.

app.get('/booking', function (req, res) {
  res.render('booking', {
    username: req.session.username,
    role: req.session.role
  });
}); // Renders the about page.

app.get('/about', function (req, res) {
  res.render('about', {
    username: req.session.username,
    role: req.session.role
  });
});
app.get('/j_smith', function (req, res) {
  res.render('j_smith', {
    username: req.session.username,
    role: req.session.role
  });
});
app.get('/k_asin', function (req, res) {
  res.render('k_asin', {
    username: req.session.username,
    role: req.session.role
  });
});
app.get('/t_hightower', function (req, res) {
  res.render('t_hightower', {
    username: req.session.username,
    role: req.session.role
  });
}); // Renders the contact page.

app.get('/contact', function (req, res) {
  res.render('contact', {
    title: 'Homepage',
    username: req.session.username,
    role: req.session.role
  });
}); // Renders the agenda page.

app.get('/agenda', checkLogin, function (req, res) {
  db.query('Select * from staff', function (err, rows) {
    res.render('agenda', {
      data: rows,
      title: 'Contacts',
      username: req.session.username,
      role: req.session.role
    });
  });
}); // renders show contacts while selecting everything from staff table.

app.get('/show_contacts', checkLogin, function (req, res) {
  db.query('Select * from staff', function (err, rows) {
    res.render('show_contacts', {
      data: rows,
      title: 'Contacts',
      username: req.session.username,
      role: req.session.role
    });
  });
});
app.get("/results", checkLogin, function (req, res) {
  var message = req.session.message;
  req.session.message = null; // clear the message from the session

  db.query("select firstName,lastName,phone, startime1 as time,nextapp1 as date from patient where  (nextapp1<> '' and nextapp1 > now())  union\n    select firstName,lastName,phone, startime2 as time,nextapp2 as date from patient where  (nextapp2 <> '' and nextapp2 > now())  union \n    select firstName,lastName,phone, startime3 as time,nextapp3 as date from patient where  (nextapp3 <> '' and nextapp3 > now()) order by date asc limit 1", function (err, data1) {
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
            username: req.session.username,
            message: message,
            role: req.session.role
          });
        }
      });
    }
  });
});
app.get("/appointments", checkLogin, function (req, res) {
  db.query("select * from patient where nextapp1 is not null or nextapp2 is not null or nextapp3 is not null", function (err, data1) {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, data2) {
        if (err) {
          console.log(err);
        } else {
          db.query("select firstName,lastName,nextapp1 as date from patient where  (nextapp1<> '' and nextapp1 > now())  union\n                    select firstName,lastName,nextapp2 as date from patient where  (nextapp2 <> '' and nextapp2 > now())  union \n                    select firstName,lastName,nextapp3 as date from patient where  (nextapp3 <> '' and nextapp3 > now()) order by date asc limit 3", function (err, data3) {
            if (err) {
              console.log(err);
            } else {
              res.render('appointments', {
                results1: data1,
                results2: data2,
                results3: data3,
                username: req.session.username,
                role: req.session.role
              });
            }
          });
        }
      });
    }
  });
});
app.get('/Admin_dashboard', checkLogin, function (req, res) {
  db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      db.query("select * from users", function (err, data2) {
        if (err) {
          console.log(err);
        } else {
          db.query("select count(*) as count from patient union all select sum(cost)as sum from patient where pay_t1='paid' or pay_t2='paid' or pay_t3='paid' ", function (err, data3) {
            if (err) {
              console.log(err);
            } else {
              db.query("select walkin  from patient where  EXTRACT(MONTH FROM walkin) = 4 or EXTRACT(MONTH FROM walkin) = 5;", function (err, data4) {
                if (err) {
                  console.log(err);
                } else {
                  var marchCustomers = data4.filter(function (customer) {
                    return new Date(customer.walkin).getMonth() === 3; // May is zero-indexed
                  });
                  var aprilCustomers = data4.filter(function (customer) {
                    return new Date(customer.walkin).getMonth() === 4; // April is zero-indexed
                  });
                  var patientNumber = data3[0].count;
                  var sum = data3[1].count;
                  console.log(patientNumber, sum);
                  res.render('Admin_dashboard', {
                    results1: rows,
                    results2: data2,
                    results3: data3,
                    results4: data4,
                    marchCustomers: marchCustomers,
                    aprilCustomers: aprilCustomers,
                    patientNumber: patientNumber,
                    sum: sum,
                    title: 'Admin Dashboard',
                    username: req.session.username,
                    role: req.session.role
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});
app.get('/analytics', checkLogin, function (req, res) {
  db.query("SELECT * from patient ;", function (err, data1) {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT MONTHNAME(nextapp1) AS Month, SUM(cost_1) AS monthly_intake FROM patient where pay_t1='paid' GROUP BY MONTHNAME(nextapp1)  UNION \n            SELECT MONTHNAME(nextapp2) AS Month, SUM(cost_2 ) AS monthly_intake FROM patient where pay_t2='paid' GROUP BY MONTHNAME(nextapp2) UNION \n            SELECT MONTHNAME(nextapp3) AS Month, SUM(cost_3) AS monthly_intake FROM patient where pay_t3='paid' GROUP BY MONTHNAME(nextapp3) ORDER BY Month", function (err, data2) {
        if (err) {
          console.log(err);
        } else {
          db.query("SELECT cost_1,doctor_t1 FROM patient where pay_t1='paid' UNION\n                            SELECT cost_2,doctor_t2 FROM patient where pay_t2='paid' UNION\n                   SELECT cost_3,doctor_t3 FROM patient where pay_t3='paid'", function (err, data3) {
            if (err) {
              console.log(err);
            } else {
              res.render('analytics', {
                results1: data1,
                results2: data2,
                result3: data3,
                title: 'Admin Dashboard',
                username: req.session.username,
                role: req.session.role,
                pageTitle: 'analytics'
              });
            }
          });
        }
      });
    }
  });
});
app.get('/profile', checkLogin, function (req, res) {
  db.query("SELECT * from users where name='".concat(req.session.username, "';"), function (err, result) {
    res.render('profile', {
      data: result,
      username: req.session.username,
      role: req.session.role
    });
  });
});
app.get('/delete_client', checkLogin, function (req, res) {
  db.query('Select * from patient', function (err, rows) {
    res.render('delete_client', {
      title: 'delete Client',
      username: req.session.username,
      role: req.session.role,
      data: rows
    });
  });
});
app.post("/delete_client", urlencodedParser, checkLogin, function (req, res) {
  var name = req.body.searchName;
  var sql = "delete FROM patient WHERE firstName='".concat(name, "';");
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      req.session.message = 'Client Deleted!';
      return res.redirect('results');
    }
  });
});
app.post("/agenda", checkLogin, urlencodedParser, function (req, res) {
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
        message: "contact added",
        username: req.session.username,
        role: req.session.role
      });
    }
  });
});
app.get('/add_client', checkLogin, function (req, res) {
  res.render('add_client', {
    title: 'Add Client',
    username: req.session.username,
    role: req.session.role
  });
});
app.post("/add_client", checkLogin, urlencodedParser, function (req, res) {
  var f_name = req.body.firstName;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var sex = req.body.sex;
  var address = req.body.address;
  var walkin = req.body.walkin;
  var email = req.body.email;
  var phone = req.body.phone;
  var query = "SELECT COUNT(*) AS count FROM patient WHERE firstName = ? AND lastName = ? ";
  db.query(query, [f_name, lastName], function (err, results) {
    if (err) throw err;
    var count = results[0].count;

    if (count > 0) {
      return res.render("add_client", {
        message: "Client already exists!",
        username: req.session.username
      });
    } else {
      var sql = "INSERT INTO patient (firstName, lastName,age,sex,address,walkin, email, phone) VALUES (\"".concat(f_name, "\", \"").concat(lastName, "\",\"").concat(age, "\",\"").concat(sex, "\",\"").concat(address, "\",\"").concat(walkin, "\", \"").concat(email, "\", \"").concat(phone, "\")");
      db.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          fs.mkdir("./clients/".concat(f_name, " ").concat(lastName), function (err) {
            return res.render('add_client', {
              message: "client Added",
              username: req.session.username,
              role: req.session.role
            });
          });
        }
      });
    }
  });
});
app.get("/register", function (req, res) {
  return res.render("register", {
    username: req.session.username,
    role: req.session.role
  });
});
app.get("/login", function (req, res) {
  return res.render("login", {
    username: req.session.username,
    role: req.session.role
  });
});
app.post("/login", urlencodedParser, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body;
  var sql = "SELECT COUNT(*) FROM users WHERE name='".concat(username, "' and password ='").concat(password, "';");
  var sql1 = "SELECT * FROM users WHERE name='".concat(username, "' and password ='").concat(password, "';");
  var session;
  db.query(sql, function (err, result) {
    if (result[0]["COUNT(*)"] < 1) {
      res.render("login", {
        message: "User does not exist"
      });
    } else {
      db.query(sql1, function (err, result2) {
        session = req.session;
        session.username = username;
        session.role = result2[0]['role'];
        return res.redirect('results');
      });
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
        message: "Username taken! Try another one!",
        data: result
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
app.get('/show_customers', checkLogin, function (req, res) {
  db.query('Select * from patient', function (err, rows) {
    res.render('show_customers', {
      data1: rows,
      username: req.session.username,
      role: req.session.role
    });
  });
});
app.get("/edit/:data?", checkLogin, function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("edit", {
    data: formData,
    username: req.session.username,
    role: req.session.role,
    title: 'Edit'
  });
});
app.get("/invoice/:data?", checkLogin, function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("invoice", {
    data: formData,
    username: req.session.username,
    title: 'invoice'
  });
});
app.get("/prescription/:data?", checkLogin, function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("prescription", {
    data: formData,
    username: req.session.username,
    role: req.session.role,
    title: 'prescription'
  });
});
app.get("/consent/:data?", checkLogin, function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("consent", {
    data: formData,
    username: req.session.username,
    role: req.session.role,
    title: 'consent'
  });
});
app.get("/edit_user/:data?", checkLogin, function (req, res) {
  var formData = JSON.parse(req.params.data);
  return res.render("edit_user", {
    data: formData,
    username: req.session.username,
    role: req.session.role,
    title: 'Edit'
  });
});
app.post("/edit/:data?", checkLogin, urlencodedParser, function (req, res) {
  var id = req.body.id;
  var firstName = req.body.name;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var address = req.body.address;
  var walkin = req.body.walkin;
  var email = req.body.email;
  var phone = req.body.phone;
  var cost = req.body.cost;
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
  var pay_t1 = req.body.pay_t1;
  var pay_t2 = req.body.pay_t2;
  var pay_t3 = req.body.pay_t3;
  var nextapp1 = req.body.nextapp1;
  var nextapp2 = req.body.nextapp2;
  var nextapp3 = req.body.nextapp3;
  var start_time1 = req.body.startime1;
  var start_time2 = req.body.startime2;
  var start_time3 = req.body.startime3;
  var query = "UPDATE patient SET startime1='".concat(start_time1, "',startime2='").concat(start_time2, "',startime3='").concat(start_time3, "', nextapp1='").concat(nextapp1, "',nextapp2='").concat(nextapp2, "',nextapp3='").concat(nextapp3, "',cost_1='").concat(cost_1, "',cost_2='").concat(cost_2, "',t1_desc='").concat(t1_desc, "',t2_desc='").concat(t2_desc, "',t3_desc='").concat(t3_desc, "',cost_3='").concat(cost_3, "',firstName='").concat(firstName, "',lastName='").concat(lastName, "',age='").concat(age, "',phone='").concat(phone, "',address='").concat(address, "',walkin='").concat(walkin, "',email='").concat(email, "',doctor_t1='").concat(doctor_t1, "',doctor_t2='").concat(doctor_t2, "',doctor_t3='").concat(doctor_t3, "',cost='").concat(cost, "',treatement_1='").concat(treatement_1, "',treatement_2='").concat(treatement_2, "',treatement_3='").concat(treatement_3, "',notes_1='").concat(notes_1, "',notes_2='").concat(notes_2, "',notes_3='").concat(notes_3, "', pay_t1='").concat(pay_t1, "',pay_t2='").concat(pay_t2, "',pay_t3='").concat(pay_t3, "' where id='").concat(id, "' ");
  db.query(query, function (err, data) {
    res.render("", {
      message: "client Edited",
      username: req.session.username,
      role: req.session.role
    });
  });
});
app.post("/edit_user/:data?", checkLogin, urlencodedParser, function (req, res) {
  var id = req.body.id;
  var username = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  var query = "UPDATE users SET id='".concat(id, "',name='").concat(username, "',email='").concat(email, "',password='").concat(password, "',role='").concat(role, "' where name='").concat(username, "' ");
  db.query(query, function (err, data) {
    if (err) {
      console.log("not able to update", err.message);
      return;
    }

    res.render("", {
      data: data,
      message: "client Edited",
      username: req.session.username,
      role: req.session.role
    });
  });
});

function checkLogin(req, res, next) {
  if (!req.session.username) {
    return res.render('login', {
      message: "Login first"
    });
  } else {
    next();
  }
}

var server = app.listen(7000, function () {
  console.log("Express running \u2192 http://localhost:7000/");
});