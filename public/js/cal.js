// var cal = () => {
//     var header = $('<header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">');

//     var body = {};
//     var footer = {};
// }

var cal_header = () => {
    var header = $('<header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">');
    var header_h1 = $('<h1 class="text-base font-semibold leading-6 text-gray-900">')
    var time = $('<time datetime="2022-01"></time>')
    var month_name = [0, "January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"]

    var update = (year, month) => {
        time.removeAttr('datetime');
        time.attr('datetime', year + '-' + month)
        time.html(month_name[month] + ' ' + year)
    }
    header.append(header_h1.append(time));


    var control = $('<div class="flex items-center">');
    var month_control = $('<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">');
    var Previous_month_btn = $('<button type="button"class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">')
    var Previous_month_span = $('<span class="sr-only">Previous month</span>');
    var Previous_month_svg = $('<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" /></svg>')

    Previous_month_btn.append(Previous_month_span)
    Previous_month_btn.append(Previous_month_svg)
    var previous = (callback) => {
        previous = callback;
    }
    Previous_month_btn.click(function (e) {
        e.preventDefault();
        previous()
    });

    var today_btn = $('<button type="button" class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Today</button>')
    var today_span = $('<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>')



    var next_month_btn = $('<button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">')
    var next_month_span = $('<span class="sr-only">Next month</span>');
    var next_month_svg = $('<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /><.svg>');
    var next_month_path = $('')

    next_month_btn.append(next_month_span);
    next_month_btn.append(next_month_svg.append(next_month_path))

    var next = (callback) => {
        next = callback;
    }
    next_month_btn.click(function (e) {
        e.preventDefault();
        next();
    });

    month_control.append(Previous_month_btn);
    month_control.append(today_btn);
    month_control.append(today_span)
    month_control.append(next_month_btn);

    var month_view = $('<div class="hidden md:ml-4 md:flex md:items-center">');
    var month_view_body = $('<div class="relative" x-data="{ isOpen: false }">');
    var month_view_btn = $('<button type="button"  @click="isOpen = !isOpen" :aria-checked="isOpen" class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">Month view</button>')
    var month_view_btn_svg = $('<svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>')

    month_view.append(month_view_body);
    month_view_body.append(month_view_btn.append(month_view_btn_svg))

    var month_view_dropdown = $('<div @click.outside="isOpen = !isOpen" class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">')
    month_view_dropdown.attr("x-show", "isOpen");
    month_view_dropdown.attr("x-transition:enter", "transition ease-out duration-100");
    month_view_dropdown.attr('x-transition:enter-start', 'transform opacity-0 scale-95');
    month_view_dropdown.attr('x-transition:enter-end', 'transform opacity-100 scale-100');
    month_view_dropdown.attr('x-transition:leave', 'transition ease-in duration-75');
    month_view_dropdown.attr('x-transition:leave-start', 'transform opacity-100 scale-100');
    month_view_dropdown.attr('x-transition:leave-end', 'transform opacity-0 scale-95');
    month_view_dropdown.attr('role', 'menu');
    month_view_dropdown.attr('aria-orientation', 'vertical');
    month_view_dropdown.attr('aria-labelledby', 'menu-button');
    month_view_dropdown.attr('tabindex', '-1');

    var month_view_menu = $('<div class="py-1" role="none">')
    var option1 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Day view</a>')
    var option2 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Week view</a>')
    var option3 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Month view</a>')
    var option4 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Year view</a>')

    month_view_menu.append(option1)
    month_view_menu.append(option2)
    month_view_menu.append(option3)
    month_view_menu.append(option4)

    month_view_dropdown.append(month_view_menu)
    month_view_body.append(month_view_dropdown)


    month_view.append($('<div class="ml-6 h-6 w-px bg-gray-300"></div>'))
    month_view.append($('<button type="button" class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add event</button>'))

    var open_menu = $('<div class="relative ml-6 md:hidden" x-data="{ isOpen: false }"></div>')

    var open_menu_btn = $('<button type="button"  @click="isOpen = !isOpen" class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">')
    var open_menu_btn_span = $('<span class="sr-only">Open menu</span>');
    var open_menu_btn_svg = $('<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>')

    open_menu.append(open_menu_btn);
    open_menu_btn.append(open_menu_btn_span)
    open_menu_btn.append(open_menu_btn_svg);

    var open_menu_menu = $($('<div @click.outside="isOpen = !isOpen" class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></div>'))
    open_menu_menu.attr('x-show', "isOpen");
    open_menu_menu.attr('x-transition:enter', 'transition ease-out duration-100');
    open_menu_menu.attr('x-transition:enter-start', 'transform opacity-0 scale-95');
    open_menu_menu.attr('x-transition:enter-end', 'transform opacity-100 scale-100');
    open_menu_menu.attr('x-transition:leave', 'transition ease-in duration-75');
    open_menu_menu.attr('x-transition:leave-start', 'transform opacity-100 scale-100');
    open_menu_menu.attr('x-transition:leave-end', 'transform opacity-0 scale-95');
    open_menu_menu.attr('role', 'menu');
    open_menu_menu.attr('aria-orientation', 'vertical');
    open_menu_menu.attr('aria-labelledby', 'menu-button');
    open_menu_menu.attr('tabindex', '-1');

    var open_menu_menu_l1_option = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-0">Create event</a>')

    var open_menu_menu_l2_option = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-1">Go to today</a>')

    var open_menu_menu_l3_option1 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-2">Day view</a>')
    var open_menu_menu_l3_option2 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-3">Week view</a>')
    var open_menu_menu_l3_option3 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-4">Month view</a>')
    var open_menu_menu_l3_option4 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-5">Year view</a>')

    var open_menu_menu_l4_option = $('<select id="state_select" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-5">trip state</select>').change(function (e) {
        e.preventDefault();
        $('li[name=trip_state]').hide();
        $('li[state:' + e.value + ']').show();
    });
    open_menu_menu_l4_option.append($('<option value=1 selected>incoming</option>'))
    open_menu_menu_l4_option.append($('<option value=0 >finished</option>'))
    open_menu_menu.append($('<div class="py-1" role="none"></div>').append(open_menu_menu_l1_option))
    open_menu_menu.append($('<div class="py-1" role="none"></div>').append(open_menu_menu_l2_option))
    var open_menu_menu_l3 = $('<div class="py-1" role="none"></div>')
    open_menu_menu_l3.append(open_menu_menu_l3_option1);
    open_menu_menu_l3.append(open_menu_menu_l3_option2);
    open_menu_menu_l3.append(open_menu_menu_l3_option3);
    open_menu_menu_l3.append(open_menu_menu_l3_option4);
    open_menu_menu.append(open_menu_menu_l3)
    open_menu_menu.append($('<div class="py-1" role="none"></div>').append(open_menu_menu_l4_option))
    open_menu.append(open_menu_menu)

    control.append(month_control)
    control.append(month_view)
    control.append(open_menu)

    header.append(control)
    return { body: header, update: update, previous: previous, next: next };
}

