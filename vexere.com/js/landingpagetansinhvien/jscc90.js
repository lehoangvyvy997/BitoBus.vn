$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
    var fileIdCounter = 0;

    this.closest(".oj-images").change(function (evt) {

        for (var i = 0; i < evt.target.files.length; i++) {
            fileIdCounter++;
            var file = evt.target.files[i];
            var fileId = sectionIdentifier + fileIdCounter;

            filesToUpload.push({
                id: fileId,
                file: file
            });

            var div = document.createElement("div"), img, imgclose, reader;
            if (typeof FileReader !== "undefined" && ((/image/i).test(file.type) || (/application\/pdf/).test(file.type))) {

                img = document.createElement("img");
                img.style.width = "100%";
                div.appendChild(img);
                
                imgclose = document.createElement("img");
                imgclose.style.width = "100%";
                imgclose.src = "https://storage.googleapis.com/fe-production/images/landingpagetansinhvien/close-big.svg?v=4325";
                imgclose.className = "imgclose";
                imgclose.id = fileId;
                div.appendChild(imgclose);
                div.className = "item-image";
                //thực hiện đọc nội dung file image
                if ((/image/i).test(file.type)) {
                    reader = new FileReader();
                    reader.onload = (function (theImg) {
                        return function (evt) {
                            //hiển thị file image dưới dạng mã hóa base64
                            theImg.src = evt.target.result;
                        };
                    }(img));
                    reader.readAsDataURL(file);
                }
                if ((/application\/pdf/).test(file.type)) {
                    img.src = "https://storage.googleapis.com/fe-production/images/landingpagetansinhvien/adobe-pdf-icon.png?v=1";
                }
               
            }
            document.getElementById("listimages").append(div);

            
            //output.push(a);
        };
        var errorFileSize = "";
        for (var i = 0, len = filesToUpload.length; i < len; i++) {
            var size = parseFloat(filesToUpload[i].file.size / 1024).toFixed(2);
            if (size / 1024 > 2) {
                errorFileSize = "*Lỗi: Dung lượng tệp đăng vượt quá 2MB.";
            }
        }
        if (filesToUpload.length > 8) {
            errorFileSize = "*Lỗi: Vượt quá số lượng tệp tối đa được phép đăng.";
        }

        if (errorFileSize != "") {
            $(".error-file-size").html(errorFileSize);
        } else {
            $(".error-file-size").html("");
        }
        //reset the input to null - nice little chrome bug!
        evt.target.value = null;
    });

    $(document).on("click", ".imgclose", function (e) {
        e.preventDefault();

        var fileId = $(this).attr("id");

        // loop through the files array and check if the name of that file matches FileName
        // and get the index of the match
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id === fileId)
                filesToUpload.splice(i, 1);
        }
        var errorFileSize = "";
        for (var i = 0, len = filesToUpload.length; i < len; i++) {
            var size = parseFloat(filesToUpload[i].file.size / 1024).toFixed(2);
            if (size / 1024 > 2) {
                errorFileSize = "*Lỗi: Dung lượng tệp đăng vượt quá 2MB.";
            }
        }
        if (filesToUpload.length > 8) {
            errorFileSize = "*Lỗi: Vượt quá số lượng tệp tối đa được phép đăng.";
        }

        if (errorFileSize != "") {
            $(".error-file-size").html(errorFileSize);
        } else {
            $(".error-file-size").html("");
        }
        $(this).parent().remove();
    });

    this.clear = function () {
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
                filesToUpload.splice(i, 1);
        }

        $(this).children(".listimages").empty();
    }

    return this;
};

