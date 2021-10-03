let http = require("http");
let mysql = require("mysql");

let output = ``;
let con = ``;

let httpServer = http.createServer(processServerRequest);
httpServer.listen(8080);

initializeDB();

function initializeDB(){

    let connectionString = {
        host: "107.180.1.16",
        user: "fall2021group3",
        password: "group3fall2021",
        database: "cis440fall2021group3"
    }

    console.log(`Connection string is ${connectionString}`);

    con = mysql.createConnection(connectionString);

    console.log(`Connecting to the database...`)

    con.connect(
        function(err){
            if (err) throw err;
            console.log(`Connected to database.`);
        }
    )

    let sqlquery = "select aFirstName, aLastName from AdviceGiver";
    con.query(sqlquery, processResult);

    con.end()
}

function processServerRequest(request, response){

    console.log(`Request URL is ${request.url}`)

    response.writeHead(200, {"Content-type": "text/html"});

    response.write(output);

    response.end();
}

function processResult(err, result){

    if (err){
        console.log(`Error occurred: ${err}`);
        throw err;
    }

    console.log(`Result contains ${result.length} rows.`)

    result.forEach(printUser);
}

function printUser(record){

    output += `<p>${record.aFirstName} ${record.aLastName}</p>`;
}

function buildHtml(req) {
    var header = '';
    var body = '';
  
    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + output + '</body></html>';
  };