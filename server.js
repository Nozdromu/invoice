require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
var session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const nodemailer = require("nodemailer");
const url = require('url');


const database = require('./api/database')
const Controllers = require('./api/controller')
///////////////////////////////////////////////////////////////////////////
//  check INV

var os = require('os');
const path = require('path');

var networkInterfaces = os.networkInterfaces();

var ipaddress = (Object.values(networkInterfaces))[0]

var get_ipv4 = (Network) => {
    var ip = ''
    Network.forEach(element => {
        if (element.family === 'IPv4') {
            //console.log('eth id: ' + element.address)
            ip = element.address
        }

    });
    return ip
}

ipaddress = get_ipv4(ipaddress)
//console.log(ipaddress)
var env = ipaddress.substring(0, 10) === '192.168.68' || ipaddress === '127.0.0.1'
//console.log(env)


//////////////////////////////////////////////////////////////////////////
//  database setup

var option = {
    host: env ? process.env.mysql_host : process.env.mysql_host_outside,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
    port: 3306
}

const connection = mysql.createPool(option);
const sessionStore = new MySQLStore({}, connection);
const Database = database(connection);
const controller = Controllers(Database);
sessionStore.onReady().then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
}).catch(error => {
    // Something went wrong.
    console.error(error);
});
//Database.query()
////////////////////////////////////////////////////////////////////////////////
//  ssh

if (!env) {
    const { spawn } = require('node:child_process');
    async function cmd() {

        const bat = spawn('powershell.exe', [process.env.ssh]);
        bat.stdout.on('data', (data) => {
            //console.log(data.toString());
            Database.load()
        });

        bat.stderr.on('data', (data) => {
            //console.error(data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
        return bat
    }
    let ssh = cmd();
} else {
    Database.load()
}



///////////////////////////////////////////////////////////////////////////


var users = {
    yilei1990: {
        username: 'yilei1990',
        password: '123456'
    }
}


/////////////////////////////////////////////////////////////////

const app = express();
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.set('trust proxy', 1)
app.use(session({
    secret: 'trip',
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
    }
}))

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var homepage = '/pages_alltrips'
//controller['/'] = controller[homepage]
var checklogin = function (req, res, next) {
    // if (req.path === '/')
    //     res.redirect(homepage)
    if (controller[req.path])
        if (controller[req.path].login_require || req.session.user) {
            next();
        } else {
            res.redirect('/pages_login')
        }
    else
        res.send('404')
}
var old_path = (req, res, next) => {
    if (old[req.path]) {
        res.redirect(url.format({
            pathname: old[req.path],
            query: req.query
        }));
    } else {
        next()
    }
}
app.use(old_path)
app.use(checklogin)

// const Pages = pages();
// const Api_other = api_other()
// const Api_trip = api_trips(Database);

const port = 3000;
/////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////

trip_state = ["Await", "Complete", "Deleted"]
payment_state = ["Unpaid", "Paid"]
var unneed = ['/pages_login', '/pages_invoice', '/api_trips_get_trip', '/api_users_login', '/pages_payment_page', '/pages_pricing', '/api_trips_get_price']
unneed.forEach(e => {
    controller[e].login_require = true
})
var old = {
    '/loginpage': '/pages_login',
    '/invoice': '/pages_invoice',
    '/geitrip': '/api_trips_get_trip?trip=',
    '/login': '/api_users_login',
    '/': '/pages_alltrips',
    '/payment': '/pages_payment_page'
}
// var allPath = {
//     '/loginpage': {
//         allow: true,
//         path: '/loginpage',
//         callback: Pages.login
//     },
//     '/invoice': {
//         allow: true,
//         path: '/invoice',
//         callback: Pages.invoice
//     },
//     '/geitrip': {
//         allow: true,
//         path: '/geitrip',
//         callback: Pages.get_trip
//     },
//     '/login': {
//         allow: true,
//         path: '/login',
//         callback: Pages.login
//     },
//     '/': {
//         allow: false,
//         path: '/',
//         callback: Pages.alltrips
//     },
//     '/gettrips': {
//         allow: false,
//         path: '/gettrips',
//         callback: Api_trip.get_all_trips
//     }
// }

/////////////////////////////////////////////////////////////////
//  pages

Object.values(controller).forEach(item => {
    app[item.type](item.path, item.callback);
    console.log('api: ' + item.type + " path: " + item.path)
})

// trip page
// app.get('/', Pages.alltrips);
// app.get('/invoice', Pages.invoice)
// app.get('/trip', Pages.trip_page)
// app.get('/payment', Pages.payment_page)

// other page

// app.get('/l', Pages.letters)
// app.get('/math', Pages.math)
// app.get('/cal', Pages.cal)
// app.get('/test', Pages.test)

/////////////////////////////////////////////////////////////////
//  trip api

// app.get('/reload', Api_trip.reload)

// app.get('/gettrips', Api_trip.get_all_trips)

// app.get('/price', Api_trip.get_price)
// app.get('/finish', Api_trip.change_trip_state)


// app.get('/book', Api_trip.book_trip)
// app.get('/edit', Api_trip.edit_trip)

// app.get('/gettrip', Api_trip.get_trip)
// app.get('/getsummary', Api_trip.get_summary)

/////////////////////////////////////////////////////////////////
//  other api

// app.get('/getip', Api_other.get_ip)
// app.get('/letter', Api_other.letter)

/////////////////////////////////////////////////////////////////

// app.get('/loginpage', (req, res) => {
//     console.log(req)
//     res.render('login')
// })

app.get('/login', (req, res) => {
    //console.log(req.session)
    if (users[req.query.username] && users[req.query.username].password === req.query.password) {
        req.session.cookie.user = users[req.query.username]
        req.session.user = users[req.query.username]
        res.send('done')
    } else {
        res.send('faild')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('logout')
    })
})