$(document).ready(function () {
    var filesToUpload = [];
    var filesUploader = $(".oj-images").fileUploader(filesToUpload, "file");
    function locdau(str) {
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

    function validatePhoneNumber(phone) {
        if (phone.length < 10)
            return false;
        var re = /^\+?[0-9 ]+$/
        return re.test(phone);
    }
    function validateNumber(number) {
        var re = /^\+?[0-9 ]+$/
        return re.test(number);
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.trim());
    }

    //$(".bt-item button").on("click", function () {
    //    //$(".reset").click();
    //    $(".error-ms").html("");
    //    $("#register input").removeClass("text-box-error");
    //    $("#listimages").html("");
    //    var selectroute = $(this).attr("data-route");
    //    if (selectroute == "" || selectroute == null) {
    //        alert("Bạn hãy click chọn tuyến đường của mình");
    //        return;
    //    }
    //    $(".text-route").val($(this).attr("data-route"));
    //    $(".text-company").val($(this).attr("data-company"));
    //    $("#register").modal({ backdrop: "static" });
    //    if ($(this).attr("data-poor") == "1") {
    //       // $(".poor").html("bắt buộc");
    //        $(".isPoor").val("1");
    //    } else {
    //       // $(".poor").html("ưu tiên xét duyệt");
    //        $(".isPoor").val("0");
    //    }
    //     if ($(window).width() < 500) {
    //        $(".main-content").hide();
    //    }

    //});

    $(".close").click(function () {
        $(".main-content").show();
    });

    //$(".point-from").change(function () {
    //    var value = $(this).val();
    //    $(".list-scrol li").hide().filter(function () {
    //        var data = $(this).attr('data-from');
    //        if ($(".point-to").val() != "") {
    //            if (~locdau(data).indexOf(locdau(value)) & ~locdau($(this).attr('data-to')).indexOf(locdau($(".point-to").val()))) {
    //                return true;
    //            }
    //        } else {
    //            if (~locdau(data).indexOf(locdau(value))) {
    //                return true;
    //            }
    //        }

    //    }).show();
    //});

    //$(".point-to").change(function () {
    //    var value = $(this).val();
    //    $(".list-scrol li").hide().filter(function () {
    //        var data = $(this).attr('data-to');
    //        if ($(".point-from").val() != "") {
    //            if (~locdau(data).indexOf(locdau(value)) & ~locdau($(this).attr('data-from')).indexOf(locdau($(".point-from").val()))) {
    //                return true;
    //            }
    //        } else {
    //            if (~locdau(data).indexOf(locdau(value))) {
    //                return true;
    //            }
    //        }
    //    }).show();
    //});

    $("#register input").click(function () {
        if ($(this).next().html() == "Không được để trống" || $(this).next().html() == "Không đúng định dạng email" || $(this).next().html() == "Không đúng định dạng số điện thoại" || $(this).next().html() == "Không đúng định dạng số") {
            $(this).removeClass("text-box-error");
            $(this).next().html('');
        }
    });

    $(".image-upload").on("touchstart click", function () {
        $(".uploadimages").click();
    });
    
    $("#form-register").submit(function () {
        var isValidate = true;

        if ($("input[name='fullname']").val().length == 0 || $("input[name='fullname']").val() == "Không được để trống") {
            $("input[name='fullname']").addClass("text-box-error");
            $(".error-fullname").html("Không được để trống");
            isValidate = false;

        }
        if ($("input[name='email']").val().length == 0 || $("input[name='email']").val() == "Không được để trống") {
            $("input[name='email']").addClass("text-box-error");
            $(".error-email").html("Không được để trống");
            isValidate = false;

        } else {
            if (!validateEmail($("input[name='email']").val())) {
                $("input[name='email']").addClass("text-box-error");
                $(".error-email").html("Không đúng định dạng email");
                isValidate = false;
            }
        }
        if ($("input[name='phone']").val().length == 0 || $("input[name='phone']").val() == "Không được để trống") {
            $("input[name='phone']").addClass("text-box-error");
            $(".error-phone").html("Không được để trống");
            isValidate = false;
        } else {
            if (!validatePhoneNumber($("input[name='phone']").val())) {
                $("input[name='phone']").addClass("text-box-error");
                $(".error-phone").html("Không đúng định dạng số điện thoại");
                isValidate = false;
            }
        }

        if ($("input[name='cmnd']").val().length == 0 || $("input[name='cmnd']").val() == "Không được để trống") {
            $("input[name='cmnd']").addClass("text-box-error");
            $(".error-cmnd").html("Không được để trống");
            isValidate = false;

        } else {
            if (!validateNumber($("input[name='cmnd']").val())) {
                $("input[name='cmnd']").addClass("text-box-error");
                $(".error-cmnd").html("Không đúng định dạng số");
                isValidate = false;
            }
        }

        if ($("input[name='school']").val().length == 0 || $("input[name='school']").val() == "Không được để trống") {
            $("input[name='school']").addClass("text-box-error");
            $(".error-school").html("Không được để trống");
            isValidate = false;
        }

        var totalFiles = $(".item-image").length;
        var fileLength = 0;
        var errorFileSize = "";
        for (var i = 0, len = filesToUpload.length; i < len; i++) {
            var size = parseFloat(filesToUpload[i].file.size / 1024).toFixed(2);
            if (size / 1024 > 2) {
                errorFileSize = "*Lỗi: Dung lượng tệp đăng vượt quá 2MB.";
            }
        }
        if (filesToUpload.length > 8) {
            errorFileSize = "*Lỗi: Vượt quá số lượng tệp tối đa được phép đăng.";
        }
        $(".error-file-size").html(errorFileSize);
        if (errorFileSize != "") {
            isValidate = false;
        } 
        if (isValidate) {
          
            if (totalFiles != 0) {
                if ($(".bt-check-box")[0].checked === true) {
                    var formData = new FormData(this);
                    for (var i = 0, len = filesToUpload.length; i < len; i++) {
                        formData.append("files", filesToUpload[i].file);
                    }
                    $.ajax({
                        url: "/vi-vn/Support/RegisterTanSinhVien",
                        type: 'POST',
                        data: formData,
                        beforeSend: function () {
                            $(".register-loading").show();
                        },
                        success: function (data) {
                            if (data.status == "1") {
                                $("#register .close").click();
                                $(".main-content").show();
                                $(".reset").click();
                                $("#listimages").html("");
                                filesUploader.clear();
                                $(".bt-thong-bao").click();
                                //$(".modal-body .body-content").html("<strong><img src='https://storage.googleapis.com/fe-production/images/landingpagetansinhvien/Element-6.png'>Đăng ký thành công</strong><div class='content-route mess'><p>Ban tổ chức chương trình “ Vé xe chắp cánh ước mơ giảng đường - 30.000 vé xe rẻ với giá chỉ 10.000đ dành cho Tân sinh viên nhập học 2017” cảm ơn bạn đã hoàn tất việc đăng ký thông tin nhận MÃ GIẢM GIÁ của vé xe giá 10.000 đồng.<p><p>Bạn vui lòng kiểm tra email để xem thông báo và hướng dẫn chi tiết về các bước tiếp theo từ ban tổ chức chương trình.</p><p>Trân trọng,</p></div><strong class='footer-content'><img src='https://storage.googleapis.com/fe-production/images/landingpagetansinhvien/Element-5.png'></strong>");
                            } else {
                                alert(data.mess);
                            }
                        },
                        complete: function () {
                            $(".register-loading").hide();
                        },
                        cache: false,
                        contentType: false,
                        processData: false
                    });

                }
                else {
                    alert("Bạn cần xác nhận đã đọc và đồng ý với thể lệ & quy định của chương trình");
                }
            } else {
                alert("Bạn chưa chọn hình ảnh");
            }
        }
        event.preventDefault();


    });
    if ($(window).width() < 350) {
        $(".item b").each(function (index) {
            if ($(this).html().length > 16) {
                $(this).html($(this).html().substring(0, 16) + "...");
            }
        });
    }
    $("#recaptcha-anchor-label").html("adasd");
    $('[data-tooltip="tooltip"]').tooltip({ html: true, placement: "bottom" });
    $(".item").click(function (e) {
        if ($(e.target).is('.item img') || $(e.target).is('.item b')) {
            return;
        }
        $('[data-tooltip="tooltip"]').tooltip('hide');
    });

    function showMenu() {
        $('.header-blue-right-menu-mobile').slideToggle(300, function () {
            $(this).toggleClass("displayblock");
        });
        $('#overlay-layout').slideToggle(300, function () {
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

