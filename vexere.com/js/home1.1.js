//Helper
var ajaxQueue = $({});

$.ajaxQueue = function (ajaxOpts) {
    // Hold the original complete function.
    var oldComplete = ajaxOpts.complete;

    // Queue our ajax request.
    ajaxQueue.queue(function (next) {
        // Create a complete callback to fire the next event in the queue.
        ajaxOpts.complete = function () {
            // Fire the original complete if it was there.
            if (oldComplete) {
                oldComplete.apply(this, arguments);
            }
            // Run the next query in the queue.
            next();
        };

        // Run the query.
        $.ajax(ajaxOpts);
    });
};


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

/**
 * Lấy danh sách tuyến đường phổ biến
 */
function GetPopularRoute() {
    var culture = getLanguageCultureAndParam()["culture"];
    var translatorParam = getLanguageCultureAndParam()["translatorParam"];

    $.ajaxQueue({
        url: "/" + culture + "/Home/PopularRoute?" + translatorParam,
        type: "post",
        success: function (result) {
            $('#routeSearch').replaceWith(result);

            $("#routeSearch .selectDate").datepicker({
                constrainInput: true,
                showOn: 'button',
                top: '15px',
                buttonText: Language["chonngay"],
                numberOfMonths: 2,
                showButtonPanel: true,
                defaultDate: new Date(),
                minDate: new Date(),
                onSelect: function (dateText, inst) {
                    var baseUrl = $(inst.input[0]).attr('data-url');
                    var param = $(inst.input[0]).attr('data-param');
                    SearchRoute(dateText, baseUrl, param);
                }
            });
        }
    });
}

/**
 * Lấy danh sách nhà xe
 */

function GetFeaturedBusInfo() {
    var culture = getLanguageCultureAndParam()["culture"];
    var translatorParam = getLanguageCultureAndParam()["translatorParam"];
    $.ajaxQueue({
        url: "/" + culture + "/Home/FeaturedBusInfo?" + translatorParam,
        type: "post",
        success: function (result) {
            $('#busNetwork').replaceWith(result);
        }
    });

}

/**
 * Lấy danh sách nhà xe
 */
function GetFeaturedBusStopInfo() {
    var culture = getLanguageCultureAndParam()["culture"];
    var translatorParam = getLanguageCultureAndParam()["translatorParam"];
    $.ajaxQueue({
        url: "/" + culture + "/Home/FeaturedBusStopInfo?" + translatorParam,
        type: "post",
        success: function (result) {
            $('#stations').replaceWith(result);
        }
    });
}

/**
 * Lấy danh sách tin tức
 */
function GetFeaturedLatestNews() {
    $.ajaxQueue({
        url: "/vi-VN/Home/FeaturedLatestNews",
        type: "post",
        success: function (result) {
            $('#news').replaceWith(result);
        }
    });
}

