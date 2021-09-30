const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const occupation = req.body.occupation;
    const bio = req.body.bio;
    const spec1 = req.body.spec1;
    const spec2 = req.body.spec2;
    const spec3 = req.body.spec3;

    // This will work if we are inserting all of
    // const { username, password, passwordConfirm, firstName, lastName, occupation, bio,
    // spec1, spec2, spec3 } = req.body;

    if (password !== passwordConfirm) {
        console.log("Passwords don't match");
        return res.render('register', {
            message: 'Passwords do not match'
        });
    }

    db.query('INSERT INTO AdviceGiver SET ?', {aUsername: username, aPassword: password,
        aFirstName: firstName, aLastName: lastName, aOccupation: occupation,
        aShortBiography: bio}, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results)
                return res.render('register', {
                    message: 'User registered'
                });
            }
        })
}

exports.login = (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    // This will work if we are inserting all of
    // const { username, password, passwordConfirm, firstName, lastName, occupation, bio,
    // spec1, spec2, spec3 } = req.body;

    var getIDQuery = `SELECT aAdviceGiverID from AdviceGiver where aUsername = "${username}" and aPassword = "${password}"`
    
    db.query(getIDQuery, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results[0])

            if (results[0] == undefined) {
                return res.render('login', {
                    message: 'Incorrect Username and/or Password'
                });
            } else {
                return res.render('login', {
                    message: 'Logged In'
                });
            }
        }
    })
}