var cal_body = (foot, today) => {
    cal_body = $('<div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">');
    cal_body_header = $('<div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">')
    cal_body.append(cal_body_header);
    var week_name_short = ["M", "T", "W", "T", "F", "S", "S"];
    var week_name_F3 = ["on", "ue", "ed", "hu", "ri", "at", "un"];

    week_name_short.forEach((element, index) => {
        var weekdays = $('<div class="flex justify-center bg-white py-2">')
        weekdays.append($('<span>').html(element));
        weekdays.append($('<span class="sr-only sm:not-sr-only">').html(week_name_F3[index]))
        cal_body_header.append(weekdays)
    });
    var cal_body_body = $('<div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">')
    var first_row = $('<div class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">')
    cal_body_body.append(first_row)
    var day_btn = $('<div class="isolate grid w-full grid-cols-7 gap-px lg:hidden">');
    cal_body_body.append(day_btn)

    var addItem = (list) => {
        day_btn.empty();
        first_row.empty()

        list.forEach((element) => {
            var wapper = $('<div class="relative bg-white px-3 py-2">');
            if (!element.iscurrent)
                wapper = $('<div class="relative bg-gray-50 px-3 py-2 text-gray-500">')
            var day = $('<time>');
            wapper.append(day)
            day.attr('datetime', element.datetime);
            day.html(element.day)
            first_row.append(wapper);

            var btn = $('<button type="button" class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">');
            if (!element.iscurrent)
                btn = $('<button type="button" class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">');
            var day = $('<time class="ml-auto">');
            day.attr('datetime', element.value);
            if (element.value === today) {
                btn.addClass('font-semibold text-white')
                day.addClass(' flex h-6 w-6 items-center justify-center rounded-full bg-gray-900')
                foot.update(element)
            }
            day.html(element.day)
            var span = $('<span class="sr-only"></span>');
            btn.append(day);
            btn.append(span)
            btn.click(() => {
                foot.update(element)
            })
            if (element.events === undefined) {
                span.html('0 events');
            }
            else {
                var dot_wrap = $('<span class="-mx-0.5 mt-auto flex flex-wrap-reverse">')
                element.events.forEach(e => {
                    //dot_wrap.append($('<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>'));
                    var label = $('<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-green-400"></span>')
                    if (e.trip_type == 1) {
                        label = $('<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-red-400"></span>')
                    } else if (e.trip_type == 2) {
                        label = $('<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-yellow-400"></span>')
                    } else if (e.trip_type == 3) {
                        label = $('<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-pink-400"></span>')
                    }
                    if (e.state == 0) {
                        label = $('<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>')
                    }
                    dot_wrap.append(label)
                })
                btn.append(dot_wrap)

            }

            day_btn.append(btn)
        })
    }
    cal_body.append(cal_body_header);
    cal_body.append(cal_body_body);
    return { body: cal_body, update: addItem }
}

