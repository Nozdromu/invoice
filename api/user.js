
function user() {
    var user = {}
    user.id = 0;
    user.username = "";
    user.firstname = "";
    user.lastname = "";
    user.email = "";
    user.phone = "";
    user.role = "";
    user.password = "";
    user.password_salt = "";
    user.hash = "";
    return user
}
module.exports = user

