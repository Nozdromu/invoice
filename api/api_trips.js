const { Client } = require('@googlemaps/google-maps-services-js')
const map = new Client({});

function api_trips(_database) {

    var api_trip = { all: {}, get: {}, put: {}, delete: {}, post: {} }
    var database = _database;
    var alltrips = database.data.trips;
    // var reload = (req, res) => {
    //     database.get_trips((results) => {
    //         data = results;
    //         res.send('done')
    //     })
    // }
    var book = (newtrip, callback) => {
        var tripid = Date.now();
        var rt = alltrips[tripid]
        while (rt !== undefined) {
            tripid += 1;
            rt = alltrips[tripid]
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
        //data[tripid] = (newtrip);
        database.trip_api.addrecord(newtrip, (results) => {
            callback(results);
        })
    }

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
            scripts = '与' + trip.nickname + '的预约 ' + d.toLocaleString(['zh-CN'], { hourCycle: "h11", dateStyle: "full", timeStyle: "short" }) + ' 从 ' + trip.departure_address + ' 出发. 届时我会开一辆 ' + car[trip.vehicle_type] + script2 + ' ,费用总计$' + trip.total;
        } else {
            scripts = '与' + trip.nickname + '的预约 接机 于' + d.toLocaleString(['zh-CN'], { hourCycle: "h11", dateStyle: "full", timeStyle: "short" }) + '抵达的航班 ' + trip.flight_num + ' 送往 ' + trip.destination_address + '. 届时我会开一辆 ' + car[trip.vehicle_type] + script3 + ' ,费用总计$' + trip.total;
        }
        return scripts
    }
    api_trip.get.book_trip = (req, res) => {
        var newtrip = req.query;
        book(newtrip, (results) => {
            alltrips[results.invoice] = results;
            res.send({ statu: 'done', trip: results, summary: makesummary(results) })
        });

    }

    api_trip.get.edit_trip = (req, res) => {
        var trip = req.query;
        var datetime = new Date(trip.datetime);
        trip.pickup_time = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
        trip.date = datetime.toLocaleDateString(['en-US'], { dateStyle: 'short' })
        trip.travel_time = datetime.valueOf();
        database.trip_api.editrecord(trip, (results) => {
            alltrips[results.invoice] = results
            res.send({ statu: 'done', trip: results, summary: makesummary(results) })
        })

    }

    api_trip.get.get_summary = (req, res) => {
        var tripid = req.query.invoice;
        var tripInfo = alltrips[tripid];
        var summary = makesummary(tripInfo);
        res.send(summary);
    }

    api_trip.get.get_trip = (req, res) => {
        res.send({ statu: 'done', trip: alltrips[req.query.trip], summary: makesummary(alltrips[req.query.trip]) })
    }

    api_trip.get.change_trip_state = (req, res) => {
        var trip = alltrips[req.query.invoice];
        var state = req.query.state;
        database.trip_api.change_trip_state(trip.id, state, (results, err) => {
            if (err) {

                res.send({ state: 'err', message: err })
            } else {

                alltrips[results.invoice] = results
                res.send({ state: 'success', message: trip })
            }

        })
    }

    api_trip.get.get_all_trips = (req, res) => {
        var trips = []
        Object.entries(alltrips).forEach(element => {
            trips.push(element[1]);
        });
        res.send({ trips: trips })
    }


    api_trip.get.get_price = (req, res) => {
        var data = req.query;
        var origin = '6835 SE Cougar Mountain Way, Bellevue, WA 98006, USA';
        var pickup_address = data.start;
        var destination_address = data.end
        if (data.type === "1") {
            pickup_address = data.end
            destination_address = data.start
        }
        map.directions({ params: { key: process.env.google_map_api_key, destination: destination_address, origin: origin, waypoints: [pickup_address] } }).then((mapres) => {
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


    }
    return api_trip
}

module.exports = api_trips