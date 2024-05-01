(function api_trips() {
    const { Client } = require('@googlemaps/google-maps-services-js')
    const map = new Client({});

    var database;
    var data = {}
    var set_database = (_database) => {
        database = _database;
        database.get_trips((results) => {
            data = results;
        })
    }
    var book = (newtrip, callback) => {
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
        //data[tripid] = (newtrip);
        database.insert_trip(newtrip, (results) => {
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
    var book_trip = (req, res) => {
        var newtrip = req.query;
        book(newtrip, (results) => {
            data[results.invoice] = results;
            res.send({ statu: 'done', trip: results, summary: makesummary(results) })
        });

    }

    var edit_trip = (req, res) => {
        var trip = req.query;
        var datetime = new Date(trip.datetime);
        trip.pickup_time = datetime.toLocaleString(['en-US'], { timeStyle: 'short', hour12: true })
        trip.date = datetime.toLocaleDateString(['en-US'], { dateStyle: 'short' })
        trip.travel_time = datetime.valueOf();
        database.edit_trip(trip, (results) => {
            data[results.invoice] = results
            res.send({ statu: 'done', trip: results, summary: makesummary(results) })
        })

    }

    var get_summary = (req, res) => {
        var tripid = req.query.invoice;
        var tripInfo = data[tripid];
        var summary = makesummary(tripInfo);
        res.send(summary);
    }

    var get_trip = (req, res) => {
        res.send({ statu: 'done', trip: data[req.query.trip], summary: makesummary(data[req.query.trip]) })
    }

    var change_trip_state = (req, res) => {
        var trip = data[req.query.invoice];
        var state = req.query.state;
        database.change_trip_state(trip.id, state, (results, err) => {
            if (err) {

                res.send({ state: 'err', message: err })
            } else {

                data[results.invoice] = results
                res.send({ state: 'success', message: trip })
            }

        })
    }

    var get_all_trips = (req, res) => {
        var trips = []
        Object.entries(data).forEach(element => {
            trips.push(element[1]);
        });
        res.send({ trips: trips })
    }

    var get_price = (req, res) => {
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



    module.exports.book_trip = function (req, res) {
        return book_trip(req, res)
    }
    module.exports.edit_trip = function (req, res) {
        return edit_trip(req, res)
    }
    module.exports.update_statu = function (req, res) {
        return change_trip_state(req, res)
    }
    module.exports.get_all_trips = function (req, res) {
        return get_all_trips(req, res)
    }
    module.exports.get_trip = function (req, res) {
        return get_trip(req, res)
    }
    module.exports.get_summary = function (req, res) {
        return get_summary(req, res)
    }
    module.exports.get_price = function (req, res) {
        return get_price(req, res)
    }
    module.exports.set_database = function (_database) {
        return set_database(_database)
    }
})()