"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _http = _interopRequireDefault(require("./configs/http"));

var _store = _interopRequireDefault(require("./store"));

var _router = _interopRequireDefault(require("./router"));

var _auth = _interopRequireDefault(require("./configs/auth"));

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

require("roboto-fontface/css/roboto/roboto-fontface.css");

require("@mdi/font/css/materialdesignicons.css");

var _laravelEcho = _interopRequireDefault(require("laravel-echo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.Pusher = require("pusher-js");
window.Echo = new _laravelEcho["default"]({
  broadcaster: "pusher",
  key: "3e75cdb11c6e10f72397",
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true
});
_vue["default"].config.productionTip = false;
new _vue["default"]({
  el: "#app",
  http: _http["default"],
  store: _store["default"],
  router: _router["default"],
  auth: _auth["default"],
  vuetify: _vuetify["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
});