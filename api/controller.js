const api_other = require('./api_other');
const api_trips = require('./api_trips');
const api_users = require('./api_user');
const pages = require('./pages');

function controller(_database) {
    var Pages = pages();
    var Api_trips = api_trips(_database);
    var Api_other = api_other();
    var Api_users = api_users(_database);

    function config(callbacks, name) {
        //Controllers[name] = {}
        Object.keys(callbacks).forEach((type) => {
            Object.keys(callbacks[type]).forEach((key) => {
                var pathname = '/' + name + '_' + key
                Controllers[pathname] = {
                    login_require: true,
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
    config(Api_users,'api_users')

    return Controllers;
}

module.exports = controller