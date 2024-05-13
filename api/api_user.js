const Userlist = require('./userlist');

function user_api(_database) {
    var user_api = { all: {}, get: {}, put: {}, delete: {}, post: {} }
    var database = _database;
    var allusers = database.data.users

    user_api.post.create = (req, res) => {
        var newuser = req.body;
        newuser = allusers.regiest(newuser.username, newuser.password);
        newuser.save((data) => {
            res.sand(data);
        });
    }
    user_api.put.update = (req, res) => {

    }

    return user_api
}

module.exports = user_api