require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express();


var pages = require('./api/pages')
var api_trips = require('./api/api_trips')
var api_other = require('./api/api_other')


const port = 3000;

const { exec } = require('child_process')



/////////////////////////////////////////////////////////
//  set database ?

const mysql = require('mysql2');
const connection = mysql.createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
});
var database = require('./api/database')
database.set_connection(connection);


api_trips.set_database(database);


/////////////////////////////////////////////////////////////////


app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');




/////////////////////////////////////////////////////////////////


trip_state = ["Await", "Complete", "Deleted"]
payment_state = ["Unpaid", "Paid"]


/////////////////////////////////////////////////////////////////
//  pages

// trip page
app.get('/', pages.alltrips);
app.get('/invoice', pages.invoice)
app.get('/trip', pages.trip_page)
app.get('/payment', pages.payment_page)

// other page

app.get('/l', pages.letters)
app.get('/math', pages.math)

/////////////////////////////////////////////////////////////////
//  trip api
app.get('/gettrips', api_trips.get_all_trips)

app.get('/price', api_trips.get_price)
app.get('/finish', api_trips.update_statu)


app.get('/book', api_trips.book_trip)
app.get('/edit', api_trips.edit_trip)

app.get('/gettrip', api_trips.get_trip)
app.get('/getsummary', api_trips.get_summary)

/////////////////////////////////////////////////////////////////
//  other api

app.get('/getip', api_other.get_ip)
app.get('/letter', api_other.letter)

/////////////////////////////////////////////////////////////////





const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
});