// var cal_foot = () => {

// }

var cal_footer = () => {
    var cal_footer = $('<div class="px-4 py-4 sm:px-6 lg:hidden">');
    var header = $('<h2 class="text-base font-semibold leading-6 text-gray-900 px-4 py-2"></h2>');
    cal_footer.append(header)
    var foot_ol = $('<ol class="divide-y divide-gray-100  rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">')
    var _update = (e) => {
        foot_ol.empty();
        header.html("Reservations at: " + e.value)
        if (e.events)
            e.events.forEach((element) => {
                foot_ol.append(creat_event(element));
            })
    }

    cal_footer.append(foot_ol)
    return { body: cal_footer, update: _update };
}
var foot_next_res = () => {
    var next_foot = $('<div class="px-4 py-4 sm:px-6 lg:hidden">');
    var header_next = $('<h2 class="text-base font-semibold leading-6 text-gray-900 px-4 py-2"></h2>');
    next_foot.append(header_next)
    var next_ol = $('<ol class="divide-y divide-gray-100  rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">')
    next_foot.append(next_ol)
    //next_ol.append(creat_event(e))
    var _update = (e) => {
        next_ol.empty()
        header_next.html('Next : ' + (new Date(e.travel_time)).toDateString());
        next_ol.append(creat_event(e))
    }
    return { body: next_foot, update: _update }
}

