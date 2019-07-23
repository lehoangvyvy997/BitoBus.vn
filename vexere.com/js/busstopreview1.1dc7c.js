function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function initReviewBusStopPopup() {
    $(".CheckBoxClass").change(function () {
        if ($(this).is(":checked")) {
            $(this).next("label").addClass("LabelSelected");
        } else {
            $(this).next("label").removeClass("LabelSelected");
        }
    });

    //Rating
    $('.pop-point-rate-item').each(function () {
        var tartg = $(this).attr('data-id');
        $(this).raty({
            scoreName: tartg,
            starOn: 'https://storage.googleapis.com/fe-production/images/pop-ico-rate-on.png',
            starOff: 'https://storage.googleapis.com/fe-production/images/pop-ico-rate-off.png',
            target: '#' + tartg + "Hint",
            //hints: ["Tệ", "Kém", "Trung bình", "Tốt", "Tuyệt vời"],
            hints: ["", "", "", "", ""],
            size: 24
        });
    });

    //Submit
    jQuery('a.btn-danhgia').click(function () {
        var error = false;
        var firstName = jQuery('input#firstName').val();
        var email = jQuery('input#email').val();
        var comment = jQuery('#comment').val();

        var OverallRating = jQuery('input[name=OverallRating]').val();
        var SafetyRating = jQuery('input[name=SafetyRating]').val();
        var ServiceRating = jQuery('input[name=ServiceRating]').val();

        if ("" == firstName) {
            error = true;
            jQuery('input#firstName').parent().find('span.alert-no').show();
            jQuery('input#firstName').parent().find('span.alert-yes').hide();
        } else {
            jQuery('input#firstName').parent().find('span.alert-no').hide();
            jQuery('input#firstName').parent().find('span.alert-yes').show();
        }

        if ("" == email || !validateEmail(email)) {
            error = true;
            jQuery('input#email').parent().find('span.alert-no').show();
            jQuery('input#email').parent().find('span.alert-yes').hide();
        } else {
            jQuery('input#email').parent().find('span.alert-no').hide();
            jQuery('input#email').parent().find('span.alert-yes').show();
        }

        if ("" == comment || comment.length < 100) {
            error = true;
            jQuery('#comment').parent().find('span.alert-no').show();
            jQuery('#comment').parent().find('span.alert-yes').hide();
        } else {
            jQuery('#comment').parent().find('span.alert-no').hide();
            jQuery('#comment').parent().find('span.alert-yes').show();
        }

        if ("" == OverallRating) {
            error = true;
            jQuery('input[name=OverallRating]').parent().parent().find('span.alert-no').show();
            jQuery('input[name=OverallRating]').parent().parent().find('span.alert-yes').hide();
        } else {
            jQuery('input[name=OverallRating]').parent().parent().find('span.alert-no').hide();
            jQuery('input[name=OverallRating]').parent().parent().find('span.alert-yes').show();
        }

        if ("" == SafetyRating) {
            error = true;
            jQuery('input[name=SafetyRating]').parent().parent().find('span.alert-no').show();
            jQuery('input[name=SafetyRating]').parent().parent().find('span.alert-yes').hide();
        } else {
            jQuery('input[name=SafetyRating]').parent().parent().find('span.alert-no').hide();
            jQuery('input[name=SafetyRating]').parent().parent().find('span.alert-yes').show();
        }

        if ("" == ServiceRating) {
            error = true;
            jQuery('input[name=ServiceRating]').parent().parent().find('span.alert-no').show();
            jQuery('input[name=ServiceRating]').parent().parent().find('span.alert-yes').hide();
        } else {
            jQuery('input[name=ServiceRating]').parent().parent().find('span.alert-no').hide();
            jQuery('input[name=ServiceRating]').parent().parent().find('span.alert-yes').show();
        }

        if (false == error) {

            if (document.getElementById('condition').checked != false) {
                //Submit form
                jQuery('#busrating').submit();
            } else {
                alert(Language["PleaseConfirmYourReview"]);
            }
        }

        return false;
    });

    jQuery('.rating-input-item').bind('change', function () {
        var id = jQuery(this).attr('id');

        if (id == "email") {
            if (jQuery(this).val().trim() != "" && validateEmail(jQuery(this).val().trim())) {
                jQuery(this).parent().find('span.alert-no').hide();
                jQuery(this).parent().find('span.alert-yes').show();
            } else {
                jQuery(this).parent().find('span.alert-no').show();
                jQuery(this).parent().find('span.alert-yes').hide();
            }
        } else if (id == "comment") {
            if (jQuery(this).val().trim() != "" && jQuery(this).val().length > 100) {
                jQuery(this).parent().find('span.alert-no').hide();
                jQuery(this).parent().find('span.alert-yes').show();
            } else {
                jQuery(this).parent().find('span.alert-no').show();
                jQuery(this).parent().find('span.alert-yes').hide();
            }
        } else {
            if (jQuery(this).val().trim() != "") {
                jQuery(this).parent().find('span.alert-no').hide();
                jQuery(this).parent().find('span.alert-yes').show();
            } else {
                jQuery(this).parent().find('span.alert-no').show();
                jQuery(this).parent().find('span.alert-yes').hide();
            }
        }
    });

    jQuery('.pop-point-rate input[type=hidden]').bind('change', function () {
        alert(jQuery(this).val());
        if (jQuery(this).val() != "") {
            jQuery(this).parent().parent().find('span.alert-no').hide();
            jQuery(this).parent().parent().find('span.alert-yes').show();
        }
    });

}