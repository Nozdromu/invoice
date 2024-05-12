// class user {
//     constructor(type) {
//         this.Id=id||0;
//         this.Username=username||"none";
//         this.FirstName=firstname||"none";
//         this.LastName=lastname||"none";
//         this.Level=100;
//         this.Type=type;
//     }
// }
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

    return user
}