function creat_event(e) {
    var _triptype = ["AP-Dept", "AP-Arrival", "pickup", "dropoff"]
    var li = $('<li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50 ">')
    li.attr('state', e.state)
    li.attr('name', 'trip_state')
    if ($('#state_select').val() != e.state) {
        li.hide();
    }
    var div = $('<div class="grid grid-cols-3 gap-1" style="width:95%">')
    var label = $('<span class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"></span>')
    if (e.trip_type == 1) {
        var label = $('<span class="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"></span>')
    } else if (e.trip_type == 2) {
        var label = $('<span class="inline-flex flex-shrink-0 items-center rounded-full bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20"></span>')
    } else if (e.trip_type == 3) {
        var label = $('<span class="inline-flex flex-shrink-0 items-center rounded-full bg-pink-50 px-1.5 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20"></span>')
    }
    var p = $('<p class="font-semibold text-gray-900"></p>');
    p.append(e.nickname)
    label.html('' + _triptype[e.trip_type])
    var time = $('<time class="flex text-gray-700">');
    time.attr('datetime', e.datetime)
    var svg = $('<svg class="mr-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg>')

    time.append(svg);
    time.append(e.pickup_time.length < 8 ? 0 + e.pickup_time : e.pickup_time)
    div.append($('<div class="grid justify-items-center">').append(time));
    div.append($('<div class="grid justify-items-center">').append(label))
    div.append($('<div class="grid justify-items-center">').append(p));
    var showaddress = e.departure_address || e.departure;
    if (e.trip_type === 1 || e.trip_type === 3) {
        showaddress = e.destination_address
    }
    div.append($('<div class="grid justify-items-center">').append($('<a class="underline decoration-pink-500">location</a>').attr('href', 'https://maps.google.com/?q=' + showaddress)))
    div.append($('<div class="grid justify-items-center">').append(e.trip_type == 1 ? $('<a class="underline decoration-indigo-500">Flight</a>').attr('href', 'http://google.com/search?q=' + e.flight_num) : $('<a>')));
    div.append($('<div class="grid justify-items-center">').append($('<p></p>').text(e.vehicle_type == 5 ? 'Camry' : 'Sienna')));
    li.append(div)

    var open_menu = $('<div class="relative ml-6 md:hidden" x-data="{ isOpen: false }"></div>')
    var action_btn = $('<button type="button"  @click="isOpen = !isOpen" class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="action-button" aria-expanded="false" aria-haspopup="true">A</button>')
    li.append(open_menu);
    open_menu.append(action_btn)

    var action_dropdown = $('<div @click.outside="isOpen = !isOpen" class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">')
    action_dropdown.attr("x-show", "isOpen");
    action_dropdown.attr("x-transition:enter", "transition ease-out duration-100");
    action_dropdown.attr('x-transition:enter-start', 'transform opacity-0 scale-95');
    action_dropdown.attr('x-transition:enter-end', 'transform opacity-100 scale-100');
    action_dropdown.attr('x-transition:leave', 'transition ease-in duration-75');
    action_dropdown.attr('x-transition:leave-start', 'transform opacity-100 scale-100');
    action_dropdown.attr('x-transition:leave-end', 'transform opacity-0 scale-95');
    action_dropdown.attr('role', 'action');
    action_dropdown.attr('aria-orientation', 'vertical');
    action_dropdown.attr('aria-labelledby', 'action-button');
    action_dropdown.attr('tabindex', '-1');

    var action_menu = $('<div class="py-1" role="none">')
    var option1 = $('<a class="text-gray-700 block px-4 py-2 text-sm" role="actionitem" tabindex="-1" id="action-item-0">Edit trip</a>').attr('href', '/pages_trip_page?trip=' + e.invoice)
    var option2 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="actionitem" tabindex="-1" id="action-item-1">Mark done</a>').click(() => {
        axios.get('/api_trips_change_trip_state', { params: { invoice: data.invoice, state: 0 } }).then((res) => {
            if (res.data.state === "success") {
                alert('change success')
                location.reload()
            } else {
                console.log(res.data.message)
            }

        })
    })
    //var option3 = $('<a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="actionitem" tabindex="-1" id="action-item-2">Copy info</a>')

    action_menu.append(option1)
    action_menu.append(option2)

    action_dropdown.append(action_menu)
    open_menu.append(action_dropdown)


    return li
}

