String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.format = function (o) {
    var regexp = /{([^{]+)}/g;
    var str = this;
    return str.replace(regexp, function (ignore, key) {
        return (key = o[key]) == null ? '' : key;
    });
}


//Const - [Start]

var urlVxrOnGooglePlay = "https://play.google.com/store/apps/details?id=com.vexere.vexere"
var urlVxrOnAppStore = "https://itunes.apple.com/us/app/vexere.com/id1183279479?mt=8"

var FLOW_NON_ECOM = "non-ecommerce"
var FLOW_ECOM = "ecommerce"


//Const - [End]


function convertDateFormat(str) {
    if (str) {
        lst = str.split('-');
        return lst[2] + '-' + lst[1] + '-' + lst[0];
    }
    return str;
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) ||
    userAgent.match(/iPod/i)) {
        return 'iOS';
    }
    else if (userAgent.match(/Android/i)) {
        return 'Android';
    }
    else {
        return 'unknown';
    }
}

function downloadAndroidApp() {
    window.location.href = "market://details?id=com.vexere.vexere";
}

function downloadAppStore() {    
    window.location = urlVxrOnAppStore;
}

function bindDownloadAppEvent() {
    var currentOS = getMobileOperatingSystem();

    //For PC
    $('.play-store-button').click(function () {
        //alert('Android');
        sendDownloadEvent('Android');
        window.open(urlVxrOnGooglePlay);
    });

    $('.app-store-button').click(function () {
        //alert('iOS');
        sendDownloadEvent('IOS');
        window.open(urlVxrOnAppStore);
    });

    //Mobile
    //Hide download icon
    if (currentOS == "iOS") {
        $('.app-store-mobile-button').css('display', 'block');
    }
    if (currentOS == "Android") {
        $('.play-store-mobile-button').css('display', 'block');
    }
    

    $('.app-store-mobile-button').parent().click(function () {

        //console.log(currentOS);
        //console.log('click li');
        if (currentOS == 'iOS') {
            //alert('iOS');
            sendDownloadEvent('IOS');
            downloadAppStore();
        } else if (currentOS == 'Android') {
            //alert('Android');
            sendDownloadEvent('Android');
            downloadAndroidApp();
        }
    });
}

function getPageType() {
    var page = "Trang chủ";
    if (window.location.href.indexOf("/xe-") >= 0) {
        page = "Trang nhà xe";
    } else if (window.location.href.indexOf("/ben-xe-") >= 0) {
        page = "Trang bến xe";
    } else if (window.location.href.indexOf("/ve-xe-") >= 0) {
        page = "Trang tuyến đường";
    } else if (window.location.href.indexOf("/vexetet") >= 0) {
        page = "Trang vé xe Tết";
    }
    return page;
}

function sendDownloadEvent(appType) {
    var device = "PC";
    var pageType = getPageType();
    var width = $(window).width();
    if (width < 768) {
        device = "mobile";
    } else if (width <= 991) {
        device = "table";
    }

    console.log({
        'event': 'DownloadClick',
        'apptype': appType,
        'pageType': pageType,
        'device': device,
        'brandtype': FLOW_NON_ECOM,
        'eventCallback': function () {
        }
    });

    dataLayer.push({
        'event': 'DownloadClick',
        'apptype': appType,
        'pagetype': pageType,
        'device': device,
        'brandtype':  FLOW_NON_ECOM,
        'eventCallback': function() {            
        }
    });
}

function sendShowHotline(isHeader) {
    var eventName = "showHotlineHeader";
    if (isHeader == false) {
        eventName = "showHotlineFooter";
    }
    var pageType = getPageType();
    console.log(eventName + ", " + pageType);
    dataLayer.push({
        'event': eventName,
        'flow': FLOW_NON_ECOM,
        'branchtype': 'non-ecommerce',
        'pagetype': pageType,
        'eventCallback': function () {
        }
    });
}

function bindLeftMenu() {
    //$('#overlay-layout').click(function () {
    //    showMenu();
    //})
}

function popupPartialProcess() {
    if (checkedRedirect()) {
        $.ajax({
            url: "/vi-VN/Support/GetBannner?",
            type: "POST",
            success: function (data) {
                data = JSON.parse(data);
                if ($(window).width() < 768) {
                    if (data.result.popup_banner_mobile != null && data.result.popup_banner_mobile.src != "" && data.result.popup_banner_mobile.status == true) {
                        $(".img-popup-tet").attr('src', data.result.popup_banner_mobile.src);
                        //$(".banner-link").attr('href', data.result.popup_banner_mobile.link);
                        setTimeout(function () {
                            if (sessionStorage["PopupShown"] != 'yes') {
                                $("#vexetet-modal").modal("show");
                                sessionStorage["PopupShown"] = 'yes';
                            }

                        }, 1000);

                        $(".close-button").click(function () {
                            $("#vexetet-modal").modal("hide");
                        });

                        $(".img-popup-tet").click(function () {
                            sendGAPromo(data.result.popup_banner_mobile, false);
                        });

                        $(document).on('keydown', function (e) {
                            if (e.keyCode == 27) { //esc key code
                                $("#vexetet-modal").modal("hide");
                            }
                        })
                    }
                } else if (data.result.popup_banner_mobile != null) {
                    if (data.result.popup_banner.src != "" && data.result.popup_banner.status == true) {
                        $(".img-popup-tet").attr('src', data.result.popup_banner.src);
                        //$(".banner-link").attr('href', data.result.popup_banner.link);
                        setTimeout(function () {
                            if (sessionStorage["PopupShown"] != 'yes') {
                                $("#vexetet-modal").modal("show");
                                sessionStorage["PopupShown"] = 'yes';
                            }

                        }, 1000);

                        $(".close-button").click(function () {
                            $("#vexetet-modal").modal("hide");
                        });

                        $(".img-popup-tet").click(function () {
                            sendGAPromo(data.result.popup_banner, false);
                        });

                        $(document).on('keydown', function (e) {
                            if (e.keyCode == 27) { //esc key code
                                $("#vexetet-modal").modal("hide");
                            }
                        })
                    }
                }
            }
        });
    }
}

