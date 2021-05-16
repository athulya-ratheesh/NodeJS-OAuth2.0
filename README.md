# Implementing OAuth 2.0 in Node.js
This is a sample repository created for implementing OAuth2.0 using node. We can extend the data security by adding claims and datas to the token.

This example is created using mysql and normal password provider is used to validate.

If we need to extend support like facebook, github etc. enable the token authorization for the same and need to integrate.

Before running the app, you have to set up the MySQL database. For this, install MySQL Workbench and create a new database called `nodeauthserver`.

Then, run this script to create the tables:

```mysql

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `user_password` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `access_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `access_token` varchar(1000) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

After that, run the command to install the npm dependencies:

```
npm install
```
Add the Database password in the .env file and then :

```
npm start
```

The app will start at 
```
http://localhost:3000.

```

Export the postman url and try each urls

