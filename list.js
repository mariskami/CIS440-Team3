let http = require("http");
let mysql = require("mysql");
let events = require("events");
let jsdom = require("jsdom");
const open = require('open');
//let { JSDOM } = jsdom;
var fs = require('fs');
//const { document } = (new JSDOM(`...`)).window;

/*let dom = new JSDOM()
let html = fs.readFileSync("helper_list.html");
let page = new JSDOM(html)
module.exports = page*/

//let page = require("page");

let httpServer = http.createServer(processServerRequest);
httpServer.listen(8080);

let eventEmitter = new events.EventEmitter();
eventEmitter.on("output", outputHandler)

let output = ``
let res = ``


function processServerRequest(request, response){

    res = response;

    // store host from request
    let host = "http://" + request.headers["host"];

    // begin write to response with type html
    response.writeHead(200, {"Content-type": "text/html"});

    // construct URL object using host
    let url = new URL(request.url, host);
    console.log(`URL is ${url.href}, search string is ${url.search}`);

    startDatabase();
}

function startDatabase(){

let connectionString = {
    host: "107.180.1.16",
    user: "fall2021group3",
    password: "group3fall2021",
    database: "cis440fall2021group3"
}

console.log(`Connection string is ${connectionString}`);

let con = mysql.createConnection(connectionString);

console.log(`Connecting to the database...`)

con.connect(
    function(err){
        if (err) throw err;
        console.log(`Connected to database.`);
    }
)

let sqlquery = `SELECT * from AdviceGiver where aIsActive = 1`
con.query(sqlquery, processResult);

    con.end()
}

function processResult(err, result){

    if (err){
        console.log(`Error occurred: ${err}`);
        throw err;
    }

    console.log(`${result.length} number of rows returned.`)   
    result.forEach(printUser)
    eventEmitter.emit("output");
   
}

function printUser(record){

    output += `<head>
    <style>
    body{
        font-family:Arial, Helvetica, sans-serif;
        max-width:500px;
        background-color:white;
        padding:10px;
    }
    h3{
        border: none;
        padding: 10px 150px;
        text-align: center;
        background-color: #009688;
        border-radius: 10px;
        color: white;
    }
    #job{
        display: inline;
        background-color: darkgoldenrod;
        border: none;
        color: white;
        padding: 2px 10px;
        border-radius: 5px;
        font-style: italic;
    }
    #bio{
        font-style: italic;
        font-size: 20px;
    }
    #s1{
        display: inline;
        background-color: green;
        border: none;
        color: white;
        padding: 2px 10px;
        border-radius: 5px;
        font-style: italic;
    }
    #s2{
        display: inline;
        background-color: blue;
        border: none;
        color: white;
        padding: 2px 10px;
        border-radius: 5px;
        font-style: italic;
    }
    #s3{
        display: inline;
        background-color: black;
        border: none;
        color: white;
        padding: 2px 10px;
        border-radius: 5px;
        font-style: italic;
    }
    button {
        box-shadow:inset 0px 1px 0px 0px #ffffff;
        background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
        background-color:#ffffff;
        border-radius:6px;
        border:1px solid #dcdcdc;
        display:inline-block;
        cursor:pointer;
        color:black;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:4px 18px;
        text-decoration:none;
        text-shadow:0px 1px 0px #ffffff;
    }
    button:hover {
        background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
        background-color:#f6f6f6;
    }
    button:active {
        position:relative;
        top:1px;
    }
  
    </style></head>
    <h3>${record.aFirstName}</h3>
    
    <p id="job">${record.aOccupation}</p><br>
    <p id="bio">${record.aShortBiography}</p>
    
    <p id="s1">${record.aSpecialty1}</p> <p id="s2">${record.aSpecialty2}</p> <p id="s3">${record.aSpecialty3}</p><br><br>
    <a href="chat.html">Chat With ${record.aFirstName} Now!</a>`
    
}

function outputHandler(){

    console.log(`Writing output...`)
    //res.write(output)

    fs.truncate('helper_list.html', 0, function(){console.log('done')})
    fs.writeFile('helper_list', output, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      open('hw.html')

    

    



    
    

    



    
    //res.write(dom.serialize());
    //res.end();
//console.log(dom.window.document.getElementById("main").textContent);

    



    }

