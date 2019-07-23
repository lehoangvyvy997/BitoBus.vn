/// <reference path="../route1.1.js" />
var departSelectors = {
    departPlace: '#departPlace',
    departPlace2: '#departPlace2'
};

var destinationSelectors = {
    destination: '#destination',
    destination2: '#destination2'
};

var isMobile = false;
var language = "vi";

var _stateCity = [];
var isRoute = window.location.href.indexOf("bus-ticket-") > -1 || window.location.href.indexOf("ve-xe-")>-1;

//Helpers
function closeSelector() {
    $('.place-selector').hide();
}

var $departPlace = $(departSelectors.departPlace + ', ' + departSelectors.departPlace2);
var $destination = $(destinationSelectors.destination + ', ' + destinationSelectors.destination2);

var modalBody = $('.myModal-timnoi').find('div.modal-body');

if ($(window).width() < 768) {
    isMobile = true;
}

//$('#departPlace2').focus(function (e) {
//    $("#departPlace2").get(0).setSelectionRange(0, 9999);
//});

//$('#destination2').focus(function (e) {
//    $("#destination2").get(0).setSelectionRange(0, 9999);
//});

$('#departPlace')
    .on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 8 || keyCode == 46) {
            $('#start-point-type').val('');
            $('#start-point-id').val('');
        }
    })
    .on('blur', function (e) {
        this.value = $.trim(this.value);
        this.value && $(this).data('label') && (this.value = $(this).data('label'));
    });

$('#destination')
    .on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 8 || keyCode == 46) {
            $('#stop-point-type').val('');
            $('#stop-point-id').val('');
        }
    })
    .on('blur', function (e) {
        this.value = $.trim(this.value);
        this.value && $(this).data('label') && (this.value = $(this).data('label'));
    });

$(".popular-des-place").on('click', function (e) {
    //e.preventDefault();
    $(".myModal-timnoi").modal("hide");
    $("#departDate").focus();
});

function getLanguage(lang) {
    if (lang)
        language = lang;
    if (language == "en") {
        for (var i = 0; i < statecity.length; i++) {
            var des = Object.assign({}, statecity[i]);
            des.value = changeEnglish(des.value);
            des.label = changeEnglish(des.label);
            _stateCity.push(des);
        }
    } else {
        _stateCity = statecity;
    }
}

function getSearchInfoFromUserInput(fromName, toName) {
    var fromState = _stateCity.find(function (x) {
        return x.value == fromName;
    });
    var toState = _stateCity.find(function (x) {
        return x.value == toName;
    });

    if (fromState && toState) {
        //Set search info for fromName
        if (fromState.CityId > 0) {
            $('#start-point-type').val(2);
            $('#start-point-id').val(fromState.CityId);
        } else {
            $('#start-point-type').val(1);
            $('#start-point-id').val(fromState.StateId);
        }

        //Set search info for toName
        if (toState.CityId > 0) {
            $('#stop-point-type').val(2);
            $('#stop-point-id').val(toState.CityId);
        } else {
            $('#stop-point-type').val(1);
            $('#stop-point-id').val(toState.StateId);
        }
    }
}
//Search functions
function searchTickets(param) {
    if (!language)
        language = "vi";

    //validate before execute search
    if (validateSearchTicket(isMobile, language) == false) {
        return false;
    }
    //generate url for search ticket
    var searchTicketUrl = generateSearchTickUrl(isMobile, language);
    if (searchTicketUrl != "") {
        //Update google GTM tracking
        sendSearchTrackingToGTM();
        //Reload from route page display loading
        if (param) {
            showLoading();
        }
        //Redirect to route page
        window.location.href = searchTicketUrl;
    }
}

