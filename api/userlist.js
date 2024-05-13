const User = require('./user')
const crypto = require('crypto');
function userlist(_database) {
    var database = _database
    var query = database.user_api;
    var userlist = { list_ID: {}, list_UN: {} }
    function hashPassword(password) {
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex')
        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        };
    }
    var create_user = (username, password, firstname = '', lastname = '', phone = '', email = '', role = 1) => {
        var user = User();
        user.id = 0;
        user.username = username
        user.password = password
        var hash = hashPassword(password);
        user.password_salt = hash.salt
        user.hash = hash.hash
        user.firstname = firstname
        user.lastname = lastname
        user.email = email
        user.phone = phone
        user.role = role
        user.toArray = () => {
            var list = [0,
                user.username,
                user.firstname,
                user.lastname,
                user.password,
                user.email,
                user.phone,
                user.role,
                user.password_salt,
                user.hash
            ]
            return list
        }
        user.save = () => {
            if (user.id === 0)
                create(user)
            else
                update(user)
        }
        user.update = (_user) => {
            user.username = _user.username;
            user.firstname = _user.firstname;
            user.lastname = _user.lastname;
            user.password = _user.password;
            user.email = _user.email;
            user.phone = _user.phone;
            user.role = _user.role;
            user.save();
        }
        return user
    }
    var create = (newuser, callback = false) => {
        console.log(newuser.toArray())
        query.create(newuser.toArray(), (data) => {
            console.log(data);
            userlist.list_ID[data[0].id] = data[0]
            userlist.list_ID[data[0].username] = data[0]
            if (callback)
                callback(userlist.list_ID[data[0].id]);
        })
    }
    var update = (user) => {
        query.update(user.toArray(), (data) => {
            console.log(data);
        })
    }
    var login = () => {

    }
    var logout = () => {

    }

    userlist.regiest = create_user;
    userlist.login = login;
    userlist.logout = logout;

    return userlist;
}

module.exports = userlist