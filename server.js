require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express();


var pages = require('./api/pages')
var api_trips = require('./api/api_trips')
var api_other = require('./api/api_other')


const port = 3000;



/////////////////////////////////////////////////////////
//  set database

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


//////////////////////////////////////////////////////////


app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');







trip_state = ["Await", "Complete", "Deleted"]
payment_state = ["Unpaid", "Paid"]


/////////////////////////////////////////////////////////////////
//  pages

// trip page
app.get('/', (req, res) => pages.alltrips(req, res));
app.get('/invoice', (req, res) => pages.invoice(req, res))
app.get('/trip', (req, res) => pages.trip_page(req, res))

// other page
app.get('/letter', (req, res) => api_other.letter(req, res))
app.get('/l', (req, res) => pages.letters(req, res))
app.get('/math', (req, res) => pages.math(req, res))


/////////////////////////////////////////////////////////////////
//  trip api
app.get('/gettrips', (req, res) => api_trips.get_all_trips(req, res))

app.get('/price', (req, res) => api_trips.get_price(req, res))
app.get('/finish', (req, res) => api_trips.update_statu(req, res))


app.get('/book', (req, res) => api_trips.book_trip(req, res))
app.get('/edit', (req, res) => api_trips.edit_trip(req, res))

app.get('/gettrip', (req, res) => api_trips.get_trip(req, res))
app.get('/getsummary', (req, res) => api_trips.get_summary(req, res))


/////////////////////////////////////////////////////////////////





const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
});