//this function will validate when user enter a value on input controls of search widget
function validateSearchTicket(isMobile, language) {
    var departPlace = $.trim($('#departPlace').val()),
        destination = $.trim($('#destination').val());

    if (departPlace == '' || (departPlace == '' && destination == '')) {
        $('#departPlace').addClass("has-error");
        $('#departPlace').attr("placeholder", Language["PleaseEnterDepartureCity"]);
    }
    else if (destination == '') {
        $('#destination').addClass("has-error");
        $('#destination').attr("placeholder", Language["PleaseEnterArrivalCity"]);
    }

    if (!$.isNumeric($('#start-point-id').val())) {
        $departPlace.trigger('focus');
        return false;
    }
    if ($('#destination').attr("selecteddestination") !== undefined) {
        $destination.trigger('focus');
        return false;
    }

    var date = $('#departDate').val();
    if (date != null) {
        date = date.replace(/\//gi, "");
    }
    if ($('#departDate').val() === "") {
        $('#departDate').trigger('focus');
        return false;
    }
}
function generateSearchTickUrl(isMobile, language) {
    var _url = window.location.href.toLowerCase();
    var searchTicketUrl = "";
    var date = $('#departDate').val();
    if (date != null) {
        date = date.replace(/\//gi, "");
    }
    if (language == "en") {
        getSearchInfoFromUserInput($("#departPlace").val(), $('#destination').val());
        var startPointValue = locdau($("#departPlace").val());
        var stopPointValue = locdau($('#destination').val());
        if ('ho-chi-minh' == startPointValue) {
            startPointValue = 'sai-gon';
        }
        if ('ho-chi-minh' == stopPointValue) {
            stopPointValue = 'sai-gon';
        }

        var busOperatorId = $('#search-busoperator-id').val();
        var busOperatorName = locdau($('#search-busoperator-name').val());

        if (_url.indexOf('en-us/bus-ticket-booking') > -1 ) {
            searchTicketUrl = "/bus-ticket-booking";
        } else {
            searchTicketUrl = "/bus-ticket-booking";
            if (busOperatorId > 0 && busOperatorName.trim().length > 0 && !_url.includes("utm_source")) {
                searchTicketUrl = "/" + busOperatorName.trim() + "-bus-ticket-booking";
            }
        }

        startPointValue = combineCondition(startPointValue);
        stopPointValue = combineCondition(stopPointValue);

        searchTicketUrl += "-from-" + startPointValue + "-to-" + stopPointValue + "-";

        var startPointType = $('#start-point-type').val();
        var startPointId = $('#start-point-id').val();
        var stopPointType = $('#stop-point-type').val();
        var stopPointId = $('#stop-point-id').val();
        var numberOfTicket = 1;

        if (startPointType != "" && startPointId != "" && stopPointType != "" && stopPointId != "") {
            if (busOperatorId > 0) {
                if (_url.includes("utm_source")) {
                    searchTicketUrl += String.format("{0}{1}t{2}{3}{4}.html", startPointType, startPointId, stopPointType, stopPointId, numberOfTicket);
                } else {
                    searchTicketUrl += String.format("{0}{1}t{2}{3}{4}-{5}.html", startPointType, startPointId, stopPointType, stopPointId, numberOfTicket, busOperatorId);            
                }
            } else {
                searchTicketUrl += String.format("{0}{1}t{2}{3}{4}.html", startPointType, startPointId, stopPointType, stopPointId, numberOfTicket);
            }

            var urlNoHashTag = _url.split('#')[0];
            if (urlNoHashTag.indexOf("?") > -1) {
                var queryParam = urlNoHashTag.split("?")[1];
                var arrQuerryParam = queryParam.split('&');
                searchTicketUrl = "/en-US" + searchTicketUrl + "?date=" + date;
                // nếu nó không chuyển từ trang nhà xe riêng sang nhà xe chung
                if (!(busOperatorId > 0 && _url.includes("utm_source"))) {
                    for (var i = 0; i < arrQuerryParam.length; i++) {
                        if (!arrQuerryParam[i].startsWith("date=")) {
                            searchTicketUrl += '&' + arrQuerryParam[i];
                        }
                    }
                }
            } else {
                searchTicketUrl = "/en-US" + searchTicketUrl + "?date=" + date;
            }
        }
    } else {
        getSearchInfoFromUserInput($("#departPlace").val(), $('#destination').val());
        var startPointValue = locdau($("#departPlace").val());
        var stopPointValue = locdau($('#destination').val());
        if ('ho-chi-minh' == startPointValue) {
            startPointValue = 'sai-gon';
        }
        if ('ho-chi-minh' == stopPointValue) {
            stopPointValue = 'sai-gon';
        }

        var busOperatorId = $('#search-busoperator-id').val();
        var busOperatorName = locdau($('#search-busoperator-name').val());

        if (_url.indexOf('/ve-xe-khach-tu') > -1) {
            searchTicketUrl = "/ve-xe-khach";
        } else {
            searchTicketUrl = "/ve-xe-khach";
            if (busOperatorId > 0 && busOperatorName.trim().length > 0 && !_url.includes("utm_source")) {
                searchTicketUrl = "/ve-xe-khach-" + busOperatorName.trim();
            }
        }

        searchTicketUrl += "-tu-"
            + startPointValue + "-di-" + stopPointValue
            + "-";

        var startPointType = $('#start-point-type').val();
        var startPointId = $('#start-point-id').val();
        var stopPointType = $('#stop-point-type').val();
        var stopPointId = $('#stop-point-id').val();
        var numberOfTicket = 1;
        if (startPointType != "" && startPointId != "" && stopPointType != "" && stopPointId != "") {
            if (busOperatorId > 0 ) {
                if (_url.includes("utm_source")) {
                    searchTicketUrl += String.format("{0}{1}t{2}{3}{4}.html", startPointType, startPointId, stopPointType, stopPointId, numberOfTicket);

                } else {
                    searchTicketUrl += String.format("{0}{1}t{2}{3}{4}-{5}.html", startPointType, startPointId, stopPointType, stopPointId, numberOfTicket, busOperatorId);
                }

            } else {
                searchTicketUrl += String.format("{0}{1}t{2}{3}{4}.html", startPointType, startPointId, stopPointType, stopPointId, numberOfTicket);
            }
            //date = date.replace(/-/g, '');
            var urlNoHashTag = _url.split('#')[0];
            if (urlNoHashTag.indexOf("?") > -1) {
                var queryParam = urlNoHashTag.split("?")[1];
                var arrQuerryParam = queryParam.split('&');
                searchTicketUrl += "?date=" + date;
                // nếu nó không chuyển từ trang nhà xe riêng sang nhà xe chung
                if (!(busOperatorId > 0 && _url.includes("utm_source"))) { 
                    for (var i = 0; i < arrQuerryParam.length; i++) {
                        if (!arrQuerryParam[i].startsWith("date=")) {
                            searchTicketUrl += '&' + arrQuerryParam[i];
                        }
                    }
                }
               
            } else {
                searchTicketUrl += "?date=" + date;
            }

            //Redirect to search ticket page
            searchTicketUrl = "/vi-VN" + searchTicketUrl;
        }
        //}
    }
    return searchTicketUrl;
}
function sendSearchTrackingToGTM() {
    var _url = window.location.href;
    var searchPage = "Trang chủ";
    var eventSearchSuccess = "formSearchSuccess";
    if (_url.indexOf("/xe-") >= 0) {
        searchPage = "Trang nhà xe";
    } else if (_url.indexOf("/ben-xe-") >= 0) {
        searchPage = "Trang bến xe";
    } else if (_url.indexOf("/ve-xe-") >= 0) {
        searchPage = "Trang tuyến đường";
    } else if (_url.indexOf("/vexetet") >= 0) {
        searchPage = "Trang vé xe Tết";
        eventSearchSuccess = "searchvetet";
    }
    //Tracking for clicking "Search Ticket" button
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': eventSearchSuccess,
        'flow': 'ecommerce',
        'formId': 'searchForm',
        'SearchCategory': $("#departPlace").val() + ' - ' + $("#destination").val() + ' - ' + $('#departDate').val(),
        'SearchRoute': $("#departPlace").val() + ' - ' + $("#destination").val(),
        'SearchRouteDate': $('#departDate').val(),
        'SearchPage': searchPage
    });
}
//hide selector
function clickOutsideSelector(selector) {
    $(document).mouseup(function (e) {
        var container = $(selector);
        var input = container.prev();
        if (container.is(":visible") && !input.is(":focus") && !container.is(e.target)
            && container.has(e.target).length === 0) {
            container.hide();
        }
    });
}

