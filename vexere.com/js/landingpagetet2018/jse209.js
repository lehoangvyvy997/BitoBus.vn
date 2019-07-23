function locdau2(str) {
    str = str.toLowerCase();
    str = str.replace(/â|ầ|ấ|ậ|ẩ|ẫ/g, "â");
    str = str.replace(/ă|ằ|ắ|ặ|ẳ|ẵ/g, "ă");
    str = str.replace(/ê|ề|ế|ệ|ể|ễ/g, "ê");
    str = str.replace(/ô|ồ|ố|ộ|ổ|ỗ/g, "ô");
    str = str.replace(/ơ|ờ|ớ|ợ|ở|ỡ/g, "ô");
    str = str.replace(/ư|ừ|ứ|ự|ử|ữ/g, "ư");
    str = str.replace(/i|ì|í|ị|ỉ|ữ\ĩ/g, "i");
    str = str.replace(/đ/g, "đ");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1- 
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi  
    return str;
}
//$(function () {
//    if (!(/iPad|iPhone|iPod/.test(navigator.userAgent))) return
//    $(document.head).append(
//      '<style>*{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}</style>'
//    )
//    $(window).on('gesturestart touchmove', function (evt) {
//        if (evt.originalEvent.scale !== 1) {
//            evt.originalEvent.preventDefault()
//            document.body.style.transform = 'scale(1)'
//        }
//    })
//});
//$(this).on('touchmove', function (event) {
//    if (event.originalEvent.scale !== 1) {
//        event.preventDefault();
//        event.stopPropagation();
//    }
//});

var $select = $('.point-from');
var $select2 = $('.point-to');
$.each(statecity, function (_, el) {
    if (el.Category == "Quận - Huyện") {
        $select.append("<option value='c" + el.CityId + "' data-type='" + el.Category + "'>" + el.value + "</option>");
        $select2.append("<option value='c" + el.CityId + "' data-type='" + el.Category + "'>" + el.value + "</option>");
    } else {
        $select.append("<option value='" + el.StateId + "' data-type='" + el.Category + "'>" + el.value + "</option>");
        $select2.append("<option value='" + el.StateId + "' data-type='" + el.Category + "'>" + el.value + "</option>");

    }
    
});

$(window).on("load", function () {
    if ($(window).width() > 800) {
        $(".list-scrol").mCustomScrollbar({
            axis: "yx",
            theme: "3d",
            scrollInertia: 550,
            scrollbarPosition: "outside",
            mouseWheel: { scrollAmount: 100, enable: 100 },
            scrollButtons: { scrollAmount: 100 },
            live: true,
            keyboard: {
                enable: false
            },
            mouseWheel: {
                scrollAmount: 61
            },
            advanced: {
                updateOnContentResize: true
            },
        //    callbacks: {
        //        onTotalScroll: function () {
        //            // $(".display-read-more").removeClass("displaynone");
        //            if ($("#mCSB_1 .display-read-more").length == 0) {
        //                $("#mCSB_1").append("<div class='hidden-xs hidden-sm  display-read-more' style='margin-bottom:30px'><div class='read-more-trip'>Xem thêm tuyến đường</div></div>");
        //            }
        //            //$("#current-page").val(Number($("#current-page").val()) + 1);
        //            //var page = $("#current-page").val();
        //            //if (page == 1) {
        //            //    page = 2;
        //            //}
        //            //start loading page
        //            //$.ajax({
        //            //    url: "/vi-VN/TetHoliday/GetGetListCompany",
        //            //    type: "POST",
        //            //    async: false,
        //            //    contentType: "application/json; charset=utf-8",
        //            //    dataType: "json",
        //            //    data: "{'from_id': '" + $(".point-from").val() + "','to_id':'" + $(".point-to").val() + "','company_id':'0','page':'" + page + "','data_type_from':'" + $(".point-from option:selected").attr("data-type") + "','data_type_to':'" + $(".point-to option:selected").attr("data-type") + "'}",
        //            //    success: function (response) {
        //            //        //var html = "";
        //            //        //for (var i = 0 ; i < response.length ; i++) {
        //            //        //    html += "<li>" + response[i].company_name + "</li>";
        //            //        //}
        //            //        if ($(window).width() < 768) {
        //            //            $("ul.list-scrol").append(response.data);

        //            //        } else {
        //            //            //$("#mCSB_1_container").html(response.data + "<li class='hidden-lg hidden-md'><div class='footer-list-item text-center' style='font-size:16px;font-weight:initial;line-height:20px;width:100%;'>Thời gian còn lại <p id='text-time2'></p></div></li>");
        //            //            $("#mCSB_1_container").append(response.data);
        //            //        }

        //            //        var numMonth = 2;
        //            //        if ($(window).width() < 768) {
        //            //            numMonth = 1;
        //            //        }
        //            //        $(".selectDates").datepicker({
        //            //            constrainInput: true,
        //            //            showOn: 'button',
        //            //            top: '15px',
        //            //            buttonText: 'Mua vé Tết 2018',
        //            //            numberOfMonths: numMonth,
        //            //            showButtonPanel: true,
        //            //            defaultDate: new Date('01/01/2018'),
        //            //            minDate: new Date(),
        //            //            onSelect: function (dateText, inst) {
        //            //                var textdate = dateText.replace('-', '');
        //            //                var url = jQuery(inst.input[0]).attr('data-url') + "#" + textdate.replace('-', '');
        //            //                window.location.href = url;
        //            //            },
        //            //            beforeShowDay: function (date) {
        //            //                var eventDates = {};
        //            //                var teamp = $(this).closest("li.item").attr("data-date");
        //            //                var arr = teamp.split('|');
        //            //                for (i = 0; i < arr.length - 1; i++) {
        //            //                    eventDates[new Date(arr[i])] = new Date(arr[i]);

        //            //                }
        //            //                var highlight = eventDates[date];
        //            //                if (highlight) {
        //            //                    return [true, "event", 'Tooltip text'];
        //            //                } else {
        //            //                    return [true, '', ''];
        //            //                }
        //            //            }
        //            //        });

        //            //        if ($(window).width() < 800) {
        //            //            $('[data-tooltip="tooltip"]').tooltip({ html: true, placement: "bottom" });
        //            //            $(".item").click(function (e) {
        //            //                if ($(e.target).is('.item .view-more') || $(e.target).is('.item .hidden-md') || $(e.target).is('.item . hidden-lg')) {
        //            //                    return;
        //            //                }
        //            //                $('[data-tooltip="tooltip"]').tooltip('hide');
        //            //            });
        //            //        }


        //            //    },
        //            //    error: function () {
        //            //        return false;
        //            //    }
        //            //});
        //        }
        //       // onTotalScrollOffset: 300
        ////        onScrollStart:function(){}, /*user custom callback function on scroll start event*/

        ////onScroll:function(){}, /*user custom callback function on scroll event*/

        ////onTotalScroll:function(){}, /*user custom callback function on scroll end reached event*/

        ////onTotalScrollBack:function(){}, /*user custom callback function on scroll begin reached event*/

        ////onTotalScrollOffset:0, /*scroll end reached offset: integer (pixels)*/

        ////whileScrolling:false, /*user custom callback function on scrolling event*/

        ////whileScrollingInterval:30 /*interval for calling whileScrolling callback: integer (milliseconds)*/
        //    }
        });
    }
});

