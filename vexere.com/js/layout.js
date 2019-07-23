function loadCSS(href, before, media) {
  'use strict';
  var ss = window.document.createElement('link');
  var ref = before || window.document.getElementsByTagName('script')[0];
  var sheets = window.document.styleSheets;
  ss.rel = 'stylesheet';
  ss.href = href;
  ss.media = 'only x';
  ref.parentNode.insertBefore(ss, ref);
  function toggleMedia() {
    var defined;
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
        defined = true;
      }
      sg;
    }
    if (defined) {
      ss.media = media || 'all';
    } else {
      setTimeout(toggleMedia);
    }
  }
  toggleMedia();
  setTimeout(function() {
    $('body').removeAttr('style');
  }, 100);

  return ss;
}

var __Header = {
  resize: function() {
    var width = $(window).width();
    if (width <= 991) {
      $('.header-blue-right-menu').hide();
    } else {
      $('.header-blue-right-menu').show();
    }
  },
};
function showMenu() {
  $('.header-blue-right-menu-mobile').slideToggle(300, function() {
    $(this).toggleClass('displayblock');
  });
  $('#overlay-layout').slideToggle(300, function() {
    $(this).toggleClass('displayblock');
  });
  $('nav.header-blue').toggleClass('over-lay-fixed');
}
$(function() {
  $('.header-blue-language').on('click', function() {
    var urlController = $(this).attr('data-href');
    var regex = /(en-US|vi-VN)(.*)/;
    var url = window.location.href.match(regex)
      ? '/' + window.location.href.match(regex)[0]
      : '/';
    urlController = urlController.replace(/url=.*/g, 'url=' + url);

    $.ajax({
      url: urlController,
      type: 'get',
      success: function(response) {
        if (response.redirectUrl.startsWith('/en-US')) {
          ga('send', 'event', 'Header ', 'Click Header', 'Header - US');
        }
        window.location = response.redirectUrl;
      },
      error: function() {
        return false;
      },
    });
  });
  $('#overlay-layout').click(function() {
    showMenu();
  });
  $('.menu-action').click(function() {
    showMenu();
  });

  if ($(window).width() <= 768) {
    $(window).scroll(function() {
      var sticky = $('#overlay-layout'),
        scroll = $(window).scrollTop();
      if (scroll >= 65) {
        sticky.addClass('mt65');
        $('.filter-mobile-popup').css('margin-top', '-60px');
      } else {
        sticky.removeClass('mt65');
        $('.filter-mobile-popup').css('margin-top', '0');
      }
    });
  }

  __Header.resize();
  $('.dropdown-menu li.disabled a').on('click', function() {
    return false;
  });
});

$(window).resize(__Header.resize);
