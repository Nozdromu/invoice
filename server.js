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



var unfinishtrip = []

Object.keys()
























app.get('/', (req, res) => {
    console.log(req);
    var inv = req.query.invoice;
    res.render('index', data[inv]);
});
app.get('/reload', (req, res) => {
    data = JSON.parse(fs.readFileSync('trips.json', 'utf8'));
    res.send(data);
})

app.get('/home', (req, res) => {
    res.sendFile('views/tripEdit.html', { root: __dirname })
})

app.get('/book', (req, res) => {
    var tripid = Date.now();
    console.log(req.query);
    var newtrip = req.query;
    var datetime = new Date(newtrip.datetime);
    newtrip.pickuptime = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
    newtrip.date = datetime.toLocaleDateString(['en-US'], { dateStyle: 'short' })
    newtrip.travletime = datetime.valueOf();
    newtrip.invoice = tripid;
    newtrip.payment = 'none'
    newtrip.transID = 'none'
    newtrip.nickname = newtrip.name
    newtrip.state = 1
    data[newtrip.invoice] = newtrip;
    console.log(data);
    fs.writeFile("trips.json", JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.send({ statu: 'done', trip: newtrip, summary: makesummary(newtrip) })
})

app.get('/price', (req, res) => {
    var data = req.query;
    console.log(data);
    var origin = '6835 SE Cougar Mountain Way, Bellevue, WA 98006, USA';
    var pickup = data.start;
    var destination = data.end
    if (data.type === "1") {
        pickup = data.end
        destination = data.start
    }
    map.directions({ params: { key: process.env.google_map_api_key, destination: destination, origin: origin, waypoints: [pickup] } }).then((mapres) => {
        console.log(mapres)
        var G_pickup = {
            address: mapres.data.routes[0].legs[0].end_address,
            lat: mapres.data.routes[0].legs[1].end_location.lat,
            lng: mapres.data.routes[0].legs[1].end_location.lng,
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344)
        }
        var G_destination = {
            address: mapres.data.routes[0].legs[1].end_address,
            lat: mapres.data.routes[0].legs[1].end_location.lat,
            lng: mapres.data.routes[0].legs[1].end_location.lng,
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344)
        }
        var map_info = {
            address1: G_pickup,
            address2: G_destination,
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344),
            esttime: mapres.data.routes[0].legs[1].duration.text
        }
        if (data.type === "1") {
            map_info.address1 = G_destination;
            map_info.address2 = G_pickup
        }
        res.send(map_info)

    }).catch((err) => {
        console.log(err)
        res.send(err)
    })


})


app.get('/trips', (req, res) => {
    res.render('trips');
})

app.get('/gettrips', (req, res) => {
    unfinishtrip = []
    Object.entries(data).forEach(element => {
        unfinishtrip.push(element[1]);
    });
    res.send({ trips: unfinishtrip })
})

app.get('/finish', (req, res) => {
    trip = req.query.tripid;
    data[trip].state = 0;
    if (data[trip].state === 0) {
        fs.writeFile("trips.json", JSON.stringify(data), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        res.send({ state: 'done' })
    } else {
        res.send({ state: 'none' })
    }
})
app.get('/gettrip', (req, res) => {
    console.log(req.query.trip);
    res.send({ statu: 'done', trip: data[req.query.trip], summary: makesummary(data[req.query.trip]) })
})

app.get('/edittrip', (req, res) => {
    res.sendFile('views/tripEdit.html', { root: __dirname })
})
app.get('/edit', (req, res) => {
    console.log(req.query)
    var newtrip = req.query;
    var datetime = new Date(newtrip.datetime);
    newtrip.pickuptime = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
    newtrip.date = datetime.toLocaleDateString(['en-US'], { dateStyle: 'short' })
    newtrip.travletime = datetime.valueOf();
    data[newtrip.invoice] = newtrip
    console.log(newtrip)
    fs.writeFile("trips.json", JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.send({ statu: 'done', trip: newtrip, summary: makesummary(newtrip) })
})

app.get('/letter', (req, res) => {
    var l = req.query.letter;
    console.log(req.query)
    res.sendFile('public/letter/' + l + '.pdf', { root: __dirname })
})
app.get('/l', (req, res) => {
    res.render('letter');
})
app.get('/math', (req, res) => {
    res.render('math')
})
app.get('/getsummary', (req, res) => {
    var tripid = req.query.invoice;
    var tripInfo = data[tripid];
    console.log(req.query)
    var summary = makesummary(tripInfo);
    res.send(summary);
})

var makesummary = (trip) => {
    var car = {
        5: " 灰色 Toyota Camry ",
        10: " 黑色 Toyota Sienna "
    }
    var scripts = "";
    var script2 = " ,一般会提前5分钟左右抵达上车地点"
    var script3 = " ,抵达后请通知我,在完成所有程序后告知我你们所在出口 (arrval 门号),之后预计5分钟内我就可以到达 "
    var d = new Date(trip.datetime);
    if (trip.triptype == '1') {
        scripts = '与' + trip.nickname + '的预约 ' + d.toLocaleString(['zh-CN'], { hourCycle: "h11", dateStyle: "full", timeStyle: "short" }) + ' 从 ' + trip.address + ' 出发. 届时我会开一辆 ' + car[trip.type] + script2 + ' ,费用总计$' + trip.total;
    } else {
        scripts = '与' + trip.nickname + '的预约 接机 于' + d.toLocaleString(['zh-CN'], { hourCycle: "h11", dateStyle: "full", timeStyle: "short" }) + '抵达的航班 ' + trip.flight + ' 送往 ' + trip.address + '. 届时我会开一辆 ' + car[trip.type] + script3 + ' ,费用总计$' + trip.total;
    }
    return scripts
}

const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
    console.log(data)
});