//$(document).on("click", ".display-read-more", function () {
//    $(".display-read-more").remove();
//});

$.widget("custom.combobox", $.ui.autocomplete, {
    _create: function () {
        this.wrapper = $("<span>")
          .addClass("custom-combobox")
          .insertAfter(this.element);

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
        //this._super();
        //this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");

    },

    _createAutocomplete: function () {
        var selected = this.element.children(":selected"),
          value = selected.val() ? selected.text() : "";
        var that = this;
        var currentCategory = "";
        this.input = $("<input>")
          .appendTo(this.wrapper)
          .val(value)
          .attr("title", "")
          .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
          .tooltip({
              classes: {
                  "ui-tooltip": "ui-state-highlight"
              }
          });
        this.input.attr("onmouseup", "return false;");
        this.input.attr("accesskey", "1");
        this.input.attr("tabindex", "1");
        this.input.attr("autocomplete", "off");
        if (this.bindings[0].classList[1] == "point-from") {
            this.input.attr("id", "departPlacetet");
        }
        if (this.bindings[0].classList[1] == "point-to") {
            this.input.attr("id", "destinationtet");
        }
        if ($(window).width() < 768) {
            this.input.attr("data-toggle", "modal");
            if (this.bindings[0].classList[1] == "point-from") {
                this.input.attr("data-target", "#depart-modal-tet");
            }
            if (this.bindings[0].classList[1] == "point-to") {
                this.input.attr("data-target", "#destination-modal-tet");
            }
        }
        if ($(window).width() > 768) {
            this.input.autocomplete({
                delay: 0,
                minLength: 0,
                autoFocus: true,
                source: $.proxy(this, "_source"),
                create: function () {
                    $(this).data('ui-autocomplete')._renderMenu = function (ul, items) {
                        var that = this,
                            currentCategory = "";
                        items = items.sort(function (a, b) {
                            if (a.Category < b.Category) {
                                return 1;
                            }
                            if (a.Category > b.Category) {
                                return -1;
                            }
                            return 0;
                        });
                        $.each(items, function (index, item) {
                            if (item.Category != currentCategory) {
                                ul.append("<li class='ui-autocomplete-category' style=font-weight:bold;>" + item.Category + "</li>");
                                currentCategory = item.Category;
                            }
                            that._renderItemData(ul, item);
                        });
                    }
                }
            });

        }
        this._on(this.input, {
            autocompleteselect: function (event, ui) {
                if (ui.item != undefined) {

                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                    //alert(ui.item.option.value);
                    //$(".point-from").change();

                    //if ((ui.item.option.value == "0")) {
                    //    $(".bt-bochon").click();
                    //}
                    var page = 1;
                    $.ajax({
                        url: "/vi-VN/TetHoliday/GetGetListCompany",
                        type: "POST",
                        async: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: "{'from_id': '" + $(".point-from").val() + "','to_id':'" + $(".point-to").val() + "','company_id':'0','page':'" + page + "','data_type_from':'" + $(".point-from option:selected").attr("data-type") + "','data_type_to':'" + $(".point-to option:selected").attr("data-type") + "'}",
                        success: function (response) {
                            if (response.data == "" || response.number_trip < 10) {
                                $(".read-more-trip").css("display", "none");
                            } else {
                                $(".read-more-trip").css("display", "block");
                            }
                            if (response.number_trip != 0) {

                                if ($(window).width() < 768) {
                                    $(".list-scrol").html(response.data);

                                } else {
                                    $("#mCSB_1_container").html(response.data);
                                    if (response.number_trip >= 10) {
                                        $("#mCSB_1_container").append("<div class='hidden-xs hidden-sm  display-read-more' style='margin-bottom:10px;margin-top:20px'><div class='read-more-trip'>Xem thêm tuyến đường</div></div>");
                                    }
                                }

                                var numMonth = 2;
                                var datedefaunt = "01/01/2019";
                                if ($(window).width() < 768) {
                                    numMonth = 1;
                                    datedefaunt = "02/01/2019";
                                }
                                $(".selectDates").datepicker({
                                    constrainInput: true,
                                    showOn: 'button',
                                    top: '15px',
                                    buttonText: 'Mua vé Tết 2019',
                                    numberOfMonths: numMonth,
                                    showButtonPanel: true,
                                    defaultDate: new Date(datedefaunt),
                                    minDate: new Date(),
                                    onSelect: function (dateText, inst) {
                                        var textdate = dateText.replace('-', '');
                                        var url = jQuery(inst.input[0]).attr('data-url') + "#" + textdate.replace('-', '');
                                        window.location.href = url;
                                    },
                                    beforeShowDay: function (date) {
                                        var eventDates = {};
                                        var teamp = $(this).closest("li.item").attr("data-date");
                                        var arr = teamp.split('|');
                                        for (i = 0; i < arr.length - 1; i++) {
                                            eventDates[new Date(arr[i])] = new Date(arr[i]);

                                        }
                                        var highlight = eventDates[date];
                                        if (highlight) {
                                            return [true, "event", 'Tooltip text'];
                                        } else {
                                            return [true, '', ''];
                                        }
                                    }
                                });

                                if ($(window).width() < 800) {
                                    $('[data-tooltip="tooltip"]').tooltip({ html: true, placement: "bottom" });
                                    $(".item").click(function (e) {
                                        if ($(e.target).is('.item .view-more') || $(e.target).is('.item .hidden-md') || $(e.target).is('.item . hidden-lg')) {
                                            return;
                                        }
                                        $('[data-tooltip="tooltip"]').tooltip('hide');
                                    });
                                }


                                $(".content-note").css("display", "block");
                                $(".title-trip").css("display", "block");
                                $(".list-scrol").css("display", "block");
                                $(".message-trip").css("display", "none");
                            } else {
                                if ($(window).width() < 768) {
                                    $(".list-scrol").html(response.data);

                                } else {
                                    $("#mCSB_1_container").html(response.data);
                                    if (response.number_trip >= 10) {
                                        $("#mCSB_1_container").append("<div class='hidden-xs hidden-sm  display-read-more' style='margin-bottom:10px;margin-top:20px'><div class='read-more-trip'>Xem thêm tuyến đường</div></div>");
                                    }
                                }
                                $(".list-scrol").css("display", "none");
                                $(".title-trip").css("display", "none");
                                $(".content-note").css("display", "none");
                                $(".message-trip").css("display", "block");

                            }
                            if ($("#destinationtet").val() == "") {
                                $("#destinationtet").trigger("focus");
                                $("#destinationtet").trigger("click");
                            }
                            //else {
                            //    $("#ui-id-1").css("display", "none");
                            //}
                            checkdata();
                        },
                        error: function () {
                            return false;
                        }
                    });
                }

            },

            autocompletechange: "_removeIfInvalid"
        });

    },

    _createShowAllButton: function () {
        var input = this.input,
          wasOpen = false;

        $("<a>")
          .attr("tabIndex", -1)
          .attr("title", "Show All Items")
          .tooltip()
          .appendTo(this.wrapper)
          .button({
              icons: {
                  primary: "ui-icon-triangle-1-s"
              },
              text: false
          })
          .removeClass("ui-corner-all")
          .addClass("custom-combobox-toggle ui-corner-right")
          .on("mousedown", function () {
              wasOpen = input.autocomplete("widget").is(":visible");
          })
          .on("click", function (ul, item) {
              input.trigger("focus");
              // Close if already visible
              if (wasOpen) {
                  return;
              }
              ;
              //console.log(input);
              // Pass empty string as value to search for, displaying all results
              input.autocomplete("search", "Hồ Chí Minh");
              //$("#ui-id-1").addClass("displayblock");
              if (input[0].id == "departPlacetet") {
                  $(".ui-autocomplete").html("<li class='ui-autocomplete-category' style='margin-bottom:10px;font-style:italic;background:#f5f5f5;color:#838383'>Nơi đi phổ biến</li>" +
                  "<li class='ui-autocomplete-category' style='font-weight:bold;'>Tỉnh - Thành Phố</li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='29' data-text='Hồ Chí Minh' class='ui-corner-all event-depart' tabindex='-1'>Hồ Chí Minh</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='24' data-text='Hà Nội' class='ui-corner-all event-depart' tabindex='-1'>Hà Nội</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='15' data-text='Đà Nẵng' class='ui-corner-all event-depart' tabindex='-1'>Đà Nẵng</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='13' data-text='Cần Thơ' class='ui-corner-all event-depart' tabindex='-1'>Cần Thơ</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='27' data-text='Hải Phòng' class='ui-corner-all event-depart' tabindex='-1'>Hải Phòng</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='16' data-text='Đắk Lắk' class='ui-corner-all event-depart' tabindex='-1'>Đắk Lắk</a></li>" +
                  "<li class='ui-autocomplete-category' style='font-weight:bold;'>Quận - Huyện</li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='c399' data-text='Đà Lạt - Lâm Đồng' class='ui-corner-all event-depart' tabindex='-1'>Đà Lạt - Lâm Đồng</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='c359' data-text='Nha Trang - Khánh Hòa' class='ui-corner-all event-depart' tabindex='-1'>Nha Trang - Khánh Hòa</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='c13' data-text='Vũng Tàu - Bà Rịa-Vũng Tàu' class='ui-corner-all event-depart' tabindex='-1'>Vũng Tàu - Bà Rịa-Vũng Tàu</a></li>" +
                  "<li class='ui-menu-item' role='presentation'><a data-value='38' data-text='Sa Pa - Lào Cai' class='ui-corner-all event-depart' tabindex='-1'>Sa Pa - Lào Cai</a></li>"
                  );
              } if (input[0].id == "destinationtet") {
                  $(".ui-autocomplete").html("<li class='ui-autocomplete-category' style='margin-bottom:10px;font-style:italic;background:#f5f5f5;color:#838383'>Nơi đến phổ biến</li>" +
                  "<li class='ui-autocomplete-category' style='font-weight:bold;'>Tỉnh - Thành Phố</li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='29' data-text='Hồ Chí Minh' class='ui-corner-all event-destination' tabindex='-1'>Hồ Chí Minh</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='24' data-text='Hà Nội' class='ui-corner-all event-destination' tabindex='-1'>Hà Nội</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='15' data-text='Đà Nẵng' class='ui-corner-all event-destination' tabindex='-1'>Đà Nẵng</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='13' data-text='Cần Thơ' class='ui-corner-all event-destination' tabindex='-1'>Cần Thơ</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='27' data-text='Hải Phòng' class='ui-corner-all event-destination' tabindex='-1'>Hải Phòng</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='16' data-text='Đắk Lắk' class='ui-corner-all event-destination' tabindex='-1'>Đắk Lắk</a></li>" +
                 "<li class='ui-autocomplete-category' style='font-weight:bold;'>Quận - Huyện</li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='c399' data-text='Đà Lạt - Lâm Đồng' class='ui-corner-all event-destination' tabindex='-1'>Đà Lạt - Lâm Đồng</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='c359' data-text='Nha Trang - Khánh Hòa' class='ui-corner-all event-destination' tabindex='-1'>Nha Trang - Khánh Hòa</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='c13' data-text='Vũng Tàu - Bà Rịa-Vũng Tàu' class='ui-corner-all event-destination' tabindex='-1'>Vũng Tàu - Bà Rịa-Vũng Tàu</a></li>" +
                 "<li class='ui-menu-item' role='presentation'><a data-value='38' data-text='Sa Pa - Lào Cai' class='ui-corner-all event-destination' tabindex='-1'>Sa Pa - Lào Cai</a></li>"
                 );
              }


              //$("#ui-id-2").html("<li class='ui-autocomplete-category' style='font-weight:bold;'>Tỉnh - Thành Phố</li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='29' data-text='Hồ Chí Minh' class='ui-corner-all' tabindex='-1'>Hồ Chí Minh</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='24' data-text='Hà Nội' class='ui-corner-all' tabindex='-1'>Hà Nội</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='15' data-text='Đà Nẵng' class='ui-corner-all' tabindex='-1'>Đà Nẵng</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='13' data-text='Cần Thơ' class='ui-corner-all' tabindex='-1'>Cần Thơ</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='27' data-text='Hải Phòng' class='ui-corner-all' tabindex='-1'>Hải Phòng</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='16' data-text='Đắk Lắk' class='ui-corner-all' tabindex='-1'>Đắk Lắk</a></li>" +
              //   "<li class='ui-autocomplete-category' style='font-weight:bold;'>Quận - Huyện</li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='457' data-text='Đà Lạt - Lâm Đồng' class='ui-corner-all' tabindex='-1'>Đà Lạt - Lâm Đồng</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='417' data-text='Nha Trang - Khánh Hòa' class='ui-corner-all' tabindex='-1'>Nha Trang - Khánh Hòa</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='2' data-text='Vũng Tàu - Bà Rịa-Vũng Tàu' class='ui-corner-all' tabindex='-1'>Vũng Tàu - Bà Rịa-Vũng Tàu</a></li>" +
              //   "<li class='ui-menu-item' role='presentation'><a data-value='482' data-text='Sa Pa - Lào Cai' class='ui-corner-all' tabindex='-1'>Sa Pa - Lào Cai</a></li>"
              //   );



          });
    },



    _source: function (request, response) {
        var listdata = [];
        //var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        this.element.children("option").map(function () {
            var text = $(this).text();
            var type = $(this).attr("data-type");
            if (text != "") {
                listdata.push({ label: text, value: text, Category: type, option: this });
            }
        });

        var term = slug(request.term),
              ori = request.term,
              hint = [],
              exac = [],
              superexac = [],
              abbreviates = [];
        $.each(listdata, function (_, el) {
            var cont = slug(el.value),
                value = el.value,
                lowerValue = value.toLowerCase();
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

            if (value.indexOf(ori) >= 0) {
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



        //var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        //response(this.element.children("option").map(function () {
        //    var text = $(this).text();
        //    var type = $(this).attr("data-type");
        //    if (this.value && this.value != "0" && (!request.term || matcher.test(locdau(text).replace("-", " "))) || (!request.term || matcher.test(locdau2(text).replace("-", " "))) || (!request.term || matcher.test(locdau2(text).replace("-", ""))) || (!request.term || matcher.test(text)))
        //        return {
        //            label: text,
        //            value: text,
        //            category: type,
        //            option: this
        //        };
        //}));
    },
    _removeIfInvalid: function (event, ui) {

        // Selected an item, nothing to do
        //if (ui.item) {
        //    return;
        //}

        // Search for a match (case-insensitive)

        //return;
        //var value = this.input.val(),
        //  valueLowerCase = value.toLowerCase(),
        //  valid = false;
        //this.element.children("option").each(function () {
        //    if ($(this).text().toLowerCase() === valueLowerCase) {
        //        this.selected = valid = true;
        //        return true;
        //    }
        //});

        // Found a match, nothing to do
        //if (valid) {
        //    return;
        //}

        //// Remove invalid value
        //this.input
        //  .val("")
        //  .attr("title", value + " didn't match any item")
        //  .tooltip("open");
        //this.element.val("");
        //this._delay(function () {
        //    this.input.tooltip("close").attr("title", "");
        //}, 2500);
        //this.input.autocomplete("instance").term = "";
    }

    //_destroy: function () {
    //    this.wrapper.remove();
    //    this.element.show();
    //}
});

$(".point-from").combobox();
$(".point-to").combobox();


$(document).on("click", ".event-depart", function () {
    if ($(this).attr("data-value")) {
        $(".point-from option[value=" + $(this).attr("data-value") + "]").prop('selected', true);
        $("#departPlacetet").val($(this).attr("data-text"));
        getdatasearch($(".point-from").val(), $(".point-to").val(), 1);
        if ($("#destinationtet").val() == "") {
            $("#destinationtet").trigger("focus");
            $("#destinationtet").trigger("click");
        }
        else {
            $(this).parent().parent().css("display", "none");
        }

    }

})

$(document).on("click", ".event-destination", function () {
    if ($(this).attr("data-value")) {
        $(".point-to option[value=" + $(this).attr("data-value") + "]").prop('selected', true);
        $("#destinationtet").val($(this).attr("data-text"));
        getdatasearch($(".point-from").val(), $(".point-to").val(), 1);
        $(this).parent().parent().css("display", "none");
    }

})

//$(".point-from-popup").combobox();
//$(".point-companies").combobox();
if ($(window).width() > 800) {
    $('#departPlacetet').focus(function () {
        $(this).off("mouseup.a keyup.a");
        $(this).select();

    });

    $('#destinationtet').focus(function () {
        $(this).off("mouseup.a keyup.a");
        $(this).select();
    });

}


function rePos(sfield) {
    var yPos = window.pageYOffset || document.documentElement.scollTop;
    setTimeout(function () { window.scrollTo(0, yPos); }, 0);
}

if ($(window).width() < 768) {
    //$("#test").click(function () {
    //    $("#depart-modal-tet").modal("show");
    //    $("#departPlacetet2").focus();
    //});

    $("#departPlacetet").focus(function () {
        //$("#depart-modal-tet").modal("show");
        $("#departPlacetet2").val($(this).val());
       
    });

    $("#destinationtet").focus(function () {
        //$("#destination-modal-tet").modal("show");
        $("#destinationtet2").val($(this).val());
        $(".input-mobi-to").html($(this).val());
    });

    $('#depart-modal-tet').on('shown.bs.modal', function () {
        setTimeout(function () {
            $("#departPlacetet2").focus();
        }, 200)
    });
    $('#destination-modal-tet').on('shown.bs.modal', function () {
        setTimeout(function () {
            $("#destinationtet2").focus();
        }, 200)
    });

    $(".popular-dep-place-tet").click(function () {
        var fromId = $(this).attr("data-fromid")
        var fromName = $(this).text();
        $("#departPlacetet").val(fromName);
        $(".input-mobi-from").html(fromName);
        $(".point-from option[value=" + fromId + "]").prop('selected', true);
        getdatasearch(fromId, $(".point-to").val(), 1);
        $("#depart-modal-tet").modal("hide");
    });
    $(".popular-des-place-tet").click(function () {
        var toId = $(this).attr("data-toid")
        var toName = $(this).text();
        $("#destinationtet").val(toName);
        $(".input-mobi-to").html(toName);
        $(".point-to option[value=" + toId + "]").prop('selected', true);
        getdatasearch($(".point-from").val(), toId, 1);
        $("#destination-modal-tet").modal("hide");
    });




    var departPlacetet2 = {
        _source: function (request, response) {
            var listdata = [];
            //var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            $(".point-from").children("option").map(function () {
                var text = $(this).text();
                var type = $(this).attr("data-type");
                var data = $(this).val();
                if (text != "") {
                    listdata.push({ label: text, value: text, Category: type, data: data, option: this });
                }
            });

            var term = slug(request.term),
                  ori = request.term,
                  hint = [],
                  exac = [],
                  superexac = [],
                  abbreviates = [];
            $.each(listdata, function (_, el) {
                var cont = slug(el.value),
                    value = el.value,
                    lowerValue = value.toLowerCase();
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

                if (value.indexOf(ori) >= 0) {
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
        }
    };

    var destinationtet2 = {
        _source: function (request, response) {
            var listdata = [];
            //var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            $(".point-to").children("option").map(function () {
                var text = $(this).text();
                var type = $(this).attr("data-type");
                var data = $(this).val();
                if (text != "") {
                    listdata.push({ label: text, value: text, Category: type, data: data, option: this });
                }
            });

            var term = slug(request.term),
                  ori = request.term,
                  hint = [],
                  exac = [],
                  superexac = [],
                  abbreviates = [];
            $.each(listdata, function (_, el) {
                var cont = slug(el.value),
                    value = el.value,
                    lowerValue = value.toLowerCase();
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

                if (value.indexOf(ori) >= 0) {
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

        }
    };

    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            items = items.sort(function (a, b) {
                if (a.Category < b.Category) {
                    return 1;
                }
                if (a.Category > b.Category) {
                    return -1;
                }
                return 0;
            });
            $.each(items, function (index, item) {
                if (item.Category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category' style=font-weight:bold;>" + item.Category + "</li>");
                    currentCategory = item.Category;
                }
                that._renderItemData(ul, item);
            });
        }
    });

    $("#departPlacetet2").catcomplete({
        delay: 0,
        minLength: 0,
        autoFocus: true,
        source: $.proxy(departPlacetet2, "_source"),
        select: function (event, ui) {
            $(".point-from option[value=" + ui.item.data + "]").prop('selected', true);
            getdatasearch(ui.item.data, $(".point-to").val(), 1);
            console.log(ui.item.data);
        }
    });
    $("#departPlacetet2").data("custom-catcomplete")._renderItem = function(ul, item) {
        return $("<li></li>").data("item.autocomplete", item)
            .append("<a class='ui-corner-all depart'>" + item.label + "</a>")
            .appendTo(ul);
    }; 



    $("#destinationtet2").catcomplete({
        delay: 0,
        minLength: 0,
        autoFocus: true,
        source: $.proxy(destinationtet2, "_source"),
        select: function (event, ui) {
            $(".point-to option[value=" + ui.item.data + "]").prop('selected', true);
            getdatasearch($(".point-from").val(), ui.item.data, 1);
            console.log(ui.item.data);
        }
    });
    $("#destinationtet2").data("custom-catcomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item)
            .append("<a class='ui-corner-all destination'>" + item.label + "</a>")
            .appendTo(ul);
    };

    $(document).on("click", "a.depart", function () {
        var toName = $("#departPlacetet2").val();
        $("#departPlacetet").val(toName);
        $(".input-mobi-from").html(toName);
        $("#depart-modal-tet").modal("hide");
    });

    $(document).on("click", "a.destination", function () {
        var toName = $("#destinationtet2").val();
        $("#destinationtet").val(toName);
        $(".input-mobi-to").html(toName);
        $("#destination-modal-tet").modal("hide");
    });
}
$(".input-point-from .close-text").click(function () {
    $("#departPlacetet").val('');
    $(".input-mobi-from").html('');
    $(this).removeClass("displayblock");
    
    $(".point-from option[value='0']").prop('selected', true);
    getdatasearch(0, $(".point-to").val(), 1);
});
$(".input-point-to .close-text").click(function () {
    $("#destinationtet").val('');
    $(".input-mobi-to").html('');
    $(this).removeClass("displayblock");
    $(".point-to option[value='0']").prop('selected', true);
    getdatasearch($(".point-from").val(), 0, 1);
});