function disableTab(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
        e.preventDefault();
        return false;
    }
}

//Main functions
function maskEventOnDepartureInput() {
    //Focus
    $departPlace.on('focus', function () {
        closeSelector();
        $("#destination").removeAttr("selecteddestination");
        $("#departDate").removeAttr("selecteddate");
        $(this).next("#departPlaceSelector").css("display", "block");
        //if (!($('.myModal-timnoi').is(':visible'))) {
        //    $(this).select();
        //}
        if (!$(modalBody).find('.search-title').is(':visible')) {
            $(modalBody).find('.search-title').show();
            $(modalBody).find('table').show();
        }
    })
        //Key press
        .on('keydown', function (e) {
            if (e.keyCode == 13) { //Enter key code
                if (!$(this).val()) {
                    $(this).focus();
                } else {
                    $("#destination").focus();
                }
            }
            else if (e.keyCode == 9) {
                $("#destination").focus();
            }
            else {
                closeSelector();
            }
        })
        .on('keyup', function (e) {
            if ($(this).val().length > 0) {
                if ($(modalBody).find('.search-title').is(':visible')) {
                    $(modalBody).find('.search-title').hide();
                    $(modalBody).find('table').hide();
                }
            } else {
                $("#destination").removeAttr("selecteddestination");
                $("#departDate").removeAttr("selecteddate");
                if (!$(modalBody).find('.search-title').is(':visible')) {
                    $(modalBody).find('.search-title').show();
                    $(modalBody).find('table').show();
                }
            }
        })
        //Autocomplete
        .catcomplete({
            autoFocus: true,
            delay: 0,
            source: function (request, response) {
                /* Remove the dashes from the search term: */
                var term = slug(request.term),
                    ori = request.term,
                    hint = [],
                    exac = [],
                    superexac = [],
                    abbreviates = [];
                //{value:"Hồ Chí Minh",StateId:29,CityId:0,label:"Hồ Chí Minh",Category:"Tỉnh - Thành Phố",Region:3}
                $.each(_stateCity, function (_, el) {
                    var cont = slug(el.value),
                        value = el.value;
                    //lowerValue = value.toLowerCase();
                    if ((el.Category == 'Quận - Huyện' || el.Category == 'Bến xe' || el.Category == 'Bus station') && cont.split('qwerty')[1] !== undefined && cont.split('qwerty')[1].toString().indexOf(term) === 0) {
                        hint.push(el);
                        return true;
                    }

                    var abbr = abbreviate(value).toLowerCase();
                    if (term.toLowerCase() == abbr || term.toLowerCase() == slug(abbr)) {
                        abbreviates.push(el);
                        return true;
                    }

                    if (value.indexOf(ori) === 0) {
                        superexac = [el].concat(superexac);
                        return true;
                    }

                    if (cont.toLowerCase().indexOf(term.toLowerCase()) === 0) {
                        superexac.push(el);
                        return true;
                    }

                    if (cont.indexOf(slug(ori).toLowerCase()) >= 0) {
                        exac.push(el);
                        return true;
                    }

                    if (cont.indexOf(term) === 0) {
                        hint.push(el);
                        return true;
                    }
                });
                superexac = sortByMacthOrder(ori, superexac);
                exac = sortByMacthOrder(ori, exac);
                response(abbreviates.concat(superexac).concat(exac).slice(0, 10));

            },
            select: function (event, ui) {
                $destination.focus();
                $(".myModal-timnoi").modal("hide");
                $("#departPlace").val(ui.item.label);
            },
            focus: function (event, ui) {
                if (ui.item.CityId > 0) {
                    $('#start-point-type').val(2);
                    $('#start-point-id').val(ui.item.CityId);
                } else {
                    $('#start-point-type').val(1);
                    $('#start-point-id').val(ui.item.StateId);
                }

                //Reset busoperator
                $(this).data('label', ui.item.value);
            }
        });

    $(document).on('keydown', disableTab);

}