// const { google } = require('googleapis')
// const { authenticate } = require('@google-cloud/local-auth');

// gmail = google.gmail({ version: 'v1' })
// async function runSample() {
//     const auth = await authenticate({
//         keyfilePath: path.join('./OAuth/oauth.json'),
//         scopes: [
//             'https://mail.google.com/',
//             'https://www.googleapis.com/auth/gmail.metadata',
//             'https://www.googleapis.com/auth/gmail.modify',
//             'https://www.googleapis.com/auth/gmail.readonly',
//         ],
//     });
//     google.options({ auth });

//     const res = await gmail.users.watch({
//         userId: 'me',
//         requestBody: {
//             // Replace with `projects/${PROJECT_ID}/topics/${TOPIC_NAME}`
//             topicName: 'projects/festive-post-366509/topics/gmail',
//         },
//     });
//     console.log(res.data);
//     return res.data;
// }
// runSample().catch(console.error).then(() => {
//     app.listen(port, function () {
//         console.log('listening to port: ' + port)
//     })
// });
// var MailListener = require("mail-listener2");

// var mailListener = new MailListener({
//   username: "transservice2024@gmail.com",
//   password: "",
//   host: "imap.gmail.com",
//   port: 993, // imap port
//   tls: true,
//   connTimeout: 10000, // Default by node-imap
//   authTimeout: 5000, // Default by node-imap,
//   //debug: console.log, // Or your custom function with only one incoming argument. Default: null
//   tlsOptions: { rejectUnauthorized: false },
//   mailbox: "INBOX", // mailbox to monitor
//   searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
//   markSeen: true, // all fetched email willbe marked as seen and not fetched next time
//   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
//   mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
//   attachments: true, // download attachments as they are encountered to the project directory
//   attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
// });

// mailListener.start(); // start listening

// // stop listening
// //mailListener.stop();

// mailListener.on("server:connected", function(){
//   console.log("imapConnected");
// });

// mailListener.on("server:disconnected", function(){
//   console.log("imapDisconnected");
// });

// mailListener.on("error", function(err){
//   console.log(err);
// });

// mailListener.on("mail", function(mail, seqno, attributes){
//   // do something with mail object including attachments
//   console.log("emailParsed", mail);
//   // mail processing code goes here
// });
// //mailListener.on()

// mailListener.on("attachment", function(attachment){
//   console.log(attachment.path);
// });

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
//mailListener.imap.move(:msguids, :mailboxes, function(){})

app.listen(port, function () {
    console.log('listening to port: ' + port)
})

