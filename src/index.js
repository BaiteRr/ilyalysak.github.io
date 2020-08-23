import './styles/style.css'
import './styles/main.sass'
import './styles/fonts/ProximaNova.css'
import './styles/fonts/IntroRust.css'
import $ from 'jquery'
import './js/slick.min'

$(document).ready(function(){
    $('.slider').slick({
        arrows: true,
        dots: true
    });
});



