
function lerp(il, i, ih, ol, oh) {
  return ((i - il) / (ih - il)) * (oh - ol) + ol;
}

function clerp(il, i, ih, ol, oh) {
  return lerp(il, Math.max(il, Math.min(ih, i)), ih, ol, oh);
}

var body, header;

function parallax() {

  var scroll_px = $(window).scrollTop();

  var scroll = Math.pow(lerp(0, scroll_px, $(window).height() - $('#header').height() * 3, 0, 1), 0.5);

  if(body.hasClass('hero')) {
    var alpha = clerp(0, Math.pow(scroll, 2), 1, 0, 1).toFixed(2);
    var color = Math.round(clerp(0, Math.pow(scroll, 2), 1, 0, 48));
    
    header.css('box-shadow', [
      '0 -100px 8px 100px rgba(0, 0, 0, ' + alpha * 0.7 + ')',
      '0 -100px 20px 100px rgba(0, 0, 0, ' + alpha * 0.5 + ')'
    ].join(', '));
    
    header.css('background-color', 'rgba('+ color + ', ' + color + ', ' + color + ', ' + scroll + ')');
    header.css('height', clerp(0, scroll, 1, 128, 64));

    $('#hero .message-box').css('transform', 'translateY(' + scroll_px * 0.1 + 'px)');
  } else {
    if(scroll_px > 24) {
      header.removeClass('expanded');
    } else {
      header.addClass('expanded');
    }
  }

  var parallax_offset = scroll_px * 0.5;
  $('html').css('background-position', '0px ' + Math.round(parallax_offset) + 'px');

  $('#hero-background').css('transform', 'translateY(' + parallax_offset + 'px)');
  
}

$(document).ready(function() {
  body = $('body');
  header = $('#header');

  $('body').addClass('loaded');

  parallax();
  
  setTimeout(function() {
    parallax();
  }, 0);
  
  $(window).scroll(function(ev) {
    parallax();
  });
  
  $(window).resize(function(ev) {
    parallax();
  });

  $('a[href*="No page found with path or logical name"]').each(function() {
    $(this).removeAttr('href');
  });
  
  // Toggle navigation area

  $('#header .toggle-nav').click(function() {
    $('#header').toggleClass('nav-visible');
  });
  
});
