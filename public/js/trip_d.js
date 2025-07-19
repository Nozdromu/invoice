



////////////////////////////////////////////////////////////////////////////
var googleaddress = $('#googleaddress')
var distance = $('#distance')
var departure_address = $('#address')
var pickup_distance = $('#pickup_distance')
var googledestination = $('#googledestination')
var destination_address = $('#destination_address')
var cartype = $('#cartype')
var price = $('#price')
var basic_price = 15;
var pickup_distance_free = 6
var dis_price = 1.75
var pickup_distance_price = 0.5

var ulclick_destination = (e) => {
    console.log(e.firstChild.data)
    if (e.firstChild.data === 'SEA') {
        destination_address.val('17801 International Blvd, Seattle, WA 98158')
    } else {
        destination_address.val('3220 100th St SW, Everett, WA 98204')
    }
}
var ulclick_departure = (e) => {
    console.log(e.firstChild.data)
    if (e.firstChild.data === 'SEA') {
        departure_address.val('17801 International Blvd, Seattle, WA 98158')
    } else {
        departure_address.val('3220 100th St SW, Everett, WA 98204')
    }
}

var switch_address = () => {
    var a = departure_address.val();
    var b = googleaddress.val();
    departure_address.val(destination_address.val())
    googleaddress.val(googledestination.val())
    destination_address.val(a);
    googledestination.val(b)
}

function get_dis() {
    axios.get('/api_trips_get_price', { params: { start: departure_address.val(), end: destination_address.val(), type: 0 } }).then((res) => {
        googleaddress.val(res.data.address1.address)
        distance.val(res.data.dropoff_dis);
        departure_address.val(res.data.address1.address);
        pickup_distance.val(res.data.pickup_dis)
        googledestination.val(res.data.address2.address)
        destination_address.val(res.data.address2.address)
        getprice();
    })
}

var getprice = () => {
    var _total = 0;
    var pickup_total = pickup_distance.val() - pickup_distance_free
    _total = basic_price + dis_price * distance.val() + (pickup_total > 0 ? pickup_total : 0) * pickup_distance_price + parseInt(cartype.val());
    price.val(_total)
}

distance.keyup(getprice);
pickup_distance.keyup(getprice);
cartype.change(getprice);
////////////////////////////////////////////////////////////////////////////

var car_made = {};
var car_model = {};
var car_type = {};
var car = [];
var get_info = () => {
    $.get('/api_trips_get_car_info', (data) => {
        car_made = data.car_made;
        car_model = data.car_model;
        car_type = data.car_type;
        data.car.forEach(e => {
            e.model = data.basic.car_model[e.model];
            e.made = data.basic.car_made[e.model.car_made_id];
            e.type = data.basic.car_type[e.model.car_type];
            cartype.append($('<option>', { value: e.price, text: e.model.model_name + ' - ' + e.model.seat + ' seat' }));

        })
        cartype.val(data.car[0].price.toString()).change();

        console.log(data);
        done.S = true;
    })
}
var trip_info = {}
var sendData = () => {
    trip_info.departure_address = googleaddress.val();
    trip_info.distance = distance.val();
    trip_info.pickup_distance = pickup_distance.val();
    trip_info.distance_price = dis_price;
    trip_info.pickup_distance_price = pickup_distance_price;
    trip_info.pickup_distance_free = pickup_distance_free;
    trip_info.vehicle_type = cartype.val();
    trip_info.total = price.val();
    trip_info.trip_type = trip_type.val();
    trip_info.datetime = (new Date(datetime.val())).toLocaleString({ timestyle: 'short', hour12: false });
    trip_info.flight_num = flight_num.val();
    trip_info.billname = billname.val();
    trip_info.nickname = _name.val();
    trip_info.destination_address = googledestination.val();
    axios.get(api_url, {
        params: trip_info
    }
    ).then((res) => {
        console.log(res)
        trip_info = res.data.trip;
        if (res.data.statu === 'done') {
            summary = res.data.summary
            makesummary();
            invoiceLink = window.location.host + '/pages_invoice?invoice=' + trip_info.invoice
            $('#invoiceP').text(invoiceLink)
            $('#invoiceA').attr('href', invoiceLink)
            messagebtn.click();
        }
    })
}
$(document).ready(() => { get_info() });

var done = {
    s: false,
    fun: [],
    get S() { return s },
    set S(value) {
        this.s = value;
        this.fun.forEach(e => {
            e();
        })
    },
    listen(f) {
        if (done.s) {
            f();
        } else {
            done.fun.push(f)
        }
    }
}