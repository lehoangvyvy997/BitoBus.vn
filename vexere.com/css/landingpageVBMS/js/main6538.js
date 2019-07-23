$(document).ready(function () {

    //wow.js on scroll animations initialization
    wow = new WOW(
        {
            animateClass: 'animated',
            mobile: false,
            offset: 20
        }
    );
    wow.init();
    
});

var AdminViewModel = function () {
    var self = this;
    self.OperatorName = ko.observable("");
    self.OperatorNameValMessage = ko.observable("");
    self.PhoneNumber = ko.observable("");
    self.PhoneNumberValMessage = ko.observable("");
    self.Email = ko.observable("");
    self.EmailValMessage = ko.observable("");
    self.ContactMessage = ko.observable("");
    self.ContactMessageValMessage = ko.observable("");
    self.IsLoading = ko.observable(false);
    self.ArrCharacter = ko.observableArray(["0","1","2","3","4","5","6","7","8","9","+"]);
    self.ArrPhonePrefix = ko.observableArray([
        "086","088","089","096","097","098","0162","0163","0164","0165","0166","0167","0168","0169","090","093","0120","0121","0122","0126","0128","091","094","0123","0124","0125","0127","0129","092","0188 ","0186","099","0199"
    ]);
    self.InitData = function () {
        self.IsLoading(true);
        self.IsLoading(false);
    }
    self.onChangePhoneNumber = function () {
        if (self.IsLoading() == false) {
            self.IsLoading(true);
            self.PhoneNumberValMessage("");
            var sPhoneNumber = self.PhoneNumber().trim();
            sPhoneNumber = sPhoneNumber.replace(/\s/g, "");

            var isValidCharacter = true;
            for (var i = 0; i < sPhoneNumber.length && isValidCharacter; i++) {
                var containChar = ko.utils.arrayFirst(self.ArrCharacter(), function (c) {
                    return c == sPhoneNumber[i];
                }); 
                if (containChar == null) {
                    isValidCharacter = false;
                }
            }
          
            self.PhoneNumber(sPhoneNumber);

            if (isValidCharacter == false) {
                self.PhoneNumberValMessage("Số điện thoại không hợp lệ.");
            } else if (sPhoneNumber.indexOf("+") > 1) {
                self.PhoneNumberValMessage("Số điện thoại không hợp lệ.");
            }else{
                if (sPhoneNumber.startsWith("+84")) {
                    sPhoneNumber = "0" + sPhoneNumber.substring(3, sPhoneNumber.length);
                } else if (sPhoneNumber.startsWith("084")) {
                    sPhoneNumber = "0" + sPhoneNumber.substring(3, sPhoneNumber.length);
                } else if (sPhoneNumber.startsWith("0084")) {
                    sPhoneNumber = "0" + sPhoneNumber.substring(4, sPhoneNumber.length);
                }
               
                if (sPhoneNumber.length < 10 || sPhoneNumber.length > 14) {
                    self.PhoneNumberValMessage("Số điện thoại không hợp lệ.");
                }
                /*else {
                    var startFilter = ko.utils.arrayFilter(self.ArrPhonePrefix(), function (u) { return sPhoneNumber.startsWith(u); });
                    if (startFilter.length == 0) {
                        self.PhoneNumberValMessage("Số điện thoại không hợp lệ.");
                    }
                }*/
            }

            self.PhoneNumber(sPhoneNumber);
            self.IsLoading(false);
        }
    };
    self.onChangeOperatorName = function () {
        self.OperatorNameValMessage("");
        self.OperatorName(self.OperatorName().trim());
        if (self.OperatorName() == "" || self.OperatorName().length == 1) {
            self.OperatorNameValMessage("Tên hãng xe không hợp lệ");
        }
    };
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    self.onChangeEmail = function () {
        self.EmailValMessage("");
        self.Email(self.Email().trim());
        if (validateEmail(self.Email())==false) {
            self.EmailValMessage("Email không hợp lệ");
        }
    };
    self.onChangeContactMessage = function () {
        self.ContactMessageValMessage("");
        self.ContactMessage(self.ContactMessage().trim());
        if (self.ContactMessage() == "" || self.ContactMessage().length == 1) {
            self.ContactMessageValMessage("Vui lòng nhập nội dung tin nhắn");
        }
    };
    self.submitRegisterForm = function () {
        self.onChangeOperatorName();
        self.onChangePhoneNumber();
        self.onChangeEmail();
        self.onChangeContactMessage();
        if (self.PhoneNumberValMessage() != "" || self.OperatorNameValMessage() != "" || self.EmailValMessage() != "" || self.ContactMessageValMessage() != "") {
            return;
        } else {
            $("#main-contact-form").submit();
        }
    };
};
var mv = new AdminViewModel();
mv.InitData();
ko.applyBindings(mv);