$(".input-point-from .custom-combobox-input").attr("placeholder", "Nhập nơi đi");
$(".input-point-to .custom-combobox-input").attr("placeholder", "Nhập nơi đến");
if ($(window).width() < 768) {
    $(".input-point-from .custom-combobox-input").attr("placeholder", "Lọc theo nơi đi");
    $(".input-point-to .custom-combobox-input").attr("placeholder", "Lọc theo nơi đến");
}


$(document).on("click", ".input-point-from .custom-combobox-input", function () {
    $(".input-point-from .custom-combobox-toggle").click();
});
$(document).on("click", ".input-point-to .custom-combobox-input", function () {
    $(".input-point-to .custom-combobox-toggle").click();
});
$(document).on("click", ".input-point-date .custom-combobox-input", function () {
    $(".input-point-date .custom-combobox-toggle").click();
});



$(".click-here").click(function () {
    $("#departPlace").focus();
});

function checkdata() {
    if (($(".point-from").val() != "0")) {
        $(".input-point-from .close-text").addClass("displayblock");
        $(".title-from-to").addClass("displayblock");
        setTimeout(function () {
            $(".form-to-name").html("từ <b>" + $("#departPlacetet").val() + "</b> đi các tỉnh");
        }, 200);


    } else {
        $(".input-point-from .close-text").removeClass("displayblock");
    }

    if (($(".point-to").val() != "0")) {
        $(".input-point-to .close-text").addClass("displayblock");
        $(".title-from-to").addClass("displayblock");
        setTimeout(function () {
            $(".form-to-name").html("từ các tỉnh đến <b>" + $("#destinationtet").val() + "</b>");
        }, 200);
        
    } else {
        $(".input-point-to .close-text").removeClass("displayblock");
    }

    if (($(".point-from").val() != "0") && ($(".point-to").val() != "0")) {
        $(".title-from-to").addClass("displayblock");
        setTimeout(function () {
            $(".form-to-name").html("từ <b>" + $("#departPlacetet").val() + "</b> đến <b>" + $("#destinationtet").val() + "</b>");
        }, 300);
    }
    if (($(".point-from").val() == "0") && ($(".point-to").val() == "0")) {
        $(".title-from-to").removeClass("displayblock");
    }
}



