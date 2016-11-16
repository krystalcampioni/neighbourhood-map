$(document).ready(function(){
  $('.hamburguer, .tags').click(function(){

    $('.hamburguer').toggleClass('open');
    var hidden = $('.sliding-panel__container');

    if (hidden.hasClass('visible')){
        hidden.animate({"left":"0px"}, "slow").removeClass('visible');
    } else {
        hidden.animate({"left":"220px"}, "slow").addClass('visible');
    }
  });
});
