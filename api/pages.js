function Pages() {
    var pages = {}
    pages.invoice = (req, res) => {
        res.render('invoice');
    }

    pages.alltrips = (req, res) => {
        res.render('trips');
    }

    pages.trip_page = (req, res) => {
        res.render('tripEdit')
    }
    pages.payment_page = (req, res) => {
        res.render('payment')
    }

    pages.letters = (req, res) => {
        res.render('letter');
    }

    pages.math = (req, res) => {
        res.render('math')
    }
    return pages
}

module.exports = Pages