$(document).on("click", ".read-more-trip", function () {
    window.location.href = '/';
    var page = $("#current-page").val();
    if (page == 1) {
        page = 2;
    }
    if ($(window).width() > 800) {
    $(this).parent().remove();
    }

    $.ajax({
        url: "/vi-VN/TetHoliday/GetGetListCompany",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{'from_id': '" + $(".point-from").val() + "','to_id':'" + $(".point-to").val() + "','company_id':'0','page':'" + page + "','data_type_from':'" + $(".point-from option:selected").attr("data-type") + "','data_type_to':'" + $(".point-to option:selected").attr("data-type") + "'}",
        success: function (response) {
            if (response.data == "") {
                $(".read-more-trip").css("display", "none");
            } else {
                $(".read-more-trip").css("display", "block");
            }
            if ($(window).width() < 768) {
                $("ul.list-scrol").append(response.data);

            } else {
                //$("#mCSB_1_container").html(response.data + "<li class='hidden-lg hidden-md'><div class='footer-list-item text-center' style='font-size:16px;font-weight:initial;line-height:20px;width:100%;'>Thời gian còn lại <p id='text-time2'></p></div></li>");
                $("#mCSB_1_container").append(response.data);
                if (response.number_trip>=10) {
                    $("#mCSB_1_container").append("<div class='hidden-xs hidden-sm  display-read-more' style='margin-bottom:10px;margin-top:20px'><div class='read-more-trip'>Xem thêm tuyến đường</div></div>");
                }
            }

            var numMonth = 2;
            var datedefaunt = "01/01/2019";
            if ($(window).width() < 768) {
                numMonth = 1;
                datedefaunt = "02/01/2019";
            }
            $(".selectDates").datepicker({
                constrainInput: true,
                showOn: 'button',
                top: '15px',
                buttonText: 'Mua vé Tết 2019',
                numberOfMonths: numMonth,
                showButtonPanel: true,
                defaultDate: new Date(datedefaunt),
                minDate: new Date(),
                onSelect: function (dateText, inst) {
                    var textdate = dateText.replace('-', '');
                    var url = jQuery(inst.input[0]).attr('data-url') + "#" + textdate.replace('-', '');
                    window.location.href = url;
                },
                beforeShowDay: function (date) {
                    var eventDates = {};
                    var teamp = $(this).closest("li.item").attr("data-date");
                    var arr = teamp.split('|');
                    for (i = 0; i < arr.length - 1; i++) {
                        eventDates[new Date(arr[i])] = new Date(arr[i]);

                    }
                    var highlight = eventDates[date];
                    if (highlight) {
                        return [true, "event", 'Tooltip text'];
                    } else {
                        return [true, '', ''];
                    }
                }
            });

            if ($(window).width() < 800) {
                $('[data-tooltip="tooltip"]').tooltip({ html: true, placement: "bottom" });
                $(".item").click(function (e) {
                    if ($(e.target).is('.item .view-more') || $(e.target).is('.item .hidden-md') || $(e.target).is('.item . hidden-lg')) {
                        return;
                    }
                    $('[data-tooltip="tooltip"]').tooltip('hide');
                });
            }


        },
        error: function () {
            return false;
        }
    });
    $("#current-page").val(Number($("#current-page").val()) + 1);
});







