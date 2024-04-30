require('dotenv').config();
const { default: axios } = require('axios');
const https = require("https");
const express = require('express');
const mysql = require('mysql2');
const utf8 = require('utf8');
var os = require('os');
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

var networkInterfaces = os.networkInterfaces();

console.log(networkInterfaces);

const connection = mysql.createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
});
const promiseconnection = connection.promise();
// connection.query('select*from trip_table', (err, results, fields) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results)
//     }

// })

async function addrecord(data) {
    const [rows, fields,err] = await promiseconnection.query("call new_book(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        data.invoice,
        data.billname,
        utf8.encode(data.nickname),
        data.travel_time,
        data.datetime,
        data.date,
        data.pickup_time,
        data.trip_type,
        data.flight_num,
        data.vehicle_type,
        data.departure_address,
        data.destination_address,
        data.distance,
        data.pickup_distance,
        data.distance_price,
        data.pickup_distance_price,
        data.pickup_distance_free,
        data.total,
        data.payment_type,
        data.transID,
        data.state,
        ""
    ])
    return rows
}

Object.keys(data).forEach((key) => {
    let a = addrecord(data[key]);
})

var unfinishtrip = []
var juli = {
    week: {
        4: {
            billname: 'julia 补习',
            pick: "6:25 PM",
            back: "7:55 PM",
            address1: "5997 153rd Ave SE, Bellevue, WA 98006",
            address2: "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027",
        },
        6: {
            billname: 'julia 补习',
            pick: "10:20 AM",
            back: "1:10 PM",
            address1: "5997 153rd Ave SE, Bellevue, WA 98006",
            address2: "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027",
        }
    }
}

var book = (newtrip, isSave) => {
    var tripid = Date.now();
    var rt = data[tripid]
    while (rt !== undefined) {
        tripid += 1;
        rt = data[tripid]
    }

    var datetime = new Date(newtrip.datetime);
    newtrip.pickup_time = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
    newtrip.date = datetime.toLocaleDateString(['en-US'], { dateStyle: 'short' })
    newtrip.travel_time = datetime.valueOf();
    newtrip.invoice = tripid;
    newtrip.payment_type = 'Not yet paid'
    newtrip.transID = 'none'
    newtrip.nickname = newtrip.nickname
    newtrip.state = 1
    var ttt = data[newtrip.invoice];
    data[newtrip.invoice] = newtrip;
    console.log(newtrip)
    if (isSave)
        fs.writeFile("trips.json", JSON.stringify(data), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
}


// var dd = new Date(Date.now())
// var x = 0;
// var t = () => {
//     return {
//         invoice: '',

//         billname: '',
//         nickname: '',

//         travel_time: '',
//         datetime: '',
//         date: '',
//         pickup_time: '',

//         trip_type: '',
//         flight_num: '',

//         departure: '',
//         destination_address: '',

//         vehicle_type: '5',

//         distance: 0,
//         pickup_distance: 0,
//         distance_price: 0,
//         pickup_distance_price: 0,
//         pickup_distance_free: 0,
//         total: 0,

//         payment_type: 'null',
//         transID: 'null',
//         state: 0,
//     }
// }
// Date.prototype.addDays = function (days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// for (var i = 0; i < 90; i++) {
//     x = dd.getDay()
//     if (x == 5) {
//         tripT = t();
//         dd.setHours(18)
//         dd.setMinutes(25)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "3";
//         tripT.datetime = dd;
//         tripT.departure = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.destination_address = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);



//         tripT = t();
//         dd.setHours(19)
//         dd.setMinutes(55)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "2";
//         tripT.datetime = dd;
//         tripT.destination_address = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.departure = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);
//     }
//     if (x == 0) {
//         tripT = t();
//         dd.setHours(10)
//         dd.setMinutes(20)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "3";
//         tripT.datetime = dd;
//         tripT.departure = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.destination_address = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);



//         tripT = t();
//         dd.setHours(13)
//         dd.setMinutes(10)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "2";
//         tripT.datetime = dd;
//         tripT.destination_address = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.departure = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);

//     }
//     dd = dd.addDays(1)
//     // } else if (x == 6) {

//     // }
// }
// fs.writeFile("trips.json", JSON.stringify(data), function (err) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });
// console.log(data);






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
    var newtrip = req.query;
    book(newtrip, true);
    res.send({ statu: 'done', trip: newtrip, summary: makesummary(newtrip) })
})


