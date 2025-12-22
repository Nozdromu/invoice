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


// var option = {
//     host: process.env.INV === 'dev' ? process.env.mysql_host_dev : process.env.mysql_host,
//     user: process.env.INV === 'dev' ? process.env.mysql_user_dev : process.env.mysql_user,
//     password: process.env.INV === 'dev' ? process.env.mysql_password_dev : process.env.mysql_password,
//     database: process.env.INV === 'dev' ? process.env.mysql_database_dev : process.env.mysql_database,
//     port: 3306
// }

var option = {
    host: process.env.mysql_host,
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


Database.load()

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
const api_paypal = require('./api/api_paypal');
app.use(bodyParser.json())
app.set('trust proxy', 1)
app.use(session({
    secret: 'trip',
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        //sameSite: 'none'
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
var unneed = [
    '/api_paypal_evn',
    '/pages_login',
    '/pages_paypal',
    '/pages_invoice',
    '/api_paypal_orders',
    '/api_paypal_capture',
    '/api_trips_get_trip',
    '/api_users_login',
    '/pages_payment_page',
    '/pages_pricing',
    '/api_trips_get_price']
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


/////////////////////////////////////////////////////////////////
//  pages

Object.values(controller).forEach(item => {
    app[item.type](item.path, item.callback);
    console.log('api: ' + item.type + " path: " + item.path)
})



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

/////////////////////////////////////////////////////////////
//  paypal






app.listen(port, function () {
    console.log('listening to port: ' + port)
})

