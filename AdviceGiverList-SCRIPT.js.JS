let http = require("http");
let mysql = require("mysql");
let events = require("events");

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

let sqlquery = `SELECT * from AdviceGiver RIGHT JOIN AdviceGiverActiveStatus ON aAdviceGiverID = hAdviceGiverID WHERE hIsActive = 1`
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

    output += `<style>
    body{
        font-family:Arial, Helvetica, sans-serif;
        max-width:500px;
        background-color:#caffbf;
        padding:10px;
    }
    h3{
        border: solid 1px gray;
        padding: 15px;
        text-align: center;
        background-color: #fdffb6;
    }
    #job{
        background-color: bisque;
        text-decoration: underline;
    }
  
    </style>
    <h3>${record.aFirstName}</h3>
    
    <em id="job">${record.aOccupation}</em><br>
    <p>${record.aShortBiography}</p>
    <p><strong>Specialties:</strong><br>
    ${record.aSpecialty1}, ${record.aSpecialty2}, ${record.aSpecialty3}<br>
    <button onclick="*Function here for connecting to CHAT IU / SERVER*;" id="bttn">Chat with ${record.aFirstName} Now</button>`
}

function outputHandler(){

    console.log(`Writing output...`)

    // write output constructed to response and end
    res.write(output);
    res.end();}