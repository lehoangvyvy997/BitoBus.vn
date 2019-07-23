//Helpers
//Convert money format
Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
Date.prototype.DDMMYYYY = function () {
    this.setDate(this.getDate() + 1); // set date is tomorrow
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [(dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    this.getFullYear()
    ].join('');
};

var expanded = false;
var phoneTipGlobal = null;
var offerTipGlobal = null;
var __tmp = true; // sap xep dau tien la sap xep tang
var company_id = [];
var _totalDiscount = 0;
var culture = null;
var translatorParam = null;
var sendItems = [];
var scrollTimeout;

//prevent key when scroll
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
var isRouteLoading = false;
var isSeatLoading = false;
var xhr = undefined;

function checkboxchecked() {
    //Hide all item
    var checkedlistdiscount = $('.list-discount input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    // #trasporter-list-nav
    var checkedtrasporter = $('.trasporter-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedfromtime = $('.from-time-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedstartpointlist = $('.start-point-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedendpointlist = $('.end-point-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedvehicletypelist = $('.vehicle-type-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedFacilities = $('.facilities-type-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-remark');
    }).get().join("|");

    var checkedseattypelist = $('.seat-type-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");
    //list mobile
    $('.list-discount-mobi input[type=checkbox]').filter(function () {
        return checkedlistdiscount.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    $('.trasporter-list-mobi input[type=checkbox]').filter(function () {
        var arrTranperterID = checkedtrasporter.split("|");
        return arrTranperterID.indexOf($(this).attr('data-id')) > 0;
    }).prop('checked', true);

    $('.from-time-list-mobi input[type=checkbox]').filter(function () {
        return checkedfromtime.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    $('.start-point-list-mobi input[type=checkbox]').filter(function () {
        return checkedstartpointlist.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    $('.end-point-list-mobi input[type=checkbox]').filter(function () {
        return checkedendpointlist.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    $('.vehicle-type-list-mobi input[type=checkbox]').filter(function () {
        return checkedvehicletypelist.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    $('.facilities-type-list-mobi input[type=checkbox]').filter(function () {
        return checkedFacilities.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    $('.seat-type-list-mobi input[type=checkbox]').filter(function () {
        return checkedseattypelist.indexOf($(this).attr('data-id')) >= 0;
    }).prop('checked', true);

    //filter checkbox display on filter screen
    $('.search-detail .list-check li').hide().filter(function () {
        var trasporter = checkedtrasporter.split("|");
        var fromtime = checkedfromtime.split("|");
        var startpointlist = checkedstartpointlist.split("|");
        var endpointlist = checkedendpointlist.split("|");
        var vehicletypelist = checkedvehicletypelist.split("|");
        var listdiscount = checkedlistdiscount.split("|");
        var listFacilities = checkedFacilities.split("|");
        var seattypelist = checkedseattypelist.split("|");

        for (var i = 0; i < trasporter.length; i++) {
            if ($(this).attr('data-name') == trasporter[i]) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }
        for (var i = 0; i < fromtime.length; i++) {
            if ($(this).attr('data-name') == fromtime[i]) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }

        for (var i = 0; i < startpointlist.length; i++) {
            var value = startpointlist[i];
            if (~value.indexOf($(this).attr('data-name'))) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }

        for (var i = 0; i < endpointlist.length; i++) {
            var value = endpointlist[i];
            if (~value.indexOf($(this).attr('data-name'))) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }
        for (var i = 0; i < vehicletypelist.length; i++) {
            if ($(this).attr('data-name') == vehicletypelist[i]) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }
        for (var i = 0; i < listdiscount.length; i++) {
            if ($(this).attr('data-name') == listdiscount[i]) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }
        for (var i = 0; i < listFacilities.length; i++) {
            if ($(this).attr('data-remark') == listFacilities[i]) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }
        for (var i = 0; i < seattypelist.length; i++) {
            if ($(this).attr('data-name') == seattypelist[i]) {
                $(this).find("input[type='checkbox']").prop('checked', true);
                return true;
            }
        }
    }).show();

    //If no selected item then show all
    if (checkedtrasporter.length == 0
        && checkedfromtime.length == 0
        && checkedstartpointlist.length == 0
        && checkedendpointlist.length == 0
        && checkedvehicletypelist.length == 0
        && checkedlistdiscount.length == 0
        && checkedFacilities.length == 0
        && checkedseattypelist.length == 0) {
        $('.search-detail').css("display", "none");
    } else {
        $('.search-detail').css("display", "inline-block");
    }
}

function changeToCloseButton(object) {
    //Change to close button
    jQuery(object).hide();
    jQuery(object).next('a.open').show();

    //For mobile button
    var mbclass = $(object).data('tripcode');
    var mobileObj = $('.a-' + mbclass);
    for (var i = 0; i < mobileObj.length; i++) {
        jQuery(mobileObj[i]).hide();
        jQuery(mobileObj[i]).next('a.open').show();
    }

}
function rollBackToNormalButton(object) {
    //Change to close button
    jQuery(object).hide();
    jQuery(object).prev('a.closed').show();
}
function hideDetailTab(closest) {
    closest.find('div.ticket-booking-details').remove();
    closest.find('div.ticket-detail-tabs').hide();
}

function submitRouteFeedback(form) {

    //var $form = $(this);
    // let's select and cache all the fields
    var $inputs = form.find("input, select, button, textarea");
    // serialize the data in the form
    var serializedData = form.serialize();

    // let's disable the inputs for the duration of the ajax request
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    $.ajax({
        url: "/" + culture + "/Review/CreateRouteInfoReview",
        type: "post",
        data: serializedData,
        success: function (response) {
            return response.Success;
        },
        error: function () {
            return false;
        }
    });
}

function submitDraftBookingForm() {
    // let's select and cache all the fields
    var $inputs = form.find("input, select, button, textarea");
    // serialize the data in the form
    var serializedData = form.serialize();

    // let's disable the inputs for the duration of the ajax request
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    $.ajax({
        url: "/" + culture + "/Review/CreateRouteInfoReview",
        type: "post",
        data: serializedData,
        success: function (response) {
            return response.Success;
        },
        error: function () {
            return false;
        }
    });
}

function updateBookingButton(closest, mode, IsInVXRWorkingTime, trackindex, isTetTicket) {
    //debugger;
    $.ajax({
        url: "/" + culture + "/Booking/GetBookingTicketStatusButton",
        type: "get",
        async: false,
        data: { mode: mode, IsInVXRWorkingTime: IsInVXRWorkingTime, trackIndex: trackindex, isTetTicket: isTetTicket },
        success: function (response) {
            closest.find('.price-col').find('.ticket-ac-btn').remove();
            closest.find('.price-col').find('.no-ticket').remove();
            closest.find('.price-col').append(response);
        },
        error: function () {
            return false;
        }
    });
}

//Main functions
function maskEventOnOperatorFilter() {
    $('#trasporter-list-nav').change(function () {
        var URL = window.location.href;
        var ParseURL = URL.split('#');
        var operatorParam = "";
        for (var i = 0; i < $("#trasporter-list-nav option").length; i++) {
            if ($("#trasporter-list-nav option")[i].selected) {
                operatorParam += "o" + $("#trasporter-list-nav option")[i].value;
            }
        }
        if (operatorParam != "") {
            URL = ParseURL[0];
            var triggerIndex = ParseURL[1].split('-');
            URL += "#" + triggerIndex[0] + "-";
            window.location = URL + operatorParam;
        } else {
            URL = ParseURL[0];
            var triggerIndex = ParseURL[1].split('-');
            URL += "#" + triggerIndex[0];
            window.location = URL;
        }
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        checkboxchecked();
    });
    $("#trasporter-list-nav").dropdownchecklist({
        emptyText: Language["chxeh1"],
        width: 155,
        onItemClick: function () {
            checkboxchecked();
        }
    });

    //For mobile
    $('#li-bus-operator, .icon-filter-fixed').click(function () {
        //rollback filter dynamic state
        $('.filter-mobile-popup li.dynamic-item').addClass('hidden-xs');
        $('.filter-mobile-popup li.seemore-filter').removeClass('hidden-xs');
        $('.filter-mobile-popup li.collapsed-filter').addClass('hidden-xs');

        $('nav.header-blue').toggleClass('over-lay-fixed');
        $('.filter-mobile-popup').fadeIn();
    });

    $('#li-rating').click(function () {
        $('#rateFilter').trigger('click');
    });
    $('#li-departure-time').click(function () {
        $('#departure-time').trigger('click');
    });

    $('#li-filter').click(function () {
        //rollback filter dynamic state
        $('.filter-mobile-popup li.dynamic-item').addClass('hidden-xs');
        $('.filter-mobile-popup li.seemore-filter').removeClass('hidden-xs');
        $('.filter-mobile-popup li.collapsed-filter').addClass('hidden-xs');

        //Show popup
        $('nav.header-blue').toggleClass('over-lay-fixed');
        $('.filter-mobile-popup').fadeIn();
    });


    $('#li-fare').click(function () {
        $('#fareFilter').trigger('click');
    });

    $('.button-select').click(function () {
        $('nav.header-blue').toggleClass('over-lay-fixed');
        $('.filter-mobile-popup').fadeOut();

        //Filter action
        var selectedItems = $('.popup-body li.selected');

        //Reset
        $('#trasporter-list-nav').val('');
        $.each(selectedItems, function (i, e) {
            $("#trasporter-list-nav option[value='" + $(e).data('id') + "']").prop("selected", true);
        });
        if ($('#trasporter-list-nav').val() == null || $('#trasporter-list-nav').val() == '' || $('#trasporter-list-nav').val().length == 0) {
            $('li#li-bus-operator').removeClass('filterring');
        } else {
            $('li#li-bus-operator').addClass('filterring');
        }
        checkboxchecked();
    });

    $('.popup-body li').click(function () {
        $(this).toggleClass('selected');
    });
}

function maskEventOnFromStopFilter() {
    var label = "Tp. Ho Chi Minh";
    var val = [];
    var $select = $("#start-point-list-nav");
    var $select1 = $("#vehicle-type-list-nav");
    var $select3 = $("#seat-type-list-nav");
    var $select2 = $("#from-time-list-nav");

    $select.find("option").each(function () {
        var $this = $(this),
            text = $this.text().toLowerCase();

        if (~text.indexOf('hcm') || ~text.indexOf('hồ chí minh') || ~text.indexOf('ho chi minh')) {
            val.push($this.val());
            $this.remove();
        }
    });

    if (val.length) {
        $select.prepend('<option value="' + val.join(",") + '">' + label + '</option>');
    }

    $select.on('change', function () {
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        checkboxchecked();
    });
    $select.dropdownchecklist({
        emptyText: /*'Nơi xuất phát'*/Language["opp"],
        width: 145
    });

    $select1.on('change', function () {
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        checkboxchecked();
    });
    $select1.dropdownchecklist({
        emptyText: Language["BusType"],
        width: 145
    });
    $select3.on('change', function () {
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        checkboxchecked();
    });
    $select3.dropdownchecklist({
        emptyText: Language["SeatType"],
        width: 145
    });
    $select2.on('change', function () {
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        checkboxchecked();
    });
    $select2.dropdownchecklist({
        emptyText: Language["giodi"],
        width: 145
    });
}
function maskEventOnToStopFilter() {
    var label = "Tp. Ho Chi Minh";
    var val = [];
    var $select = $("#end-point-list-nav");
    $select.find("option").each(function () {
        var $this = $(this),
            text = $this.text().toLowerCase();

        if (~text.indexOf('hcm') || ~text.indexOf('hồ chí minh') || ~text.indexOf('ho chi minh')) {
            val.push($this.val());
            $this.remove();
        }
    });

    if (val.length) {
        $select.prepend('<option value="' + val.join(",") + '">' + label + '</option>');
    }

    $select.on('change', function () {
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        //changeDropdown();
        checkboxchecked();
    });

    $select.dropdownchecklist({
        emptyText: /*'Nơi đến'*/Language["edp"],
        width: 145
    });
}

function maskEventOnRatingFilter() {
    $("#raty-nav-input").dropdownchecklist({
        emptyText: "Đánh giá",
        width: 130,
        onItemClick: function (checkbox, selector) {
            $("#price-sub-nav").prop("selectedIndex", 0).trigger('change');
            if (checkbox.val() == 1) {
                //sortUsingNestedText_increase($('table.result-list'), '.result-item', '.rate-star');
                $("#current-page-sort-field").val("Rating");
                $("#current-page-sort-direction").val("ASC");
                loadRouteOnInit();
            }
            else if (checkbox.val() == 2) {
                //sortUsingNestedText_decrease($('table.result-list'), '.result-item', '.rate-star');
                $("#current-page-sort-field").val("Rating");
                $("#current-page-sort-direction").val("DES");
                loadRouteOnInit();
            }
        }
    });

}

function maskEventOnPriceFilter() {
    $("#price-sub-nav").dropdownchecklist({
        emptyText: "Giá vé",
        width: 130,
        onItemClick: function (checkbox, selector) {
            $("#raty-nav-input").prop("selectedIndex", 0).trigger('change');
            if (checkbox.val() == 1) {
                //sortUsingNestedText_increase($('table.result-list'), '.result-item', '.price');
                $("#current-page-sort-field").val("Price");
                $("#current-page-sort-direction").val("ASC");
                loadRouteOnInit();
            }
            else if (checkbox.val() == 2) {
                //sortUsingNestedText_decrease($('table.result-list'), '.result-item', '.price');
                $("#current-page-sort-field").val("Price");
                $("#current-page-sort-direction").val("DES");
                loadRouteOnInit();
            }
        }
    });
}

function maskTipPopOver() {

    $(document).on('click', '.click-link-phone', function () {
        phoneTipGlobal = this;
        var preIsClicked = $(this).attr('is-clicked');
        $(this).attr('is-clicked', 'true');
        var tooltipContent = $($(this).nextAll(".phone-tip")[0]).html();
        $(this).tooltipster({
            functionPosition: function (instance, helper, position) {
                position.coord.left -= 100;
                position.size.width = helper.geo.origin.size.width + 300;
                return position;
            },
            content: $(tooltipContent),
            animation: 'fade',
            speed: 250,
            touchDevices: true,
            trigger: 'click',
            interactive: 'true',
            interactiveTolerance: 200,
            debug: false

        });
        $(this).tooltipster('show');

        //Send GA tracking
        if (preIsClicked != 'true') {
            var info = getRouteInfoObject(this);
            console.log(info);
            //dataLayer.push({
            //    'event': 'showNumber',
            //    'flow': FLOW_NON_ECOM,
            //    'branchtype': 'non-ecommerce',
            //    'name': info.routeName + ' - ' + $('#span-current-date').val().replace(/-/g, '/') + ' - ' + info.sFromTime,
            //    'id': info.tripId,
            //    'price': info.fare,
            //    'brand': info.operatorName,
            //    'category': info.routeName,
            //    'variant': info.sFromTime,
            //    'eventCallback': function () {
            //    }
            //});
        }
    })

    $(document).on('mouseleave', '.click-link-phone', function () {
        if ($(this).attr('is-clicked') == 'true') {
            $(this).attr('is-clicked', 'false');
        } else {
            return;
        }
        thiz = this;
        setTimeout(function () {
            var hover = false;
            var ele = $('.tooltipster-content')
            if (ele != null) {
                hover = $(ele).is(':hover');
            }
            if (!hover) {
                $(thiz).tooltipster('hide')
            }
        }, 500)
    })

    //$(window).scroll(function () {
    //    $(phoneTipGlobal).tooltipster('hide');

    //    if (offerTipGlobal != null) {
    //        $(offerTipGlobal).tooltipster('hide');
    //        //$(offerTipGlobal).text(Language['KnowMore']);
    //        $(this).attr('isshow', '0');
    //        //$(offerTipGlobal).next().text('>>');
    //    }
    //    offerTipGlobal = null;
    //})

    $(".noti-detail").click(function () {
        if ($(this).attr('isshow') == null || $(this).attr('isshow') == '0') {
            var tooltipContent = $(this).closest('.payoo-offer-container').find('.payoo-offer-tip').html();
            $(this).tooltipster({
                content: $(tooltipContent),
                animation: 'fade',
                speed: 250,
                touchDevices: true,
                trigger: 'click',
                interactive: 'true',
                interactiveTolerance: 200,
                debug: false
            });

            //$(this).text(Language['KnowLess']);

            $(this).tooltipster('show');
            offerTipGlobal = this;
            $(this).attr('isshow', '1');
            console.log('show')
        } else {
            //$(this).text(Language['KnowMore']);
            $(this).attr('isshow', '0');
            $(this).tooltipster('hide');
            offerTipGlobal = null;
            console.log('hide')
        }

    });

    $(".noti-detail-mobi").click(function () {
        if ($(this).attr('isshow') == null || $(this).attr('isshow') == '0') {
            var tooltipContent = $(this).closest('.payoo-offer-container').find('.payoo-offer-tip').html();
            $(this).tooltipster({
                content: $(tooltipContent),
                animation: 'fade',
                speed: 250,
                touchDevices: true,
                trigger: 'click',
                interactive: 'true',
                interactiveTolerance: 200,
                debug: false
            });


            $(this).tooltipster('show');
            offerTipGlobal = this;
            $(this).attr('isshow', '1');
            console.log('show')
        }

    });

    $(".benefit-icons").mouseleave(function () {
        $(this).attr('clicking', '0');
        $(this).tooltipster('hide');
    });

    $(".benefit-icons").click(function () {
        //var tooltipContent = $(this).children('.benefit-tip').html();
        //$(this).tooltipster({
        //    content: $(tooltipContent),
        //    animation: 'fade',
        //    speed: 250,
        //    touchDevices: false,
        //    trigger: 'click',
        //    interactive: 'true',
        //    interactiveTolerance: 100,
        //    debug: false
        //    //maxWidth: '300'
        //});
        //$(this).tooltipster('show');
    });

    //$(".depart-station").mouseleave(function () {
    //    $(this).attr('hovering', '-1');
    //    $(this).attr('clicking', '0');
    //    //$(this).tooltipster('hide');
    //});

    //$(".depart-station").click(function () {
    //    if ($(this).attr('clicking') == '1') {
    //        $(this).attr('clicking', '0');
    //    } else {
    //        $(this).attr('clicking', '1');
    //    }
    //});

    //$(".depart-station").hover(function () {
    //    var self = $(this);
    //    if ($(this).attr('hovering') == '-1')
    //        $(this).attr('hovering', '0');
    //    else
    //        $(this).attr('hovering', '1');

    //    if ($(this).attr('data-appended') == '0') {
    //        $(this).attr('data-appended', '1');
    //        var departureDate = $(this).closest('.result-item').attr('departure-date');
    //        $.ajax({
    //            url: '/vi-VN/Booking/GetPickupInfo',
    //            type: 'post',
    //            data: { trip_id: $(this).data('trip-id'), time: $(this).data('time'), bus_stop_id: $(this).data('id'), date: departureDate, trip_code: $(this).data('tripcode') },
    //            success: function (data) {
    //                var model = JSON.parse(data.json_string),
    //                    hour = model.time.split(':')[0],
    //                    minute = model.time.split(':')[1];
    //                window.abc1 = model;
    //                for (var i = 0; i < model.from.pickup.length; i++) {
    //                    var new_hour = (Math.floor(+hour + (+model.from.pickup[i].duration / 60)) + Math.floor((+minute + (+model.from.pickup[i].duration % 60)) / 60) % 24),
    //                        new_minute = ((+minute + (+model.from.pickup[i].duration % 60)) % 60);
    //                    if (new_minute < 10) {
    //                        new_minute = "0" + new_minute;
    //                    }

    //                    self.find(".div-pickup-info-" + model.bus_stop_id + "-" + model.time.replace(":", "-")).append("<p style='margin-top: 20px; width: 100%;'>" + model.from.pickup[i].name + "<span style='float:right;'>" + new_hour + ":" + new_minute + "</span>" + "</p>")
    //                }
    //                var tooltipContent = self.children('.depart-station-tip').html();
    //                self.tooltipster({
    //                    content: $(tooltipContent),
    //                    animation: 'fade',
    //                    speed: 250,
    //                    touchDevices: false,
    //                    trigger: 'click',
    //                    interactive: 'true',
    //                    interactiveTolerance: 100,
    //                    debug: false
    //                    //maxWidth: '300'
    //                });

    //                if (self.attr('clicking') == '1') {
    //                    self.tooltipster('show');
    //                } else {
    //                    self.tooltipster('hide');
    //                }
    //            }
    //        })
    //    }
    //});

    //$(".destination-station").mouseleave(function () {
    //    $(this).attr('hovering', '-1');
    //    $(this).attr('clicking', '0');
    //    //$(this).tooltipster('hide');
    //});

    $(".destination-station").click(function () {
        if ($(this).attr('clicking') == '1') {
            $(this).attr('clicking', '0');
        } else {
            $(this).attr('clicking', '1');
        }
    });

    //$(".destination-station").click(function () {
    //    var self = $(this);
    //    if ($(this).attr('hovering') == '-1')
    //        $(this).attr('hovering', '0');
    //    else
    //        $(this).attr('hovering', '1');
    //    if ($(this).attr('data-appended') == '0') {
    //        $(this).attr('data-appended', '1');
    //        var departureDate = $(this).closest('.result-item').attr('departure-date');
    //        $.ajax({
    //            url: '/vi-VN/Booking/GetPickupInfo',
    //            type: 'post',
    //            data: { trip_id: $(this).data('trip-id'), time: $(this).data('time'), bus_stop_id: $(this).data('id'), date: departureDate, trip_code: $(this).data('tripcode') },
    //            success: function (data) {

    //                var model = JSON.parse(data.json_string),
    //                    hour = model.time.split(':')[0],
    //                    minute = model.time.split(':')[1];
    //                window.abc2 = model;
    //                for (var i = 0; i < model.to.pickup.length; i++) {
    //                    var new_hour = (Math.floor(+hour + (+model.to.pickup[i].duration / 60)) + Math.floor((+minute + (+model.to.pickup[i].duration % 60)) / 60) % 24),
    //                        new_minute = ((+minute + (+model.to.pickup[i].duration % 60)) % 60);
    //                    if (new_minute < 10) {
    //                        new_minute = "0" + new_minute;
    //                    }
    //                    self.find(".div-pickup-info-" + model.bus_stop_id + "-" + model.time.replace(":", "-")).append("<p style='margin-top: 17px; width: 100%;'>" + model.to.pickup[i].name + " " + model.to.pickup[i].address + "<span style='float:right;'>" + new_hour + ":" + new_minute + "</span>" + "</p>")
    //                }
    //                var tooltipContent = self.children('.destination-station-tip').html();
    //                self.tooltipster({
    //                    content: $(tooltipContent),
    //                    animation: 'fade',
    //                    speed: 250,
    //                    touchDevices: false,
    //                    trigger: 'click',
    //                    interactive: 'true',
    //                    interactiveTolerance: 100,
    //                    debug: false
    //                    //maxWidth: '300'
    //                });

    //                if (self.attr('clicking') == '1') {
    //                    self.tooltipster('show');
    //                } else {
    //                    self.tooltipster('hide');
    //                }
    //            }
    //        })
    //    }

    //});

    $(".rating-link").hover(function () {
        var tooltipContent = $(this).children('.bus-rating-tip').html();
        $(this).tooltipster({
            content: $(tooltipContent),
            animation: 'fade',
            speed: 250,
            touchDevices: false,
            trigger: 'hover',
            interactive: 'true',
            position: 'bottom-right',
            interactiveTolerance: 100,
            debug: false
            //maxWidth: '300'
        });
        $(this).tooltipster('show');
    });
}

function maskEventOnFromTime() {
    //$('.start-time-drop').customSelect();
    //Trigger when change
    jQuery('select.start-time-drop').unbind();
    jQuery('select.start-time-drop').bind('change', function () {
        var closest = jQuery(this).closest('.result-item');

        //Update to times
        closest.find(".stop-time-drop").prop("selectedIndex", $(this).prop("selectedIndex")).trigger('update');

        //Update booking button
        // updateBookingButton(closest, $(this).find('option:selected').attr("data-busticketstatus"), $(this).find('option:selected').attr("data-workingtime"), $(this).find('option:selected').attr("trackindex"), $(this).find('option:selected').attr("data-istetticket"));

        //Update booking detail info
        if ($('.ticket-booking-details').is(':visible')) {
            // show loading
            showLoading();
            //Trigger click dat ve, dien thoai button
            if (closest.find('a.hasSeat').length > 0) {
                closest.find('a.hasSeat').trigger('click');
            }
            else if (closest.find('a.noSeat').length > 0) {
                closest.find('a.noSeat').trigger('click');
            }
        }
        //Update fare
        if (closest.data("isupdatingfare") != 1) {
            var farePerTrip = $("option:selected", this).attr("data-fare");
            closest.find("h6.price").html((+farePerTrip).format(0, 3, '.', '.') + " <small style='vertical-align: top;'>đ</small>");
        }

    });

}

function maskEventOnToTime() {
    //$('.stop-time-drop').customSelect();
    //Trigger when change
    jQuery('select.stop-time-drop').unbind();
    jQuery('select.stop-time-drop').bind('change', function () {

        var closest = jQuery(this).closest('.result-item');

        //Update from times
        closest.find("select.start-time-drop").prop("selectedIndex", $(this).prop("selectedIndex")).trigger('update');

        //Update booking button
        // updateBookingButton(closest, $(this).find('option:selected').attr("data-busticketstatus"), $(this).find('option:selected').attr("data-workingtime"), $(this).find('option:selected').attr("trackindex"));

        //Update booking detail info
        if ($('.ticket-booking-details').is(':visible')) {
            // show loading
            showLoading();
            //Trigger click dat ve, dien thoai button
            if (closest.find('a.hasSeat').length > 0) {
                closest.find('a.hasSeat').trigger('click');
            }
            else if (closest.find('a.noSeat').length > 0) {
                closest.find('a.noSeat').trigger('click');
            }
        }
    });
}

function maskEventOnDetailTab() {
    jQuery('.ticket-detail-tabs a').unbind();
    jQuery('.ticket-detail-tabs a').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        var rel = jQuery(this).attr('aria-controls');
        var href = jQuery(this).attr('href');
        var parent_ul = jQuery(this).parent().parent();
        var parent_li = jQuery(this).parent();
        var index = parent_ul.attr("fromstop-id") + "-" + parent_ul.attr("tostop-id");
        var compId = parent_ul.attr("data-compid");
        var tripid = parent_ul.attr("data-tripid");
        var trip_date = $("#departDate").val();
        var $tabContent = parent_ul.next().children('#' + rel);

        //Set active tab
        parent_ul.children('li').removeClass('active');
        parent_li.addClass('active');
        if ($tabContent.children().length == 0) { //Never load before
            //Hide all tab content
            $tabContent.parent().children('.tab-pane').removeClass('active');
            $tabContent.addClass('active');
            //Show loading
            $tabContent.parent().append($(".loader-container"));
            $(".loader").show();
            //Get data
            var getFromBookingPage = false;
            if (jQuery(this).hasClass('ticket-review-tab')
                || jQuery(this).hasClass('ticket-images-tab')
                || jQuery(this).hasClass('ticket-cancellation-tab')
                || jQuery(this).hasClass('ticket-utilities-tab')) {
                getFromBookingPage = true;
            }

            var url = href;
            var a = translatorParam
            if (!href) {
                return;
            }
            var data = { id: compId, index: index };
            if (href.indexOf("hinh-anh") >= 0 || href.indexOf("photos") >= 0) {
                //$(".loader").hide();
                ////Hide all tab content
                //$tabContent.parent().children('.tab-pane').removeClass('active');
                ////Show current tab
                //$tabContent.addClass('active');
                //return false;
                url = "/" + culture + "/BusInfo/Gallery?id=" + compId;

            } else if (href.indexOf("danh-gia") >= 0 || href.indexOf("reviews-ratings") >= 0) {
                url = "/" + culture + "/BusInfo/RatingReview?" + translatorParam;
            }
            else if (href.indexOf("chinh-sach-huy-ve") >= 0 || href.indexOf("cancellation-policy") >= 0) {
                url = "/" + culture + "/BusInfo/Polyce";
                data = { id: compId, tripid: tripid, trip_date: trip_date };
            }
            else if (href.indexOf("tien-ich") >= 0) {
                url = "/" + culture + "/BusInfo/Utilities";
                data = { id: compId };
            }

            setTimeout(function () {
                $.ajax({
                    url: url,
                    data: data,
                    success: function (result) {
                        //Hide loading
                        //parent.find('.loading').hide();
                        //Append tab
                        $(".loader").hide();
                        //if ($tabContent.attr('appended') != '1') {
                        $tabContent.append(result);
                        //$tabContent.attr('appended', '1');
                        //}

                    }
                });
            }, 1000);

        } else {
            //Hide all tab content
            $tabContent.parent().children('.tab-pane').removeClass('active');
            //Show current tab
            $tabContent.addClass('active');
        }

        return false;
    });
}

function maskEventOnCloseTabButton() {
    //Close div tabs
    jQuery('.btn-close-road').unbind();
    jQuery('.btn-close-road').click(function () {
        //debugger;
        _totalDiscount = 0;
        jQuery(this).closest('.ticket-detail-tabs').fadeOut("fast");
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        rollBackToNormalButton($(jQuery(this).closest('.ticket-detail-tabs')).prev(".result-item").find("a.open"));
    });
}

function maskEventOnCommentButton() {
    $('a.comment-btn-popup').unbind();

    $('a.comment-btn-popup').fancybox({
        type: 'iframe',
        padding: 0,
        height: 562,
        maxHeight: 562,
        scrollOutside: false,
        afterShow: function () {
            if ($(window).width() < 768) {
                document.ontouchmove = function (event) {
                    event.preventDefault();
                }
            }
        },
        afterClose: function () {
            if ($(window).width() < 768) {
                document.ontouchmove = function (event) {

                }
            }
        },
        helpers: {
            overlay: { closeClick: false } // prevents closing when clicking OUTSIDE fancybox
        },
        fitToView: false,
        iframe: {
            preload: false
        }
    });
}

function maskEventOnCloseButton() {
    $(document).on('click', 'a.open', null, function () {
        //Close tab
        var closest = $(this).closest('.result-item');

        //Hide all details tag, tabs tag
        if (closest.next('li').hasClass("ticket-booking-details")) {
            //Close for booking ticket tr
            closest.next('li').fadeOut().remove();
        } else {
            //Close for detail tab tr
            closest.next('li').fadeOut();
            $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        }
        //Change to open button
        rollBackToNormalButton(this);
    });
}

function maskEventOnCallCenterButton() {
    //Book seat, get call center

    $(document).on('click', 'a.noSeat', null, function () {
        $('.ticket-booking-details').remove();

        //if ($(window).width() > 991) {
        //    var scrollPos = Number($(this).scrollTop()) - 550;
        //    $(document).scrollTop = scrollPos;

        //} else {
        //    $(document).scrollTop = $($(this).parent().parent()).scrollTop();
        //}

        rollBackToNormalButton($('a.open'));

        //Get call center
        var isMobile = false;
        if ($(window).width() < 768) {
            isMobile = true;
        }

        var closest = $(this).closest('.result-item');
        var shareURL = window.location.href;

        //save current route url to localstorage for goback action
        localStorage['VXR_Selected_Route_URL'] = shareURL;


        $('#txtShareUrl').val(shareURL);

        //Hide all details tag, tabs tag
        hideDetailTab(closest);

        //Show loading
        showLoading();

        //Calculate deptime
        var sFromTime = "";
        var sToTime = "";
        var tripIdChild = 0;
        var pickupDate = "";

        if (closest.find("#FromTimes").length > 0) {
            sFromTime = closest.find("#FromTimes").val().trim();
            tripIdChild = closest.find("#FromTimes").attr("data-tripid");
            pickupDate = closest.find("#FromTimes").find('option:selected').attr("data-pickupdate");
        }
        else {
            sFromTime = closest.find(".span-from-time").text().trim().substr(0, 5);
            tripIdChild = closest.find(".span-from-time").attr("data-tripid");
            pickupDate = closest.find(".span-from-time").attr("data-pickupdate");
        }
        if (closest.find("#ToTimes").length > 0) {
            sToTime = closest.find("#ToTimes").val().trim();
        } else {
            sToTime = closest.find(".span-to-time").text().trim();
        }
        var depTime = $('#span-current-date').val().replace(/-/g, '/') + "-" + sFromTime;
        depTime = depTime.replace(/\//g, "-").replace(":", "-") + "-00";
        var depTimeAtBeginningRoute = closest.attr('data-fromtimedeparturetime');
        var fromBusStopName = closest.attr('frombusstop-name');
        var toBusStopName = closest.attr('tobusstop-name');
        var toTimeAtEndPoint = closest.attr('data-to-time');
        depTimeAtBeginningRoute = depTimeAtBeginningRoute;

        var routeName = $('#routeName').val();

        if (closest.find("#FromTimes").length) {
            var fBusTicketStatus = closest.find("#FromTimes").find('option:selected').attr("data-busticketstatus");
        }
        else {
            var fBusTicketStatus = closest.find(".span-from-time").attr("data-busticketstatus");
        }

        clickedButton = $(this);

        //var fromAddress = closest.find(".span-from-address").text();
        var fromAddress = closest.attr("data-fromaddress");
        var scheduleDetailId = closest.attr('schedule-detail-id'),
            isBookTempSeat = 'NO',
            routeId = closest.attr('route-id'),
            scheduleId = closest.attr('schedule-id'),
            tripCode = closest.attr('trip-code'),
            fromStopId = closest.attr('fromstop-id'),
            toStopId = closest.attr('tostop-id'),
            operatorId = closest.attr('data-compid'),
            operatorName = closest.attr('operator-name'),
            routeName = closest.data('routename'),
            fromStopName = closest.attr('fromstop-name'),
            toStopName = closest.attr('tostop-name'),
            routeTime = closest.attr('route-time'),
            tripId = closest.attr('data-tripid'),
            fromIdBms = closest.attr('data-fromid'),
            fromStateId = closest.attr('fromstate-id'),
            totalStage = closest.attr('data-totalstage'),
            toIdBms = closest.attr('data-toid'),
            currentScheduleId = closest.attr('schedule-id'),
            maxOfflineSeats = closest.attr('data-maxofflineseats'),
            currentFromTime = closest.find("#FromTimes").length > 0 ? closest.find('select#FromTimes option:selected').val() : closest.find(".span-from-time").text().trim().substr(0, 5),
            oldPriceText = 0,
            fare = closest.find('h6.price').attr('data-value'),
            allowpayment = closest.data("allowpayment"),
            duration = closest.data("duration"),
            hasBmsContract = closest.data("hasbmscontract"),
            notannounceseatcode = closest.data("notannounceseatcode"),
            unuseCancelTime = closest.data("unusecanceltime"),
            fromDisplayAddress = closest.data("fromdisplayaddress"),
            toDisplayAddress = closest.data("todisplayaddress"),
            isUpdatingFare = closest.data("isupdatingfare"),
            isShowOperatorNumber = closest.data("isshowoperatornumber"),
            refundable = closest.data("refundable"),
            toStateId = closest.attr('tostate-id');
        var departureDate = closest.attr('departure-date'),
            departureTime = closest.attr('data-from-time');

        formatedFare = Number(closest.find('h6.price').attr('data-value')).format(0, 3, '.', '.');
        if (closest.find('s.old').length > 0) {
            oldPriceText = closest.find('s.old').attr('data-value');
        }

        //check xem co khuyen mai hay khong
        var oldFare = 0;
        if (closest.find('small.old').length > 0) {
            oldFare = closest.find('small.old').attr('data-value');
        }
        var isBooking = "0";
        //Xu ly huy ve cho nhung truong hop back lai tu trang thanh toan
        if (sessionStorage.isBooking == "true") {
            isBooking = "1";
        }

        var sessionValidateCode = sessionStorage["validateCode"];
        var sessionBackFromPaymentPage = sessionStorage["backFromPaymentPage"];
        if (sessionBackFromPaymentPage == 'false') {
            sessionValidateCode = "";
        }

        //push product impression event to GTM
        var gtmProductImpressionObj = closest.attr('data-gtm-product-obj');
        gtmProductImpressionObj = JSON.parse(gtmProductImpressionObj);
        var arrProduct = [];
        arrProduct.push(gtmProductImpressionObj);
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': { 'list': gtmProductImpressionObj.list },
                    'products': arrProduct
                }
            },
            'eventCallback': function () {
            }
        });

        var getCallCenterURl = '/' + culture + '/Booking/GetCallCentreInfoWithDateTime?fromStopId=' +
            closest.attr('fromstop-id') + '&fromStopName=' + fromStopName + '&toStopId=' + closest.attr('tostop-id') + '&toStopName=' + toStopName + '&departureDateTime=' + depTime + '&routeName=' + routeName
            + '&busTicketStatus=' + fBusTicketStatus + '&compId=' + closest.attr('data-compid')
            + '&fromAreaId=' + closest.attr('data-fromid') + '&fromStateId=' + closest.attr('fromstate-id') + "&isDeposit=" + closest.attr('isdepositselling')
            + '&oldFare=' + oldFare + '&tripId=' + closest.attr('data-tripid') + '&fromAddress=' + fromAddress + '&maxOfflineSeats=' + maxOfflineSeats
            + '&tripCode=' + tripCode + '&fare=' + fare + '&allowpayment=' + allowpayment + '&hasBmsContract=' + hasBmsContract
            + "&unuseCancelTime=" + unuseCancelTime + "&notannounceseatcode=" + notannounceseatcode
            + "&fromDisplayAddress=" + fromDisplayAddress + "&toDisplayAddress=" + toDisplayAddress + "&isBooking=" + isBooking
            + "&validateCode=" + sessionValidateCode + "&isUpdatingFare=" + isUpdatingFare
            + "&isShowOperatorNumber=" + isShowOperatorNumber + "&depTimeAtBeginningRoute=" + depTimeAtBeginningRoute + "&fromBusStopName=" + fromBusStopName
            + "&toBusStopName=" + toBusStopName + "&toTimeAtEndPoint=" + toTimeAtEndPoint + "&fromTime=" + departureTime;

        if (fBusTicketStatus == '3') {
            //dataLayer.push({
            //    'event': 'productClick',
            //    'ecommerce': {
            //        'click': {
            //            'actionField': { 'list': routeName },
            //            'products': [{
            //                'name': routeName + ' - ' + $('#span-current-date').val().replace(/-/g, '/') + ' - ' + sFromTime,
            //                'id': tripId, //trip-code ??? id = 0, thieu ngay. Vung Tau - Co Do (42 cho giuong nam), dau cach
            //                // non vs ecom
            //                'price': fare,
            //                'brand': operatorName,
            //                'category': routeName,
            //                'variant': sFromTime
            //            }]
            //        }
            //    },
            //    'eventCallback': function () {
            //    }
            //});
        } else {
            //dataLayer.push({
            //    'event': 'CallNumber',
            //    'name': routeName + ' - ' + $('#span-current-date').val().replace(/-/g, '/') + ' - ' + sFromTime,
            //    'id': tripId,
            //    'price': fare,
            //    'brand': operatorName,
            //    'category': routeName,
            //    'variant': sFromTime,
            //    'eventCallback': function () {
            //    }
            //});
        }
        isSeatLoading = true;
        //Call ajax
        $.get(getCallCenterURl, function (data) {
            closest.after($(data)).fadeIn();

            //Update booking details
            var currentBookingDiv = closest.next('li.ticket-booking-detail-call-centre');
            fare = +$('#actual-fare').val();
            currentBookingDiv.find('td.info-table-route-name').html('<b>' + fromStopName + " → " + toStopName + '</b>');
            currentBookingDiv.find('td.info-table-fromstop-name').html('<b>' + closest.find('a.depart-station').attr('data-value') + '</b>');
            currentBookingDiv.find('td.info-table-tostop-name').html('<b>' + closest.find('a.destination-station').attr('data-value') + '</b>');
            currentBookingDiv.find('td.info-table-from-time').html('<b>' + pickupDate + '</b>');
            currentBookingDiv.find('td.info-table-to-time').html('<b>' + sToTime + '</b>');
            var numberOfTicket = 1;
            var priceText = closest.find('h6.price').attr('data-value');
            var totalText = "Không xác định";
            if (priceText != "0") {
                var price = parseInt(priceText);
                totalText = (parseInt(numberOfTicket) * price).formatMoney(0, ',', '.') + "đ";
                priceText = price.formatMoney(0, ',', '.') + '/' + Language["person"];
                //if (allowpayment == "0") {
                //    currentBookingDiv.find(".cont-btn").html(Language["RegisterInfomation"] + "&nbsp; <i class='glyphicon glyphicon-chevron-right f14'></i>");
                //}
            } else {
                totalText = Language["Updating"];
                priceText = Language["Updating"];
                currentBookingDiv.find(".cont-btn").html(Language["RegisterInfomation"] + "&nbsp; <i class='glyphicon glyphicon-chevron-right f14'></i>");
            }

            currentBookingDiv.find('.info-table-price').html(priceText);
            currentBookingDiv.find('.amount').html(totalText);
            //Set value for hidden input
            currentBookingDiv.find('input[name=SDepartureTime]').val(depTime);
            currentBookingDiv.find('input[name=SDropOffTime]').val(sToTime);
            currentBookingDiv.find('input[name=FromBusStopId]').val(fromStopId);
            currentBookingDiv.find('input[name=ToBusStopId]').val(toStopId);
            currentBookingDiv.find('input[name=RouteId]').val(routeId);
            currentBookingDiv.find('input[name=TripId]').val(tripId);
            currentBookingDiv.find('input[name=FromIdBms]').val(fromIdBms);
            currentBookingDiv.find('input[name=ToIdBms]').val(toIdBms);
            currentBookingDiv.find('input[name=fromStateId]').val(fromStateId);
            currentBookingDiv.find('input[name=ScheduleId]').val(scheduleId);
            currentBookingDiv.find('input[name=FromBusStopName]').val(fromStopName);
            currentBookingDiv.find('input[name=FromBusStopAddress]').val(fromAddress);
            currentBookingDiv.find('input[name=ToBusStopName]').val(toStopName);
            currentBookingDiv.find('input[name=RouteName]').val(routeName);
            currentBookingDiv.find('input[name=OperatorName]').val(operatorName);
            currentBookingDiv.find('input[name=CompId]').val(operatorId);
            currentBookingDiv.find('input[name=ExpectedTotalFare]').val(fare);
            currentBookingDiv.find('input[name=FarePerPeople]').val(fare);
            currentBookingDiv.find('input[name=OldFare]').val(oldPriceText);
            currentBookingDiv.find('input[name=IsBookTempSeat]').val(isBookTempSeat);
            currentBookingDiv.find('input[name=ScheduleDetailId]').val(scheduleDetailId);
            currentBookingDiv.find('input[name=TripCode]').val(tripCode);
            currentBookingDiv.find('input[name=TripIdChild]').val(tripIdChild);
            currentBookingDiv.find('input[name=CountryCode]').val("vn");
            currentBookingDiv.find('input[name=AllowPayment]').val(allowpayment);
            currentBookingDiv.find('input[name=PickupDate]').val(pickupDate);
            currentBookingDiv.find('input[name=Duration]').val(duration);
            currentBookingDiv.find('.departure-date').text(departureDate);
            currentBookingDiv.find('.departure-time').text(departureTime);
            currentBookingDiv.find('input[name=Refundable]').val(refundable);
            currentBookingDiv.find('input[name=toStateId]').val(toStateId);
            if (isMobile == true) {
                currentBookingDiv.find('input[name=isMobile]').val(1);
            }


            //Init route feedback Form
            currentBookingDiv.find('input[name=RouteId]').val(closest.attr('route-id'));

            //X Close button
            currentBookingDiv.find('.btn-close-road').click(function () {
                //currentBookingDiv.remove();
                //debugger;
                $('.result-item').removeClass("displaynone");
                $('.li-banner').removeClass("displaynone");
                $('.road-point').removeClass("displaynone");
                $('.road-backlink').removeClass("displaynone");
                $('#backLinkDiv').removeClass("displaynone");
                $('.contentfooter').removeClass("displaynone");
                $('#header').removeClass("displaynone");
                $('#dvSearchFilter').removeClass("displaynone");
                $('.header-blue').removeClass("displaynone");
                $('#dvSearchTicket').removeClass("displaynone");

                closest.next('.ticket-booking-details').fadeOut().remove();
                rollBackToNormalButton(closest.find('a.open'));
            });

            // Lay gia tri diem don khach
            var pickedPointName = "";
            var pickedPointValue = "";
            var pickedPointAddress = "";


            checkAndShowPickup(0, null);
            $(currentBookingDiv.find("#pickup-select")).change(function () {
                $("#pickup-select").css("border-color", "#c2c2c2");

                var selectedPickup = currentBookingDiv.find("#pickup-select option:selected");
                pickupId = $(selectedPickup).data('pickupid');
                pickupName = $(selectedPickup).data('pickupname');
                pickupIndex = $(selectedPickup).data('pickupindex');
                pickupTime = $(selectedPickup).data('pickuptime');
                pickupUnFixedPoint = $(selectedPickup).data('unfixedpoint');
                pickupAddress = $(selectedPickup).data('address');
                pickupNote = $(selectedPickup).data('note');
                pickupDepartTime = $(selectedPickup).data('pickupdeparttime');
                //Update hidden for booking
                currentBookingDiv.find('input[name=PickupId]').val(pickupId);
                currentBookingDiv.find('input[name=PickupName]').val(pickupName);
                currentBookingDiv.find('input[name=PickupIndex]').val(pickupIndex);
                currentBookingDiv.find('input[name=PickupTimeMinute]').val(pickupTime);
                currentBookingDiv.find('input[name=PickupUnFixedPoint]').val(pickupUnFixedPoint);
                currentBookingDiv.find('input[name=PickupAddress]').val(pickupAddress);
                currentBookingDiv.find('input[name=PickupDepartTime]').val(pickupDepartTime);
                if (pickupUnFixedPoint == '1') {
                    //case diem don khong co dinh
                    $('#pickup-address-unfixed').val('');
                    $('.div-pickup-address-unfixed').fadeIn();
                } else {
                    //diem don co dinh
                    $('#pickup-address-unfixed').val('');
                    $('.div-pickup-address-unfixed').fadeOut();
                }
            });

            var expectTotalFare = currentBookingDiv.find('input[name=ExpectedTotalFare]');

            currentBookingDiv.find('.text-phone-num').click(function () {
                var service = "Gọi cho nhà xe",
                    device = "Máy tính";
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    if (screen.width < 768) {
                        device = "Điện thoại";
                    } else {
                        device = "Tablet";
                    }
                }

                if (this.href == "tel:1900 545541" || this.href == "tel:1900 6484" || this.href == "tel:1900 969681") {
                    service = "Gọi cho tổng đài VXR";
                }
                //push product detail view event to GTM
                var gtmProductImpressionObj = closest.attr('data-gtm-product-obj');
                gtmProductImpressionObj = JSON.parse(gtmProductImpressionObj);
                var arrProduct = [];
                arrProduct.push(gtmProductImpressionObj);
                dataLayer.push({
                    'event': 'productdetailview',
                    'ecommerce': {
                        'detail': {
                            'actionField': { 'list': gtmProductImpressionObj.category },
                            'products': arrProduct
                        }
                    },
                    'eventCallback': function () {
                    }
                });
            });

            $('.select-seat-amount').on('change', function () {
                var displayText = currentBookingDiv.find('.amount');

                checkAndShowPickup(+$(this).val(), null);
                var surcharge = parseInt($('#pickupTransferSurcharge').val());
                var surchargeAtArrive = parseInt($('#pickupTransferAtArriveSurcharge').val());
                var eatFare = parseInt($('#EatingFare').val());
                haveEatingCheck = $('#HaveEatingCheck').is(':checked');

                surcharge = surcharge + surchargeAtArrive + haveEatingCheck ? eatFare : 0;
                numberOfTicket = +$(this).val();
                totalText = (parseInt(numberOfTicket) * (+price + surcharge)).formatMoney(0, ',', '.') + "đ";
                currentBookingDiv.find('.amount').html(totalText);
                currentBookingDiv.find('.number-of-seat').val(numberOfTicket);
                expectTotalFare.val((parseInt(numberOfTicket) * (+price + surcharge)));


                currentBookingDiv.find('.seat-template-seat-code').html($(this).val());

                //Change number of customer info
                numberOfListItem = numberOfTicket - 1;
                if ($('#all_customer_required').val() == '1') {
                    var existingItem = $('.list-secondary-customer li').length;
                    if (existingItem < numberOfListItem) {
                        //generate new item
                        addNewCustomerInfo(existingItem + 2, numberOfListItem - existingItem, 'offline');
                    } else {
                        //remove item
                        removeCustomerInfo(existingItem - numberOfListItem, 'offline')
                    }
                    if (numberOfTicket > 1) {
                        $('.multiple-info-note').show();
                    } else {
                        $('.multiple-info-note').hide();
                    }
                }

                if ($(window).width() < 768) {
                    $(".detail-booking").css("height", "auto");
                }
            });

            currentBookingDiv.find('button.cont-btn').click(function () {
                var fullname = $("#cfn").val(),
                    phonenumber = $("#cp").val(),
                    email = $("#ce").val(),
                    userid = $("#ci").val(),
                    haveEatingCheck = $('#HaveEatingCheck').is(':checked'),
                    bankValue = currentBookingDiv.find("#bankSelect option:selected").val(),
                    pickedPointValue = currentBookingDiv.find("#pickup-select option:selected").val();

                //reformat phone number
                phonenumber = formatPhoneNumber(phonenumber);
                $("#cp").val(phonenumber);

                if (!$('input[name=pickup-transfer-select-from]:checked').val() & $('input[name=pickup-transfer-select-from]').length != 0) {
                    showMessagePopup(Language["PleaseselectaDeparture"]);
                    return false;
                } else if ($('input[name=pickup-transfer-select-from]:checked').val() && $('input[name=pickup-transfer-select-from]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-from]:checked').parent().siblings().find('.address-unfixed-input').val()) {
                    showMessagePopup(Language["PleaseTypeDeparturePlace"]);
                    $("a[data-toggle='tab'][href='#fromstart']").trigger('click');
                    return false;
                } else if ($('input[name=pickup-transfer-select-to]:checked').val() && $('input[name=pickup-transfer-select-to]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-to]:checked').parent().siblings().find('.address-unfixed-input').val()) {
                    showMessagePopup(Language["PleaseTypeDestinationPlace"]);
                    $("a[data-toggle='tab'][href='#toend']").trigger('click');
                    return false;
                }
                else if (!$('input[name=pickup-transfer-select-to]:checked').val() & $('input[name=pickup-transfer-select-to]').length != 0) {
                    showMessagePopup(Language["PleaseselectaDestination"]);
                    return false;
                }
                else {
                    var errorFullName = false;
                    var errorPhoneNumber = false;
                    var errorEmail = false;
                    var errorId = false;
                    var errorTransferAddress = false;
                    if (fullname == "" || !validateFullName(fullname)) {
                        $("#cfn").addClass("error-check");
                        $("#name-error").show();
                        errorFullName = true;
                    } else {
                        $("#cfn").removeClass("error-check");
                        errorFullName = false;
                        $("#name-error").hide();
                    }

                    if (phonenumber == "" || !validatePhoneNumber(phonenumber)) {
                        // $("#cp").attr("placeholder", "* " + Language["InvalidPhoneNumber"]);
                        $("#cp").addClass("error-check");
                        errorPhoneNumber = true;
                        $("#phone-error").show();

                    } else {
                        $("#cp").removeClass("error-check");
                        errorPhoneNumber = false;
                        $("#phone-error").hide();
                    }
                    if (email == "" || !validateEmail(email)) {
                        // $("#ce").attr("placeholder", "* " + Language["EmailValidation"]);
                        $("#ce").addClass("error-check");
                        errorEmail = true;
                        $("#email-error").show();

                    } else {
                        $("#ce").removeClass("error-check");
                        errorEmail = false;
                        $("#email-error").hide();
                    }


                    transferSelectedOption = $("#transfer-select option:selected")
                    if ($("#checkboxTransfer").is(':checked') && $(transferSelectedOption).data('unfixedpoint') == '1') {
                        if ($("#transfer-address-unfixed").val() == null || $("#transfer-address-unfixed").val() == '') {
                            errorTransferAddress = true;
                            if (!isMobile) {
                                $("#transfer-address-unfixed").popover({
                                    trigger: "manual"
                                });
                                $('#transfer-address-unfixed').popover('show');
                            }
                        }
                    }
                    fillPickupTransferInfoToHiddenField();
                    if (errorFullName == false && errorPhoneNumber == false && errorEmail == false && errorId == false && errorTransferAddress == false) {
                        //Show wait loading
                        showLoading();
                        if (window.vxrMobileApp == true) {
                            var currentOS = getMobileOperatingSystem();
                            $('<input>').attr({
                                type: 'hidden',
                                name: 'vxrMobileApp',
                                value: '1'
                            }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                            $('<input>').attr({
                                type: 'hidden',
                                name: 'vxrMobileAppOS',
                                value: currentOS
                            }).appendTo(currentBookingDiv.find('.frmSeatSelection'));

                        } else {
                            $('<input>').attr({
                                type: 'hidden',
                                name: 'vxrMobileApp',
                                value: '0'
                            }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                            $('<input>').attr({
                                type: 'hidden',
                                name: 'vxrMobileAppOS',
                                value: currentOS
                            }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                        }
                        var form = currentBookingDiv.find('.frmSeatSelection');
                        var country_code = currentBookingDiv.find('#countryCodeSelector').val();
                        currentBookingDiv.find('input[name=CountryCode]').val(country_code);
                        var eatingValue = (haveEatingCheck == true) ? "1" : "0";
                        currentBookingDiv.find('.frmSeatSelection').find('#HaveEating').val(eatingValue);
                        var url = new URL(window.location.href);
                        var aid = url.searchParams.get('aid');
                        var clickId = url.searchParams.get('clickId');
                        var source = url.searchParams.get('utm_source') || url.searchParams.get('source');
                        if (aid) {
                            form.append('<input name="AffiliateId" value="' + aid + '" style="display:none"/>');
                            form.append('<input name="ClickId" value="' + clickId + '" style="display:none"/>');
                        }
                        if (source) {
                            form.append('<input name="source" value="' + source + '" style="display:none"/>');
                        }

                       

                        var res = $.ajax({
                            type: "POST",
                            url: "/" + culture + "/Payment/TryBookingSeats",
                            data: form.serialize(),
                            success: function (res) {
                                if (res.booked) {
                                    if (res.url) {
                                        window.location = res.url;
                                    } else {
                                        if (res.booking_code) {
                                            sessionStorage.isBooking = "true";
                                            $("#BkcTxt").val(res.booking_code);
                                            $("#TkcTxt").val(res.ticket_code);
                                            $("#ValidateTxt").val(res.validate_code);
                                            $("#isDraftBooking").val('0');
                                        } else {
                                            sessionStorage.isBooking = "false";
                                        }

                                        if (res.draft_booking_code) {
                                            $("#DraftBookingCodeTxt").val(res.draft_booking_code);
                                            $("#DraftIdTxt").val(res.draft_id);
                                            $("#ValidateTxt").val(res.validate_code);
                                            if (res.isForRegisteringInfo) {
                                                //console.log(currentBookingDiv.find(".cont-btn"));
                                                currentBookingDiv.find(".cont-btn").attr('disabled', 'disabled');
                                                hideLoading();
                                                $("#RegisteringInfoModal").modal('show');
                                                setTimeout(function () {
                                                    $("#RegisteringInfoModal").modal('hide');
                                                }, 5000);
                                                setTimeout(function () {
                                                    $(".ticket-booking-details").remove();
                                                    rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
                                                }, 6000);
                                                return false;
                                            }

                                            if (!res.isAllowPayment) {
                                                currentBookingDiv.find(".cont-btn").attr('disabled', 'disabled');
                                                hideLoading();
                                                $("#ThanskForBookingModal").modal('show');
                                                setTimeout(function () {
                                                    $("#ThanskForBookingModal").modal('hide');
                                                }, 5000);
                                                setTimeout(function () {
                                                    $(".ticket-booking-details").remove();
                                                    rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
                                                }, 6000);
                                                return false;
                                            }
                                        }
                                        form.submit();
                                    }
                                } else {
                                    hideLoading();
                                    showMessagePopup(Language["ThereWasAnErrorWhileBookingTickets"]);
                                }
                            }
                        });
                    }
                    return true;
                }



            });

            //Init route feedback Form
            currentBookingDiv.find('input[name=RouteId]').val(closest.attr('route-id'));
            currentBookingDiv.find('a.feedback-like-button').click(function (event) {
                event.preventDefault();
                var form = jQuery(this).closest('form');
                form.find('input[name=VoteUp]').val("true");
                var response = submitRouteFeedback(form);

                //Remove some unusual
                form.find('.feedback-btns').remove();
                form.find('.dislike-feedback').remove();
                form.find('.point-arrow').remove();

                //Show result
                if (false == response) {
                    form.find('.feedback-response p').text("Cảm ơn bạn đã dành thời gian quý báu đánh giá về chuyến đi. Hiện hệ thống server của chúng tôi phát hiện đánh giá của bạn bị lỗi, bạn vui lòng đánh giá lại sau.");
                    form.find('.feedback-response').css('border-color', "#FF0000");
                }
                form.find('.feedback-response').show();
            });

            currentBookingDiv.find('a.feedback-dislike-button').click(function (event) {
                event.preventDefault();
                var form = jQuery(this).closest('form');
                form.find('input[name=VoteUp]').val("false");
                form.find('.dislike-feedback').show();
            });

            currentBookingDiv.find('a.feedback-send-button').click(function (event) {
                event.preventDefault();
                var form = jQuery(this).closest('form');
                var response = submitRouteFeedback(form);

                //Remove some unusual
                form.find('.feedback-btns').remove();
                form.find('.dislike-feedback').remove();
                form.find('.point-arrow').remove();

                //Show result
                if (false == response) {
                    form.find('.feedback-response p').text("Cảm ơn bạn đã dành thời gian quý báu đánh giá về chuyến đi. Hiện hệ thống server của chúng tôi phát hiện đánh giá của bạn bị lỗi, bạn vui lòng đánh giá lại sau.");
                    form.find('.feedback-response').css('border-color', "#FF0000");
                }
                form.find('.feedback-response').show();
            });
            //Close loading
            hideLoading();
            //scroll to current div
            var scrollTopValue = currentBookingDiv.offset().top - 150;
            $('html, body').animate({ scrollTop: scrollTopValue }, 'slow');
            isSeatLoading = false;
        });
        //Change to close button
        changeToCloseButton(this);
    });
}
//remove all character
function formatPhoneNumber(phonenumber) {
    var arrNum = "0123456789";
    var newPhoneNumber = "";
    for (var i = 0; i < phonenumber.length; i++) {
        newPhoneNumber += arrNum.indexOf(phonenumber[i]) > -1 ? phonenumber[i] : "";
    }
    return newPhoneNumber;
}

function maskEventOnBookSeatButton() {
    $(document).on('click', 'a.hasSeat', null, function () {
        $('.ticket-booking-details').slideToggle(300, function () {
            $(this).remove();
        });
        rollBackToNormalButton($('a.open'));
        showLoading();
        getSeatTemplate($(this), false);
    });
}

function maskEventOnDetailLink() {
    //$('.ticket-detail-tab-link').unbind();
    $('.ticket-detail-tab-link').off('click').on('click', function (e) {
        $(".ticket-detail-tabs").hide();
        var detailTabId = $(this).attr("data-tab");
        if ($(this).children("i").hasClass("text-gray")) {
            $(".journey-icon").removeClass("text-blue");
            $(".journey-icon").addClass("text-gray");
            $(this).children("i").removeClass("text-gray").addClass("text-blue");
        }
        var closest = $(this).closest('.result-item');
        //Hide booking ticket tr if exist
        if (closest.next("li").hasClass("ticket-booking-details")) {
            closest.next("li").remove()
        }

        changeToCloseButton(closest.find('a.closed'));
        //Show tabs
        var tripcode = closest.attr("trip-code");
        var $ticketDetailTab = $('.ticket-detail-tabs[trip-code="' + tripcode + '"]');
        if (closest.next("li").hasClass("ticket-detail-tabs")) {
            $ticketDetailTab.fadeIn();
        } else {
            closest.after($ticketDetailTab);
            $ticketDetailTab.fadeIn();
        }

        var scrollTopValue = $(this).closest('.result-item').offset().top;
        $('html, body').animate({ scrollTop: scrollTopValue }, 'slow');
        closest.next('.ticket-detail-tabs').find('a[aria-controls="' + detailTabId + '"]').trigger('click');

        return false;
    });

    jQuery('a.rating-link').unbind();
    jQuery('a.rating-link').click(function () {
        var detailTabId = $(this).attr("data-tab");

        if ($(this).children("i").hasClass("text-gray")) {
            $(".journey-icon").removeClass("text-blue");
            $(".journey-icon").addClass("text-gray");
            $(this).children("i").removeClass("text-gray").addClass("text-blue");
        }
        var closest = $(this).closest('.result-item');
        //Hide all details
        $('.ticket-detail-tabs').hide();
        rollBackToNormalButton($("a.open"));
        changeToCloseButton(closest.find('a.closed'));
        //Show tabs
        closest.next('li.ticket-detail-tabs').fadeIn();

        var tripcode = closest.attr("trip-code");
        var $ticketDetailTab = $('li.ticket-detail-tabs[trip-code="' + tripcode + '"]');
        if (closest.next("li").hasClass("ticket-detail-tabs")) {
            $ticketDetailTab.fadeIn();
        } else {
            closest.after($ticketDetailTab);
            $ticketDetailTab.fadeIn();
        }

        var scrollTopValue = $(closest).offset().top;
        $('html, body').animate({ scrollTop: scrollTopValue }, 'slow');
        //Trigger click
        closest.next('li.ticket-detail-tabs').find('a[aria-controls="' + detailTabId + '"]').trigger('click');

        return false;
    });
    $('[data-toggle="tooltip"]').tooltip();
}

//====================================start get seat======================================//
function getSeatTemplate(ele, isReload) {

    var isBooking = "0";
    //Xu ly huy ve cho nhung truong hop back lai tu trang thanh toan
    if (sessionStorage.isBooking == "true") {
        isBooking = "1";
    }

    //save current route url to localstorage for goback action
    localStorage['VXR_Selected_Route_URL'] = window.location.href;

    //Calculate deptime
    var sFromTime = "";
    var sToTime = "";
    var pickupDate = "";
    var closest = ele.closest('.result-item');
    if (closest.find("#FromTimes").length > 0) {
        sFromTime = closest.find("#FromTimes option:selected").val();
    }
    else {
        sFromTime = closest.find(".span-from-time").text().trim().substr(0, 5);
        pickupDate = closest.find(".span-from-time").attr("data-pickupdate");
    }
    if (closest.find("#ToTimes").length > 0) {
        sToTime = closest.find("#ToTimes option:selected").val();
    } else {
        sToTime = closest.find(".span-to-time").text().trim();
    }
    var departureDate = closest.attr('departure-date'),
        departureTime = closest.attr('data-from-time');
    var depTime = $('#span-current-date').val().replace(/-/g, '/') + "-" + sFromTime;
    var depTimeAtBeginningRoute = closest.attr('data-fromtimedeparturetime');
    var fromBusStopName = closest.attr('frombusstop-name');
    var toBusStopName = closest.attr('tobusstop-name');
    var toTimeAtEndPoint = closest.attr('data-to-time');
    depTime = depTime.replace(/\//g, "-").replace(":", "-") + "-00";
    depTimeAtBeginningRoute = depTimeAtBeginningRoute;

    //var fromAddress = closest.find(".span-from-address").text();
    var fromAddress = closest.attr("data-fromaddress");

    var scheduleDetailId = closest.attr('schedule-detail-id'),
        isBookTempSeat = 'NO',
        routeId = closest.attr('route-id'),
        scheduleId = closest.attr('schedule-id'),
        tripCode = closest.attr('trip-code'),
        fromStopId = closest.attr('fromstop-id'),
        toStopId = closest.attr('tostop-id'),
        operatorId = closest.attr('data-compid'),
        operatorName = closest.attr('operator-name'),
        routeName = closest.data('routename'),
        fromStopName = closest.attr('fromstop-name'),
        toStopName = closest.attr('tostop-name'),
        routeTime = closest.attr('route-time'),
        tripId = closest.attr('data-tripid'),
        fromIdBms = closest.attr('data-fromid'),
        fromStateId = closest.attr('fromstate-id'),
        totalStage = closest.attr('data-totalstage'),
        toIdBms = closest.attr('data-toid'),
        currentScheduleId = closest.attr('schedule-id'),
        currentFromTime = closest.find("#FromTimes").length > 0 ? closest.find('select#FromTimes option:selected').val() : closest.find(".span-from-time").text().trim().substr(0, 5),
        oldPriceText = 0,
        fare = closest.find('h6.price').attr('data-value'),
        duration = closest.data("duration"),
        refundable = closest.data("refundable"),
        unchoosable = closest.data("unchoosable"),
        unuseCancelTime = closest.data("unusecanceltime"),
        fromDisplayAddress = closest.data("fromdisplayaddress"),
        toDisplayAddress = closest.data("todisplayaddress"),
        vehicleQuality = closest.data("vehicle-quality"),
        isApplyOneConfig = closest.data("is-apply-one-config"),
        toStateId = closest.attr('tostate-id');

    formatedFare = Number(closest.find('h6.price').attr('data-value')).format(0, 3, '.', '.');
    if (closest.find('s.old').length > 0) {
        oldPriceText = closest.find('s.old').attr('data-value');
    }

    var currentFromTime = closest.find("#FromTimes").length > 0 ? closest.find('select#FromTimes option:selected').val() : closest.find(".span-from-time").text().trim().substr(0, 5);

    if (!isReload) {
        //push product impression event to GTM
        var gtmProductImpressionObj = closest.attr('data-gtm-product-obj');
        gtmProductImpressionObj = JSON.parse(gtmProductImpressionObj);
        var arrProduct = [];
        arrProduct.push(gtmProductImpressionObj);
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': { 'list': gtmProductImpressionObj.category },
                    'products': arrProduct
                }
            },
            'eventCallback': function () {
            }
        });
        dataLayer.push({
            'event': 'productdetailview',
            'ecommerce': {
                'detail': {
                    'actionField': { 'list': gtmProductImpressionObj.category },
                    'products': arrProduct
                }
            },
            'eventCallback': function () {
            }
        });
    } else {
        isBooking = 0;
    }


    var sessionValidateCode = sessionStorage["validateCode"];
    var sessionBackFromPaymentPage = sessionStorage["backFromPaymentPage"];
    if (sessionBackFromPaymentPage == 'false') {
        sessionValidateCode = "";
    }

    var getSeatTemplateURL = "/" + window.culture + "/Booking/GetSeatTemplate?tripCode=" + tripCode + "&trip_id=" + tripId + "&from_stop_id=" + fromStopId + "&departureDateTime=" + depTime + "&fromTime=" + currentFromTime +
        "&fromStopName=" + fromStopName + "&toStopName=" + toStopName + "&fare=" + fare + "&fromAddress=" + fromAddress + "&isBooking=" + isBooking + "&Unchoosable=" + unchoosable + "&unuseCancelTime=" + unuseCancelTime +
        "&fromDisplayAddress=" + fromDisplayAddress + "&toDisplayAddress=" + toDisplayAddress + "&validateCode=" + sessionValidateCode + "&depTimeAtBeginningRoute=" + depTimeAtBeginningRoute + "&fromBusStopName=" + fromBusStopName +
        "&toBusStopName=" + toBusStopName + "&toTimeAtEndPoint=" + toTimeAtEndPoint + "&vehicleQuality=" + vehicleQuality + "&isApplyOneConfig=" + isApplyOneConfig;
    isSeatLoading = true;

    var changeColorSeat = function (svg, color) {
        $(svg).find('svg g').css({ fill: color })
        $(svg).find('svg g path').css({ fill: color })
    }
    $.get(getSeatTemplateURL, function (data) {
        var isMobile = false;
        var seats = [];
        if ($(window).width() < 768) {
            isMobile = true;
        }
        if (isReload) {
            closest.next().replaceWith(data);
        } else {
            closest.after(data);
        }

        var currentBookingDiv = closest.next();
        fare = +$('#actual-fare').val();
        currentBookingDiv.find('input[name=SDepartureTime]').val(depTime);
        currentBookingDiv.find('input[name=SDropOffTime]').val(sToTime);
        currentBookingDiv.find('input[name=FromBusStopId]').val(fromStopId);
        currentBookingDiv.find('input[name=ToBusStopId]').val(toStopId);
        currentBookingDiv.find('input[name=RouteId]').val(routeId);
        currentBookingDiv.find('input[name=TripId]').val(tripId);
        currentBookingDiv.find('input[name=FromIdBms]').val(fromIdBms);
        currentBookingDiv.find('input[name=ToIdBms]').val(toIdBms);
        currentBookingDiv.find('input[name=fromStateId]').val(fromStateId);
        currentBookingDiv.find('input[name=ScheduleId]').val(scheduleId);
        currentBookingDiv.find('input[name=FromBusStopName]').val(fromStopName);
        currentBookingDiv.find('input[name=FromBusStopAddress]').val(fromAddress);
        currentBookingDiv.find('input[name=ToBusStopName]').val(toStopName);
        currentBookingDiv.find('input[name=RouteName]').val(routeName);
        currentBookingDiv.find('input[name=OperatorName]').val(operatorName);
        currentBookingDiv.find('input[name=CompId]').val(operatorId);
        currentBookingDiv.find('input[name=FarePerPeople]').val(fare);
        currentBookingDiv.find('input[name=OldFare]').val(oldPriceText);
        currentBookingDiv.find('input[name=IsBookTempSeat]').val(isBookTempSeat);
        currentBookingDiv.find('input[name=ScheduleDetailId]').val(scheduleDetailId);
        currentBookingDiv.find('input[name=TripCode]').val(tripCode);
        currentBookingDiv.find('input[name=PickupDate]').val(pickupDate);
        currentBookingDiv.find('.departure-date').text(departureDate);
        currentBookingDiv.find('.departure-time').text(departureTime);
        currentBookingDiv.find('input[name=Duration]').val(duration);
        currentBookingDiv.find('input[name=Refundable]').val(refundable);

        currentBookingDiv.find('input[name=Unchoosable]').val(unchoosable);
        currentBookingDiv.find('input[name=toStateId]').val(toStateId);

        if (isMobile == true) {
            currentBookingDiv.find('input[name=isMobile]').val(1);
        }
        //update number of seat available base on count of seat-available loaded
        $("." + tripCode).html(currentBookingDiv.find(".seat-available").length);

        //var zaloProfile = GetZaloProfile();

        //if (zaloProfile != null) {
        //    var fullCustomerName = $("#cfn").val();
        //    if (fullCustomerName == null || fullCustomerName == "") {
        //        $("#cfn").val(zaloProfile.name);
        //    }
        //}
        //nmthang - [ADD] - 2016/09/21 - #200 - Eating - [S]
        //Get eating fare.
        var eatingFare = parseInt(currentBookingDiv.find('.frmSeatSelection').find('#EatingFare').val());
        //nmthang - [ADD] - 2016/09/21 - #200 - Eating - [E]
        var seat_codes_input = currentBookingDiv.find('input[name=SBookingSeats]'),
            total_fare_input = currentBookingDiv.find('input[name=ExpectedTotalFare]'),
            total_fare_h4 = currentBookingDiv.find('.seat-template-total-fare'),
            seat_codes_span = currentBookingDiv.find('.seat-template-seat-code'),
            number_of_seat = currentBookingDiv.find('input.number-of-seat'),
            the_ultimate_final_price = currentBookingDiv.find('input[name=FarePerPeople]'),
            old_final_price_text = currentBookingDiv.find('.seat-template-old-total-fare'),
            old_final_price_value = 0, groupIndex = 0, pickupTransferSurcharge = 0, all_customer_required = $('#all_customer_required').val(),
            cd_flag_notice = true;


        $(".title-seat .btn-close-road").click(function () {
            //debugger;
            $('.result-item').removeClass("displaynone");
            $('.li-banner').removeClass("displaynone");
            $('.road-point').removeClass("displaynone");
            $('.road-backlink').removeClass("displaynone");
            $('#backLinkDiv').removeClass("displaynone");
            $('.contentfooter').removeClass("displaynone");
            $('#header').removeClass("displaynone");
            $('#dvSearchFilter').removeClass("displaynone");
            $('.header-blue').removeClass("displaynone");


        });
        $('.btn-vxr-gray-lg').click(function () {
            //debugger;
            $('.result-item').removeClass("displaynone");
            $('.li-banner').removeClass("displaynone");
            $('.road-point').removeClass("displaynone");
            $('.road-backlink').removeClass("displaynone");
            $('#backLinkDiv').removeClass("displaynone");
            $('.contentfooter').removeClass("displaynone");
            $('#header').removeClass("displaynone");
            $('#dvSearchFilter').removeClass("displaynone");
            $('#dvSearchTicket').removeClass("displaynone");
            $('.header-blue').removeClass("displaynone");
        });

        currentBookingDiv.find('.cd-ghe').click(function () {

            //$('.result-item').addClass("displaynone");
            $('.li-banner').addClass("displaynone");
            $('.road-point').addClass("displaynone");
            $('.road-backlink').addClass("displaynone");
            $('#backLinkDiv').addClass("displaynone");
            $('.contentfooter').addClass("displaynone");
            $('#header').addClass("displaynone");
            $('#dvSearchFilter').addClass("displaynone");
            $('.header-blue').addClass("displaynone");
            $('.hotline-hn-sp').addClass("displaynone");
            $('#dvSearchTicket').addClass("displaynone");

            $('.body-buttom-mobi').addClass("fix-review-price-mobi");
            $('.td-info-detail').removeClass("displaynone");
            $('.seat-template-col').css("margin-bottom", "100px");
            $('#cfn').focus();

            if ($(window).width() < 768) {
                $('.foot-vxr-panel').addClass("fix-hotline-mobi");
            }

            $(this).closest(".ticket-booking-details").prev().removeClass("displaynone");

            fare = +$(this).data('seatfare');
            groupIndex = $(this).data('groupindex');

            if ($(this).hasClass('seat-chosen')) {
                //unselect seat
                var param = {
                    hiddenInputObj: total_fare_input,
                    displayTextObj: total_fare_h4
                }
                checkAndShowPickup(+number_of_seat.val() - 1, param);

                //remove secondary customer
                if (all_customer_required == '1') {
                    removeCustomerInfo(1, 'online');
                    if ($(window).width() > 768) {
                        //var tempheight = $(".detail-customer-info").height();
                        var tempheight = $(".customer-info-col").height();
                        $(".detail-booking").css("min-height", "370px");
                        $(".td-info-detail").css("min-height", "370px");
                        $(".seat-template-col").css("min-height", "370px");
                        $(".detail-booking").css("height", "auto");
                        $(".td-info-detail").css("height", tempheight + 20);
                        $(".seat-template-col").css("height", tempheight + 20);
                        $(".seat-template-col").css("margin-bottom", '0');
                        $(".detail-address-pc").css("height", tempheight - 80);
                    }

                }

            } else if ($(this).hasClass('seat-available') || $(this).hasClass('bed-available')) {

                if (unchoosable !== 1 || (unchoosable === 1 && !($(".cd-notice").is(':visible')))) {
                    //select seat
                    checkAndShowPickup(+number_of_seat.val() + 1, null);
                    if (all_customer_required == '1' && (+number_of_seat.val() + 1) >= 2) {
                        //show new field
                        if (number_of_seat.val() < 6) {
                            addNewCustomerInfo(+number_of_seat.val() + 1, 1, 'online');
                            $('.multiple-info-note').show();
                        }
                        if ($(window).width() > 768) {
                            //var tempheight = $(".detail-customer-info").height();
                            var tempheight = $(".customer-info-col").height();
                            $(".detail-booking").css("height", "auto");
                            $(".td-info-detail").css("height", tempheight + 20);
                            $(".seat-template-col").css("height", tempheight + 20);
                            $(".seat-template-col").css("margin-bottom", '0');
                            $(".detail-address-pc").css("height", tempheight - 80);
                        }

                    } else {
                        if ($(window).width() > 768) {
                            $(".detail-booking").css("min-height", "370px");
                            $(".td-info-detail").css("min-height", "370px");
                            $(".seat-template-col").css("min-height", "370px");
                            $(".seat-template-col").css("margin-bottom", '0');
                        }
                        $('.multiple-info-note').hide();
                    }
                }
            }
            if (unchoosable !== 1 || (unchoosable === 1 && !($(".cd-notice").is(':visible')))) {
                pickupTransferSurcharge = +$('#pickupTransferSurcharge').val();
                pickupTransferAtArriveSurcharge = +$('#pickupTransferAtArriveSurcharge').val();
                pickupTransferSurcharge = pickupTransferSurcharge + pickupTransferAtArriveSurcharge;

                //nmthang - [ADD] - 2016/09/21 - #200 - Eating - [S]
                var haveEating = currentBookingDiv.find('#HaveEatingCheck').is(':checked');
                //nmthang - [ADD] - 2016/09/21 - #200 - Eating - [E]
                //var img_chosen_src = "https://storage.googleapis.com/fe-production/images/Route/seat-green-" + groupIndex + ".svg?v=" + imgVersion;
                //var img_available_src = "https://storage.googleapis.com/fe-production/images/Route/seat-white-" + groupIndex + ".svg?v=" + imgVersion;

                //if ($(this).hasClass('isSleeper')) {
                //    img_chosen_src = "https://storage.googleapis.com/fe-production/images/Route/bed-green-" + groupIndex + ".svg?v=" + imgVersion;
                //    img_available_src = "https://storage.googleapis.com/fe-production/images/Route/bed-white-" + groupIndex + ".svg?v=" + imgVersion;
                //}

                //if ($(this).hasClass('isLied')) {
                //    img_chosen_src = "https://storage.googleapis.com/fe-production/images/Route/lying-seat-green-" + groupIndex + ".svg?v=" + imgVersion;
                //    img_available_src = "https://storage.googleapis.com/fe-production/images/Route/lying-seat-white-" + groupIndex + ".svg?v=" + imgVersion;
                //}

                //if ($(this).hasClass('isSleepers')) {
                //    img_chosen_src = "https://storage.googleapis.com/fe-production/images/Route/double-bed-green-" + groupIndex + ".svg?v=" + imgVersion;
                //    img_available_src = "https://storage.googleapis.com/fe-production/images/Route/double-bed-white-" + groupIndex + ".svg?v=" + imgVersion;
                //}

                //if ($(this).hasClass('isLimousine')) {
                //    img_chosen_src = "https://storage.googleapis.com/fe-production/images/Route/limousine-green-" + groupIndex + ".svg?v=" + imgVersion;
                //    img_available_src = "https://storage.googleapis.com/fe-production/images/Route/limousine-white-" + groupIndex + ".svg?v=" + imgVersion;
                //}

                if ($(this).hasClass('seat-available') || $(this).hasClass('bed-available')) {
                    var seatDiscount = $(this).data("seatdiscount");
                    var seatInfo = $(this).attr('seat-code') + '|' + $(this).attr('floor-num') + '|' + $(this).attr('row-num') + '|' + $(this).attr('col-num');
                    var objSeat = { seat: seatInfo, discount: seatDiscount };
                    seats.push(objSeat);
                    //console.log(seats);
                    var maxTotalSeats = currentBookingDiv.prev().closest(".result-item").data('max-online-total-seats') || 6;
                    if (number_of_seat.val() >= maxTotalSeats) {
                        $('#cfn').focus();
                        showMessagePopup(Language["PleaseSelect4SeatsInOneBooking"].format({ maxTotalSeats }));
                        changeColorSeat(this, '')
                        return false;
                    } else {
                        number_of_seat.val(+number_of_seat.val() + 1);
                    }
                    changeColorSeat(this, '#badf41')
                    //$(this).find('img').attr('src', img_chosen_src);


                    $(this).removeClass('seat-available');
                    $(this).addClass('seat-chosen');
                    var seat_input = $(this).attr('seat-code') + '-' +
                        $(this).attr('seat-number') + '-' +
                        $(this).attr('floor-num') + '-' +
                        $(this).attr('row-num') + '-' +
                        $(this).attr('col-num') + '-' +
                        fare + '-';
                    if (seat_codes_input.val() == '') {
                        seat_codes_input.val(seat_input);
                        //nmthang - [MOD] - 2016/09/21 - #200 - Eating - [S]
                        //total_fare_input.val(fare);
                        //total_fare_h4.text(Number(fare).format(0, 3, '.', '.'));

                        if (eatingFare > 0 && haveEating) {
                            total_fare_input.val(parseInt(fare) + +eatingFare + pickupTransferSurcharge);
                            total_fare_h4.text(Number(parseInt(fare) + +eatingFare + pickupTransferSurcharge).format(0, 3, '.', '.'));
                        }
                        else {
                            total_fare_input.val(fare + pickupTransferSurcharge);
                            total_fare_h4.text(Number(fare + pickupTransferSurcharge).format(0, 3, '.', '.'));
                        }
                        //nmthang - [MOD] - 2016/09/21 - #200 - Eating - [E]
                        seat_codes_span.html($(this).attr('seat-code'));
                        old_final_price_value = 0;
                        old_final_price_text.text('');
                    }
                    else {
                        //Xu ly giam gia dac biet HN-SP
                        var specialDiscountFare = $("#specialDiscountFare").val(),
                            threshold = +fare - +specialDiscountFare;
                        if (!~company_id.indexOf(+operatorId)) {
                            specialDiscountFare = 0;
                        }
                        if (!specialDiscountFare) {
                            threshold = 0;
                            //nmthang - [MOD] - 2016/09/21 - #200 - Eating - [S]
                            //total_fare_input.val(+total_fare_input.val() + +fare);

                            if (parseInt(eatingFare) > 0 && haveEating) {
                                total_fare_input.val(parseInt(total_fare_input.val()) + parseInt(fare) + eatingFare + pickupTransferSurcharge);
                            } else {
                                total_fare_input.val(parseInt(total_fare_input.val()) + +fare + pickupTransferSurcharge);
                            }
                            //nmthang - [MOD] - 2016/09/21 - #200 - Eating - [E]
                        } else {
                            the_ultimate_final_price.val(specialDiscountFare);
                            old_final_price_value = +fare * (seat_codes_input.val().split(',').length + 1);
                            old_final_price_text.text(old_final_price_value.format(0, 3, '.', '.'));
                        }

                        if (seat_codes_input.val().split(',').length == 1) {
                            total_fare_input.val(+total_fare_input.val() + +specialDiscountFare - +threshold);
                        } else {
                            total_fare_input.val(+total_fare_input.val() + +specialDiscountFare);
                        }

                        seat_codes_input.val(seat_codes_input.val() + "," + seat_input);
                        total_fare_h4.text(Number(total_fare_input.val()).format(0, 3, '.', '.'));
                        seat_codes_span.html(seat_codes_span.html() + ', ' + $(this).attr('seat-code'));
                    }

                    if ($(this).data("seatfare") !== $(this).data("originalfare")) {
                        _totalDiscount++;
                    }
                } else if ($(this).hasClass('seat-chosen')) {
                    var seatDiscount = $(this).data("seatdiscount");
                    var seatInfo = $(this).attr('seat-code') + '|' + $(this).attr('floor-num') + '|' + $(this).attr('row-num') + '|' + $(this).attr('col-num');
                    seats = seats.filter(function (el) {
                        return el.seat !== seatInfo;
                    });
                    //console.log(seats);
                    //$(this).find('img').attr('src', img_available_src);
                    changeColorSeat(this, '')


                    $(this).removeClass('seat-chosen');
                    $(this).addClass('seat-available');

                    var seat_input = $(this).attr('seat-code') + '-' +
                        $(this).attr('seat-number') + '-' +
                        $(this).attr('floor-num') + '-' +
                        $(this).attr('row-num') + '-' +
                        $(this).attr('col-num') + '-' +
                        fare + '-',
                        seat_string = seat_codes_input.val(),
                        seat_code_string = seat_codes_span.html();

                    seat_string = seat_string.replace(seat_input + ',', '');
                    seat_string = seat_string.replace(',' + seat_input, '');
                    seat_string = seat_string.replace(seat_input, '');
                    seat_code_string = seat_code_string.replace($(this).attr('seat-code') + ', ', '');
                    seat_code_string = seat_code_string.replace(', ' + $(this).attr('seat-code'), '');
                    seat_code_string = seat_code_string.replace($(this).attr('seat-code'), '');

                    seat_codes_input.val(seat_string);

                    if (seat_code_string == '')
                        seat_code_string = Language["chuachonghe"];
                    seat_codes_span.html(seat_code_string);

                    var specialDiscountFare = $("#specialDiscountFare").val(),
                        threshold = +fare - +specialDiscountFare;
                    if (!~company_id.indexOf(+operatorId)) {
                        specialDiscountFare = 0;
                    }
                    if (!specialDiscountFare) {
                        threshold = 0;
                        //nmthang - [MOD] - 2016/09/22 - #200 - Eating - [S]
                        //total_fare_input.val(+total_fare_input.val() - +fare);
                        if (parseInt(eatingFare) > 0 && haveEating) {
                            total_fare_input.val(+total_fare_input.val() - +fare - eatingFare - pickupTransferSurcharge);
                        }
                        else {
                            total_fare_input.val(+total_fare_input.val() - +fare - pickupTransferSurcharge);
                        }
                        //nmthang - [MOD] - 2016/09/22 - #200 - Eating - [E]
                    }

                    if (seat_codes_input.val().length && seat_codes_input.val().split(',').length == 1) {
                        total_fare_input.val(+total_fare_input.val() - +specialDiscountFare + +threshold);
                        the_ultimate_final_price.val(fare);
                        old_final_price_text.text('');
                    } else if (!seat_codes_input.val().length) {
                        total_fare_input.val('0');
                        old_final_price_text.text('');
                    }
                    else {
                        total_fare_input.val(+total_fare_input.val() - +specialDiscountFare);
                        if (specialDiscountFare) {
                            old_final_price_value = +fare * seat_codes_input.val().split(',').length;
                            old_final_price_text.text(old_final_price_value.format(0, 3, '.', '.'));
                        }
                    }
                    total_fare_h4.text(Number(total_fare_input.val()).format(0, 3, '.', '.'));
                    number_of_seat.val(+number_of_seat.val() - 1);

                    if ($(this).data("seatfare") !== $(this).data("originalfare")) {
                        _totalDiscount--;
                    }
                }
            }

            cd_flag_notice = $(".cd-notice").data("isvisible") == "0" ? true : false;
            if (unchoosable === 1 && cd_flag_notice && !($(".cd-notice").is(':visible'))) {
                $(".cd-notice").show();
                var p = $(this).offset();
                //console.log(p.top);
                var leftArrow = p.left - parseInt($(".ticket-booking-details .container").offset().left) + 7;
                //if (leftArrow < 0) leftArrow = p.left - parseInt($(".seat-template-col").css('left'));
                var topContent = -(Math.round($('.detail-booking').offset().top - p.top) + parseInt($(".cd-notice-content").css('height'))) - 10;
                var topArrow = parseInt($(".cd-notice-content").css('height')) + topContent;

                $(".cd-notice-content").css({
                    "top": topContent + "px",
                });
                $(".cd-notice-arrow").css({
                    "top": topArrow + "px",
                    "left": leftArrow + "px",
                });
            }

        })

        //X Close button
        currentBookingDiv.find('.btn-close-road').click(function () {
            //currentBookingDiv.remove();
            //debugger;
            $("#header").removeClass("displaynone");
            $(".header-blue").removeClass("displaynone");
            $('.result-item').removeClass("displaynone");
            $('.li-banner').removeClass("displaynone");
            $('.road-point').removeClass("displaynone");
            $('.road-backlink').removeClass("displaynone");
            $('#backLinkDiv').removeClass("displaynone");
            $('.contentfooter').removeClass("displaynone");
            $('#dvSearchFilter').removeClass("displaynone");
            $('#dvSearchTicket').removeClass("displaynone");
            $('.body-buttom-mobi').addClass("fix-review-price-mobi");

            if ($(window).width() < 768) {
                $('.foot-vxr-panel').addClass("fix-hotline-mobi");
            }
            closest.next('.ticket-booking-details').slideToggle(300, function () {
                $(this).remove();
            });
            rollBackToNormalButton(closest.find('a.open'));
        });

        // Lay gia tri diem don khach
        var pickedPointName = "";
        var pickedPointValue = "";
        var pickedPointAddress = "";

        var pickupId = "";
        var pickupName = "";
        var pickupIndex = "";
        var pickupTime = "";
        var pickupUnFixedPoint = "";
        var pickupAddress = "";
        var pickupNote = "";
        var pickupDepartTime = "";

        var transferId = "";
        var transferName = "";
        var transferIndex = "";
        var transferTime = "";
        var transferUnFixedPoint = "";
        var transferAddress = "";
        var transferNote = "";



        checkAndShowPickup(0, null);

        $(currentBookingDiv.find("#pickup-select")).change(function () {

            $("#pickup-select").css("border-color", "#c2c2c2");

            var selectedPickup = currentBookingDiv.find("#pickup-select option:selected");
            pickupId = $(selectedPickup).data('pickupid');
            pickupName = $(selectedPickup).data('pickupname');
            pickupIndex = $(selectedPickup).data('pickupindex');
            pickupTime = $(selectedPickup).data('pickuptime');
            pickupUnFixedPoint = $(selectedPickup).data('unfixedpoint');
            pickupAddress = $(selectedPickup).data('address');
            pickupNote = $(selectedPickup).data('note');
            pickupDepartTime = $(selectedPickup).data('pickupdeparttime');

            //Update hidden for booking
            currentBookingDiv.find('input[name=PickupId]').val(pickupId);
            currentBookingDiv.find('input[name=PickupName]').val(pickupName);
            currentBookingDiv.find('input[name=PickupIndex]').val(pickupIndex);
            currentBookingDiv.find('input[name=PickupTimeMinute]').val(pickupTime);
            currentBookingDiv.find('input[name=PickupUnFixedPoint]').val(pickupUnFixedPoint);
            currentBookingDiv.find('input[name=PickupAddress]').val(pickupAddress);
            currentBookingDiv.find('input[name=PickupDepartTime]').val(pickupDepartTime);
            ////update number of seat
            if (pickupUnFixedPoint == '1') {
                //case diem don khong co dinh
                $('#pickup-address-unfixed').val('');
                $('.div-pickup-address-unfixed').fadeIn();
            } else {
                //diem don co dinh
                $('#pickup-address-unfixed').val('');
                $('.div-pickup-address-unfixed').fadeOut();
            }
        });


        currentBookingDiv.find('button.cont-btn').click(function () {
            var fullname = $("#cfn").val(),
                phonenumber = $("#cp").val(),
                email = $("#ce").val(),
                userid = $("#ci").val(),
                haveEatingCheck = $('#HaveEatingCheck').is(':checked'),
                bankValue = currentBookingDiv.find("#bankSelect option:selected").val(),
                pickedPointValue = currentBookingDiv.find("#pickup-select option:selected").val(),
                transferSelectedOption = $("#transfer-select option:selected");
            //reformat phone number
            phonenumber = formatPhoneNumber(phonenumber);
            $("#cp").val(phonenumber);

            if (_totalDiscount > 0) {
                $('input[name=IsDiscount]').val("1");
            } else {
                $('input[name=IsDiscount]').val("0");
            }
            if (seats.length > 0) {
                $('input[name=Seats]').val(JSON.stringify(seats));
            } else {
                $('input[name=Seats]').val('');
            }
            if (seat_codes_span.html() == '' || seat_codes_span.html() == Language["chuachonghe"]) {
                showMessagePopup(Language["chuachonghe"]);
            } else if (!$('input[name=pickup-transfer-select-from]:checked').val() && $('input[name=pickup-transfer-select-from]').length != 0) {
                showMessagePopup(Language["PleaseselectaDeparture"]);
                return false;
            } else if ($('input[name=pickup-transfer-select-from]:checked').val() && $('input[name=pickup-transfer-select-from]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-from]:checked').parent().siblings().find('.address-unfixed-input').val()) {
                showMessagePopup(Language["PleaseTypeDeparturePlace"]);
                $("a[data-toggle='tab'][href='#fromstart']").trigger('click');
                return false;
            } else if ($('input[name=pickup-transfer-select-to]:checked').val() && $('input[name=pickup-transfer-select-to]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-to]:checked').parent().siblings().find('.address-unfixed-input').val()) {
                showMessagePopup(Language["PleaseTypeDestinationPlace"]);
                $("a[data-toggle='tab'][href='#toend']").trigger('click');
                return false;
            } else if (!$('input[name=pickup-transfer-select-to]:checked').val() && $('input[name=pickup-transfer-select-to]').length != 0) {
                showMessagePopup(Language["PleaseselectaDestination"]);
                return false;
            }
            //else if (bankValue == '' && $("#bankSelect").length > 0) {
            //    showMessagePopup('Vui lòng chọn ngân hàng thanh toán');
            //    $("#bankSelect").css("border-color", "red");
            //    return false;
            //}
            else {
                var errorFullName = false;
                var errorPhoneNumber = false;
                var errorEmail = false;
                var errorId = false;
                var errorTransferAddress = false;
                if (fullname == "" || !validateFullName(fullname)) {
                    $("#cfn").addClass("error-check");
                    $("#name-error").show();
                    errorFullName = true;
                } else {
                    $("#cfn").removeClass("error-check");
                    errorFullName = false;
                    $("#name-error").hide();

                    //Check for secondary customer
                    var names = $('li.secondary-customer-item input.full-name');
                    var listNames = [];
                    for (var i = 0; i < names.length; i++) {
                        var name = $(names[i]).val();
                        listNames.push(name);
                        if (name == "" || !validateFullName(name)) {
                            $("#cfn-" + i).addClass("error-check");
                            $("#name-error-" + i).show();
                            errorFullName = true;
                        } else {
                            $("#cfn-" + i).removeClass("error-check");
                            $("#name-error-" + i).hide();
                        }
                    }

                    //check duplicate name
                    if (!errorFullName && listNames.length > 0) {
                        var sortedNames = listNames.slice().sort();

                        for (var i = 0; i < listNames.length - 1; i++) {
                            if (sortedNames[i + 1].trim().toLowerCase() == sortedNames[i].trim().toLowerCase()) {
                                showMessagePopup(Language["NameOfEachPassengerDuplicated"])
                                return;
                            }
                        }
                    }
                }

                if (phonenumber == "" || !validatePhoneNumber(phonenumber)) {
                    $("#cp").addClass("error-check");
                    errorPhoneNumber = true;
                    $("#phone-error").show();

                } else {
                    $("#cp").removeClass("error-check");
                    errorPhoneNumber = false;
                    $("#phone-error").hide();
                }
                if (email == "" || !validateEmail(email)) {
                    $("#ce").addClass("error-check");
                    errorEmail = true;
                    $("#email-error").show();

                } else {
                    $("#ce").removeClass("error-check");
                    errorEmail = false;
                    $("#email-error").hide();
                }
                //currentBookingDiv.find(".seat")
                if ($("#checkboxTransfer").is(':checked') && $(transferSelectedOption).data('unfixedpoint') == '1') {
                    if ($("#transfer-address-unfixed").val() == null || $("#transfer-address-unfixed").val() == '') {
                        errorTransferAddress = true;
                        if (!isMobile) {
                            $("#transfer-address-unfixed").popover({
                                trigger: "manual"
                            });
                            $('#transfer-address-unfixed').popover('show');
                        }
                    }
                }
                fillPickupTransferInfoToHiddenField();
                if (errorFullName == false && errorPhoneNumber == false && errorEmail == false && errorId == false && errorTransferAddress == false) {
                    //Show wait loading
                    showLoading();
                    if (window.vxrMobileApp == true) {
                        var currentOS = getMobileOperatingSystem();
                        $('<input>').attr({
                            type: 'hidden',
                            name: 'vxrMobileApp',
                            value: '1'
                        }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                        $('<input>').attr({
                            type: 'hidden',
                            name: 'vxrMobileAppOS',
                            value: currentOS
                        }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                    } else {
                        $('<input>').attr({
                            type: 'hidden',
                            name: 'vxrMobileApp',
                            value: '0'
                        }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                        $('<input>').attr({
                            type: 'hidden',
                            name: 'vxrMobileAppOS',
                            value: currentOS
                        }).appendTo(currentBookingDiv.find('.frmSeatSelection'));
                    }
                    var form = currentBookingDiv.find('.frmSeatSelection');
                    var eatingValue = (haveEatingCheck == true) ? "1" : "0";
                    currentBookingDiv.find('.frmSeatSelection').find('#HaveEating').val(eatingValue);
                    var country_code = currentBookingDiv.find('#countryCodeSelector').val();
                    currentBookingDiv.find('input[name=CountryCode]').val(country_code);
                    var url = new URL(window.location.href);
                    var aid = url.searchParams.get('aid');
                    var clickId = url.searchParams.get('clickId');
                    var source = url.searchParams.get('utm_source') || url.searchParams.get('source');
                    if (aid) {
                        form.append('<input name="AffiliateId" value="' + aid + '" style="display:none"/>');
                        form.append('<input name="ClickId" value="' + clickId + '" style="display:none"/>');
                    }
                    if (source) {
                        form.append('<input name="source" value="' + source + '" style="display:none"/>');
                    }

                   

                    var res = $.ajax({
                        type: "POST",
                        url: '/' + culture + '/Payment/TryBookingSeats',
                        data: form.serialize(),
                        success: function (res) {
                            if (res.booked) {
                                sessionStorage.isBooking = "true";
                                if (res.url) {
                                    location.href = res.url;
                                    return true;
                                } else {
                                    if (res.booking_code) {
                                        $("#BkcTxt").val(res.booking_code);
                                        $("#TkcTxt").val(res.ticket_code);
                                    }
                                    form.submit();
                                }
                            } else {
                                hideLoading();
                                showMessagePopup(Language["ThereWasAnErrorWhileBookingTickets"]);
                                getSeatTemplate(ele, true);
                            }
                        }
                    });
                }

                return true;
            }
        });

        currentBookingDiv.find('span.close-cd-notice-road').click(function () {
            currentBookingDiv.find('.btn-close-road').trigger('click');
        });

        currentBookingDiv.find('.btn-notice-accept').click(function () {
            currentBookingDiv.find(".cd-notice").data("isvisible", "1");
            currentBookingDiv.find(".cd-notice").hide();
        });

        changeToCloseButton(ele);

        hideLoading();
        //scroll to current trip div
        var scrollTopValue = currentBookingDiv.offset().top - 150;
        $('html, body').animate({ scrollTop: scrollTopValue }, 'slow');
        isSeatLoading = false;
    });
}
//====================================end get seat======================================//

function addNewCustomerInfo(fromOrder, numberOfCustomer, type) {
    //show new field

    for (var i = 0; i < numberOfCustomer; i++) {
        var customer_order = fromOrder + i;
        var htmlPattern = $('.secondary-customer-pattern').html();
        htmlPattern = htmlPattern.replaceAll('{order}', customer_order);
        htmlPattern = htmlPattern.replaceAll('{tabindex}', customer_order + 3);
        htmlPattern = htmlPattern.replaceAll('{index}', customer_order - 2);
        $('.list-secondary-customer').append('<li class="secondary-customer-item">' + htmlPattern + '</li>');

        var curentH = $('.detail-booking').height() + 15;
    }

}

function removeCustomerInfo(numberOfCustomer, type) {
    for (var i = 0; i < numberOfCustomer; i++) {
        var curentH = $('.detail-booking').height() - 10;
        $('.list-secondary-customer li:last-child').remove();
    }
}

function checkAndShowPickup(numOfSeat, param) {
    var allowPickup = $('#allowPickup').val();
    var allowTransfer = $('#allowTransfer').val();
    var allowTransferAtArrive = $('#allowTransferAtArrive').val();
    var hasTransfer = $('#hastransfer').val();

    //enable or disable select pickup tranfer checkbox by limit customer
    $('.pickup-transfer-list').find("input[name='pickup-transfer-select-from']").each(function () {
        var minCustomer = parseInt($(this).data('min_customer'));
        if (isNaN(minCustomer)) {
            $(this).prop("disabled", false);
        } else {
            if (minCustomer >= 2 && minCustomer > numOfSeat) {

                $(this).prop("disabled", true);
                //unchecked for disable checkbox
                if ($(this).prop('checked') == true) {
                    $(this).prop('checked', false);
                }
            } else {
                $(this).prop("disabled", false);
            }
        }
    });
    $('.pickup-transfer-list').find("input[name='pickup-transfer-select-to']").each(function () {
        var minCustomer = parseInt($(this).data('min_customer'));
        if (isNaN(minCustomer)) {
            $(this).prop("disabled", false);
        } else {
            if (minCustomer >= 2 && minCustomer > numOfSeat) {
                $(this).prop("disabled", true);
                //unchecked for disable checkbox
                if ($(this).prop('checked') == true) {
                    $(this).prop('checked', false);
                }
            } else {
                $(this).prop("disabled", false);
            }
        }
    });


    if (allowPickup == 1) {
        //Cho phep don
        //$('.pickup-item').show()
        //$('.pickup-title').show()
        if (allowTransfer == 1) {
            //Cho phep TC
            //$('.transfer-list').show()
            //$('.transfer-item').show()
            //$('.transfer-title').show();

        } else {
            //Khong TC
            //$('.transfer-item').hide()
            //$('.transfer-title').hide();

            var selectedRadioInTransfer = $('.transfer-list').find("input[name='pickup-transfer-select-from']:checked");
            if (selectedRadioInTransfer.length > 0) {
                if (param) {
                    var previousSurcharge = +$('#pickupTransferSurcharge').val();
                    if (param.hiddenInputObj) {
                        //online form
                        var currentTotal = +param.hiddenInputObj.val();
                        currentTotal -= (numOfSeat + 1) * previousSurcharge;
                        param.hiddenInputObj.val(currentTotal);
                        //param.displayTextObj.text(Number(currentTotal).format(0, 3, '.', '.'));
                    }
                }

                //decreare total fare before clear selected surcharge
                $(selectedRadioInTransfer[0]).removeAttr('checked');
            }

        }
    } else {
        //Khong cho phep don
        //$(".pickup-item").hide()
        //$('.pickup-title').hide();

        var selectedRadioInPickup = $('.pickup-list').find("input[name='pickup-transfer-select-from']:checked");
        if (selectedRadioInPickup.length > 0) {
            if (param) {
                var previousSurcharge = +$('#pickupTransferSurcharge').val();
                if (param.hiddenInputObj) {
                    //online form
                    var currentTotal = +param.hiddenInputObj.val();
                    currentTotal -= (numOfSeat + 1) * previousSurcharge;
                    param.hiddenInputObj.val(currentTotal);
                    //param.displayTextObj.text(Number(currentTotal).format(0, 3, '.', '.'));
                }
            }
            $(selectedRadioInPickup[0]).removeAttr('checked')
        }

        if (allowTransfer == 1) {
            //Cho TC
            //$('.transfer-item').show()
            //$('.transfer-title').show()


        } else {
            //Khong TC
            //$('.transfer-item').hide()
            //$('.transfer-title').hide()
        }
    }


    //Reset surcharge and hidden input form if not allow select pickup, transfer info
    if (allowPickup == 0) {
        $('input[name=PickupId]').val('')
        $('input[name=PickupName]').val('')
        $('input[name=PickupIndex]').val('')
        $('input[name=PickupTime]').val('0')
        $('input[name=PickupUnfixedAddress]').val('')
        $('input[name=PickupUnFixedPoint]').val('0')
    }

    if (allowTransfer == 0) {
        $('input[name=TransferId]').val('')
        $('input[name=TransferName]').val('')
        $('input[name=TransferIndex]').val('')
        $('input[name=TransferTime]').val('0')
        $('input[name=TransferUnfixedAddress]').val('')
        $('input[name=TransferUnFixedPoint]').val('0')
    }
    if (allowTransferAtArrive == 0) {
        $('input[name=TransferAtArriveId]').val('')
        $('input[name=TransferAtArriveName]').val('')
        $('input[name=TransferAtArriveIndex]').val('')
        $('input[name=TransferAtArriveTime]').val('0')
        $('input[name=TransferAtArriveAddress]').val('')
        $('input[name=TransferAtArriveUnFixedPoint]').val('0')
    }
    var selectedRadio = $("input[name='pickup-transfer-select-from']:checked");
    if (selectedRadio.length == 0) {
        $('#pickupTransferSurcharge').val('0');
    }


}

/*--------------support function ------------------------*/
//show click checkbox for customer reviews
function showCheckboxes() {
    $(".checkboxes").show();
}
function validateFullName(fullname) {
    var re = /^[a-zA-Z\s][a-zA-z0-9 ]+$/
    return re.test(locdauten(fullname));
}
function validatePhoneNumber(phone) {
    if (phone.length < 10 || phone.length > 11)
        return false;
    return true;
}
function validateID(userId) {
    var re = /^\d{9,12}$/
    return re.test(userId);
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.trim());
}
function locdauten(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function GetUrlParam(name) {
    return (location.search.split(name + '=')[1] || '').split('&')[0];
}
function getLanguageCultureAndParam() {
    var culture = "vi-VN";
    var curUrl = window.location.href;
    if (curUrl.indexOf("vi-VN") > 0) {
        culture = "vi-VN";
    } else if (curUrl.indexOf("en-US") > 0) {
        culture = "en-US";
    }

    var translatorParam = "";
    if (getUrlVars()["user"] != undefined) {
        translatorParam = "user=1";
    }

    var langObj = {
        culture: culture,
        translatorParam: translatorParam
    };
    return langObj;
}
//check a date is a valid date
function isDate(day, month, year) {
    var day1 = parseInt(day);
    var month1 = parseInt(month);
    var year1 = parseInt(year);
    if (day == 0) {
        return false;
    }
    switch (month1) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            if (day1 > 31)
                return false;
            return true;
        case 2:
            if (year1 % 4 == 0)
                if (day1 > 29) {
                    return false;
                }
                else {
                    return true;
                }
            if (day1 > 28) {
                return false;
            }
            return true;
        case 4: case 6: case 9: case 11:
            if (day1 > 30) {
                return false;
            }
            return true;
        default:
            return false;
    }
}
//reformat day,month,year to a string of datetime dd_mm_yyy
function ReformatToDisplayDate(day, month, year) {
    var dateString = "";
    var iday = parseInt(day);
    var imonth = parseInt(month);
    year = parseInt(year);
    if (iday < 10) {
        dateString += "0" + iday + "-";
    } else {
        dateString += iday + "-";
    }
    if (imonth < 10) {
        dateString += "0" + imonth + "-";
    } else {
        dateString += imonth + "-";
    }
    dateString += year;
    return dateString;
}

//support function to scroll event
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
//support to show the message in the popup
function showMessagePopup(message) {
    $("#popup-show-message-content").html(message);
    $("#popup-show-message").modal("show");
}
//-- end support function to scroll event

function isNumberByEventCode(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
//Support google analysis tracking
function getRouteInfoObject(element) {
    var sFromTime = '';
    var closest = $(element).closest('.ticket-booking-details').prev();
    if (closest.find("#FromTimes").length > 0) {
        sFromTime = closest.find("#FromTimes").val().trim();
    }
    else {
        sFromTime = closest.find(".span-from-time").text().trim().substr(0, 5);
    }

    var routeName = closest.find('p.route').text(),
        tripId = closest.attr('data-tripid'),
        fare = closest.find('h6.price').attr('data-value'),
        operatorName = closest.find('h6.comp-name-title').text();

    var obj = {
        sFromTime: sFromTime,
        routeName: routeName,
        tripId: tripId,
        fare: fare,
        operatorName: operatorName
    };

    return obj;
}
function parseImpresstionObjectData(index, $arrItem) {
    var Id = $arrItem.data('compid');
    //var routeName = $arrItem.data('routename');
    var opeName = $arrItem.attr('operator-name');
    var routeId = window.location.href.slice(window.location.href.lastIndexOf('-') + 1, window.location.href.indexOf('.html'));
    var fromStopName = $arrItem.attr('fromstop-name');
    var toStopName = $arrItem.attr('tostop-name');
    var fromTime = $arrItem.data('from-time');
    var fromDate = $arrItem.attr('departure-date');

    var object = {
        // Provide product details in an impressionFieldObject.
        'id': Id + '',  // Product ID (string).
        'name': fromStopName + ' ' + toStopName + ' - ' + opeName,  // Product name (string).
        'category': fromStopName + '/' + toStopName + ' - ' + routeId,  // Product category (string).
        'brand': opeName,  // Product brand (string).
        'variant': fromDate + ' - ' + fromTime,  // Product variant (string).
        'list': fromStopName + '/' + toStopName, // Product list (string).
        'position': index + 1  // Product position (number).
    }
    return object;
}

// validate an url
function validateHashIndex() {
    var curUrl = window.location.href;
    var tempUrl = curUrl.split('#');
    var isIndex = true;
    var regex = /^\d+$/g;
    if (tempUrl.length == 2 && tempUrl[1].length > 0) {
        if (tempUrl[1][8] != '?') {
            var parts = tempUrl[1].split('-');
            if (parts.length == 2) {
                var paramIndex = parts[1];
                if (!regex.test(paramIndex)) {
                    isIndex = false;
                }
            } else if (parts.length > 3) {
                isIndex = false;
            }
        }
    }
    return isIndex;
}

//sort html element
function sortUsingNestedText_increase(parent, childSelector, keySelector, isString) {
    var items = parent.children(childSelector).sort(function (a, b) {

        if (isString) {
            var vA = locdauten($(a).find(keySelector).data('value'));
            var vB = locdauten($(b).find(keySelector).data('value'));
            return (vA > vB) ? 1 : -1;
        }
        else {
            var vA = parseFloat($(a).find(keySelector).data('value'));
            var vB = parseFloat($(b).find(keySelector).data('value'));
            if (vB == 0)
                return -1;
            return vA == 0 ? 1 : (vA - vB); // Tang dan
        }
    });
    parent.append(items);
}
function sortUsingNestedText_decrease(parent, childSelector, keySelector, isString) {
    var items = parent.children(childSelector).sort(function (a, b) {
        if (isString) {
            var vA = locdauten($(a).find(keySelector).data('value'));
            var vB = locdauten($(b).find(keySelector).data('value'));
            return (vA > vB) ? -1 : 1;
        }
        else {
            var vA = parseFloat($(a).find(keySelector).data('value'));
            var vB = parseFloat($(b).find(keySelector).data('value'));
            return (vB - vA); // Giam dan
        }
    });
    parent.append(items);
}
//--end sort html element
//get zalo profile from local storage
function GetZaloProfile() {
    var sZaloProfile = localStorage["zalo_user_info"];
    var zaloProfile = null;
    if (sZaloProfile != null && sZaloProfile != undefined && sZaloProfile != "") {
        zaloProfile = JSON.parse(sZaloProfile);
    }
    return zaloProfile;
}
/*-------------- end support function ------------------------*/
/*-------------- Init event function ------------------------*/
function initSearchTicketPageWithoutSeatEvent() {
    //Filters
    maskEventOnOperatorFilter();
    maskEventOnFromStopFilter();
    maskEventOnToStopFilter();
    maskEventOnRatingFilter();
    //maskEventOnPriceFilter();

    //Tool tip
    maskTipPopOver();

    //Time event
    //maskEventOnFromTime();
    //maskEventOnToTime();

    //Comment button
    maskEventOnCommentButton();

    //Detail tab
    maskEventOnDetailTab();
    maskEventOnDetailLink();
    maskEventOnCloseTabButton();

    //SwitchButton
    $(".switchButton, .btn-switch-route").click(function () {
        var tempData = $("#departPlace").val();
        $("#departPlace").val($("#destination").val());
        $("#destination").val(tempData);
        tempData = $("#start-point-type").val();
        $("#start-point-type").val($("#stop-point-type").val());
        $("#stop-point-type").val(tempData);
        tempData = $("#start-point-id").val();
        $("#start-point-id").val($("#stop-point-id").val());
        $("#stop-point-id").val(tempData);
    });
}
//Init search ticket page
function initSearchTicketSeatEvent() {
    //Mask event on call center, book seat button
    maskEventOnBookSeatButton();
    maskEventOnCallCenterButton();
    maskEventOnCloseButton();
}

function initSearchWidget() {
    //Xu ly popup tim noi di, noi den
    if ($(window).width() <= 768) {
        $("#departPlace").click(function () {
            $("#depart-modal").modal("show");
            $("#departPlace2").val($("#departPlace").val());
            //$("#departPlace2").select();
            $("#departPlace2").focus();
        });
        $("#destination").click(function () {
            $("#destination-modal").modal("show");
            $("#destination2").val($("#destination").val());
            //$("#destination2").select();
            $("#destination2").focus();
        });
        $(".popular-dep-place").click(function () {
            var fromId = $(this).attr("data-fromid");
            var fromType = $(this).attr("data-fromtype");
            var fromName = $(this).text();
            var searchText = $(this).data("searchtext");
            if (searchText != null && searchText != '') {
                fromName = searchText;
            }
            $("#departPlace").val(fromName);
            $("#start-point-type").val(fromType);
            $("#start-point-id").val(fromId);
            $("#depart-modal").modal("hide");
        });
        $(".popular-des-place").click(function () {
            var toId = $(this).attr("data-toid");
            var toType = $(this).attr("data-totype");
            var toName = $(this).text();
            var searchText = $(this).data("searchtext");
            if (searchText != null && searchText != '') {
                toName = searchText;
            }
            $("#destination").val(toName);
            $("#stop-point-type").val(toType);
            $("#stop-point-id").val(toId);
            $("#destination-modal").modal("hide");
        });
        $(".dep-search-btn").click(function () {
            $("#depart-modal").modal("hide");
        });
        $(".dep-search-btn").click(function () {
            $("#destination-modal").modal("hide");
        });
        $("#clear-depart").click(function () {
            $("#departPlace2").val('');
            $("#departPlace2").focus();
        });
        $("#clear-destination").click(function () {
            $("#destination2").val('');
            $("#destination2").focus();
        });
    }
}
/*-------------- End Init event function ------------------------*/

/*------------------ Business function ------------------*/
function getPickupInfo(pickup_json) {
    $.ajax({
        type: "post",
        url: "/" + culture + "/Booking/GetListPickupInfo",
        async: true,
        data: { list_pickup_info: pickup_json },
        success: function (result) {
            var listAppended = $("[id^=transfer][appended=1]");
            for (var i = 0; i < listAppended.length; i++) {
                $(listAppended[i]).attr('appended', '0');
            }
            if (result && result.json_string) {
                var model = JSON.parse(result.json_string);
                for (var i = 0; i < model.length; i++) {
                    var subModel = model[i],
                        hour = subModel.time.split(':')[0],
                        minute = subModel.time.split(':')[1];
                    $("#transfer-" + subModel.bus_stop_id + "-" + subModel.time.replace(':', '-')).removeClass('hidden');
                    $("#transfer-" + subModel.bus_stop_id + "-" + subModel.time.replace(':', '-')).parent().parent().find(".lichtrinh").removeClass("link-lich-trinh");
                    $("#transfer-panel-" + subModel.bus_stop_id + "-" + subModel.time.replace(':', '-')).removeClass('hidden');
                    $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended", '0')
                    $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).html('')
                    if ($("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended") != "1") {
                        for (var j = 0; j < subModel.from.transfer.length; j++) {
                            var new_hour = (Math.floor(+hour + (+subModel.from.transfer[j].duration / 60)) + Math.floor((+minute + (+subModel.from.transfer[j].duration % 60)) / 60) % 24),
                                new_minute = ((+minute + (+subModel.from.transfer[j].duration % 60)) % 60);
                            if (new_minute < 0) {
                                new_minute = new_minute * (-1);
                            }
                            if (new_minute < 10) {
                                new_minute = "0" + new_minute;
                            }
                            $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended", "1")

                            $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).append("<p style='font-size:15px;float: left;width: 100%;'><span style='float:left;width: 50%;'>" + subModel.from.transfer[j].name + "</span><span style='float:left;width: 20%;'>" + new_hour + ":" + new_minute + "</span>" + "<span style='float:left;width: 30%;'>" + subModel.from.transfer[j].note + "</span></p>")
                        }
                    }
                    if (subModel.from.list_transfer_detail.note != '') {
                        $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended-note", '0')
                        //$("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).html('');
                        if ($("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended-note") != 1) {
                            $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended-note", "1")

                            $("#transfer-from-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).append("<p style='font-size:13px;word-break: break-all;'>(" + subModel.from.list_transfer_detail.note + ")</span>" + "</p>")
                        }
                    }
                    if (subModel.to.list_transfer_detail.name && subModel.to.list_transfer_detail.name != '') {
                        $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended", '0')
                        $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).html('')
                        if ($("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended") != "1") {
                            for (var j = 0; j < subModel.to.transfer.length; j++) {
                                var new_hour = (Math.floor(+hour + (+subModel.to.transfer[j].duration / 60)) + Math.floor((+minute + (+subModel.to.transfer[j].duration % 60)) / 60) % 24),
                                    new_minute = ((+minute + (+subModel.to.transfer[j].duration % 60)) % 60);
                                if (new_minute < 0) {
                                    new_minute = new_minute * (-1);
                                }
                                if (new_minute < 10) {
                                    new_minute = "0" + new_minute;
                                }
                                $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended", "1")

                                $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).append("<p style='font-size:15px;float: left;width: 100%;'><span style='float:left;width: 50%;'>" + subModel.to.transfer[j].name + "</span><span style='float:left;width: 20%;'>" + new_hour + ":" + new_minute + "</span>" + "<span style='float:left;width: 30%;'>" + subModel.to.transfer[j].note + "</span></p>")
                            }
                        }
                        if (subModel.to.list_transfer_detail.note != '') {
                            $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended-note", '0')
                            //$("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).html('')
                            if ($("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended-note") != 1) {
                                $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).attr("appended-note", "1")

                                $("#transfer-to-" + subModel.bus_stop_id + "-" + subModel.time.replace(":", "-")).append("<p style='font-size:15px;word-break: break-all;'>(" + subModel.to.list_transfer_detail.note + ")</span>" + "</p>")
                            }
                        }
                    } else {
                        $("#transfer-to-panel-" + subModel.bus_stop_id + "-" + subModel.time.replace(':', '-')).addClass('hidden')
                    }
                }
            }

        }
    });
}
function getServiceAvailableSeat(tripCode, soldOutText) {
    if (!tripCode)
        return false;
    var list_params = tripCode.split(','),
        threshold = 7000, count = 0,
        push_trip_code = [];
    for (var i = 0; i < list_params.length; i++) {
        count += list_params[i].length;
        if (count < threshold) {
            push_trip_code.push(list_params[i]);
            if (i + 1 == list_params.length) {
                $.ajax({
                    type: "post",
                    url: "/" + culture + "/Booking/GetListAvailableSeat",
                    async: true,
                    data: { list_trip_codes: push_trip_code.join(',') },
                    success: function (result) {
                        var available_seats = result.available_seats.split(','),
                            trip_codes = result.list_trip_codes.split(',');

                        for (var i = 0; i < trip_codes.length; i++) {
                            $("." + trip_codes[i]).text(available_seats[i]);

                            //console.log(trip_codes[i].substr(0, 4) + ': ' + available_seats[i] + '-1')
                            if (+available_seats[i] == 0) {
                                $.each($(".a-" + trip_codes[i]), function (index, value) {
                                    //if($(value).hasClass("hidden-xs")){
                                    //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-sm hidden-xs rounded-4 w100'>" + soldOutText + "</button>")
                                    //}
                                    //if($(value).hasClass("hidden-lg")){
                                    //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-lg hidden-md rounded-4 w100'>" + soldOutText + "</button>")
                                    //}
                                    var resultItem = $(value).closest('.result-item');
                                    $('.result-list').append(resultItem);
                                    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg rounded-4 w100 btn-vxr-gray-lg'>" + soldOutText + "</button>");
                                });

                                //for (var j = 0; j < $(".a-" + trip_codes[i]).length; j++) {
                                //    if ($($(".a-" + trip_codes[i])[j]).hasClass("hidden-xs")) {
                                //        $(".a-" + trip_codes[i])[j].replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-sm hidden-xs rounded-4 w100'>" + soldOutText + "</button>")
                                //    }
                                //    if ($($(".a-" + trip_codes[i])[j]).hasClass("hidden-lg")) {
                                //        $(".a-" + trip_codes[i])[j].replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-lg hidden-md rounded-4 w100'>" + soldOutText + "</button>")
                                //    }
                                //}

                            }
                        }

                        $(".service-call").attr("style", "");
                    }
                });
            }
        } else if (i + 1 == list_params.length) {
            //count = list_params[i].length;
            $.ajax({
                type: "post",
                url: "/" + culture + "/Booking/GetListAvailableSeat",
                async: true,
                data: { list_trip_codes: push_trip_code.join(',') },
                success: function (result) {
                    var available_seats = result.available_seats.split(','),
                        trip_codes = result.list_trip_codes.split(',');

                    for (var i = 0; i < trip_codes.length; i++) {
                        $("." + trip_codes[i]).text(available_seats[i]);
                        //console.log(trip_codes[i].substr(0, 4) + ': ' + available_seats[i] + '-2')
                        if (+available_seats[i] == 0) {


                            $.each($(".a-" + trip_codes[i]), function (index, value) {
                                //if($(value).hasClass("hidden-xs")){
                                //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-sm hidden-xs rounded-4 w100'>" + soldOutText + "</button>")
                                //}
                                //if($(value).hasClass("hidden-lg")){
                                //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-lg hidden-md rounded-4 w100'>" + soldOutText + "</button>")
                                //}
                                var resultItem = $(value).closest('.result-item');
                                $('.result-list').append(resultItem);
                                $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg rounded-4 w100 btn-vxr-gray-lg'>" + soldOutText + "</button>");
                            });

                        }
                    }
                    $(".service-call").attr("style", "");
                }
            });
            push_trip_code = [];
            push_trip_code.push(list_params[i]);
            $.ajax({
                type: "post",
                url: "/" + culture + "/Booking/GetListAvailableSeat",
                async: true,
                data: { list_trip_codes: push_trip_code.join(',') },
                success: function (result) {
                    var available_seats = result.available_seats.split(','),
                        trip_codes = result.list_trip_codes.split(',');

                    for (var i = 0; i < trip_codes.length; i++) {
                        $("." + trip_codes[i]).text(available_seats[i]);
                        //console.log(trip_codes[i].substr(0, 4) + ': ' + available_seats[i] + '-3')
                        if (+available_seats[i] == 0) {

                            $.each($(".a-" + trip_codes[i]), function (index, value) {
                                //if($(value).hasClass("hidden-xs")){
                                //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-sm hidden-xs rounded-4 w100'>" + soldOutText + "</button>")
                                //}
                                //if($(value).hasClass("hidden-lg")){
                                //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-lg hidden-md rounded-4 w100'>" + soldOutText + "</button>")
                                //}
                                var resultItem = $(value).closest('.result-item');
                                $('.result-list').append(resultItem);
                                $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg rounded-4 w100 btn-vxr-gray-lg'>" + soldOutText + "</button>");
                            });
                        }
                    }
                    $(".service-call").attr("style", "");
                }
            })
        } else {
            count = list_params[i].length;
            $.ajax({
                type: "post",
                url: "/" + culture + "/Booking/GetListAvailableSeat",
                async: true,
                data: { list_trip_codes: push_trip_code.join(',') },
                success: function (result) {
                    var available_seats = result.available_seats.split(','),
                        trip_codes = result.list_trip_codes.split(',');

                    for (var i = 0; i < trip_codes.length; i++) {
                        $("." + trip_codes[i]).text(available_seats[i]);
                        //console.log(trip_codes[i].substr(0, 4) + ': ' + available_seats[i] + '-4')
                        if (+available_seats[i] == 0) {

                            $.each($(".a-" + trip_codes[i]), function (index, value) {
                                //if($(value).hasClass("hidden-xs")){
                                //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-sm hidden-xs rounded-4 w100'>" + soldOutText + "</button>")
                                //}
                                //if($(value).hasClass("hidden-lg")){
                                //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-lg hidden-md rounded-4 w100'>" + soldOutText + "</button>")
                                //}
                                var resultItem = $(value).closest('.result-item');
                                $('.result-list').append(resultItem);
                                $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg rounded-4 w100 btn-vxr-gray-lg'>" + soldOutText + "</button>");
                            });
                        }
                    }
                }
            });
            push_trip_code = [];
            push_trip_code.push(list_params[i])
        }
    }
    $.each($("button.no-ticket"), function (index, value) {
        //if($(value).hasClass("hidden-xs")){
        //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-sm hidden-xs rounded-4 w100'>" + soldOutText + "</button>")
        //}
        //if($(value).hasClass("hidden-lg")){
        //    $(value).replaceWith("<button type='button' class='no-ticket btn-sold-out-lg hidden-lg hidden-md rounded-4 w100'>" + soldOutText + "</button>")
        //}
        var resultItem = $(value).closest('.result-item');
        //if (soldOut.length > 0) {
        $('.result-list').append(resultItem);
        //}
    });
}

//---------------Start Loading Route Paging --------------
function reloadRouteBySearchForm() {
    //Local search
    var rawUrl = window.location.href.split('?')[0];

    var lParams = rawUrl.split('-');

    var lastParam = lParams[lParams.length - 1];

    lastParam = lastParam.split('?')[0];

    lastParam = lastParam.substring(0, lastParam.length - 5);

    var busOperatorId = '0';

    if (lastParam.indexOf('t') < 0) {
        busOperatorId = lastParam;
        lastParam = lParams[lParams.length - 2];
    }

    var fromToParam = lastParam.split('t');
    var fromType = fromToParam[0].charAt(0);
    var toType = fromToParam[1].charAt(0);

    var fromId = fromToParam[0].substring(1, fromToParam[0].length);
    var toId = fromToParam[1].substring(1, fromToParam[1].length - 1);

    var startPointId = $('#start-point-id').val();
    var stopPointId = $('#stop-point-id').val();
    if (fromId == startPointId && toId == stopPointId) {
        var date = $('#departDate').val();
        if (date != null) {
            date = date.replace(/\//gi, "");
        }
        if (date == null || date == "") {
            $('#departDate').trigger('focus');
            return false;
        }

        $('#span-current-date').val(date);
        $('#departDate').val(date);

        var durationdays = moment(date, "DD-MM-YYYY").diff(moment(), "hours");
        if (durationdays <= 0) { //today
            $("#btPrevDate").hide();
            $("#mbtPrevDate").hide();
        }
        else {
            $("#btPrevDate").show();
            $("#mbtPrevDate").show();
        }

        ga('send', 'pageview', {
            'DepartureDate': date.replace(/-/g, '/')
        });
        var curUrl = window.location.href.split('#')[0];
        var searchDate = GetUrlParam('date');
        //change query date
        if (searchDate != "") {
            curUrl = curUrl.replace(searchDate, date);
        }

        //change hashtag param
        history.pushState({}, document.title, curUrl);
        // window.location.href = curUrl;
        hideLoading();
        $("#current-page-sort-field").val("");
        $("#current-page-sort-direction").val("");
        loadRouteOnInit();
        return false;
    }
    else {
        searchTickets(true);
    }
}
function loadRouteOnInit() {

    //action: init next
    if (xhr) xhr.abort();

    var pageIndex = 1;
    //prevent call next page while loading
    var fromtype = $("#start-point-type").val();
    var fromid = $("#start-point-id").val();
    var totype = $("#stop-point-type").val();
    var toid = $("#stop-point-id").val();
    var holidaykey = "khach";
    var currentUrl = window.location.href;

    var rawUrl = window.location.href;

    var lastParam = rawUrl.split(/.html/)[0];
    lastParam = lastParam.split("-");
    lastParam = lastParam[lastParam.length - 1];

    var busOperatorId = '0';
    if (lastParam.indexOf('t') < 0) {
        busOperatorId = lastParam;
    }

    var paramDate = $("#departDate").val();
    paramDate = paramDate.split('-');

    var day = paramDate[0];
    var month = paramDate[1];
    var year = paramDate[2];
    var busOperatorName = "";
    if ($("#search-busoperator-name") && $("#search-busoperator-name").val() !== null) {
        busOperatorName = $("#search-busoperator-name").val();
    }
    //Get all from filter
    var checkedDiscountList = $('.list-discount input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedTransporterList = $('.trasporter-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedFromTimeList = $('.from-time-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedStartPointList = $('.start-point-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedEndPointList = $('.end-point-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedVehicleTypeList = $('.vehicle-type-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");

    var checkedFacilityList = $('.facilities-type-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-remark');
    }).get().join("|");

    var checkedSeatTypeList = $('.seat-type-list input[type=checkbox]:checked').map(function () {
        return $(this).attr('data-id');
    }).get().join("|");


    var sortField = $("#current-page-sort-field").val();
    var sortDirection = $("#current-page-sort-direction").val();
    //disableScroll();
    isRouteLoading = true;

    $("#footer").hide();
    $("#routeInfoDiv").hide();
    $("#backLinkDiv").hide();


    xhr = $.ajax({
        type: 'post',
        url: "/" + culture + "/Booking/GetSearchTicketResultAjax?" + translatorParam,
        data: {
            date: day + "-" + month + "-" + year,
            holidayKey: holidaykey || "khach",
            fromType: fromtype,
            fromId: fromid,
            toType: totype,
            toId: toid,
            busOperatorId: busOperatorId,
            hasMomo: window.location.href.indexOf("?source=momo") > -1,
            mainUrl: currentUrl,
            busOperatorName: busOperatorName,
            pageIndex: pageIndex,
            discountList: checkedDiscountList,
            transporterList: checkedTransporterList,
            startPointList: checkedStartPointList,
            endPointList: checkedEndPointList,
            fromTimeList: checkedFromTimeList,
            vehicleTypeList: checkedVehicleTypeList,
            facilityList: checkedFacilityList,
            seatTypeList: checkedSeatTypeList,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function () {
            var loadingHtml = "<div class='route-loader-container' style='text-align: center'>" +
                "<br/><br/>" +
                "<div class='route-loader' style='text-align: center;'>" +
                "<div class='circle route-circle'></div>" +
                "<div class='circle route-circle'></div>" +
                "<div class='circle route-circle'></div>" +
                "<div class='circle route-circle'></div>" +
                "<div class='circle route-circle'></div>" +
                "</div>" +
                "<br/><br/>" +

                "</div>";

            $("#replaceDiv").html(loadingHtml);
            $("#main").show();
        },
        success: function (result) {
            $("#main").replaceWith(result);
            $("#main").show();
            setTimeout(function () {
                $("#checkExtendLoad").val('0');
                $("#footer").show();
                $("#routeInfoDiv").show();
                $("#backLinkDiv").show();
            }, 20);


            //enableScroll();
            isRouteLoading = false;
            RecalAfterLoadTicket();

        }, error: function () {
            $(".route-loader").hide();
            isRouteLoading = false;
            //enableScroll();
        }
    });
}
function UpdateHeaderChangeLanguage() {
    //Update lai link url moi cho change language
    var paramDate = $("#departDate").val();
    var current_en_change_url = $(".header-blue-language.en-change").attr("data-href");
    var current_vi_change_url = $(".header-blue-language.vi-change").attr("data-href");
    if (current_en_change_url != undefined) {
        current_en_change_url = UpdateLinkBySelectDate(current_en_change_url, paramDate);
        $(".header-blue-language.en-change").attr("data-href", current_en_change_url);
    }
    if (current_vi_change_url != undefined) {
        current_vi_change_url = UpdateLinkBySelectDate(current_vi_change_url, paramDate);
        $(".header-blue-language.vi-change").attr("data-href", current_vi_change_url);
    }
}
function UpdateLinkBySelectDate(currentLink, selectDate) {
    var arrLink = currentLink.split('?');
    if (arrLink.length == 3) {
        ///vi-VN/Language/ChangeLanguage?changelang=en&url=/vi-VN/ve-xe-khach-tu-sai-gon-di-nha-trang-khanh-hoa-129t23591.html?date=23-03-2019
        var paramQuery = arrLink[2];
        var arrParamQuery = paramQuery.split('&');

        for (var i = 0; i < arrParamQuery.length; i++) {
            var arrParam = arrParamQuery[i].split('=');
            if (arrParam[0] == 'date') {
                arrParam[1] = selectDate;
                arrParamQuery[i] = arrParam[0] + "=" + arrParam[1];
            }

        }
        var modifyParam = arrParamQuery.join("&");
        arrLink[2] = modifyParam;
        currentLink = arrLink.join("?");
    }
    return currentLink;
}
function loadRouteOnPaging() {
    //departDate - tomorrow
    //jsYear, jsMonth, jsDay - current
    //action: init next
    if (isRouteLoading == false && isSeatLoading == false) {
        var pageIndex = parseInt($("#current-page-index").val());
        var pageSize = parseInt($("#current-page-size").val());
        var totalRow = parseInt($("#total-row-item").val());

        if (pageIndex * pageSize < totalRow) { //check if available item in next page
            pageIndex = pageIndex + 1;
            //prevent call next page while loading
            var fromtype = $("#start-point-type").val();
            var fromid = $("#start-point-id").val();
            var totype = $("#stop-point-type").val();
            var toid = $("#stop-point-id").val();
            var holidaykey = "khach";

            var currentUrl = window.location.href;

            var lastParam = currentUrl.split(/.html/)[0];
            lastParam = lastParam.split("-");
            lastParam = lastParam[lastParam.length - 1];

            var busOperatorId = '0';
            if (lastParam.indexOf('t') < 0) {
                busOperatorId = lastParam;
            }
            var paramDate = $("#departDate").val();
            paramDate = paramDate.split('-');

            var day = paramDate[0];
            var month = paramDate[1];
            var year = paramDate[2];

            var busOperatorName = "";
            if ($("#search-busoperator-name") && $("#search-busoperator-name").val() !== null) {
                busOperatorName = $("#search-busoperator-name").val();
            }

            //Get all from filter
            var checkedDiscountList = $('.list-discount input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var checkedTransporterList = $('.trasporter-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var checkedFromTimeList = $('.from-time-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var checkedStartPointList = $('.start-point-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var checkedEndPointList = $('.end-point-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var checkedVehicleTypeList = $('.vehicle-type-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var checkedFacilityList = $('.facilities-type-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-remark');
            }).get().join("|");

            var checkedSeatTypeList = $('.seat-type-list input[type=checkbox]:checked').map(function () {
                return $(this).attr('data-id');
            }).get().join("|");

            var sortField = $("#current-page-sort-field").val();
            var sortDirection = $("#current-page-sort-direction").val();


            //disableScroll();
            isRouteLoading = true;
            $(".route-loader").show();
            $("#footer").hide();
            $("#routeInfoDiv").hide();
            $("#backLinkDiv").hide();

            $.ajax({
                type: 'post',
                url: "/" + culture + "/Booking/GetSearchTicketResultAjaxPaging?" + translatorParam,
                data: {
                    date: day + "-" + month + "-" + year,
                    holidayKey: holidaykey || "khach",
                    fromType: fromtype,
                    fromId: fromid,
                    toType: totype,
                    toId: toid,
                    busOperatorId: busOperatorId,
                    hasMomo: window.location.href.indexOf("?source=momo") > -1,
                    mainUrl: currentUrl,
                    busOperatorName: busOperatorName,
                    pageIndex: pageIndex,
                    discountList: checkedDiscountList,
                    transporterList: checkedTransporterList,
                    startPointList: checkedStartPointList,
                    endPointList: checkedEndPointList,
                    fromTimeList: checkedFromTimeList,
                    vehicleTypeList: checkedVehicleTypeList,
                    facilityList: checkedFacilityList,
                    seatTypeList: checkedSeatTypeList,
                    sortField: sortField,
                    sortDirection: sortDirection
                },
                success: function (result) {
                    var pageIndex = parseInt($("#current-page-index").val()) + 1;
                    $("#current-page-index").val(pageIndex);
                    $(".result-list").append(result);
                    $(".route-loader").hide();
                    $("#footer").show();
                    $("#routeInfoDiv").show();
                    $("#backLinkDiv").show();
                    isRouteLoading = false;
                    //enableScroll();
                    checkboxchecked();
                    RecalAfterLoadTicket()
                }, error: function () {
                    $(".route-loader").hide();
                    isRouteLoading = false;
                    //enableScroll();
                }
            });
        }
    }
}
function RecalAfterLoadTicket() {
    //Rebinding event after load list
    var totalComments = 0;
    var totalstar = 0;
    var totaliteam = 0;

    $('.searchResults .count-star').each(function (index) {
        totaliteam++;
        totalstar += parseFloat($(this).html().replace(',', '.'));
    });

    $('.searchResults .totalComments').each(function (index) {
        totalComments += Number($(this).html());
    });
    $('#totalcomment').html(parseFloat(totalstar / totaliteam).toPrecision(2) + "/" + totalComments);
    $('#load-star').load("/" + culture + "/Booking/GetPartialViewstar?totlastar=" + parseFloat(totalstar / totaliteam));

    $("#trasporter-list-nav").dropdownchecklist('destroy');
    $("#start-point-list-nav").dropdownchecklist('destroy');
    $("#end-point-list-nav").dropdownchecklist('destroy');
    $('#trasporter-list-nav option').each(function () {
        $(this).attr('selected', false);
    });
    $("#trasporter-list-nav").dropdownchecklist({
        emptyText: Language["chxeh1"],
        width: 155,
        onItemClick: function () {
            //changeDropdown();
        }
    });
    $("#start-point-list-nav").dropdownchecklist({
        emptyText: Language["opp"],
        width: 145
    });
    $("#end-point-list-nav").dropdownchecklist({
        emptyText: Language["edp"],
        width: 145
    });


    //Tool tip
    maskTipPopOver();

    //Time event
    maskEventOnFromTime();
    maskEventOnToTime();

    //Comment button
    maskEventOnCommentButton();

    //Detail tab
    maskEventOnDetailTab();
    maskEventOnDetailLink();
    maskEventOnCloseTabButton();



    if ($(".rqcompanyid").val() != null && $(".rqcompanyid").val() != "") {
        var list, i, switching, b, shouldSwitch;
        switching = true;
        b = $('.result-item');
        //Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            //start by saying there should be no switchin:
            shouldSwitch = false;
            /*check if the next item should
            switch place with the current item:*/
            if (b[i].attributes['data-compid'].nodeValue == $(".rqcompanyid").val()) {
                /*if next item is alphabetically
                lower than current item, mark as a switch
                and break the loop:*/
                b[i].parentNode.insertBefore(b[i], b[0]);

            }
        }
    }
    //get status of trip and update seat
    var listStripCodes = "";
    $(".result-item").each(function () {
        var tripcode = $(this).attr("trip-code");
        if (tripcode != undefined && tripcode != "") {
            if (listStripCodes != "") {
                listStripCodes += "," + tripcode;
            }
            else {
                listStripCodes += tripcode;
            }
        }
    });
    if (listStripCodes != "")
        getServiceAvailableSeat(listStripCodes, Language["Soldout"]);
    if ($("#list-pickup-info").length) {
        var listPickUpInfo = $("#list-pickup-info").val();
        if (listPickUpInfo != '')
            getPickupInfo(listPickUpInfo);
    }
    UpdateHeaderChangeLanguage();
}
//---------------End Loading Route Paging --------------
/*------------------ End Business function ------------------*/
function initDefaultLoadingPage(searchDate) {
    if (searchDate == null || searchDate == "") { //assign searchdate is tomorrow if don't have value
        searchDate = $("#system-depart-date").val();
    }
    $("#main").show();
    var curUrl = window.location.href.split('#')[0];
    var queryDate = GetUrlParam('date');
    //change query date
    if (queryDate != "") {
        curUrl = curUrl.replace(queryDate, searchDate);
    } else {
        if (curUrl.indexOf('?') > -1) {
            var arrParam = curUrl.split('?');
            if (arrParam.length == 1) {
                curUrl = arrParam[0] + "?date=" + searchDate;
            } else {
                curUrl = arrParam[0] + "?date=" + searchDate + "&";
                for (var i = 1; i < arrParam.length; i++) {
                    curUrl += arrParam[i];
                }
            }
        } else {
            curUrl = curUrl + "?date=" + searchDate;
        }
    }
    //change hashtag param
    history.pushState({}, document.title, curUrl);
    $('#span-current-date').val(searchDate);
    $("#departDate").val(searchDate);
    var durationdays = moment(searchDate, 'DD-MM-YYYY').diff(moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY'), 'days');
    if (durationdays <= 0) { //less than or equal today
        $("#btPrevDate").hide();
        $("#mbtPrevDate").hide();
    }
    //rebind element for default loading page
    RecalAfterLoadTicket();
}
function fillPickupTransferInfoToHiddenField() {
    //pickup-transfer-select-from
    var listSelectedRadio = $("input.event-pickup-transfer-select:checked");
    if (listSelectedRadio && listSelectedRadio.length > 0) {
        for (var i = 0; i < listSelectedRadio.length; i++) {
            var selected = listSelectedRadio[i];
            if ($(selected).data('unfixedpoint') == '1') {
                //diem don - trung chuyen khong co dinh
                var userInputAddress = $(selected).closest('.item-info').find('input.address-unfixed-input').val();
                if (userInputAddress.trim().length === 0) {
                    userInputAddress = $(selected).closest('.item-info').find('input.event-pickup-transfer-select').data('pickupdisplay');
                }
                if ($(selected).data('pointtype') == 'pickup') {
                    //pickup
                    $("input[name='PickupUnfixedAddress']").val(userInputAddress);
                } else if ($(selected).data('pointtype') == 'transfer') {
                    //transfer
                    $("input[name='TransferUnfixedAddress']").val(userInputAddress);
                } else if ($(selected).data('pointtype') == 'transfer-at-arrive') {
                    //transfer at arrive
                    $("input[name='TransferAtArriveUnfixedAddress']").val(userInputAddress);
                } else if ($(selected).data('pointtype') == 'dropoff-at-arrive') {
                    //dropoff at arrive
                    $("input[name='DropOffAtArriveUnfixedAddress']").val(userInputAddress);
                }
            }
        }
    }
}
//start logic code for route page
$(function () {

    var currentUrl = location.href.toLowerCase();
    var language = currentUrl.indexOf('en-us') > -1 ? 'en' : 'vi';


    //start loading for page
    isRouteLoading = true;
    //reference to HomeSearchWidget.js
    culture = getLanguageCultureAndParam()["culture"];
    translatorParam = getLanguageCultureAndParam()["translatorParam"];
    //get data for from place input and to place
    getLanguage(language);

    initCustomDatePicker(true, language);
    if ($(window).width() <= 736) {
        $(".desktop-route-search").remove();
    } else {
        $(".mobile-route-search").remove();
    }
    if ($(window).width() > 768) {
        __numOfMonths = 2;
    } else {
        __numOfMonths = 1;
    }
    //start init for search ticket widget
    initSearchTicketWidget();
    initSearchWidget();


    //Bind sự kiện cho nút lùi 1 ngày -->
    $("#btPrevDate").click(function () {
        if (!$('#dvSearchFilter').is(":visible"))
            $("#btModify").trigger("click");

        var paramDate = $('#span-current-date').val().replace(/-/g, '/').split('/');

        var day = paramDate[0];
        var month = paramDate[1];
        var year = paramDate[2];

        var thisDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        thisDate.setDate(thisDate.getDate() - 1);



        var date = ("0" + thisDate.getDate()).slice(-2);
        date += ("0" + (thisDate.getMonth() + 1)).slice(-2) + thisDate.getFullYear();

        var dateString = ("0" + thisDate.getDate()).slice(-2) + "-";
        dateString += ("0" + (thisDate.getMonth() + 1)).slice(-2) + "-" + thisDate.getFullYear();

        $('#span-current-date').val(dateString);
        $('#departDate').val(dateString);
        reloadRouteBySearchForm();
    });

    //Bind sự kiện cho nút tới 1 ngày -->
    $("#btNextDate").click(function () {
        if (isRouteLoading == false) {
            if (!$('#dvSearchFilter').is(":visible")) {
                $("#btModify").trigger("click");
            }
            var paramDate = $('#span-current-date').val().replace(/-/g, '/').split('/');

            var day = paramDate[0];
            var month = paramDate[1];
            var year = paramDate[2];
            var thisDate = new Date(year, (month - 1), day);

            thisDate.setDate(thisDate.getDate() + 1);

            var durationdays = moment(thisDate).diff(moment(), 'hours');
            if (durationdays >= 0) { //less than today
                $("#btPrevDate").show();
                $("#mbtPrevDate").show();
            }

            var date = ("0" + thisDate.getDate()).slice(-2);
            date += ("0" + (thisDate.getMonth() + 1)).slice(-2) + thisDate.getFullYear();

            var dateString = ("0" + thisDate.getDate()).slice(-2) + "-";
            dateString += ("0" + (thisDate.getMonth() + 1)).slice(-2) + "-" + thisDate.getFullYear();

            $('#span-current-date').val(dateString);
            $('#departDate').val(dateString);
            reloadRouteBySearchForm();
            //var changeUrl = window.location.href.split('#')[0] + "#" + date;
            //window.location.href = changeUrl;
            //$("#current-page-sort-field").val("");
            //$("#current-page-sort-diretion").val("");
            //loadRouteOnInit();
        }
    });

    //Bind sự kiện cho nút Chỉnh sửa tìm vé/Hủy sửa -->
    $("#btModify").click(function () {
        $('.mobi-display').slideToggle(300);
        $('.dvSearchFilter ').toggle();
    });

    $(document).on('click', '#mbtPrevDate', function (e) {
        $("#btPrevDate").trigger("click");
    });

    $(document).on('click', '#mbtNextDate', function (e) {
        $("#btNextDate").trigger("click");
    });

    $('#span-current-date').datepicker("destroy");
    $("#span-current-date").datepicker({
        numberOfMonths: __numOfMonths,
        todayHighlight: false,
        gotoCurrent: true,
        autoclose: true,
        minDate: new Date(),
        onSelect: function (dateText, inst) {
            $("#span-current-date").val(dateText);
            $("#departDate").val(dateText);
            reloadRouteBySearchForm();
            return false;
        }
    });

    $("#span-current-date").click(function () {
        $("#span-current-date").datepicker('show');
    });

    $("#ui-datepicker-div").css("display", "none");

    $("#departDate").datepicker("destroy");
    $("#departDate").datepicker({
        numberOfMonths: __numOfMonths,
        todayHighlight: false,
        gotoCurrent: true,
        autoclose: true,
        minDate: new Date(),
        onSelect: function (dateText) {
            $("#destination").removeAttr("selecteddestination");
            $(this).attr("selecteddate", true);
            $("#span-current-date").val(dateText);
            $("#departDate").val(dateText);
            reloadRouteBySearchForm();
            return false;
        }
    });
    $("#btToday").click(function () {
        var dateString = moment().format('DD-MM-YYYY');
        $('#span-current-date').val(dateString);
        $('#departDate').val(dateString);
        reloadRouteBySearchForm();
        return false;
    });
    $("#btTomorrow").click(function () {
        var dateString = moment(moment().add('days', 1)).format('DD-MM-YYYY');
        $('#span-current-date').val(dateString);
        $('#departDate').val(dateString);
        reloadRouteBySearchForm();
        return false;
    });

    $('.operater-filter').click(function () {
        $('.from-search-detail').css("display", "block");
        $('.dvSearchFilter').css("display", "none");
        $('.search-detail').css("display", "none");
    })

    $('.close-form-sort').click(function () {
        $('.from-search-detail').css("display", "none");
        $('.dvSearchFilter').css("display", "block");
        checkboxchecked();
    })

    $('.xoachon').click(function () {
        $('.from-search-detail input[type="checkbox"]').prop('checked', false);
        $('#modal-filter-mobi input[type="checkbox"]').prop('checked', false);
        $('.search-detail').css("display", "none");
        $('.from-search-detail').css("display", "none");
        $('.dvSearchFilter').css("display", "block");
        checkboxchecked();
        //call ajax to apply filter and clear all sorting
        $(".dropdown-menu li a").removeClass("active-fillter");
        $("#current-page-sort-field").val("");
        $("#current-page-sort-direction").val("");
        loadRouteOnInit();
    });

    $('.hoantat').click(function () {
        window._triggerByUserClick = true;
        $('.from-search-detail').css("display", "none");
        $('.dvSearchFilter').css("display", "block");
        $('.list-check').css("display", "block");
        checkboxchecked();
        //call ajax to apply filter and clear all sorting
        $("#current-page-sort-field").val("");
        $("#current-page-sort-direction").val("");
        $(".dropdown-menu li a").removeClass("active-fillter");
        loadRouteOnInit();
    });

    $('.seemore-filter').click(function () {
        $(this).parent().find('.dynamic-item').removeClass('hidden-xs');
        $(this).parent().find('.collapsed-filter').removeClass('hidden-xs');
        $(this).addClass('hidden-xs');
        $('.seemore-filter').removeClass('selected');
        $('.collapsed-filter').removeClass('selected');
    });

    $('.collapsed-filter').click(function () {
        $(this).parent().find('.dynamic-item').addClass('hidden-xs');
        $(this).parent().find('.seemore-filter').removeClass('hidden-xs');
        $(this).addClass('hidden-xs');
        $('.seemore-filter').removeClass('selected');
        $('.collapsed-filter').removeClass('selected');
    });

    $('.search-hx').keyup(function () {
        $('.from-search-detail .trasporter-list li').hide().filter(function () {
            var dataname = $(this).attr('data-name');
            if (locdau(dataname.toLowerCase()).indexOf(locdau($('.search-hx').val().toLowerCase())) != -1) {
                return true;
            }


        }).show();
    });

    $('.search-nd').keyup(function () {
        jQuery('.from-search-detail .start-point-list li').hide().filter(function () {
            var flag = false;

            var dataname = $(this).attr('data-name');
            if (locdau(dataname.toLowerCase()).indexOf(locdau($('.search-nd').val().toLowerCase())) != -1) {
                flag = true;
                return true;
            }


        }).show();
    });

    $('.search-from-filter').keyup(function () {
        jQuery('.from-search-detail .end-point-list li').hide().filter(function () {
            var flag = false;

            var dataname = $(this).attr('data-name');
            if (locdau(dataname.toLowerCase()).indexOf(locdau($('.search-from-filter').val().toLowerCase())) != -1) {
                flag = true;
                return true;
            }


        }).show();
    });


    $('.mobi-display .close-form-sort').click(function () {
        $('.mobi-display').hide();
    });
    $('.list-check label').click(function () {

        $(this).parent().hide();
        var datacheck = $(this).parent().attr('data-name');

        $('.trasporter-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', false);
            }
        });

        $('.from-time-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', false);
            }
        });

        $('.start-point-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', false);
            }
        });

        $('.end-point-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', false);
            }
        })

        $('.vehicle-type-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', false);
            }
        });

        $('.seat-type-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', false);
            }
        });

        checkboxchecked();
        //call ajax to apply filter and clear all sorting
        $("#current-page-sort-field").val("");
        $("#current-page-sort-direction").val("");
        $(".dropdown-menu li a").removeClass("active-fillter");
        loadRouteOnInit();
    });


    $('.btn-send-info').click(function () {
        var hangxe = $('#hangxe').val();
        var tuyenduong = $('#tuyenduong').val();
        var phonenumber = $('#phonenumber').val();
        var mess = "";
        var status = true;
        if (hangxe.length == 0) {
            mess += "Hãng xe không được để trống\n";
            status = false;
        }
        if (tuyenduong.length == 0) {
            mess += "Tuyến đường không được để trống\n";
            status = false;
        }
        if (phonenumber.length == 0) {
            mess += "Số điện thoại không được để trống\n";
            status = false;
        }
        if (status == false) {
            showMessagePopup(mess);
        } else {
            $.ajax({
                type: 'post',
                url: "/" + culture + "/BusInfo/InsertSuggest",
                data: { hangxe: hangxe, tuyenduong: tuyenduong, phonenumber: phonenumber },
                async: true,
                success: function (result) {
                    $('#formSuggest').css("display", "none");
                    $('.send-suggest-success').css("display", "block");
                }
            });
        }
    });



    $(document).on('click', '.bt-from-mobi', function (e) {
        $("#myModal2 .nav-tabs li").removeClass("active");
        $("#myModal .nav-tabs li").removeClass("active");
        $(".tab-pane").removeClass("active in");
        //$(".tab-pane").removeClass("in");
        $("#fromstart-mobi").addClass("active in");
        $(".tab-from-mobi").addClass("active");
    });
    $(document).on('click', '.bt-to-mobi', function (e) {
        $("#myModal2 .nav-tabs li").removeClass("active");
        $("#myModal .nav-tabs li").removeClass("active");
        $(".tab-pane").removeClass("active in");
        //$(".tab-pane").removeClass("in");
        $("#toend-mobi").addClass("active in");
        $(".tab-to-mobi").addClass("active");
    });
    $(document).on('click', '#fromstart-mobi input[type="radio"]', function (e) {
        $(".bt-from-mobi").html($(this).attr("data-pickupdisplay"));
        $(".rv-tran-from").html($(this).attr("data-text"));
    });
    $(document).on('click', '#toend-mobi input[type="radio"]', function (e) {
        $(".bt-to-mobi").html($(this).attr("data-pickupdisplay"));
        $(".rv-tran-to").html($(this).attr("data-text"));
    });
    $(document).on('click', '.bt-step-1', function (e) {
        if (($(".seat-template-seat-code").html() == '' || $(".seat-template-seat-code").html() == Language["chuachonghe"]) && !$(this).hasClass("call-step-1")) {
            showMessagePopup(Language["chuachonghe"]);
            return false;
        } else if (!$('input[name=pickup-transfer-select-from]:checked').val() && $('input[name=pickup-transfer-select-from]').length != 0) {
            $(".bt-from-mobi").trigger("click");
            showMessagePopup(Language["PleaseselectaDeparture"]);
            return false;
        } else if ($('input[name=pickup-transfer-select-from]:checked').val() && $('input[name=pickup-transfer-select-from]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-from]:checked').parent().siblings().find('.address-unfixed-input').val()) {
            $('#myModal').modal('show')
            showMessagePopup(Language["PleaseTypeDeparturePlace"]);
            $("a[data-toggle='tab'][href='#fromstart-mobi']").trigger('click');

            return false;
        } else if ($('input[name=pickup-transfer-select-to]:checked').val() && $('input[name=pickup-transfer-select-to]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-to]:checked').parent().siblings().find('.address-unfixed-input').val()) {
            $('#myModal').modal('show')
            showMessagePopup(Language["PleaseTypeDestinationPlace"]);
            $("a[data-toggle='tab'][href='#toend-mobi']").trigger('click');
            return false;
        } else if (!$('input[name=pickup-transfer-select-to]:checked').val() && $('input[name=pickup-transfer-select-to]').length != 0) {
            $(".bt-to-mobi").trigger("click");
            showMessagePopup(Language["PleaseselectaDestination"]);
            return false;
        }

        $(".detail-booking").css("height", "auto");

        $('.li-banner').addClass("displaynone");
        $(".title-seat").addClass("displaynone");
        $(".seat-template-col").addClass("displaynone");
        $(".customer-info-col").css("display", "block");
        $(".detail-review").css("display", "block");
        $(".result-item").addClass("displaynone");
        $(".header-blue").addClass("displaynone");
        $("#header").addClass("displaynone");
        $("#dvSearchFilter").addClass("displaynone");

    });

    $(document).on('click', '.btn-vxr-back', function (e) {
        $(".title-seat").removeClass("displaynone");
        $(".seat-template-col").removeClass("displaynone");
        $(".customer-info-col").css("display", "none");
        $(".detail-review").css("display", "none");
        $(this).closest("li.ticket-booking-details").prev().removeClass("displaynone");
    });
    $(".dropdown-menu li a").click(function () {
        $(".dropdown-menu li a").removeClass("active-fillter");
        $(this).addClass("active-fillter");
    });
    $(document).on('click', function (e) {
        var checkboxes = $(".checkboxes");
        if ($(e.target).is('div.selectBox') || $(e.target).is(".checkboxes") || $(e.target).is(".input-md") || $(e.target).is(".overSelect") || $(e.target).is("label") || $(e.target).is("input")) {
            return;
        }
        checkboxes.hide();
        expanded = false;
    });

    $(document).on('click', ".checkboxes label", function (e) {
        var checkedlistname = $('.checkboxes input[type=checkbox]:checked').map(function () {
            return $(this).attr('dat-text');
        }).get().join(", ");

        var checkedlistid = $('.checkboxes input[type=checkbox]:checked').map(function () {
            return $(this).attr('data-id');
        }).get().join(",");

        $("#list-id").val(checkedlistid);
        $(".select-gy option").text(checkedlistname);
        if ($(".select-gy option").html() == "") {
            $(".select-gy option").text(Language["pleaseselectanoption"]);
        }
        //$(".overSelect").text("123");

    });

    $(document).on('click', "a[data-toggle='tab'][href='#toend-mobi']", function (e) {
        if ($('input[name=pickup-transfer-select-from]:checked').val() && $('input[name=pickup-transfer-select-from]:checked').parent().siblings('.div-address-unfixed').css('display') != 'none' && !$('input[name=pickup-transfer-select-from]:checked').parent().siblings().find('.address-unfixed-input').val()) {
            showMessagePopup(Language["PleaseTypeDeparturePlace"]);
            setTimeout(function () {
                $("a[data-toggle='tab'][href='#fromstart-mobi']").trigger('click');
            }, 300)
        }
    });

    //$(document).on('click', "#btnDepartureMobi", function (e) {
    //    $("a[data-toggle='tab'][href='#toend-mobi']").trigger('click');
    //});

    //$(document).on('click', "#btnDeparture", function (e) {
    //    $("a[data-toggle='tab'][href='#toend']").trigger('click');
    //});

    $(document).on('click', "#btnDestinationMobi", function (e) {
        $('#btnAddressClose').trigger('click');
        setTimeout(function () {
            $('.bt-step-1').trigger('click');
            setTimeout(function () {
                $("input[name='CustomerFullName']").select();
            }, 250);
        }, 250);
    });

    $(document).on('click', "#btnDestination", function (e) {
        $("input[name='CustomerFullName']").select();
    });

    $(document).on('keyup', '.address-unfixed-input', function (e) {
        if (e.keyCode == 13) {
            if (!$("a[data-toggle='tab'][href='#toend']").closest('li').hasClass('active')) {
                //if ($("#btnDepartureMobi").is(':visible')) {
                //    $("#btnDepartureMobi").trigger('click');
                //} else {
                //    $("#btnDeparture").trigger('click');
                //}
            } else {
                if ($("#btnDestinationMobi").is(':visible')) {
                    $("#btnDestinationMobi").trigger('click');
                } else {
                    $("#btnDestination").trigger('click');
                }
            }
        }
    });

    //$(document).on('click', '.result-item .btn-vxr-lg', function (e) {
    //    var scrollTopValue = $(this).closest('.result-item').offset().top;
    //    $('html, body').animate({ scrollTop: scrollTopValue }, 'slow');
    //});

    var popOverSettings = {
        placement: 'bottom',
        title: Language["phanhoicuakhachhang"] + "<img class='close-popover' src='https://storage.googleapis.com/fe-production/images/closed.svg' style='width: 10px;float: right;'>",
        html: true,
        selector: '.popover-gy',
        content: function () {
            return $('#myForm').html();

        }
    }

    $('body').popover(popOverSettings);

    $(document).on("click", ".send-gy", function () {
        if ($(".select-gy option").html() == Language["pleaseselectanoption"] & $(".fb-about").val() == "") {
            $('.result').html(Language["pleaseselectanoptionorenteroption"]);
        } else {
            var comment = $("#about").val();
            var reasons = $("#list-id").val();
            var trip_id = $(this).closest(".ticket-booking-details").prev().attr("data-tripid");
            var time = $(this).closest(".ticket-booking-details").prev().attr("data-from-time");
            var from_id = $(this).closest(".ticket-booking-details").prev().attr("data-from-id");
            var to_id = $(this).closest(".ticket-booking-details").prev().attr("data-to-id");
            var company_id = $(this).closest(".ticket-booking-details").prev().attr("data-compid");
            var trip_date = $(this).closest(".ticket-booking-details").prev().attr("departure-date");

            $.ajax({
                url: "/" + culture + "/Feedback/InsertFeedbackView",
                data: { trip_id: trip_id, time: time, company_id: company_id, comment: comment, reasons: reasons, from_id: from_id, to_id: to_id, trip_date: trip_date },
                success: function (result) {
                    if (result.status == 1) {
                        $('.result').html(Language["thankfeedback"]);
                    } else {
                        $('.result').html('resonse from server could be here');
                    }
                }
            });
        }

    });

    $(document).on('click', '.popover-gy', function (e) {
        $(".select-gy option").text(Language["pleaseselectanoption"]);
        var checkboxes = $(".checkboxes");
        $.ajax({
            url: "/" + culture + "/Feedback/GetlistReason",
            data: {},
            success: function (result) {
                checkboxes.html("");
                checkboxes.append(result);
            }
        });
    });
    $(document).on('click', '.close-popover', function (e) {
        $(".popover-gy").trigger("click");
    });

    initSearchTicketPageWithoutSeatEvent();
    initSearchTicketSeatEvent();



    $(document).on('change', '#HaveEatingCheck', function (e) {
        var thiz = e.target;
        bookingDiv = $(this).closest('.ticket-booking-detail-seat-selection');
        if (bookingDiv.length < 1) {
            bookingDiv = $(this).closest('.ticket-booking-detail-call-centre');
        }
        total_fare_ui = bookingDiv.find('.seat-template-total-fare');
        total_fare_form = bookingDiv.find('input[name=ExpectedTotalFare]');
        currentTotalFare = parseInt(total_fare_form.val());
        var eatFare = parseInt($('#EatingFare').val());
        var seatNum = parseInt(bookingDiv.find('.number-of-seat').val());
        var isChecked = $(thiz).is(':checked')
        if (isChecked) {
            currentTotalFare = currentTotalFare + seatNum * eatFare;
            total_fare_form.val(currentTotalFare);
            total_fare_ui.text(Number(currentTotalFare).format(0, 3, '.', '.'));
        } else {
            currentTotalFare = currentTotalFare - seatNum * eatFare;
            total_fare_form.val(currentTotalFare);
            total_fare_ui.text(Number(currentTotalFare).format(0, 3, '.', '.'));
        }
    });

    $(document).on('change', ".event-pickup-transfer-select", function (e) {

        var detailAddress = $(this).closest('.detail-address');
        var itemInfo = $(this).closest('.item-info');
        var pointType = $(this).data('pointtype');
        var atArrive = $(this).data('atarrive');
        var pickupDisplay = $(this).data('pickupdisplay');
        var unfixedPoint = $(this).data('unfixedpoint');

        //Show selected info on form
        var adressUnfixedInput = $(this).closest('.item-info').find('.address-unfixed-input').val();
        if (unfixedPoint == '1' && adressUnfixedInput) {
            pickupDisplay = adressUnfixedInput;
        }
        if (atArrive == '0') {
            $('.rv-tran-from').html(pickupDisplay)
        } else {
            $('.rv-tran-to').html(pickupDisplay)
        }

        //$(detailAddress).find('.address-row').hide();
        $(detailAddress).find('.div-address-unfixed').hide();
        $(detailAddress).find('.div-note').hide();

        if (atArrive == '0') {
            $('input[name=PickupAtDeparture]').val($(this).data('pickupatdeparture'));
            $('input[name=PickupTransferAddress]').val($(this).data('address'));
            $('input[name=PickupDate]').val($(this).data('pickupdeparttime'));
        }


        if (pointType == 'pickup') {
            //Diem don
            var isShowFirstState = $(this).data('isshowfirststate');
            $("#hastransfer").val('false')
            var pickupNameSelected = ($(this).data('pickupname'));
            $('input[name=PickupId]').val($(this).data('pickupid'))
            if (isShowFirstState != "0") {
                // == 1 or == empty
                //pickup point from config
                //or is show first state
                $('input[name=PickupName]').val(pickupNameSelected)
            } else {
                //not show first state
                $('input[name=PickupName]').val("");
            }

            $('input[name=PickupTransferName]').val(pickupNameSelected);
            $('input[name=PickupIndex]').val($(this).data('pickupindex'))
            $('input[name=PickupTimeFromDeparture]').val($(this).data('pickuptime'))
            $('input[name=PickupUnfixedAddress]').val('')
            $('input[name=PickupUnFixedPoint]').val($(this).data('unfixedpoint'))

            //Show for note
            if ($(this).data('unfixedpoint') == '1' && pickupNameSelected) {
                $('#pickupNameSelected').text(pickupNameSelected)
            } else {
                $('#pickupNameSelected').text('')
            }
        } else if (pointType == 'transfer') {
            //Trung chuyen
            $("#hastransfer").val('true')
            $('input[name=TransferId]').val($(this).data('transferid'))
            $('input[name=TransferName]').val($(this).data('transfername'))
            $('input[name=PickupTransferName]').val($(this).data('transfername'))
            $('input[name=TransferIndex]').val($(this).data('transferindex'))
            $('input[name=TransferTime]').val($(this).data('transfertime'))
            $('input[name=TransferUnfixedAddress]').val('')
            $('input[name=TransferUnFixedPoint]').val($(this).data('unfixedpoint'))

            if ($(this).data('unfixedpoint') == '1') {
                $('#transferNameSelected').text($(this).data('transfername'));
            } else {
                $('#transferNameSelected').text('');
            }
        } else if (pointType == 'transfer-at-arrive') {
            $("#hastransferAtArrive").val('true')
            $('input[name=TransferAtArriveId]').val($(this).data('transferid'))
            $('input[name=TransferAtArriveName]').val($(this).data('transfername'))
            $('input[name=TransferAtArriveIndex]').val($(this).data('transferindex'))
            $('input[name=TransferAtArriveTime]').val($(this).data('transfertime'))
            $('input[name=TransferAtArriveUnfixedAddress]').val('')
            $('input[name=TransferAtArriveUnFixedPoint]').val($(this).data('unfixedpoint'))

            if ($(this).data('unfixedpoint') == '1') {
                $('#transferAtArriveNameSelected').text($(this).data('transfername'));
            } else {
                $('#transferAtArriveNameSelected').text('');
            }
        } else if (pointType == 'dropoff-at-arrive') {
            $("#hastransferAtArrive").val('false')
            $('input[name=DropOffAtArriveId]').val($(this).data('transferid'))
            $('input[name=DropOffAtArriveName]').val($(this).data('transfername'))
            $('input[name=DropOffAtArriveIndex]').val($(this).data('transferindex'))
            $('input[name=DropOffAtArriveTime]').val($(this).data('transfertime'))
            $('input[name=DropOffAtArriveUnfixedAddress]').val('')
            $('input[name=DropOffAtArriveUnFixedPoint]').val($(this).data('unfixedpoint'))

            if ($(this).data('unfixedpoint') == '1') {
                $('#dropOffAtArriveNameSelected').text($(this).data('transfername'));
            } else {
                $('#dropOffAtArriveNameSelected').text('');
            }
        }

        //Caculate surcharge
        var bookingDiv = null;
        var total_fare_ui = null;
        var total_fare_form = null;
        var currentTotalFare = 0;

        if ($(this).data('seattype') == 'online' || $(this).data('seattype') == 'online-mobile') {
            bookingDiv = $(this).closest('.ticket-booking-detail-seat-selection');
            total_fare_ui = bookingDiv.find('.seat-template-total-fare');
            total_fare_form = bookingDiv.find('input[name=ExpectedTotalFare]');
            currentTotalFare = parseInt(total_fare_form.val());
        } else if ($(this).data('seattype') == 'offline') {
            bookingDiv = $(this).closest('.ticket-booking-detail-call-centre');
            total_fare_ui = bookingDiv.find('.amount');
            total_fare_form = bookingDiv.find('input[name=ExpectedTotalFare]');
            currentTotalFare = parseInt(total_fare_form.val());
        }

        var seatNum = parseInt(bookingDiv.find('.number-of-seat').val());
        var previousSurcharge = parseInt($('#pickupTransferSurcharge').val());
        if (pointType == 'transfer-at-arrive' || pointType == 'dropoff-at-arrive') {
            previousSurcharge = parseInt($('#pickupTransferAtArriveSurcharge').val());
        }
        var currentSurcharge = +$(this).data('surcharge')
        var surchargeType = +$(this).data('surchargetype')
        if (surchargeType != '2') {
            //Vexere khong thu tien
            currentSurcharge = 0;
        }
        if (pointType == 'transfer-at-arrive' || pointType == 'dropoff-at-arrive') {
            $('#pickupTransferAtArriveSurcharge').val(currentSurcharge);
        } else {
            $('#pickupTransferSurcharge').val(currentSurcharge);
        }

        //auto show destination point when select unfixed departure point
        if (unfixedPoint == "0" && (pointType == "pickup" || pointType == "transfer")) {
            if ($(window).width() > 768)
                $("a[data-toggle='tab'][href='#toend']").trigger('click');
            else
                $("a[data-toggle='tab'][href='#toend-mobi']").trigger('click');
        }

        if (seatNum == 0)
            currentTotalFare = 0;

        //if ($(this).data('seattype') == 'online' || $(this).data('seattype') == 'online-mobile') {
        //    currentTotalFare = currentTotalFare - seatNum * previousSurcharge;
        //}
        currentTotalFare = currentTotalFare - seatNum * previousSurcharge;
        currentTotalFare = currentTotalFare + seatNum * currentSurcharge;

        if ($(this).data('seattype') == 'online' || $(this).data('seattype') == 'online-mobile') {
            total_fare_form.val(currentTotalFare);
            total_fare_ui.text(Number(currentTotalFare).format(0, 3, '.', '.'));
        } else if ($(this).data('seattype') == 'offline') {
            total_fare_form.val(currentTotalFare);
            totalText = (currentTotalFare).formatMoney(0, ',', '.') + "đ";
            total_fare_ui.html(totalText);
        }


        if ($(this).data('unfixedpoint') == '1') {
            $(itemInfo).find('.div-address-unfixed').show();
            $(itemInfo).find('.address-unfixed-input').focus()
        }

        //if ($(this).data('address')) {
        //    $(itemInfo).find('.pickup-address').html($(this).data('address'));
        //    $(itemInfo).find('.address-row').show();
        //}
        if ($(this).data('note')) {
            $(itemInfo).find('.info-note').html('*' + $(this).data('note'));
            $(itemInfo).find('.div-note').show();
        }

    });

    $(document).on('input', '.address-unfixed-input', function (e) {
        thiz = e.target;
        var btnAddressDone = $(thiz).closest('.div-address-unfixed').find('.btn-address-done');
        var lblValMessage = $(thiz).closest('.div-address-unfixed').find('.address-unfixed-input-validate-message');
        var textAddress = $(thiz).val();
        if (textAddress.length > 0) {
            var TEXT_ADDRESS_MAX_LENGTH = 240;
            if (textAddress.length > TEXT_ADDRESS_MAX_LENGTH) {
                textAddress = textAddress.substring(0, TEXT_ADDRESS_MAX_LENGTH + 1);
                $(thiz).val(textAddress);
                lblValMessage.show();
                if (!btnAddressDone.hasClass('disabled')) {
                    btnAddressDone.addClass('disabled');
                }
            } else {
                lblValMessage.hide();
                btnAddressDone.removeClass('disabled');
            }
        } else {
            lblValMessage.hide();
            if (!btnAddressDone.hasClass('disabled')) {
                btnAddressDone.addClass('disabled');
            }
        }

        setTimeout(function () {
            atArrive = $(thiz).closest('.item-info').find('.event-pickup-transfer-select').data('atarrive');
            var displayText = $(thiz).closest('.item-info').find('.event-pickup-transfer-select').data('pickupdisplay');
            if ($(thiz).val() != '')
                displayText = $(thiz).val();
            if (atArrive == '0') {
                $('.rv-tran-from').html(displayText)
            } else {
                $('.rv-tran-to').html(displayText)
            }
        }, 800)
    });

    $('.filter-label').click(function () {
        var lst = $('.expand-menu');
        for (i = 0; i < lst.length; i++) {
            if ($(this).next() != lst[i]) {
                $(lst[i]).hide();
            }
        }

    });





    //bindingFilterForm(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), fromType, fromId, toType, toId, busOperatorId, 'khach', searchTickets);
    $('#searchForm').on('submit', function () {
        if ($(window).width() <= 768) {
            hideSearchTicketMobile();
        }
        reloadRouteBySearchForm();
        return false;
    });

    function hideSearchTicketMobile() {
        $("#destination").focusout();
        $("#dvSearchFilter").toggle();
        $(".mobi-display").slideToggle(300);
    }

    //Start Sort Tool
    $("#rateFilter, .rate-sort-i").click(function () {
        if (isRouteLoading == false) {
            var iconElement = $(this).parent().parent().parent().find("i.fa")
            if ($(iconElement).hasClass("sort-desc") && $(this).hasClass('sort-desc'))
                return;
            if ($(iconElement).hasClass("sort-asc") && $(this).hasClass('sort-asc'))
                return;
            if ($(this).hasClass('sort-desc')) {
                $(iconElement).removeClass("sort-asc");
                $(iconElement).addClass("sort-desc");
                __tmp = true
            } else {
                $(iconElement).removeClass("sort-desc");
                $(iconElement).addClass("sort-asc");
                __tmp = false
            }

            $(".ticket-detail-tabs").hide();
            $(".ticket-booking-details").remove();
            rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
            $(".journey-icon").removeClass("text-blue").addClass("text-gray");
            $("#fareFilter > span").css("opacity", "0");
            if (__tmp) {
                $("#current-page-sort-field").val("Rating");
                $("#current-page-sort-direction").val("DES");
                loadRouteOnInit();
                __tmp = false;
            } else {
                $("#current-page-sort-field").val("Rating");
                $("#current-page-sort-direction").val("ASC");
                loadRouteOnInit();
                __tmp = true;
            }
        }
    });

    $("#fareFilter, .fare-sort-i").click(function () {
        if (isRouteLoading == false) {
            var iconElement = $(this).parent().parent().parent().find("i.fa")
            if ($(iconElement).hasClass("sort-desc") && $(this).hasClass('sort-desc'))
                return;
            if ($(iconElement).hasClass("sort-asc") && $(this).hasClass('sort-asc'))
                return;
            if ($(this).hasClass('sort-desc')) {
                $(iconElement).removeClass("sort-asc");
                $(iconElement).addClass("sort-desc");
                __tmp = true
            } else {
                $(iconElement).removeClass("sort-desc");
                $(iconElement).addClass("sort-asc");
                __tmp = false
            }
            $(".ticket-detail-tabs").hide();
            $(".ticket-booking-details").remove();
            rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
            $(".journey-icon").removeClass("text-blue").addClass("text-gray");
            $("#rateFilter > span").css("opacity", "0");

            if (__tmp) {
                //sortUsingNestedText_decrease($('.result-list'), '.result-item', '.price-sort');
                $("#current-page-sort-field").val("Price");
                $("#current-page-sort-direction").val("DES");
                loadRouteOnInit();
                __tmp = false;
            } else {
                //sortUsingNestedText_increase($('.result-list'), '.result-item', '.price-sort');
                $("#current-page-sort-field").val("Price");
                $("#current-page-sort-direction").val("ASC");
                loadRouteOnInit();
                __tmp = true;
            }
        }
    });


    $(".from-stop-sort-i").click(function () {
        if ($(this).hasClass("sort-desc")) {
            $(this).removeClass("sort-desc");
            $(this).addClass("sort-asc");
        } else {
            $(this).removeClass("sort-asc");
            $(this).addClass("sort-desc");
        }
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        //$("#rateFilter > span").css("opacity", "0");
        var clicks = $(this).data('clicks');
        if (clicks) {
            //sortUsingNestedText_increase($('table.result-list'), '.result-item', '.from-stop-value', true);
            //$("#fareFilter").html("Giá vé <span>&#8593;</span>");
        } else {
            //sortUsingNestedText_decrease($('table.result-list'), '.result-item', '.from-stop-value', true);
            //$("#fareFilter").html("Giá vé <span>&#8595;</span>");
        }
        $(this).data("clicks", !clicks);
    });

    $(".to-stop-sort-i").click(function () {
        if ($(this).hasClass("sort-desc")) {
            $(this).removeClass("sort-desc");
            $(this).addClass("sort-asc");
        } else {
            $(this).removeClass("sort-asc");
            $(this).addClass("sort-desc");
        }
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        //$("#rateFilter > span").css("opacity", "0");
        var clicks = $(this).data('clicks');
        if (clicks) {
            //sortUsingNestedText_increase($('table.result-list'), '.result-item', '.to-stop-value', true);
            //$("#fareFilter").html("Giá vé <span>&#8593;</span>");
        } else {
            //sortUsingNestedText_decrease($('table.result-list'), '.result-item', '.to-stop-value', true);
            //$("#fareFilter").html("Giá vé <span>&#8595;</span>");
        }
        $(this).data("clicks", !clicks);
    });

    $(".vehicle-type-sort-i").click(function () {
        if ($(this).hasClass("sort-desc")) {
            $(this).removeClass("sort-desc");
            $(this).addClass("sort-asc");
        } else {
            $(this).removeClass("sort-asc");
            $(this).addClass("sort-desc");
        }
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        //$("#rateFilter > span").css("opacity", "0");
        var clicks = $(this).data('clicks');
        if (clicks) {
            //sortUsingNestedText_increase($('table.result-list'), '.result-item', '.vehicle-type-p');
            //$("#fareFilter").html("Giá vé <span>&#8593;</span>");
        } else {
            //sortUsingNestedText_decrease($('table.result-list'), '.result-item', '.vehicle-type-p');
            //$("#fareFilter").html("Giá vé <span>&#8595;</span>");
        }
        $(this).data("clicks", !clicks);
    });

    $(".fromtime-sort-i").click(function () {
        var iconElement = $(this).parent().parent().parent().find("i.fa")
        if ($(iconElement).hasClass("sort-desc") && $(this).hasClass('sort-desc'))
            return;
        if ($(iconElement).hasClass("sort-asc") && $(this).hasClass('sort-asc'))
            return;
        if ($(this).hasClass('sort-desc')) {
            $(iconElement).removeClass("sort-asc");
            $(iconElement).addClass("sort-desc");
            __tmp = true
        } else {
            $(iconElement).removeClass("sort-desc");
            $(iconElement).addClass("sort-asc");
            __tmp = false
        }
        $(".ticket-detail-tabs").hide();
        $(".ticket-booking-details").remove();
        rollBackToNormalButton($('.btn-vxr-gray-lg').not("[style='display: none;']"));
        $(".journey-icon").removeClass("text-blue").addClass("text-gray");
        if (__tmp) {
            //sortUsingNestedText_decrease($('.result-list'), '.result-item', '.from-time-value');
            $("#current-page-sort-field").val("FromTime");
            $("#current-page-sort-direction").val("DES");
            loadRouteOnInit();
            __tmp = false;
        } else {
            //sortUsingNestedText_increase($('.result-list'), '.result-item', '.from-time-value');
            $("#current-page-sort-field").val("FromTime");
            $("#current-page-sort-direction").val("ASC");
            loadRouteOnInit();
            __tmp = true;
        }
    });
    //End Sort Tool



    //binding event for search detail checkbox
    $(".from-search-detail .list-property input[type=checkbox]").click(function () {
        var datacheck = $(this).attr('data-id');
        var checkedvalue = $(this).prop('checked');

        $('.trasporter-list input[type=checkbox]').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', checkedvalue);
            }
        });
        $('.from-time-list input[type=checkbox]').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', checkedvalue);
            }
        });
        $('.vehicle-type-list input[type=checkbox]').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', checkedvalue);
            }
        });
        $('.seat-type-list input[type=checkbox]').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', checkedvalue);
            }
        });
        $('.start-point-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', checkedvalue);
            }
        });

        $('.end-point-list input[type=checkbox]:checked').each(function (index, item) {
            var datasearch = $(item).attr('data-id');
            if (datacheck == datasearch) {
                $(item).prop('checked', checkedvalue);
            }
        })
        //call ajax to apply filter and clear all sorting
        $(".dropdown-menu li a").removeClass("active-fillter");
        //checkboxchecked();
    });

    //display the filter if the page filtered by the url
    if ($("#url-search-seat-type").val() != "" || $("#url-search-vehicle-type").val() != "") {
        var vehicleType = $("#url-search-vehicle-type").val();
        if (vehicleType != "") {
            $('.vehicle-type-list input[type=checkbox]').each(function () {
                if (vehicleType == "Limousine" && $(this).attr('data-id') == "vip-seat") {
                    $(this).prop('checked', true);
                }
            });
        }
        var seatType = $("#url-search-seat-type").val();
        if (seatType != "") {
            $('.seat-type-list input[type=checkbox]').each(function () {
                if (seatType == "DoubleACSleeper" && $(this).attr('data-id') == "double-ac-sleeper") {
                    $(this).prop("checked", true);
                } else if (seatType == "SemiACSleeper" && $(this).attr('data-id') == "reclining-seat") {
                    $(this).prop("checked", true);
                } else if (seatType == "ACSleeper" && $(this).attr('data-id') == "ac-sleeper") {
                    $(this).prop("checked", true);
                } else if (seatType == "ACSeater" && $(this).attr('data-id') == "ac-seater") {
                    $(this).prop("checked", true);
                }
            });
        }
        $('.from-search-detail').css("display", "none");
        $('.dvSearchFilter').css("display", "block");
        $('.list-check').css("display", "block");
        checkboxchecked();
    }

    //load route on scroll
    $(window).scroll(function () {
        //console.log("searchResult:" + ($(window).scrollTop() - $(".result-list li.result-item").last().ffset().top));
        if ($(".result-list li.result-item").length > 0) {
            if ($(window).scrollTop() - $(".result-list li.result-item").last().offset().top > -1000) {
                // ajax call get data from server and append to the div
                loadRouteOnPaging();
            }
        }
    });

    //display webpage and  element for default loading page
    //reload data based on the url if need
    var searchDate = GetUrlParam('date');
    var tempUrl = currentUrl.split('#');
    if (searchDate != "" && searchDate.length == 10) {
        var day = searchDate.charAt(0) + searchDate.charAt(1);
        var month = searchDate.charAt(3) + searchDate.charAt(4);
        var year = searchDate.charAt(6) + searchDate.charAt(7) + searchDate.charAt(8) + searchDate.charAt(9);
        if (isDate(day, month, year)) { //search date is an invalid date
            var durationdays = moment(searchDate, 'DD-MM-YYYY').diff(moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY'), 'days');
            if (durationdays >= 0) { //search date equal or greater than today load as default
                initDefaultLoadingPage(searchDate);
                isRouteLoading = false;
                return;
            }
        }
    }
    searchDate = "";
    //load page by hashtag date
    if (tempUrl.length < 2 || (tempUrl.length == 2 && tempUrl[1] == "")) { //search without select go date (paramdate)
        initDefaultLoadingPage(searchDate);
    }
    else if (tempUrl.length == 2) { //search with select hashtag date
        var paramDate = tempUrl[1];
        if (tempUrl[1].indexOf('-') > 0) { //contain operatorid
            paramDate = tempUrl[1].split('-')[0];
        }
        if (paramDate.length != 8) { //paramdate is an invalidate
            initDefaultLoadingPage(searchDate);
        } else {
            var day = paramDate.charAt(0) + paramDate.charAt(1);
            var month = paramDate.charAt(2) + paramDate.charAt(3);
            var year = paramDate.charAt(4) + paramDate.charAt(5) + paramDate.charAt(6) + paramDate.charAt(7);
            if (isDate(day, month, year) == false) { //param date is an invalid date
                initDefaultLoadingPage(searchDate);
            }
            else //param date is an valid date
            {
                var durationdays = moment(paramDate, 'DDMMYYYY').diff(moment(moment().format('DDMMYYYY'), 'DDMMYYYY'), 'days');
                if (durationdays < 0 || durationdays == 1) { //load default tomorrow page
                    initDefaultLoadingPage(searchDate);

                } else { //reload page by hashtag date
                    if (durationdays == 0) {//today hide prev button
                        $("#btPrevDate").hide();
                        $("#mbtPrevDate").hide();
                    }
                    var day = paramDate.charAt(0) + paramDate.charAt(1);
                    var month = paramDate.charAt(2) + paramDate.charAt(3);
                    var year = paramDate.charAt(4) + paramDate.charAt(5) + paramDate.charAt(6) + paramDate.charAt(7);
                    searchDate = ReformatToDisplayDate(day, month, year);
                    $('#span-current-date').val(searchDate);
                    $("#departDate").val(searchDate);
                    var curUrl = window.location.href.split('#')[0];
                    if (curUrl.indexOf('?') > -1) {
                        var arrParam = curUrl.split('?');
                        if (arrParam.length == 1) {
                            curUrl = arrParam[0] + "?date=" + searchDate;
                        } else {
                            curUrl = arrParam[0] + "?date=" + searchDate + "&";
                            for (var i = 1; i < arrParam.length; i++) {
                                curUrl += arrParam[i];
                            }
                        }
                    } else {
                        curUrl = curUrl + "?date=" + searchDate;
                    }
                    //change url support query
                    history.pushState({}, document.title, curUrl);
                    isRouteLoading = false;
                    loadRouteOnInit();
                }
            }
        }
    } else {
        initDefaultLoadingPage(searchDate);
    }
    isRouteLoading = false;
});