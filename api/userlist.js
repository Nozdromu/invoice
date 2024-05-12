const User = require('./user')
function userlist(_database) {
    var _database = _database
    var userlist = { list: {} }
    function hashPassword(password) {
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        var hash = pbkdf2(password, salt, iterations);

        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        };
    }
    userlist.create = (username, password, firstname = '', lastname = '', phone = '', email = '', role = 1) => {
        var user = User();
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
    }
}