function sortByMacthOrder(keyword, list) {
    keyword = keyword.toLowerCase();
    var alphabetKeyword = filterAlphabet(keyword);

    $.each(list, function (index, ele) {
        var valueLower = ele.value.toLowerCase();
        if (valueLower.indexOf(keyword) >= 0) {
            ele.MatchType = 1;
            ele.MatchIndex = valueLower.indexOf(keyword);

        } else if (filterAlphabet(valueLower).indexOf(alphabetKeyword) >= 0) {
            ele.MatchType = 2;
            ele.MatchIndex = valueLower.indexOf(alphabetKeyword);
        }
    });

    list = list.sort(sortMatchTypeIndex);

    return list;
}

function sortMatchTypeIndex(a, b) {
    if (a.MatchType < b.MatchType) return -1;
    if (a.MatchType > b.MatchType) return 1;
    if (a.MatchIndex < b.MatchIndex) return -1;
    if (a.MatchIndex > b.MatchIndex) return 1;
}

function maskEventOnDestinationInput() {
    //Focus
    $destination.on('focus', function () {
        closeSelector();
        $("#destination").attr("selecteddestination", "");
        $("#departDate").removeAttr("selecteddate");
        $(this).next("#destinationSelector").css("display", "block");
        if (!$('.myModal-timnoi').is(':visible')) {
            $(this).get(0).setSelectionRange(0, 9999);
        }
        if (!$(modalBody).find('.search-title').is(':visible')) {
            $(modalBody).find('.search-title').show();
            $(modalBody).find('table').show();
        }
    })

        //Key press
        .on('keydown', function (e) {
            if (e.keyCode == 13) { //Enter key code
                if (!$(this).val()) {
                    $(this).focus();
                } else {
                    $(this).removeAttr("selecteddestination");
                    if (isRoute) {
                        $("#departDate").attr("selecteddate", true);
                    } else {
                        $("#departDate").attr("selecteddate", false);
                    }
                    $("#departDate").focus();
                }
            } else if (e.keyCode == 9) {
                $("#departDate").focus();
            } else {
                closeSelector();
            }
        })
        .on('keyup', function (e) {
            if ($(this).val().length > 0) {
                if ($(modalBody).find('.search-title').is(':visible')) {
                    $(modalBody).find('.search-title').hide();
                    $(modalBody).find('table').hide();
                }
            } else {
                $(this).attr("selecteddestination", "");
                $("#departDate").removeAttr("selecteddate");
                if (!$(modalBody).find('.search-title').is(':visible')) {
                    $(modalBody).find('.search-title').show();
                    $(modalBody).find('table').show();
                }
            }
        })

        //Autocomplete
        .catcomplete({
            autoFocus: true,
            delay: 0,
            source: function (request, response) {
                /* Remove the dashes from the search term: */
                var term = slug(request.term),
                    ori = request.term,
                    hint = [],
                    exac = [],
                    superexac = [],
                    abbreviates = [];

                $.each(_stateCity, function (_, el) {
                    var cont = slug(el.value),
                        value = el.value;
                    //lowerValue = value.toLowerCase();
                    if ((el.Category == 'Quận - Huyện' || el.Category == 'Bến xe' || el.Category == 'Bus station') && cont.split('qwerty')[1] !== undefined && cont.split('qwerty')[1].toString().indexOf(term) === 0) {
                        hint.push(el);
                        return true;
                    }

                    var abbr = abbreviate(value).toLowerCase();
                    if (term.toLowerCase() == abbr || term.toLowerCase() == slug(abbr)) {
                        abbreviates.push(el);
                        return true;
                    }

                    if (value.indexOf(ori) === 0) {
                        superexac = [el].concat(superexac);
                        return true;
                    }

                    if (cont.toLowerCase().indexOf(term.toLowerCase()) === 0) {
                        superexac.push(el);
                        return true;
                    }

                    if (cont.indexOf(slug(ori).toLowerCase()) >= 0) {
                        exac.push(el);
                        return true;
                    }

                    if (cont.indexOf(term) === 0) {
                        hint.push(el);
                        return true;
                    }
                });
                superexac = sortByMacthOrder(ori, superexac);
                exac = sortByMacthOrder(ori, exac);
                response(abbreviates.concat(superexac).concat(exac).concat(hint).slice(0, 10));
            },
            select: function (event, ui) {
                $(".myModal-timnoi").modal("hide");
                $("#destination").val(ui.item.label);
                $('#departDate').focus();
            },
            focus: function (event, ui) {
                if (ui.item.CityId > 0) {
                    $('#stop-point-type').val(2);
                    $('#stop-point-id').val(ui.item.CityId);
                } else {
                    $('#stop-point-type').val(1);
                    $('#stop-point-id').val(ui.item.StateId);
                }

                //Reset busoperator
                $(this).data('label', ui.item.value);
            }

        });
}

