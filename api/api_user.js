const session = require('express-session');
const Userlist = require('./userlist');

function user_api(_database) {
    var user_api = { all: {}, get: {}, put: {}, delete: {}, post: {} }
    var database = _database;
    var allusers_ = database.data.users
    var list_UN = database.data.users.list_UN
    var list_ID = database.data.users.list_ID
    user_api.post.create = (req, res) => {
        var newuser = req.body;
        newuser = allusers.regiest(newuser.username, newuser.password);
        newuser.save((data) => {
            res.sand(data);
        });
    }
    user_api.put.update = (req, res) => {

    }
    user_api.post.login = (req, res) => {
        if (list_UN[req.body.username].password === req.body.password) {
            req.session.user = list_UN[req.body.username];
            req.session.cookie.username = list_UN[req.body.username].username
            if (req.session.user.id == 2)
                res.render('trip_cal')
            else
                res.render('test')
        } else {
            res.send('field')
        }
    }
    user_api.get.logout = (req, res) => {
        req.session.destroy(() => {
            res.send('loged out')
        })
    }

    user_api.get.get_user_info = (req, res) => {
        if (req.session.user) {
            res.send(req.session.user)
        } else {
            res.send('not login yet')
        }
    }

    return user_api
}

module.exports = user_api