$(document).ready(function () {
    bindClickOnHotLineHeaderFooter();
    bindDownloadAppEvent();
    bindLeftMenu();
    //popupPartialProcess();
});

//Use in _LayoutPage - Start
function bindClickOnHotLineHeaderFooter() {
    $('#footer-hotline-link, #header-hotline-link').click(function () {
        $(this).next('.tooltip-hotline').toggle();
    });
    //$('#header-hotline-link').click(function () {
    //    sendShowHotline(true);
    //});
    //$('#footer-hotline-link').click(function () {
    //    sendShowHotline(false);
    //});

    $('#header-hotline-link').mouseleave(function () {
        var hover = $($('.tooltip-hotline')[0]).is(':hover');
        if (!hover) {
            setTimeout(function () {
                $('.tooltip-hotline').hide();
            }, 500);
        }        
    })

    $('#footer-hotline-link').mouseleave(function () {        
        setTimeout(function () {
            var hover = $($('.tooltip-hotline-footer')).is(':hover');
            if (!hover) {
                $('.tooltip-hotline').hide();
            }           
        }, 500);
             
    })

    $('.tooltip-hotline').mouseleave(function () {
        setTimeout(function () {
            $('.tooltip-hotline').hide();
        }, 500);
    })
    $(window).scroll(function () {
        setTimeout(function () {
            $('.tooltip-hotline').hide();
        }, 500);        
    })
    //$('#header-hotline-link').blur(function () {
    //    alert('hi1');
    //    //setTimeout(function () {
    //    //    alert('hi');
    //    //    $(this).hide();
    //    //}, 2000);
    //});
}
//Use in _LayoutPage - End

//Route - S


//Route - E
function checkedRedirect() {
    var url = window.location.href;
    if (url.indexOf('tuan-tu-phan-rang') >= 0) {
        window.location.href = url.replace('tuan-tu-phan-rang', 'tuan-tu-phuong-uyen');
        return false;
    }
    return true;
}

//

// embed GA script

$('.home-promotion li').click(function () {
    var value = $('input[name="HomePromotionBanner"]').val();
    if ($(window).width() < 992) {
        value = $('input[name="HomePromotionBannerMobile"]').val();
    }
    var obj = JSON.parse(value);
    var data = obj[$(this).index() - 1];
    sendGAPromo(data, false);
});

$('.flexslider li').click(function () {
    var value = $('input[name="PromotionBannerData"]').val();
    if ($(window).width() < 992) {
        value = $('input[name="PromotionBannerDataMobile"]').val();
    }
    var obj = JSON.parse(value);
    var data = obj[$(this).index() - 1];
    if (data.link.trim() != "#" && data.link.trim() != "") {
        sendGAPromo(data, true);
    } else {
        sendGAPromo(data, false);
    }
});

function sendGAPromo(data, newWindow) {
    //console.log(data);
    if (data) {
        var arrPosition = ['Home', 'Route', 'Bus operator', 'Bus station', 'Payment', 'Popup'];
        var creative = 'desktop';
        var position = '';
        switch (parseInt(data.page)) {
            case 2: {
                position = $('#departPlace').val() + '/' + $('#destination').val();
                break;
            }
            case 3: {
                position = $('.operator-name b').text().trim();
                break;
            }
            case 4: {
                position = $('.bus-station-name b').text().trim();
                break;
            }
            default: {
                position = arrPosition[parseInt(data.page) - 1];
                break;
            }
        }
        if (data.devide === '2') {
            creative = 'mobile';
        }
        ga('ec:addPromo', {
            // Promo details provided in a promoFieldObject.
            'id': moment(data.startdate, 'YYYY-MM-DD').format('DDMMYYYY'), // Promotion ID. Required (string).
            'name': data.name, // Promotion name (string).
            'creative': creative, // Creative (string).
            'position': position // Position (string).
        });
        var link = data.link;
        if (!(link.includes("https://") || link.includes("vexere"))) {
            link = window.location.href.split('#')[0] + link;
        }
        if (newWindow) {
            window.open(link, '_blank');
        } else {
            window.location.href = link;
        }
        //window.location.href = window.location.href + '/' + data.link;
    }
}