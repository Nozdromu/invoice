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


const { readFileSync } = require('fs');

const { Client } = require('ssh2');

// const conn = new Client();
// conn.on('ready', () => {
//   console.log('Client :: ready');
//   conn.shell((err, stream) => {
//     if (err) throw err;
//     stream.on('close', () => {
//       console.log('Stream :: close');
//       conn.end();
//     }).on('data', (data) => {
//       console.log('OUTPUT: ' + data);
//     });
//     //stream.end('ls -l\nexit\n');
//   });
// }).connect({
//   host: '192.168.68.132',
//   port: 9510,
//   username: 'lulu0510',
//   privateKey: readFileSync('./cert/id_ed25519')
// });

// const conn = new Client();
// conn.on('ready', () => {
//     console.log('Client :: ready');
//     conn.forwardOut('127.0.0.1', 3306, (err) => {
//         if (err) throw err;
//         console.log('Listening for connections on server on port 3307!');
//         Database.trip_api.getalltrips(()=>{
//             console.log('data loaded')
//         })
//     });
// }).on('tcp connection', (info, accept, reject) => {
//     console.log('TCP :: INCOMING CONNECTION:');
//     console.dir(info);
//     accept().on('close', () => {
//         console.log('TCP :: CLOSED');
//     }).on('data', (data) => {
//         console.log('TCP :: DATA: ' + data);
//     }).end([
//         'HTTP/1.1 404 Not Found',
//         'Date: Thu, 15 Nov 2012 02:07:58 GMT',
//         'Server: ForwardedConnection',
//         'Content-Length: 0',
//         'Connection: close',
//         '',
//         ''
//     ].join('\r\n'));
// }).connect({
//     host: 'lulu0510.ddns.net',
//     port: 9510,
//     username: 'lulu0510',
//     privateKey: readFileSync('./cert/id_ed25519')
// });

var exec = require('child_process');
// exec.execFileSync('ssh.bat', (error, out, err) => {
//     if (error) {
//         throw error
//         return
//     } else {
//         console.log(out);
//         console.log(err)
//         Database.trip_api.getalltrips(() => {
//             console.log('data loaded')
//         })
//     }

// })
// const { spawn } = require('node:child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process close all stdio with code ${code}`);
// });

// ls.on('exit', (code) => {
//   console.log(`child process exited with code ${code}`);
// }); 
// exec.execSync('ssh -L 3306:127.0.0.1:3306 lulu0510.ddns.net -p 9510 -l lulu0510', { 'shell': 'powershell.exe' }, (err, out, std) => {
//     if (err) {
//         throw err
//     } else {
//         console.log(out);
//         console.log(std);
//         Database.trip_api.getalltrips(() => {
//             console.log('data loaded')
//         })
//     }
// })

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


var option = {
    host: process.env.env=='home'?process.env.mysql_host:process.env.mysql_host_outside,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
    port: 3306
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

