function Pages() {
    var pages = { all: {}, get: {}, put: {}, delete: {}, post: {} }

    pages.all.invoice = (req, res) => {
        res.render('invoice');
    }

    pages.all.alltrips = (req, res) => {
        res.render('trips');
    }

    pages.all.trip_page = (req, res) => {
        res.render('tripEdit')
    }
    pages.all.payment_page = (req, res) => {
        res.render('payment')
    }

    pages.all.letters = (req, res) => {
        res.render('letter');
    }

    pages.all.math = (req, res) => {
        res.render('math')
    }

    pages.all.cal = (req, res) => {
        res.render('new_pricing')
    }

    pages.all.test = (req, res) => {
        res.render('test')
    }
    pages.all.register = (req, res) => {
        res.render('register')
    }
    pages.all.login = (req, res) => {
        res.render('login')
    }
    pages.all.mama = (req, res) => {
        res.render('trip_cal')
    }
    pages.all.pricing = (req, res) => {
        res.render('pricing')
    }
    pages.all.paypal = (req, res) => {
        res.render('checkout')
    }
    return pages
}

module.exports = Pages