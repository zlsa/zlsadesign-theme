
function lerp(il, i, ih, ol, oh) {
  return ((i - il) / (ih - il)) * (oh - ol) + ol;
}

function clerp(il, i, ih, ol, oh) {
  return lerp(il, Math.max(il, Math.min(ih, i)), ih, ol, oh);
}

var body, hero, header;

function parallax(scroll) {

  scroll = clerp(0, scroll, $(window).height() - $('#header').height() * 3, 0, 1);

  var color = clerp(0, Math.pow(scroll, 2), 1, 0, 36);

  color = Math.round(color);

  if(body.hasClass('hero')) {
    header.css('background-color', 'rgba('+ color + ', ' + color + ', ' + color + ', ' + scroll + ')');
    header.css('height', clerp(0, scroll, 1, 128, 64));
    
    var parallax_offset = scroll * $(window).height() * 0.5;
    $('html').css('background-position', '0px ' + Math.round(parallax_offset) + 'px');
  }

  
  //hero.css('transform', 'translateY(-' + parallax_offset + 'px)');

}

$(document).ready(function() {
  body = $('body');
  hero = $('#hero');
  header = $('#header');

  $('body').addClass('loaded');

  parallax($(window).scrollTop());
  
  setTimeout(function() {
    parallax($(window).scrollTop());
  }, 0);
  
  $(window).scroll(function(ev) {
    parallax($(window).scrollTop());
  });
  
});
