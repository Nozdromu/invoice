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
        res.render('cal')
    }

    pages.all.test = (req, res) => {
        res.render('test')
    }
    return pages
}

module.exports = Pages