function getdatasearch(from_id, to_id, page) {
    $.ajax({
        url: "/vi-VN/TetHoliday/GetGetListCompany",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{'from_id': '" + from_id + "','to_id':'" + to_id + "','company_id':'0','page':'" + page + "','data_type_from':'" + $(".point-from option:selected").attr("data-type") + "','data_type_to':'" + $(".point-to option:selected").attr("data-type") + "'}",
        success: function (response) {
            if (response.data == "" || response.number_trip < 10) {
                $(".read-more-trip").css("display", "none");
            } else {
                $(".read-more-trip").css("display", "block");
            }
            if (response.number_trip != 0) {

                if ($(window).width() < 768) {
                    $(".list-scrol").html(response.data);

                } else {
                    $("#mCSB_1_container").html(response.data);
                    if (response.number_trip >= 10) {
                        $("#mCSB_1_container").append("<div class='hidden-xs hidden-sm  display-read-more' style='margin-bottom:10px;margin-top:20px'><div class='read-more-trip'>Xem thêm tuyến đường</div></div>");
                    }

                }

                var numMonth = 2;
                var datedefaunt = "01/01/2019";
                if ($(window).width() < 768) {
                    numMonth = 1;
                    datedefaunt = "02/01/2019";
                }
                $(".selectDates").datepicker({
                    constrainInput: true,
                    showOn: 'button',
                    top: '15px',
                    buttonText: 'Mua vé Tết 2019',
                    numberOfMonths: numMonth,
                    showButtonPanel: true,
                    defaultDate: new Date(datedefaunt),
                    minDate: new Date(),
                    onSelect: function (dateText, inst) {
                        var textdate = dateText.replace('-', '');
                        var url = jQuery(inst.input[0]).attr('data-url') + "#" + textdate.replace('-', '');
                        window.location.href = url;
                    },
                    beforeShowDay: function (date) {
                        var eventDates = {};
                        var teamp = $(this).closest("li.item").attr("data-date");
                        var arr = teamp.split('|');
                        for (i = 0; i < arr.length - 1; i++) {
                            eventDates[new Date(arr[i])] = new Date(arr[i]);

                        }
                        var highlight = eventDates[date];
                        if (highlight) {
                            return [true, "event", 'Tooltip text'];
                        } else {
                            return [true, '', ''];
                        }
                    }
                });

                if ($(window).width() < 800) {
                    $('[data-tooltip="tooltip"]').tooltip({ html: true, placement: "bottom" });
                    $(".item").click(function (e) {
                        if ($(e.target).is('.item .view-more') || $(e.target).is('.item .hidden-md') || $(e.target).is('.item . hidden-lg')) {
                            return;
                        }
                        $('[data-tooltip="tooltip"]').tooltip('hide');
                    });
                }


                $(".content-note").css("display", "block");
                $(".title-trip").css("display", "block");
                $(".list-scrol").css("display", "block");
                $(".message-trip").css("display", "none");
            } else {
                if ($(window).width() < 768) {
                    $(".list-scrol").html(response.data);

                } else {
                    $("#mCSB_1_container").html(response.data);
                    if (response.number_trip >= 10) {
                        $("#mCSB_1_container").append("<div class='hidden-xs hidden-sm  display-read-more' style='margin-bottom:10px;margin-top:20px'><div class='read-more-trip'>Xem thêm tuyến đường</div></div>");
                    }
                }
                $(".list-scrol").css("display", "none");
                $(".title-trip").css("display", "none");
                $(".content-note").css("display", "none");
                $(".message-trip").css("display", "block");

            }
            checkdata();
        },
        error: function () {
            return false;
        }
    });
}





