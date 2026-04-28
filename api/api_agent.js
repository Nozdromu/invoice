function api_agent(_database) {
    var database = _database;
    var api_agent = { all: {}, get: {}, put: {}, delete: {}, post: {} };
    var agent_token = process.env.agent_token;

    var check_token = (token) => {
        if (token == agent_token) {
            return true;
        }
    }

    var get_all_trips = (req, res) => {
        if (check_token(req.query.token)) {
            database.trip_api.get_all_trips((results) => {
                res.send(results);
            })
        }
    }

}