
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault();
                sendData();
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


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
        })
        console.log(data);
    })
}