//$(".button").hover(function () {
//    if ($(".point-date").val() != "0") {
//        var url = $(this).attr("href").replace("#" + $(".point-date option:selected").attr("data-text"), "")
//        this.setAttribute('href', url + "#" + $(".point-date option:selected").attr("data-text"));
//    }
//});


//// Set the date we're counting down to
//var countDownDate = new Date("Jan 1, 2018 00:00:00").getTime();

//// Update the count down every 1 second
//var x = setInterval(function () {

//    // Get todays date and time
//    var now = new Date().getTime();

//    // Find the distance between now an the count down date
//    var distance = countDownDate - now;

//    // Time calculations for days, hours, minutes and seconds
//    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//    if (days < 10) {
//        days = "0" + days;
//    }
//    if (hours < 10) {
//        hours = "0" + hours;
//    }
//    if (minutes < 10) {
//        minutes = "0" + minutes;
//    }
//    if (seconds < 10) {
//        seconds = "0" + seconds;
//    }
//    // Display the result in the element with id="demo"
//    document.getElementById("text-time").innerHTML = days + " Ngày " + hours + ":"
//    + minutes + ":" + seconds + "";
//    document.getElementById("text-time2").innerHTML = days + " Ngày " + hours + ":"
//  + minutes + ":" + seconds + "";

