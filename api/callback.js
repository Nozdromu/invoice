const api_other = require('./api_other');
const api_trips = require('./api_trips');
const database = require('./database');
const pages = require('./pages');

function controller(_database) {
    var Pages = pages();
    var Api_trips = api_trips(_database);
    var Api_other = api_other();


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

    return Controllers;
}

module.exports = controller