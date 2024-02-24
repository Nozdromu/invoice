require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express();
const { Client } = require('@googlemaps/google-maps-services-js')
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('trips.json', 'utf8'));
app.use(express.static(__dirname + '/public'));

const port = 3000;
const map = new Client({});
// Set EJS as templating engine 
app.set('views', './views');
app.set('view engine', 'ejs');
console.log(process.env.google_map_api_key)

app.get('/', (req, res) => {
    console.log(req);
    var inv = req.query.invoice;
    res.render('index', data[inv]);
});
app.get('/reload', (req, res) => {
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.send(data);
})
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/book', (req, res) => {
    var tripid = Date.now();
    console.log(req.query);
    var newtrip = req.query;
    var datetime = new Date(newtrip.datetime);
    newtrip.pickuptime = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
    newtrip.date = datetime.getMonth() + '/' + datetime.getDate() + '/' + datetime.getFullYear()
    newtrip.invoice = tripid;
    newtrip.payment = 'none'
    newtrip.transID = 'none'
    newtrip.nickname = newtrip.name
    data[newtrip.invoice] = newtrip;
    console.log(data);
    fs.writeFile("trips.json", JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.send('done')
})

app.get('/price', (req, res) => {
    var data = req.query;
    console.log(data);
    map.directions({ params: { key: process.env.google_map_api_key, destination: data.end, origin: '6835 SE Cougar Mountain Way, Bellevue, WA 98006, USA', waypoints: [data.start] } }).then((mapres) => {
        console.log(mapres)
        var map_info = {
            address1: {
                address: mapres.data.routes[0].legs[0].end_address,
                lat: mapres.data.routes[0].legs[0].end_location.lat,
                lng: mapres.data.routes[0].legs[0].end_location.lng,
                pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
                dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344)
            },
            address2: {
                address: mapres.data.routes[0].legs[1].end_address,
                lat: mapres.data.routes[0].legs[1].end_location.lat,
                lng: mapres.data.routes[0].legs[1].end_location.lng,
                pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
                dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344)
            },
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344),
            esttime: mapres.data.routes[0].legs[1].duration.text
        }
        res.send(map_info)

    }).catch((err) => {
        console.log(err)
        res.send(err)
    })


})

var unfinishtrip=[]
app.get('/trips', (req, res) => {
    var now=Date.now();
    var tripdatetime=0;
    data.forEach(element => {
        tripdatetime=new date(element.datetime);
        if(tripdatetime>now)
            unfinishtrip.push(element);
    });
    res.render('trips', {trips:unfinishtrip});
})

const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
    console.log(data)
});