app.get('/price', (req, res) => {
    var data = req.query;
    console.log(data);
    var origin = '6835 SE Cougar Mountain Way, Bellevue, WA 98006, USA';
    var pickup_distance = data.start;
    var destination_address = data.end
    if (data.type === "1") {
        pickup_distance = data.end
        destination_address = data.start
    }
    map.directions({ params: { key: process.env.google_map_api_key, destination_address: destination_address, origin: origin, waypoints: [pickup_distance] } }).then((mapres) => {
        console.log(mapres)
        var G_pickup = {
            address: mapres.data.routes[0].legs[0].end_address,
            lat: mapres.data.routes[0].legs[1].end_location.lat,
            lng: mapres.data.routes[0].legs[1].end_location.lng,
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344)
        }
        var G_destination_address = {
            address: mapres.data.routes[0].legs[1].end_address,
            lat: mapres.data.routes[0].legs[1].end_location.lat,
            lng: mapres.data.routes[0].legs[1].end_location.lng,
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344)
        }
        var map_info = {
            address1: G_pickup,
            address2: G_destination_address,
            pickup_dis: Math.round(mapres.data.routes[0].legs[0].distance.value / 1609.344),
            dropoff_dis: Math.round(mapres.data.routes[0].legs[1].distance.value / 1609.344),
            esttime: mapres.data.routes[0].legs[1].duration.text
        }
        if (data.type === "1") {
            map_info.address1 = G_destination_address;
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
    newtrip.pickup_time = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
    newtrip.date = datetime.toLocaleDateString(['en-US'], { dateStyle: 'short' })
    newtrip.travel_time = datetime.valueOf();
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
    if (trip.trip_type == '0') {
        scripts = '与' + trip.nickname + '的预约 ' + d.toLocaleString(['zh-CN'], { hourCycle: "h11", dateStyle: "full", timeStyle: "short" }) + ' 从 ' + trip.departure_address + ' 出发. 届时我会开一辆 ' + car[trip.type] + script2 + ' ,费用总计$' + trip.total;
    } else {
        scripts = '与' + trip.nickname + '的预约 接机 于' + d.toLocaleString(['zh-CN'], { hourCycle: "h11", dateStyle: "full", timeStyle: "short" }) + '抵达的航班 ' + trip.flight_num + ' 送往 ' + trip.destination_address + '. 届时我会开一辆 ' + car[trip.type] + script3 + ' ,费用总计$' + trip.total;
    }
    return scripts
}

const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
    //console.log(data)
});

// const options = {
//     key: fs.readFileSync('./cert/localhost.key'),
//     cert: fs.readFileSync('./cert/localhost.crt')
// };

// const keys = {
//     key: fs.readFileSync('./cert/privkey.pem'),
//     cert: fs.readFileSync('./cert/cert.pem')
// }
// app.use((req, res, next) => {
//     if (req.secure) {
//         // If a request is already secure (HTTPS), move to the next middleware
//         next();
//     } else {
//         // Redirect HTTP to HTTPS
//         res.redirect(`https://${req.headers.host}${req.url}`);
//     }
// });

// const server = https.createServer(options, app);
// server.listen(port, () => {
//     console.log('listening to port: ' + port)
// })










// https
//   .createServer(
// 		// Provide the private and public key to the server by reading each
// 		// file's content with the readFileSync() method.
//     {
//       key: fs.readFileSync("privkey.pem"),
//       cert: fs.readFileSync("cert.pem"),
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log("serever is runing at port 4000");
//   });