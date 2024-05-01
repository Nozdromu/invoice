(function database() {
    var connection
    var set_connection = (_connection) => {
        connection = _connection
    }
    var getalltrips = (callback) => {
        connection.query('select*from trip_table', (err, results, fields) => {
            var data = {};
            if (err) {
                console.log(err)
            } else {
                results.forEach((row) => {
                    data[row.invoice] = row
                })
            }
            if (callback !== undefined) {
                callback(data);
            }
        })
    }

    var addrecord = (data, callback) => {
        connection.query("call new_book(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            data.invoice,
            data.billname,
            data.nickname,
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
            data.distance_price,
            data.pickup_distance,
            data.pickup_distance_price,
            data.pickup_distance_free,
            data.total,
            data.payment_type,
            data.transID,
            data.state,
            ""
        ], (err, results, fields) => {
            if (err) {
                throw err
            } else {
                if (callback)
                    callback(results[0][0])
            }
        })
    }

    var editrecord = (data, callback) => {
        connection.query("call edit_trips(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            data.id,
            data.billname,
            data.nickname,
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
            data.distance_price,
            data.pickup_distance,
            data.pickup_distance_price,
            data.pickup_distance_free,
            data.total,
            data.payment_type,
            data.transID,
            data.state,
            ""
        ], (err, results, fields) => {
            if (err) {
                throw err
            } else {
                if (callback)
                    callback(results[0][0])
            }
        })
    }

    var change_trip_state = (id, state, callback) => {
        connection.query('call update_trip_state(?,?)', [id, state], (err, results, fields) => {
            if (err) {
                throw err
            } else {
                if (callback)
                    callback(results[0][0], err)
            }
        })
    }
    module.exports.get_trips = function (callback) {
        return getalltrips(callback)
    }
    module.exports.insert_trip = function (newtrip, callback) {
        return addrecord(newtrip, callback)
    }
    module.exports.edit_trip = function (trip, callback) {
        return editrecord(trip, callback)
    }
    module.exports.change_trip_state = function (id, state, callback) {
        return change_trip_state(id, state, callback)
    }
    module.exports.set_connection = function (connection) {
        return set_connection(connection);
    }

})()