var c = () => {
    var month_o = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var month_n = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var today = new Date(Date.now());
    var current_month = today.getMonth() + 1;
    var current_year = today.getFullYear();
    var todayTostring = current_year + '-' + current_month + '-' + today.getDate()
    var current_month_list = []
    var header = cal_header();
    var footer = cal_footer();
    var next_trip = foot_next_res();
    var body = cal_body(footer, todayTostring);
    var trips = {}
    var nexttrip;
    var Previous_month = (month, year) => {
        if (month === 1)
            return { year: year - 1, month: 12 }
        else
            return { year: year, month: month - 1 }
    }
    var Next_month = (month, year) => {
        if (month === 12)
            return { year: year + 1, month: 1 }
        else
            return { year: year, month: month + 1 }
    }
    function daysMonth(month, year) {
        if (month == 0)
            month = 12
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return month_o[month]
        } else {
            return month_n[month]
        }
    }
    var get_first_day_of_week = (YYYY, MM) => {
        var first_day = new Date(YYYY, MM - 1, 1);
        return first_day.getDay();
    }
    var Update_month_list = () => {
        var days = 42;
        current_month_list = [];
        var f = get_first_day_of_week(current_year, current_month);
        var l = daysMonth(current_month, current_year)
        var p_month = Previous_month(current_month, current_year);
        var last_month_left_start = daysMonth(p_month.month, p_month.year) - f + 1
        var n_month = Next_month(current_month, current_year);
        var tday;
        for (var i = 1; i < f; i++) {
            tday = new Date(p_month.year, p_month.month - 1, (last_month_left_start + i)).valueOf()
            current_month_list.push({
                day: last_month_left_start + i,
                month: p_month.month,
                year: p_month.year,
                iscurrent: false,
                events: trips[tday],
                value: p_month.year + '-' + p_month.month + '-' + (last_month_left_start + i)
            })
            days -= 1;
        }
        for (var i = 1; i < l + 1; i++) {
            tday = new Date(current_year, current_month - 1, i).valueOf()
            current_month_list.push({
                day: i,
                month: current_month,
                year: current_year,
                iscurrent: true,
                events: trips[tday],
                value: current_year + '-' + current_month + '-' + i
            });
            days -= 1;
        }
        for (var i = 1; i <= days; i++) {
            tday = new Date(n_month.year, n_month.month - 1, i).valueOf()

            current_month_list.push({
                day: i,
                month: n_month.month,
                year: n_month.year,
                iscurrent: false,
                events: trips[tday],
                value: n_month.year + '-' + n_month.month + '-' + i
            });
        }
        body.update(current_month_list);
        header.update(current_year, current_month)
    }
    var set_previous_month = () => {
        set_month(current_month - 1);

    }
    var set_next_month = () => {
        set_month(current_month + 1);
    }
    var set_month = (_month) => {
        current_month = _month;
        if (_month == 0) {
            current_month = 12;
            current_year -= 1
        } else if (_month == 12) {
            current_month = 1;
            current_year += 1
        }
        Update_month_list();
    }

    var cal = $('<div id="cal" class="lg:flex lg:h-full lg:flex-col">');
    var header = cal_header();
    header.next(set_next_month);
    header.previous(set_previous_month);

    cal.append(header.body);
    cal.append(body.body)
    cal.append(next_trip.body)
    cal.append(footer.body);
    $.get("api_trips_get_all_trips",
        function (data, textStatus, jqXHR) {
            tt = data.trips.sort((a, b) => { return a.travel_time - b.travel_time });

            var ts = 0;
            tt.forEach((element) => {
                ts = new Date(element.date).valueOf();
                if (trips[ts] === undefined) {
                    trips[ts] = []
                }
                if (element.state == 1 && nexttrip == undefined)
                    nexttrip = element
                trips[ts].push(element);
            })

            Update_month_list();
            next_trip.update(nexttrip);
            console.log(trips)
            console.log(current_month_list)
        }
    );
    //

    return (cal)
}