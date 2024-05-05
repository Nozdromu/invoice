(function pages() {

    var invoice = (req, res) => {
        res.render('invoice');
    }

    var alltrips = (req, res) => {
        res.render('trips');
    }

    var trip_page = (req, res) => {
        res.render('tripEdit')
    }
    var payment_page = (req, res) => {
        res.render('payment')
    }

    var letters = (req, res) => {
        res.render('letter');
    }

    var math = (req, res) => {
        res.render('math')
    }



    module.exports.invoice = function (req, res) {
        return invoice(req, res)
    }

    module.exports.alltrips = function (req, res) {
        return alltrips(req, res)
    }
    module.exports.trip_page = function (req, res) {
        return trip_page(req, res)
    }
    module.exports.payment_page = function (req, res) {
        return payment_page(req, res)
    }
    module.exports.letters = function (req, res) {
        return letters(req, res)
    }
    module.exports.math = function (req, res) {
        return math(req, res)
    }
})()