function maskEventOnDepartTimeInput() {
    var __numOfMonths;
    if ($(window).width() > 768) {
        __numOfMonths = 2;
    } else {
        __numOfMonths = 1;
    }

    $("#departDate").datepicker({
        minDate: new Date(),
        numberOfMonths: __numOfMonths,
        todayHighlight: false,
        gotoCurrent: true,
        onSelect: function () {
            $("#destination").removeAttr("selecteddestination");
            $(this).attr("selecteddate", true);
            var comparedate = Math.abs(new Date() - $(this).datepicker('getDate'));
            var oneDay = 1000 * 60 * 60 * 24;
            var diffentday = Math.round(comparedate / oneDay);
            if ($(this).datepicker('getDate') > $("#returnDate").datepicker('getDate')) {
                $("#returnDate").datepicker('option', 'minDate', diffentday + 1);
            };
        }
    });

    $("#departDate").focus(function () {
        if($(this).val()) {
            $("#destination").removeAttr("selecteddestination");
            $(this).attr("selecteddate", true);
        }
        closeSelector();
        if (isMobile) {
            $('html, body').stop();
            $('#ui-datepicker-div').each(function () {
                this.style.setProperty('top', $("#departDate").offset().top + 50 + "px", 'important');
            });
            var scrollTopValue = $('#departPlace').offset().top - 5;
            $('html, body').animate({ scrollTop: scrollTopValue }, 0);
            $("#ui-datepicker-div").css({ top: $("#departDate").offset().top + 50 + "px !important" });
        }
    });
}

