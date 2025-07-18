const urlParams = new URLSearchParams(window.location.search);
const trip = urlParams.get('trip');
var summary = "";
var api_url = 'api_trips_book_trip'
var trip_info = {}
var flight_num = $('#flight_num');
var _name = $('#name');
var billname = $('#billname');
var datetime = $('#datetime');
var trip_type = $('#trip_type')
var summaryBtn = $('#summaryBtn')
var invoiceLink = ""

var form = document.querySelector("#book")
var messagebtn = $('#message')
var maplink = 'http://maps.google.com/?q=';





trip_type.change(function (e) {
    if (e.target.value == 'dropoff' || e.target.value == "0") {
        $('#filghtdiv').hide();
    } else {
        $('#filghtdiv').show();
    }
})

var load = () => {
    if (trip !== null) {
        api_url = 'api_trips_edit_trip'
        axios.get('/api_trips_get_trip', { params: { trip: trip } }).then((res) => {
            var data = res.data.trip
            flight_num.val(data.flight_num);
            _name.val(data.nickname);
            billname.val(data.billname)
            departure_address.val(data.departure_address);
            googleaddress.val(data.departure_address);
            distance.val(data.distance);
            pickup_distance.val(data.pickup_distance);
            var t = (new Date(data.datetime + ' UTC')).toISOString().substring(0, 16)
            datetime.val(t);
            price.val(data.total);
            var x = 0;
            if (data.vehicle_type == 5 || data.vehicle_type == 15 || data.vehicle_type == 0) {
                x = 0;
            } else {
                x = 5
            }
            cartype.val(x)
            trip_type.val(data.trip_type)
            destination_address.val(data.destination_address)
            googledestination.val(data.destination_address)
            trip_info = data;
            date = new Date(data.datetime)
            summary = res.data.summary
            makesummary();
            invoiceLink = window.location.host + '/pages_invoice?invoice=' + trip_info.invoice
            $('#invoiceP').text(invoiceLink)
            $('#invoiceA').attr('href', invoiceLink)

            if (trip_type.val() === 'dropoff')
                $('#filghtdiv').hide()
        })
    } else {

        if (trip_type.val() === 'dropoff')
            $('#filghtdiv').hide()
    }

}




var copysummary = () => {
    var s1 = "预约信息:\n" + $('#summaryP').text() + '\n\n'
    var s2 = "收据链接:\n" + $('#invoiceP').text() + '\n\n'
    var s3 = "联系方式:\n" + "Yilei Ding\n4254998842\n\n"
    var s4 = "支付方式:\nPayPal Venmo Zelle Cash\n支付链接:\nhttps://lulu0510.ddns.net/payment?invoice=" + trip_info.invoice + "\n完成行程后支付即可，不需要定金。有任何变更请及时联系"
    var s = s1 + s2 + s3 + s4;
    copyToClipboard(s);
}


var makesummary = () => {
    $('.summaryTaxtarea').text(summary)
    $('#summaryP').text(summary)
    summaryBtn.prop('disabled', false)
}

var getsummary = () => {
    axios.get('getsummary', { params: { invoice: trip_info.invoice } }).then((res) => {
        summary = res.data.summary;
        makesummary();
    })
}

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
done.listen(sendData)


var xx = () => {
    var s1 = "预约信息:\n" + $('#summaryP').text() + '\n\n'
    var s2 = "收据链接:\n" + $('#invoiceP').text() + '\n\n'
    var s3 = "联系方式:\n" + "Yilei Ding\n4254998842\n\n"
    var s4 = "支付方式:\nPayPal Venmo Zelle Cash\n支付链接:\nhttps://lulu0510.ddns.net/payment?invoice=" + trip_info.invoice + "\n完成行程后支付即可，不需要定金。有任何变更请及时联系"
    var s = s1 + s2 + s3 + s4;
    copyToClipboard(s);
}