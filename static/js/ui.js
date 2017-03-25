
function lerp(il, i, ih, ol, oh) {
  return ((i - il) / (ih - il)) * (oh - ol) + ol;
}

function clerp(il, i, ih, ol, oh) {
  return lerp(il, Math.max(il, Math.min(ih, i)), ih, ol, oh);
}

var body, header;

var now = new Date();

function parallax() {

  var scroll_px = $(window).scrollTop();

  var scroll = Math.pow(lerp(0, scroll_px, $(window).height() - $('#header').height() * 3, 0, 1), 0.5);

  //if(body.hasClass('hero')) {
  //  $('#hero .message-box').css('transform', 'translateY(' + scroll_px * 0.1 + 'px)');
  //}
  
  if(false) {
    var alpha = clerp(0, Math.pow(scroll, 2), 1, 0, 1).toFixed(2);
    var color = Math.round(clerp(0, Math.pow(scroll, 2), 1, 0, 48));
    
    header.css('box-shadow', [
      '0 -100px 8px 100px rgba(0, 0, 0, ' + alpha * 0.7 + ')',
      '0 -100px 20px 100px rgba(0, 0, 0, ' + alpha * 0.5 + ')'
    ].join(', '));
    
    header.css('background-color', 'rgba('+ color + ', ' + color + ', ' + color + ', ' + scroll + ')');
    header.css('height', clerp(0, scroll, 1, 128, 64));

  } else {
    if(scroll_px > 24) {
      header.removeClass('expanded');
    } else {
      header.addClass('expanded');
    }
  }

  var parallax_offset = scroll_px * 0.5;
  
  //$('html').css('background-position', '0px ' + Math.round(parallax_offset) + 'px');

  $('#background').css('transform', 'translateY(' + -parallax_offset + 'px)');
  
}

function formatAgo() {
  return Array.prototype.slice.call(arguments).join(' ') + ' ago';
}

function calculateElapsed(date) {
  return moment(date).fromNow();
}

function parallaxWrapper() {
  parallax();
  requestAnimationFrame(parallaxWrapper);
}
  
$(document).ready(function() {
  body = $('body');
  header = $('#header');

  setTimeout(function() {
    $('body').addClass('loaded');
  }, 0);

  parallax();
  
  setTimeout(function() {
    parallax();
  }, 0);

  requestAnimationFrame(parallaxWrapper);

  $(window).resize(function(ev) {
    parallax();
  });

  $('a[href*="No page found with path or logical name"]').each(function() {
    $(this).removeAttr('href');
  });
  
  $('time').each(function() {
    var _this = $(this);

    var date = moment(_this.attr('datetime'), "YYYY-MM-DD");

    _this.attr('title', date.format("MMMM Do, YYYY k:mm"));
    
    _this.text(calculateElapsed(date));
  });
  
  // Toggle navigation area

  $('#header .toggle-nav').click(function() {
    $('#header').toggleClass('nav-visible');
  });
  
});
