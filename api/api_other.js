(function pages() {
    const path = require('path')
    var letter = (req, res) => {
        var l = req.query.letter;
        res.sendFile('/letter/' + l + '.pdf', { root: path.join(__dirname, '../public') })
    }
    var get_ip = (req, res) => {
        exec('curl ip-adresim.app', function (error, stdout, stderr) {
            if (error)
                return;
            res.send(stdout)
            console.log('your ip is :' + stdout);
        })
    }



    module.exports.letter = function (req, res) {
        return letter(req, res)
    }
    module.exports.get_ip = function (req, res) {
        return get_ip(req, res)
    }
})()