function maskEventOnDestinationTimeInput() {
    $("#returnDate").datepicker({
        minDate: new Date(),
        numberOfMonths: 2
    });

    $("#returnDate").focus(function () {
        closeSelector();
    });
}

function maskEventOnNumTicketSelect() {
    $('#passengerNum').customSelect();
}

function maskEventOnSelectStatePopup() {
    $('li.city > a').click(function () {
        //console.log("hello");
        var pdiv = $(this).parent().parent().parent().parent().parent().parent().parent().parent();

        var stateId = $(this).attr('data-state');
        //var cityId = $(this).attr('data-city');

        if ("departPlaceSelector" == pdiv.attr('id')) {
            $departPlace.val($(this).text());

            $('#start-point-type').val(1);
            $('#start-point-id').val(stateId);
            //$('#start-point-city').val(cityId);

            //Reset busoperator
            //$('#search-busoperator-id').val("");
            //$('#search-busoperator-name').val("");

            $('#destination').focus();

        } else if ("destinationSelector" == pdiv.attr('id')) {
            $('#destination').val($(this).text());

            $('#stop-point-type').val(1);
            $('#stop-point-id').val(stateId);
            //$('#stop-point-city').val(cityId);

            //Reset busoperator
            //$('#search-busoperator-id').val("");
            //$('#search-busoperator-name').val("");

            $('#departDate').focus();
        }

        return false;
    });

    //Close select box 
    $("a.close").click(function () {
        // Hide all hidden content
        closeSelector();
    });

    //Mask hide selector when click out side
    clickOutsideSelector('#departPlaceSelector');
    clickOutsideSelector('#destinationSelector');
}


