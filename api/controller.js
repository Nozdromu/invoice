const api_other = require('./api_other');
const api_trips = require('./api_trips');
const api_users = require('./api_user');
const api_paypal = require('./api_paypal');
const pages = require('./pages');
const api_ai = require('./api_ai');

function controller(_database) {
    var Pages = pages();
    var Api_trips = api_trips(_database);
    var Api_other = api_other();
    var Api_users = api_users(_database);
    var Api_paypal = api_paypal(_database);
    var Api_ai = api_ai()

    function config(callbacks, name) {
        //Controllers[name] = {}
        Object.keys(callbacks).forEach((type) => {
            Object.keys(callbacks[type]).forEach((key) => {
                var pathname = '/' + name + '_' + key
                Controllers[pathname] = {
                    login_require: false,
                    path: pathname,
                    callback: callbacks[type][key],
                    type: type
                }
            })

        })
    }

    var Controllers = {};
    config(Pages, 'pages');
    config(Api_trips, 'api_trips')
    config(Api_other, 'api_other')
    config(Api_users, 'api_users')
    config(Api_paypal, 'api_paypal')
    config(Api_ai, 'api_ai')



    return Controllers;
}

module.exports = controller