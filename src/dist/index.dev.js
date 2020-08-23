"use strict";

require("./styles/style.css");

require("./styles/main.sass");

require("./styles/fonts/ProximaNova.css");

require("./styles/fonts/IntroRust.css");

var _jquery = _interopRequireDefault(require("jquery"));

require("./js/slick.min");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _jquery["default"])(document).ready(function () {
  (0, _jquery["default"])('.slider').slick({
    arrows: true,
    dots: true
  });
});