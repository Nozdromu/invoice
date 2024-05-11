
const path = require('path')
const { exec } = require('child_process')

function api_other() {

    var api = { all: {}, get: {}, put: {}, delete: {}, post: {} }

    api.post.letter = (req, res) => {
        var l = req.query.letter;
        res.sendFile('/letter/' + l + '.pdf', { root: path.join(__dirname, '../public') })
    }

    api.get.get_ip = (req, res) => {
        exec('curl ip-adresim.app', function (error, stdout, stderr) {
            if (error)
                return;
            res.send(stdout)
            console.log('your ip is :' + stdout);
        })
    }

    return api
}
module.exports = api_other
//     const path = require('path')
//     const { exec } = require('child_process')