var slideshowSpeedTime = 10000;
function InitHomePage(isVietnamese) {
    $(document).ready(function () {
        $(".slider-home-img").css("opacity", 1);
        $(".img-slide").css("opacity", 1);
        $('.image-slider').slick({
            //infinite: true,
            slidesToShow: 4,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });

        if ($(window).width() < 768) {
            $('.slider-home-img').flexslider({
                animation: "slide",
                controlNav: false,
                slideshowSpeed: slideshowSpeedTime,
                maxItem: 1,
                pauseOnAction: false
            });
        } else {
            $('.slider-home-img').flexslider({
                animation: "slide",
                controlNav: true,
                slideshowSpeed: slideshowSpeedTime,
                maxItem: 1,
                pauseOnAction: false
            });
        }


        $('.slider-304-title').flexslider({
            animation: "slide",
            slideshowSpeed: slideshowSpeedTime,
            maxItem: 1
        });

        jQuery(".switchButton, .swapcities, .btn-switch-route").click(function () {
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

        var language = isVietnamese;
        if (!language || language == '')
            language = "vi";
        getLanguage(language);

        //lưu lại biến Khảo sát
        var khaosat = false; //khởi tạo
        if (localStorage.getItem("khaosat")) { //nếu đã khảo sát
            khaosat = localStorage.getItem("khaosat");
        }
        //luu lai thong tin trang next route
        var infoKeys = ['customerInfo']
        var dataInfo = {}
        infoKeys.forEach(function(info) {return dataInfo[info] = localStorage.getItem(info)})

        localStorage.clear();

        if (!localStorage["version"] || localStorage["version"] != '@System.Configuration.ConfigurationManager.AppSettings["DeployVersion"]') {
            localStorage.clear();
            localStorage.setItem("version", '@System.Configuration.ConfigurationManager.AppSettings["DeployVersion"]');
        }
        //phục hồi biến khảo sát sau khi clear
        if (khaosat == 'true')
            localStorage.setItem("khaosat", khaosat);
        else
            localStorage.removeItem("khaosat");

        //restore dataInfo
        infoKeys.forEach(function(info) { return localStorage.setItem(info, dataInfo[info])})

        var listFromName = [];
        var listFromId = [];
        var listFromType = [];
        var listTempFromName = [];
        var listTempFromId = [];
        var listTempFromType = [];
        if (localStorage.getItem("fromName") != null && localStorage.getItem("fromName").indexOf("[") >= 0) {
            var listTempFromType = JSON.parse(localStorage.getItem("fromType")) || [];
            if (JSON.parse(localStorage.getItem("fromName")))
                listTempFromName = JSON.parse(localStorage.getItem("fromName"));
            if (JSON.parse(localStorage.getItem("fromId")))
                listTempFromId = JSON.parse(localStorage.getItem("fromId"));
            if (JSON.parse(localStorage.getItem("fromType")))
                listTempFromType = JSON.parse(localStorage.getItem("fromType"));
            for (var i = 0; i < listTempFromName.length; i++) {
                if (listFromName.indexOf(listTempFromName[i]) >= 0) {
                    continue;
                }
                else {
                    listFromName.push(listTempFromName[i]);
                    listFromId.push(listTempFromId[i]);
                    listFromType.push(listTempFromType[i]);
                }
            }

            var listToName = [];
            var listToId = [];
            var listToType = [];
            var listTempToName = [];
            var listTempToId = [];
            var listTempToType = [];

            if (JSON.parse(localStorage.getItem("toName")))
                listTempToName = JSON.parse(localStorage.getItem("toName"));
            if (JSON.parse(localStorage.getItem("toId")))
                listTempToId = JSON.parse(localStorage.getItem("toId"));
            if (JSON.parse(localStorage.getItem("toType")))
                listTempToType = JSON.parse(localStorage.getItem("toType"));
            for (var i = 0; i < listTempToName.length; i++) {
                if (listToName.indexOf(listTempToName[i]) >= 0) {
                    continue;
                }
                else {
                    listToName.push(listTempToName[i]);
                    listToId.push(listTempToId[i]);
                    listToType.push(listTempToType[i]);
                }
            }

            //Them diem di vao html
            for (var i = 0; i < listFromName.length; i += 2) {
                var row = "<tr>";
                row += "<td class='col-xs-6 pl0 pr0'><a class='popular-dep-place' data-fromid='" + listFromId[i] + "' data-fromtype='" + listFromType[i] + "' href='#'>" + listFromName[i] + "</a></td>";
                if (i + 1 <= listFromName.length - 1) {
                    row += "<td class='col-xs-6 pl0 pr0'><a class='popular-dep-place' data-fromid='" + listFromId[i + 1] + "' data-fromtype='" + listFromType[i + 1] + "' href='#'>" + listFromName[i + 1] + "</a></td>";
                }
                row += "</tr>";
                $("#depart-table").find('tbody')
                    .append(row);
                if (i == 2) {
                    break;
                }
            }
            //Them diem den vao html
            for (var i = 0; i < listToName.length; i += 2) {
                var row = "<tr>";
                row += "<td class='col-xs-6 pl0 pr0'><a class='popular-des-place' data-toid='" + listToId[i] + "' data-totype='" + listToType[i] + "' href='#'>" + listToName[i] + "</a></td>";
                if (i + 1 <= listToName.length - 1) {
                    row += "<td class='col-xs-6 pl0 pr0'><a class='popular-des-place' data-toid='" + listToId[i + 1] + "' data-totype='" + listToType[i + 1] + "' href='#'>" + listToName[i + 1] + "</a></td>";
                }
                row += "</tr>";
                $("#destination-table").find('tbody')
                    .append(row);
                if (i == 2) {
                    break;
                }
            }
        }

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
                var fromId = $(this).attr("data-fromid")
                var fromType = $(this).attr("data-fromtype")
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
                var toId = $(this).attr("data-toid")
                var toType = $(this).attr("data-totype")
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
    });
}

function rePos() {
    var yPos = window.pageYOffset || document.documentElement.scollTop;
    setTimeout(function () { window.scrollTo(0, yPos); }, 0);
}

function GetQueryParam(paramKey) {
    var paramValue = (location.search.split(paramKey + '=')[1] || '').split('&')[0];
    return paramValue;
}
function HideFooterElementForZaloUser() {
    if ($(window).width() <= 768) {
        //mobile user
        var source = GetQueryParam("source");
        if (source.toLowerCase() == 'zalo' || source.toLowerCase() == 'zaloshop' || source.toLowerCase() == 'zalooa') {
            $('#home_right_banner').hide();
            $('.vexere-intro').hide();
            $('.home-promotion').hide();
            $('#number-panel').hide();
            $('#about-us-panel').hide();
        }
    }
}

function Zalo_InitSDK() {
    Zalo.init(
        {
            version: '2.0',
            appId: '802035021209854542',
            redirectUrl: 'https://api-sandbox.vexere.com/zalo_login'
        }
    );
    // Check login status and get profile
    Zalo.getLoginStatus(function (response) {
        if (response.status === 'connected') {
                Zalo.api('/me',
                    'GET',
                    {
                        fields: 'id, name, birthday, picture, gender'
                    },
                    function (response) {
                        //set zalo user information
                        localStorage["zalo_user_info"] = JSON.stringify(response);
                    }
                );
            } else {
                Zalo.login();
            }
        });
}


$(document).ready(function () {
    var url = location.href.toLowerCase(),
        language = url.indexOf('en-us') > -1 ? 'en' : 'vi';
    if (url.includes('error')) {
        if (language == 'en') {
            window.location.href = "/en-US/Error/InternalError";
        } else {
            window.location.href = "/vi-VN/Error/InternalError";
        }
    }
    //check user is zalo user
    //if ($(window).width() <= 768) {
    //    //mobile user
    //    var source = GetQueryParam("source");
    //    if (source.toLowerCase() == 'zalo' || source.toLowerCase() == 'zaloshop' || source.toLowerCase() == 'zalooa') {
    //        Zalo_InitSDK();
    //    }
    //}

    var page_language = "Tiếng Việt";
    if (language == 'en') {
        page_language = "English";
    }

    //vi, en;
    InitHomePage(language);

    initCustomDatePicker(true, language);
    //Khởi tạo khung tìm vé
    initSearchTicketWidget();
    //Lấy danh sách tuyến đường phổ biến
    GetPopularRoute();
    //Lấy danh sách nhà xe
    GetFeaturedBusInfo();
    //Lấy danh sách bến xe
    GetFeaturedBusStopInfo();
    //Lấy tin tức mới nhất
    GetFeaturedLatestNews();

    HideFooterElementForZaloUser();


    dataLayer.push({
        event: "PageType",
        language: page_language,
        pagetype: "Trang chủ"
    });


});