//    // If the count down is finished, write some text 
//    if (distance < 0) {
//        clearInterval(x);
//        document.getElement("text-time").innerHTML = "EXPIRED";
//    }
//}, 1000);

if ($(window).width() < 800) {
    $('[data-tooltip="tooltip"]').tooltip({ html: true, placement: "bottom" });
    $(".item").click(function (e) {
        if ($(e.target).is('.item .view-more') || $(e.target).is('.item .hidden-md') || $(e.target).is('.item . hidden-lg')) {
            return;
        }
        $('[data-tooltip="tooltip"]').tooltip('hide');
    });
}

var numMonth = 2;
if ($(window).width() < 768) {
    numMonth = 1;
}

function get_default_date() {
    var date = new Date();
    while (!is_valid(date)) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

//$("#departDate2").datepicker();
var numMonth = 2;
var datedefaunt = "01/01/2019";
if ($(window).width() < 768) {
    numMonth = 1;
    datedefaunt = "02/01/2019";
}
$(".selectDates").datepicker({
    constrainInput: true,
    showOn: 'button',
    top: '15px',
    buttonText: 'Mua vé Tết 2019',
    numberOfMonths: numMonth,
    showButtonPanel: true,
    defaultDate: new Date(datedefaunt),
    minDate: new Date(),
    onSelect: function (dateText, inst) {
        var textdate = dateText.replace('-', '');
        var url = jQuery(inst.input[0]).attr('data-url') + "#" + textdate.replace('-', '');
        window.location.href = url;
    },
    beforeShowDay: function (date) {
        var eventDates = {};
        var teamp = $(this).closest("li.item").attr("data-date");
        var arr = teamp.split('|');
        for (i = 0; i < arr.length - 1; i++) {
            eventDates[new Date(arr[i])] = new Date(arr[i]);

        }
        var highlight = eventDates[date];
        if (highlight) {
            return [true, "event", 'Tooltip text'];
        } else {
            return [true, '', ''];
        }
    }

});

$('#myCarousel').carousel({
    interval: 5000
});
$('#myCarousel2').carousel({
    interval: 5000
});

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
                        if ($(input).attr("id") == "departDate") {
                            var departDateOffset = $("#departDate").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 300; //top
                        } else if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 300; //top
                        }
                        else if ($(input).attr("class") == "selectDates hasDatepicker") {
                            var departDateOffset = $(".selectDates").offset();
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 565; //top
                            $.datepicker._pos[0] = $.datepicker._pos[0] - 380;
                        }
                        else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 400; //top
                        }
                    }
                    else {


                        $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                        //$.datepicker._pos[0] = $.datepicker._pos[0] - 200; //left
                        if ($(input).attr("id") == "departDate") {
                            var departDateOffset = $("#departDate").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 50; //top
                        } else if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 50; //top
                        }
                        else if ($(input).attr("class") == "selectDates hasDatepicker") {
                            var departDateOffset = $(".selectDates").offset();
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 435; //top
                            $.datepicker._pos[0] = $.datepicker._pos[0] - 380;
                        }
                        else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 400; //top
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

                    }
                    else {
                        $.datepicker._pos = $.datepicker._findPos(input); //this is the default position
                        //$.datepicker._pos[0] = $.datepicker._pos[0] - 200; //left
                        if ($(input).attr("id") == "departDate") {
                            var departDateOffset = $("#departDate").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 50; //top
                        } else if ($(input).attr("id") == "span-current-date") {
                            var departDateOffset = $("#span-current-date").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 50; //top
                        } else if ($(input).attr("id") == "departDate2") {
                            var departDateOffset = $("#departDate2").offset();
                            $.datepicker._pos[1] = departDateOffset.top + 100; //top
                        }
                        else {
                            $.datepicker._pos[1] = $.datepicker._pos[1] + 445; //top
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

function format1(n, currency) {
    return currency + " " + n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
    });
}
(function ($) {



    function showMenu() {
        $('.header-blue-right-menu-mobile').slideToggle(100, function () {
            $(this).toggleClass("displayblock");
        });
        $('#overlay-layout').slideToggle(100, function () {
            $(this).toggleClass("displayblock");
        });
        $('nav.header-blue').toggleClass('over-lay-fixed');

    }

    $('#overlay-layout').click(function () {
        showMenu();
    })
    $('.menu-action').click(function () {
        showMenu();
    })
    $(window).scroll(function () {
        var sticky = $('#overlay-layout'),
        scroll = $(window).scrollTop();
        if (scroll >= 65) {
            sticky.addClass('mt65');
            $(".filter-mobile-popup").css("margin-top", "-60px");
        }
        else {
            sticky.removeClass('mt65');
            $(".filter-mobile-popup").css("margin-top", "0");
        }
    });
});

