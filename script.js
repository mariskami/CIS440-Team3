

"use strict";

// import modules for creating a server, using MySQL, and using events
let http = require("http");
let mysql = require("mysql");


// declare global variables for use across functions
let userID = 1
let sqlquery = ''
let output = ''
let res = ''
let username = ''
let password = ''
let firstname = ''
let lastname = ''
let occupation = ''
let bio = ''
let s1 = ''
let s2 = ''
let s3 = ''



// construct a server socket
let httpServer = http.createServer(processServerRequest);
httpServer.listen(8080);

function processServerRequest(request, response){

    res = response;

    // store host from request
    let host = "http://" + request.headers["host"];

    // begin write to response with type html
    response.writeHead(200, {"Content-type": "text/html"});

    // construct URL object using host
    let url = new URL(request.url, host);
    console.log(`URL is ${url.href}, search string is ${url.search}`);

    // extract username from form
    username = url.searchParams.get("aUsername");
    password = url.searchParams.get("aPassword");
    firstname = url.searchParams.get("aFirstName");
    lastname = url.searchParams.get("aLastName");
    occupation = url.searchParams.get("aOccupation");
    bio = url.searchParams.get("aShortBiography");

    s1 = url.searchParams.get("s1");
    s2 = url.searchParams.get("s2");
    s3 = url.searchParams.get("s3");

    console.log(`Username is ${username}`);

    // write query to insert new row in Advice Giver table
    username = `"${username}"`
    password = `"${password}"`
    firstname = `"${firstname}"`
    lastname = `"${lastname}"`
    occupation = `"${occupation}"`
    bio = `"${bio}"`
    sqlquery = `insert into AdviceGiver(aUsername, aPassword, aFirstName, aLastName, aOccupation, aShortBiography) VALUES ( ${username}, ${password}, ${firstname}, ${lastname}, ${occupation}, ${bio})`
    
    response.write(`<p>Thanks for creating a profile! Here is the information you entered:</p>`);

    let responseText = `<p><strong>Name:</strong> ${firstname} ${lastname}</p>
    <p><strong>Occupation: </strong> ${occupation}</p>
    <p><strong>Short bio: </strong> ${bio}</p>
    <br><br>
    <p>Home Page: *link here for advice-giver index?*</p>`

    

    response.write(responseText);
        
    
    
    startDatabase();
}

function startDatabase(){

    // create string for connecting to a database
    let connectionString = {
        host: "107.180.1.16",
        user: "fall2021group3",
        password: "group3fall2021",
        database: "cis440fall2021group3"
    };

    console.log(`Connection string has been created with host: ${connectionString.host},
    database: ${connectionString.database}, and user: ${connectionString.user}`);

    // create connection with MySQL module using connection string
    let conn = mysql.createConnection(connectionString);
    console.log(`Connecting to database...`);

    // connect to database
    conn.connect(
        function(err){
            if (err) throw err;
            // if no error, pass query to connection method
            conn.query(sqlquery, function (err, result) {
                if (err) throw err;
                console.log("New record inserted");
                conn.end();
            })})

           

        }

    

    
