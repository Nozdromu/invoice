require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
var session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const nodemailer = require("nodemailer");
// const { readFileSync } = require('fs');

// const { Client } = require('ssh2');

// const conn = new Client();

// let mailTransporter =
//     nodemailer.createTransport(
//         {
//             service: 'gmail',
//             auth: {
//                 user: 'xyz@gmail.com',
//                 pass: '*************'
//             }
//         }
//     );


const pages = require('./api/pages')
const api_trips = require('./api/api_trips')
const api_other = require('./api/api_other')
const database = require('./api/database')

///////////////////////////////////////////////////////////////////////////
var option = {
    host: process.env.env=='home'?process.env.mysql_host:process.env.mysql_host_outside,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
    port: 3306
}
const connection = mysql.createPool(option);
const sessionStore = new MySQLStore({}, connection);
const Database = database(connection);

////////////////////////////////////////////////////////////////////////////////
//  ssh

if (process.env.env == 'outside') {
    const { spawn } = require('node:child_process');
    async function cmd() {

        const bat = spawn('powershell.exe', [process.env.ssh]);
        bat.stdout.on('data', (data) => {
            console.log(data.toString());
            Database.trip_api.getalltrips(() => {
                console.log('data loaded')
            })
        });

        bat.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
        return bat
    }
    let ssh = cmd();
} else {
    Database.trip_api.getalltrips(() => {
        console.log('data loaded')
    })
}



///////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////

const app = express();
app.use(session({
    secret: 'trip',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const Pages = pages();
const Api_other = api_other()
const Api_trip = api_trips(Database);

const port = 3000;
/////////////////////////////////////////////////////////////////


trip_state = ["Await", "Complete", "Deleted"]
payment_state = ["Unpaid", "Paid"]


/////////////////////////////////////////////////////////////////
//  pages

// trip page
app.get('/', Pages.alltrips);
app.get('/invoice', Pages.invoice)
app.get('/trip', Pages.trip_page)
app.get('/payment', Pages.payment_page)

// other page

app.get('/l', Pages.letters)
app.get('/math', Pages.math)
app.get('/cal', Pages.cal)
app.get('/test', Pages.test)

/////////////////////////////////////////////////////////////////
//  trip api

// app.get('/reload', Api_trip.reload)

app.get('/gettrips', Api_trip.get_all_trips)

app.get('/price', Api_trip.get_price)
app.get('/finish', Api_trip.change_trip_state)


app.get('/book', Api_trip.book_trip)
app.get('/edit', Api_trip.edit_trip)

app.get('/gettrip', Api_trip.get_trip)
app.get('/getsummary', Api_trip.get_summary)

/////////////////////////////////////////////////////////////////
//  other api

app.get('/getip', Api_other.get_ip)
app.get('/letter', Api_other.letter)

/////////////////////////////////////////////////////////////////




const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
});

