// var dd = new Date(Date.now())
// var x = 0;
// var t = () => {
//     return {
//         invoice: '',

//         billname: '',
//         nickname: '',

//         travel_time: '',
//         datetime: '',
//         date: '',
//         pickup_time: '',

//         trip_type: '',
//         flight_num: '',

//         departure: '',
//         destination_address: '',

//         vehicle_type: '5',

//         distance: 0,
//         pickup_distance: 0,
//         distance_price: 0,
//         pickup_distance_price: 0,
//         pickup_distance_free: 0,
//         total: 0,

//         payment_type: 'null',
//         transID: 'null',
//         state: 0,
//     }
// }
// Date.prototype.addDays = function (days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// for (var i = 0; i < 90; i++) {
//     x = dd.getDay()
//     if (x == 5) {
//         tripT = t();
//         dd.setHours(18)
//         dd.setMinutes(25)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "3";
//         tripT.datetime = dd;
//         tripT.departure = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.destination_address = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);



//         tripT = t();
//         dd.setHours(19)
//         dd.setMinutes(55)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "2";
//         tripT.datetime = dd;
//         tripT.destination_address = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.departure = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);
//     }
//     if (x == 0) {
//         tripT = t();
//         dd.setHours(10)
//         dd.setMinutes(20)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "3";
//         tripT.datetime = dd;
//         tripT.departure = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.destination_address = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);



//         tripT = t();
//         dd.setHours(13)
//         dd.setMinutes(10)
//         tripT.billname = 'julia 补习';
//         tripT.billname = 'julia 补习';
//         tripT.trip_type = "2";
//         tripT.datetime = dd;
//         tripT.destination_address = "5997 153rd Ave SE, Bellevue, WA 98006"
//         tripT.departure = "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027"
//         book(tripT, false);

//     }
//     dd = dd.addDays(1)
//     // } else if (x == 6) {

//     // }
// }
// fs.writeFile("trips.json", JSON.stringify(data), function (err) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });
// console.log(data);

var unfinishtrip = []
var juli = {
    week: {
        4: {
            billname: 'julia 补习',
            pick: "6:25 PM",
            back: "7:55 PM",
            address1: "5997 153rd Ave SE, Bellevue, WA 98006",
            address2: "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027",
        },
        6: {
            billname: 'julia 补习',
            pick: "10:20 AM",
            back: "1:10 PM",
            address1: "5997 153rd Ave SE, Bellevue, WA 98006",
            address2: "1505 NW Gilman Blvd Suite 6, Issaquah, WA 98027",
        }
    }
}