# This is cybersecurity 2021's project of a simple todo app

**DISCLAIMER:** This is only an example app, that tries to show security vulnerabilities and possibilities of their mitigation. For the porpose of using it without bigger preparations, environment variables and secrets have been uploaded, which shouldn't be done e.g. in production.

## Installation instructions

LINK: link to the repository
## Installation instructions

LINK: link to the repository

This project supposes you to have node.js and docker, docker-compose installed. (If you haven't: docker: https://docs.docker.com/get-docker/ , docker-compose: https://docs.docker.com/compose/install/, node.js: https://nodejs.org/en/download/) The frontend uses a build of react.js. If you're interested in the react app, you can read the readme of the frontend directory to get started. Before the start up you have to install the backend with your packed manager of choice (e.g. supposing you're in the backend directory `npm install`). Then first start up the database with docker-compose (supposing you're in the db directory: `docker-compose up`) and then start the server (supposing youre in the backend directory again: `node index.js`). Users are - "admin", "user, "anyone" with the usernames as passwords.

## The App: a short Description

The app lists todos for logged in users. They can also add todos. Within the todos they can specify another user related to the todo, adding some group functionality. Likewise a user can see the todos of other users that the user is involved in.

### Flaw 1: Broken Access Control #1:
exact source link pinpointing flaw 1...

The implemented logging functionality doesn't use session tokens but only checks if the password is right sending that information back. The frontend then only saves a key-value pair to the session storage (loggedin: username). Bypassing can be done simply with saving the desired username to the session storage (`sessionStorage.setItem('loggedin', 'admin'`). With that an attacker can impersonate an user in the app. Within the functionality of this app they could see all the users todos. 


With using session tokens, we can check if a user is logged in with every request in the backend and set an expiration interval that terminates sessions after a reasonable time and/or after a time of inactivity. This is implemented here with the express sessions and a corresponding library to implement session storage in the database. Now, although the implementation on the frontend didn't alter greatly  with the additional session token, the mentioned vulnaribility for impersonation is ruled out.

### FLAW 2: Security Missconfiguration - Passwords instead of Password Hashes

exact source link pinpointing flaw 1...

Passwords are saved in plain text instead of using a salted and hashed value. This is not advisable, for in case of a database breach, all username password pairs would be usable to impersonate the user on the web-app and would endanger those users that use the same or similar username password pairs on multiple websites.

To avoid this scenario an easy solution is to save password hashes instead of passwords themselfes. As the hash functions themselfes are known and an adversary could still determine the password with the help of tables,  before hashing the passwords are "salted", that means a random string is attached to each password before hashing. That makes it much more cumbersome to retrieve the password for an adversary.

### FLAW 3: Sensitive Data Exposure
exact source link pinpointing flaw 2...

Within the logic of the app, todos are gathered all at once from the backend. The filtering happens in the app itself, exposing therefore data, that should not be visible with the authorization of the logged in user. While only todo list entries that either are authored by the user or that the user is involved in should be visible, a user can simply look through a full list of all users that is send from the backend.

The problem is that filtering happens in the frontend, which isn't perfect performancewise either. An adapted 

### FLAW 4: Broken access control #2
exact source link pinpointing flaw 5...

Even after implementing session tokens a user can post todo list entries impersonating other users/without permision of the user, because the post route in the backend doesn't check for the identity of the posting user/their permission.

A simple solution for the sake of this project is to insert the logged in users username per default in every new todo list entry from the backend. (More complex approaches could introduce a permission management logic into the todo list entry model, that defines who can see, edit, create and delete a todo list entry for whome etc.)

### FLAW 5: SQL Injection
exact source link pinpointing flaw 5...

In this app the posting of new todo list entries allows for sql injection. Although the library used for the interaction with the PostgresQL Server, node-postgres, prevents that an attacker can run multiple queries at the same time, the structure of entries can be tampered with. Letting this happen unknowingly and relying on a certain structur result in unforeseen errors and alike. (This partly relies too on the fact that data validation has been taken care of in the backend logic instead of the database or a specific ORM like mongoose for a mongo.db)

There are multiple ways to prevent SQL injections. There a multiple possibilities where a solution could take it's starting point. It could be done with the help of an ORM, with strict type control/sanitation using TypeScript. In this case to minimize the changes necessary we could use the security features the used library, node-postgres, which is: Strict use of parametized queries.


This project supposes you to have node.js and docker, docker-compose installed. (If you haven't: docker: https://docs.docker.com/get-docker/ , docker-compose: https://docs.docker.com/compose/install/, node.js: https://nodejs.org/en/download/) The frontend uses a build of react.js. If you're interested in the react app, you can read the readme of the frontend directory to get started. Before the start up you have to install the backend with your packed manager of choice (e.g. supposing you're in the backend directory `npm install`). Then first start up the database with docker-compose (supposing you're in the db directory: `docker-compose up`) and then start the server (supposing youre in the backend directory again: `node index.js`). Users are - "admin", "user, "anyone" with the usernames as passwords.

## The App: a short Description

The app lists todos for logged in users. They can also add todos. Within the todos they can specify another user related to the todo, adding some group functionality. Likewise a user can see the todos of other users that the user is involved in.

### Flaw 1: Broken Access Control #1:
exact source link pinpointing flaw 1...

The implemented logging functionality doesn't use session tokens but only checks if the password is right sending that information back. The frontend then only saves a key-value pair to the session storage (loggedin: username). Bypassing can be done simply with saving the desired username to the session storage (`sessionStorage.setItem('loggedin', 'admin'`). With that an attacker can impersonate an user in the app. Within the functionality of this app they could see all the users todos. 


With using session tokens, we can check if a user is logged in with every request in the backend and set an expiration interval that terminates sessions after a reasonable time and/or after a time of inactivity. This is implemented here with the express sessions and a corresponding library to implement session storage in the database. Now, although the implementation on the frontend didn't alter greatly  with the additional session token, the mentioned vulnaribility for impersonation is ruled out.

### FLAW 2: Security Missconfiguration - Passwords instead of Password Hashes

exact source link pinpointing flaw 1...

Passwords are saved in plain text instead of using a salted and hashed value. This is not advisable, for in case of a database breach, all username password pairs would be usable to impersonate the user on the web-app and would endanger those users that use the same or similar username password pairs on multiple websites.

To avoid this scenario an easy solution is to save password hashes instead of passwords themselfes. As the hash functions themselfes are known and an adversary could still determine the password with the help of tables,  before hashing the passwords are "salted", that means a random string is attached to each password before hashing. That makes it much more cumbersome to retrieve the password for an adversary.

### FLAW 3: Sensitive Data Exposure
exact source link pinpointing flaw 2...

Within the logic of the app, todos are gathered all at once from the backend. The filtering happens in the app itself, exposing therefore data, that should not be visible with the authorization of the logged in user. While only todo list entries that either are authored by the user or that the user is involved in should be visible, a user can simply look through a full list of all users that is send from the backend.

The problem is that filtering happens in the frontend, which isn't perfect performancewise either. An adapted 

### FLAW 4: Broken access control #2
exact source link pinpointing flaw 5...

Even after implementing session tokens a user can post todo list entries impersonating other users/without permision of the user, because the post route in the backend doesn't check for the identity of the posting user/their permission.

A simple solution for the sake of this project is to insert the logged in users username per default in every new todo list entry from the backend. (More complex approaches could introduce a permission management logic into the todo list entry model, that defines who can see, edit, create and delete a todo list entry for whome etc.)

### FLAW 5: SQL Injection
exact source link pinpointing flaw 5...

In this app the posting of new todo list entries allows for sql injection. Although the library used for the interaction with the PostgresQL Server, node-postgres, prevents that an attacker can run multiple queries at the same time, the structure of entries can be tampered with. Letting this happen unknowingly and relying on a certain structur result in unforeseen errors and alike. (This partly relies too on the fact that data validation has been taken care of in the backend logic instead of the database or a specific ORM like mongoose for a mongo.db)

There are multiple ways to prevent SQL injections. There a multiple possibilities where a solution could take it's starting point. It could be done with the help of an ORM, with strict type control/sanitation using TypeScript. In this case to minimize the changes necessary we could use the security features the used library, node-postgres, which is: Strict use of parametized queries.