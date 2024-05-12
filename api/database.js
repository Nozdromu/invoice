function database(pool) {
    connection = pool
    var Database = {
        data: {},
        trip_api: {},
        user_api: {}
    }

    var query=(command,data=[],callback)=>{

    }
    var query=(command,data=[],callback)=>{

    }

    Database.user_api.create = (newuser, callback = false) => {
        connection.query('call create_user(?,?,?,?,?,?,?,?,?)', Object.values(newuser), (err, result, field) => {
            if (err) {
                console.error(err)
                throw err
            } else if (callback) {
                callback(result)
            }
        })
    }

    Database.trip_api.getalltrips = (callback=false) => {
        connection.query('select*from trip_table', (err, results, fields) => {
            if (err) {
                console.log(err)
            } else {
                results.forEach((row) => {
                    Database.data[row.invoice] = row
                })
            }
            if (callback) {
                callback(Database.data);
            }
        })
    }
    // Database.trip_api.getalltrips(() => {
    //     console.log("data loaded")
    // });
    Database.trip_api.addrecord = (data, callback) => {
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

    Database.trip_api.editrecord = (data, callback) => {
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

    Database.trip_api.change_trip_state = (id, state, callback) => {
        connection.query('call update_trip_state(?,?)', [id, state], (err, results, fields) => {
            if (err) {
                throw err
            } else {
                if (callback)
                    callback(results[0][0], err)
            }
        })
    }
    return Database;
}

module.exports = database