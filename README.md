# fyp

The purpose of this project is to develop a Web App that helps dental clinics go digital. The WebApp was designed on feedback received from dental professionals and customer consultation. This information received from the two sources will represent the backbone of this project. The application will be coded using a mixture of
* HTML
* CSS
* JavaScript
* Node.js MySQL
* MySQL and other tools and frameworks.
## Content 
* The WebApp consists in a practice presentation website, where customers can find information about the practice, services offered and get to know their doctors.
The second component of the WebApp is a login system that will redirect the users to the main application. The user-friendly interface will provide users with various information and includes features such as patient registration, appointment management, medical history, etc. It also adds a level of security and prevents “prying” eyes from accessing sensitive information. A role-based system will be set up , so different users have access to different areas of the application.
* The webapp back-end is developed using Node.js and Express.js, with a RESTful API to communicate with the front-end. The database is developed using MySQL, with access controls in place to ensure data security.
* The result of this project is a digital platform that streamlines clinic operations, improves efficiency, and enhances patient experience in dental clinics.

## Running the project

* First step is to install Docker 
 [Download link ](https://www.docker.com/products/docker-desktop/)
* docker compose
``` docker-compose up --build ```
* Sometimes you need to change the database ip. For that just ran the two commands
``` docker ps ```
``` docker inspect container <containerID> ```
Take the IP from the ``` 
                   
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0
                    "DriverOpts": null ```
  and replace it into the server.js ``` 
  const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: "3306",
    database: "login-db",
  }); ```
  * After this run the ``` docker-compose up --build ```


![](.public/index.png "index page")
