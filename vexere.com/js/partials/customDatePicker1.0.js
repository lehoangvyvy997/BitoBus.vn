function initCustomDatePicker(isMobileCustom, isVietnamese) {
    var numMonth = 2;
    if ($(window).width() < 768) {
        numMonth = 1;
    }
    if (isVietnamese == 'vi') {
        $.datepicker.regional['vi'] = {
            dateFormat: 'dd-mm-yy',
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            showButtonPanel: false,
            gotoCurrent: true,
            firstDay: 1,
            todayHighlight: false,
            numberOfMonths: numMonth,
            closeText: 'Đóng',
            prevText: '&#x3c;Trước',
            nextText: 'Tiếp&#x3e;',
            currentText: 'Hôm nay',
            monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
            'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
            monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
            dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            weekHeader: 'Tu',
            beforeShow: function (input, inst) {
                if (isMobileCustom) {
                    if ($(window).width() < 768) {

                        $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                        //$.datepicker._pos[0] = $.datepicker._pos[0] - 200; //left

                        if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 30; //top
                        } else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 320; //top
                        }

                        jQuery(this).datepicker('option', {
                            minDate: 0
                        });

                        setTimeout(function () {
                            jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current")
                               .hide();
                        }, 1);

                        $('html, body').animate({
                            scrollTop: $.datepicker._pos[1] - 320
                        }, 500);
                        $(".tim-ve-2015 #searchSubmit").attr('style', 'margin-top: 238px !important');
                    }
                    else {
                        $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                        //$.datepicker._pos[0] = $.datepicker._pos[0] - 200; //left
                        if ($(input).attr("id") == "departDate") {
                            var departDateOffset = $("#departDate").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 30; //top
                        } else if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 30; //top
                        } else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 300; //top
                        }

                        jQuery(this).datepicker('option', {
                            minDate: 0
                        });

                        setTimeout(function () {
                            jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current")
                               .hide();
                        }, 1);
                    }
                }
            },
            onClose: function (input, inst) {
                if (isMobileCustom) {
                    $(".tim-ve-2015 #searchSubmit").removeAttr('style');
                }
            }
        };
    } else {
        $.datepicker.regional['vi'] = {
            dateFormat: 'dd-mm-yy',
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            showButtonPanel: false,
            gotoCurrent: true,
            firstDay: 1,
            todayHighlight: false,
            numberOfMonths: numMonth,
            beforeShow: function (input, inst) {
                if (isMobileCustom) {
                    if ($(window).width() < 768) {
                        $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                        //$.datepicker._pos[0] = $.datepicker._pos[0] - 200; //left
                        if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 30; //top
                        } else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 320; //top
                        }
                        jQuery(this).datepicker('option', {
                            minDate: 0
                        });
                        setTimeout(function () {
                            jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current")
                               .hide();
                        }, 1);
                        $('html, body').animate({
                            scrollTop: $.datepicker._pos[1] - 320
                        }, 500);
                        $(".tim-ve-2015 #searchSubmit").attr('style', 'margin-top: 238px !important');
                    }
                    else {
                        $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                        //$.datepicker._pos[0] = $.datepicker._pos[0] - 200; //left
                        if ($(input).attr("id") == "departDate") {
                            var departDateOffset = $("#departDate").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 30; //top
                        } else if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 30; //top
                        }
                        else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 300; //top
                        }
                        jQuery(this).datepicker('option', {
                            minDate: 0
                        });
                        setTimeout(function () {
                            jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current")
                               .hide();
                        }, 1);
                    }
                }
            },
            onClose: function (input, inst) {
                if (isMobileCustom) {
                    $(".tim-ve-2015 #searchSubmit").removeAttr('style');
                }
            }
        };
    }

    $.datepicker.setDefaults($.datepicker.regional['vi']);
}