
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
                get_dis();
            }
            form.classList.add('was-validated')
        }, false)
    })
})()    


var label_pickup_1 = $('#label_pickup_1')
var label_pickup_2 = $('#label_pickup_2')

var label_distance_1 = $('#label_dropoff_1')
var label_distance_2 = $('#label_dropoff_2')

var label_base_1 = $('#label_base_1')
var label_base_2 = $('#label_base_2')

var label_total = $('#label_total')
var label_pickup_t = $('#label_pickup_t')
var label_distance_t = $('#label_dropoff_t')
var label_base_t = $('#label_base_t')
var label_total_t = $('#label_total_t')


var getlocation = () => {
    departure_address.addClass('disabled placeholder')
    navigator.geolocation.getCurrentPosition((pos) => {
        //alert(pos.coords.latitude + ',' + pos.coords.longitude);
        departure_address.val(pos.coords.latitude + ',' + pos.coords.longitude)
        console.log(pos)
        departure_address.removeClass('disabled placeholder')
    })
}



var showdetial = () => {
    label_pickup_1.text('(' + pickup_distance.val() + '-' + pickup_distance_free + ')');
    label_pickup_2.text(pickup_distance_price);

    label_distance_1.text(distance.val());
    label_distance_2.text(dis_price);
    console.log(cartype.val())
    label_base_1.text(basic_price + cartype.val() == 'null' ? 0 : parseInt(cartype.val()))

    label_distance_t.text(dis_price * distance.val())
    label_pickup_t.text((pickup_distance.val() - pickup_distance_free > 0 ? pickup_distance.val() - pickup_distance_free : 0) * pickup_distance_price)
    label_base_t.text(cartype.val())
    label_total_t.text(price.val())
}


cartype.change(showdetial);
price.val(showdetial)
var total_price={
    p:0,
    //get
}