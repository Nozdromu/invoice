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


// var Imap = require('imap')
// var inspect = require('util').inspect;

// var imap = new Imap({
//     user: 'transservice2024@gmail.com',
//     password: process.env.gmail_app_password,
//     host: 'imap.gmail.com',
//     port: 993,
//     tls: true,
//     tlsOptions: { rejectUnauthorized: false }
// });

// function openInbox(cb) {
//     imap.openBox('INBOX', true, cb);
// }

// imap.once('ready', function () {

//openInbox(function (err, box) {
//if (err) throw err;
// var f = imap.seq.fetch('1:3', {
//     bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
//     struct: true
// });
// f.on('message', function (msg, seqno) {
//     console.log('Message #%d', seqno);
//     var prefix = '(#' + seqno + ') ';
//     msg.on('body', function (stream, info) {
//         var buffer = '';
//         stream.on('data', function (chunk) {
//             buffer += chunk.toString('utf8');
//         });
//         stream.once('end', function () {
//             console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
//         });
//     });
//     msg.once('attributes', function (attrs) {
//         console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
//     });
//     msg.once('end', function () {
//         console.log(prefix + 'Finished');
//     });
// });
// f.once('error', function (err) {
//     console.log('Fetch error: ' + err);
// });
// f.once('end', function () {
//     console.log('Done fetching all messages!');
//     imap.end();
// });
//});
//     imap.on('mail',(err)=>{

//     })
// });

// imap.once('error', function (err) {
//     console.log(err);
// });

// imap.once('end', function () {
//     console.log('Connection ended');
// });

// imap.connect();







///////////////////////////////////////////////////////////////////////////


var option = {
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
}
const connection = mysql.createPool(option);
const sessionStore = new MySQLStore({}, connection);

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
const Database = database(connection);
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