function maskEventOnSearchButton() {
    $('#searchForm').on('submit', function () {
        //Local search
        searchTickets(true);
        return false;
    });
}

function initSearchTicketWidget() {
    //Mask event on departure input
    maskEventOnDepartureInput();

    //Mark event on destination input
    maskEventOnDestinationInput();

    //Mask event on departure time input
    maskEventOnDepartTimeInput();

    //Mask event on departure time input
    maskEventOnDestinationTimeInput();

    //Mask event on number of ticket select
    maskEventOnNumTicketSelect();

    //Mask event on select state popup
    maskEventOnSelectStatePopup();

    //Mask event on search button
    maskEventOnSearchButton();
}

function strCombine(str) {
    var parts = str.split('-');
    var des = "";
    for (var i = 0; i < parts.length; i++) {
        des = des + parts[i];
    }
    return des;
}

function combineCondition(str) {
    if (str == "hochiminh") {
        return "saigon"
    }
    if (str == "sai-gon" || str == "ha-noi" || str == "da-nang" || str == "hai-phong") {
        return strCombine(str);
    }
    if (str.indexOf("da-lat") >= 0) {
        var parts = str.split('-');
        var des = "dalat";
        for (var i = 2; i < parts.length; i++) {
            des = des + "-" + parts[i];
        }
        return des;
    }
    if (str.indexOf("ha-long") >= 0) {
        var parts = str.split('-');
        var des = "halong-bay";
        for (var i = 2; i < parts.length; i++) {
            des = des + "-" + parts[i];
        }
        return des;
    }
    return str;
}

$(document).on("keypress", function (e) {
    if (e.which === 13) {
        e.preventDefault();
        if ($("#departDate").attr("selecteddate") === "true") {
            $('#searchForm').trigger("submit");
        } else if ($("#destination").attr("selecteddestination") !== undefined) {
            $('#destination').trigger("focus");
        } else if ($('#departDate').attr("selecteddate") === "false") {
            $('#departDate').trigger("focus");
        } else {
            $("#departPlace").trigger("focus");
        }
        return false;
    }
});

$('#searchSubmit').click(function () {
    if ($("#departDate").val().length > 0 && $("#departPlace").val().length > 0 && $("#destination").val().length > 0) {
        $("#destination").removeAttr("selecteddestination");
        $('#departDate').attr("selecteddate", "true");
    } else if ($("#departPlace").val().length <= 0) {
        $("#destination").removeAttr("selecteddestination");
        $('#departDate').removeAttr("selecteddate");
    } else if ($("#destination").val().length <= 0) {
        $("#destination").attr("selecteddestination", "");
    } else if ($("#departDate").val().length <= 0) {
        $("#destination").removeAttr("selecteddestination");
        $('#departDate').attr("selecteddate", "false");
    }
});