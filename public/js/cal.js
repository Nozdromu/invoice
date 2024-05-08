// var cal = () => {
//     var header = $('<header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">');

//     var body = {};
//     var footer = {};
// }

var cal_header = (today) => {
    var header = $('<header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">');
    var header_h1 = $('<h1 class="text-base font-semibold leading-6 text-gray-900">')
    var time = $('<time datetime="2022-01"></time>')
    time.attr('datetime', today.day.getFullYear() + '-' + (today.day.getMonth() + 1))
    time.html()
    header.append(header_h1.append(time));


    var control = $('<div class="flex items-center">');
    var month_control = $('<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">');
    var Previous_month_btn = $('<button type="button"class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">')
    var Previous_month_span = $('<span class="sr-only">Previous month</span>');
    var Previous_month_svg = $('<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" /></svg>')

    Previous_month_btn.append(Previous_month_span)
    Previous_month_btn.append(Previous_month_svg)

    var today_btn = $('<button type="button" class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Today</button>')
    var today_span = $('<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>')

    today_btn.append(today_span);

    var next_month_btn = $('<button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">')
    var next_month_span = $('<span class="sr-only">Next month</span>');
    var next_month_svg = $('<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /><.svg>');
    var next_month_path = $('')

    next_month_btn.append(next_month_span);
    next_month_btn.append(next_month_svg.append(next_month_path))

    month_control.append(Previous_month_btn);
    month_control.append(today_btn);
    month_control.append(next_month_btn);

    var month_view = $('<div class="hidden md:ml-4 md:flex md:items-center">');
    var month_view_body = $('<div class="relative" x-data="{ isOpen: false }">');
    var month_view_btn = $('<button type="button" @click="isOpen = !isOpen" class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">Month view</button>')
    var month_view_btn_svg = $('<svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>')
    var month_view_btn_svg_path = $('')

    month_view.append(month_view_body);
    month_view_body.append(month_view_btn.append(month_view_btn_svg))

    var month_view_dropdown = $('<div class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">')
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

    var open_menu_btn = $('<button type="button" @click="isOpen = !isOpen" class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">')
    var open_menu_btn_span = $('<span class="sr-only">Open menu</span>');
    var open_menu_btn_svg = $('<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>')
    //var open_menu_btn_svg_path = $('')

    open_menu.append(open_menu_btn);
    open_menu_btn.append(open_menu_btn_span)
    open_menu_btn.append(open_menu_btn_svg);

    var open_menu_menu = $($('<div class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></div>'))
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

    open_menu_menu.append($('<div class="py-1" role="none"></div>').append(open_menu_menu_l1_option))
    open_menu_menu.append($('<div class="py-1" role="none"></div>').append(open_menu_menu_l2_option))
    var open_menu_menu_l3 = $('<div class="py-1" role="none"></div>')
    open_menu_menu_l3.append(open_menu_menu_l3_option1);
    open_menu_menu_l3.append(open_menu_menu_l3_option2);
    open_menu_menu_l3.append(open_menu_menu_l3_option3);
    open_menu_menu_l3.append(open_menu_menu_l3_option4);
    open_menu_menu.append(open_menu_menu_l3)

    open_menu.append(open_menu_menu)

    control.append(month_control)
    control.append(month_view)
    control.append(open_menu)

    header.append(control)
    return header;
}

var cal_body = () => {
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
    var first_row = $('<div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">')



    cal_body.append(cal_body_header);
    cal_body.append(cal_body_body);
    return cal_body
}

// var cal_day = () => {

// }

var cal_footer = () => {
    var cal_footer = $('<div class="px-4 py-10 sm:px-6 lg:hidden">');
    return cal_footer;
}

var cal = () => {
    var today = {day:new Date(Date.now()),daylist:};
    var cal_core = calendar_core();
    var current = cal_core(today.getFullYear(), today.getMonth() + 1)
    console.log(current)
    var cal = $('<div id="cal" class="lg:flex lg:h-full lg:flex-col">');
    var header = cal_header(current);
    var body = cal_body(current);
    var footer = cal_footer();
    cal.append(header);
    cal.append(body)
    cal.append(footer);
    return cal
}

var calendar_core = () => {
    var month_o = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var month_n = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var month_name = [0, "January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"]
    var week_name_short = ["M", "T", "W", "T", "F", "S", "S"];
    var week_name_F3 = ["on", "ue", "ed", "hu", "ri", "at", "un"];



    function create_cal_table(_year, _month) {
        var days = 42;
        var cal_days = [];
        var f = get_first_day_of_week(_year, _month);
        var l = daysMonth(_month, _year)
        var last_month_left_start = daysMonth(_month - 1, _year) - f
        var p_month = Previous_month(_month, _year);
        var n_month = Next_month(_month, _year);
        for (var i = 0; i < f; i++) {

            cal_days.push({
                day: last_month_left_start + i,
                month: p_month.month,
                year: p_month.year,
                value: p_month.year + '-' + p_month.month + '-' + (last_month_left_start + i)
            })
            days -= 1;
        }
        for (var i = 1; i < l; i++) {
            cal_days.push({
                day: i,
                month: _month,
                year: _year,
                value: _year + '-' + _month + '-' + i
            });
            days -= 1;
        }
        for (var i = 1; i <= days; i++) {
            cal_days.push({
                day: i,
                month: n_month.month,
                year: n_month.year,
                value: n_month.year + '-' + n_month.month + '-' + i
            });
        }

        return cal_days
    }

    function daysMonth(month, year) {
        if (month < 0)
            month = 11
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return month_o[month]
        } else {
            return month_n[month]
        }
    }
    var Previous_month = (month, year) => {
        if (month === 0)
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
    // function daysMonth(month, year) {
    //     if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
    //         return {
    //             length: month_olympic[month],
    //             name: month_name[month],
    //             first_day_of_week: get_first_day_of_week(year, month)
    //         };
    //     } else {
    //         return {
    //             length: month_olympic[month],
    //             name: month_name[month],
    //             first_day_of_week: get_first_day_of_week(year, month)
    //         };
    //     }
    // }
    var get_first_day_of_week = (YYYY, MM) => {
        var first_day = new Date(YYYY, MM, 1);
        return first_day.getDay();
    }

    return create_cal_table
}


var c = () => {
    var x = {
        core: {
            year: 0,
            month: {
                value: 0,
                month_next: () => { },
                month_prev: () => { },
            },
            days: [],
        },
        surface: cal(core),
        view: {
            year: '',
            month: '',
            day: ''
        }
    }
}