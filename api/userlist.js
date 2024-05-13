const User = require('./user')
const crypto = require('crypto');
function userlist(_database) {
    var database = _database
    var query = database.user_api;
    var userlist = { list: {} }
    function hashPassword(password) {
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex')
        // var hash = crypto.pbkdf2(password, salt, iterations,64,'sha512',(err,derivedKey)=>{
        //     if(err)
        //         console.error(err)
        //     else{
        //         console.log(derivedKey)
        //         console.log(derivedKey.toString('hex'))
        //         return {
        //             salt: salt,
        //             hash: hash,
        //             iterations: derivedKey.toString('hex')
        //         };
        //     }
        // });

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
            return [0,
                username,
                firstname,
                lastname,
                password,
                email,
                phone,
                role,
                password,
                password_salt,
                hash
            ]
        }
        user.save = () => {
            if (user.id === 0)
                create(user)
            else
                update(user)
        }
        user.update = (_user) => {
            this.username = _user.username;
            this.firstname = _user.firstname;
            this.lastname = _user.lastname;
            this.password = _user.password;
            this.email = _user.email;
            this.phone = _user.phone;
            this.role = _user.role;
            this.save();
        }
        return user
    }
    var create = (newuser, callback = false) => {
        console.log(newuser.toArray())
        query.create(newuser.toArray(), (data) => {
            console.log(data);
            userlist.list[data[0].id] = data[0]
            if (callback)
                callback(userlist.list[data[0].id]);
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