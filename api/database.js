const userlist = require('./userlist')
function database(pool) {
    connection = pool
    var Database = {
        data: {
            trips: {},
            car: {
                car_made: {},
                car_model: {},
                car_type: {}
            }
        },
        trip_api: {},
        user_api: {},
        address_api: {}
    }
    Database.data.users = userlist(Database)
    /**
    * templay of query.
    *
    * @param {String} command
    * @param {Array} data
    * @param {Function} callback
    * @private
    */
    var query = (command, data = [], callback = false) => {
        var params = data
        if (typeof (data) !== Array)
            params = Object.values(data)
        connection.query(command, params, (err, result, field) => {
            if (err)
                console.error(err)
            else if (callback)
                callback(result, field)
        })
    }
    var load = (data) => {
        load_trips(data[0]);
        load_user(data[1]);
        load_car_info(data[4], data[5], data[6], data[7])
        console.log(Database.data)
    }
    var load_trips = (trips) => {
        trips.forEach(e => {
            Database.data.trips[e.invoice] = e
        })
    }
    var load_user = (users) => {
        users.forEach(e => {
            e.car = [];
            Database.data.users.list_ID[e.id] = e
            Database.data.users.list_UN[e.username] = e

        })
    }
    var load_car_info = (car, car_made, car_model, car_type) => {
        car_made.forEach(e => {
            Database.data.car.car_made[e.car_made_id] = e;
        })
        car_model.forEach(e => {
            Database.data.car.car_model[e.car_model_id] = e;
        })
        car_type.forEach(e => {
            Database.data.car.car_type[e.car_type_id] = e;
        })

        car.forEach(e => {
            // e.model_name = Database.data.car.car_model[e.car_model_id].;
            // e.car_made=Database.data.car.car_made[e.car_made_id];
            // e.car_type=

            Database.data.users.list_ID[e.user].car.push(e);
        })
        //
    }

    Database.user_api.create = (newuser, callback) => {
        query('call create_user(?,?,?,?,?,?,?,?,?,?)', newuser, callback)
    }
    Database.user_api.update = (user, callback) => {
        query('call update_user(?,?,?,?,?,?,?,?,?,?)', user, callback)
    }
    Database.load = () => {
        query('call load_data()', [], load)
    }
    Database.trip_api.update_payment = (data, callback) => {
        query('call update_payment(?,?,?)', data, callback)
    }

    // Database.trip_api.getalltrips = (callback = false) => {
    //     connection.query('select*from trip_table', (err, results, fields) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             results.forEach((row) => {
    //                 Database.data.trips[row.invoice] = row
    //             })
    //         }
    //         if (callback) {
    //             callback(Database.data.trips);
    //         }
    //     })
    // }
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
        connection.query("call edit_trips(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
            "",
            0,
            data.total
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