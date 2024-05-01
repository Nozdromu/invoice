(function pages() {
    const path = require('path')
    var letter = (req, res) => {
        var l = req.query.letter;
        res.sendFile('/letter/' + l + '.pdf', { root: path.join(__dirname, '../public') })
    }

    module.exports.letter = function (req, res) {
        return letter(req, res)
    }
})()