/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
var breakpoints = function () { "use strict"; function e(e) { t.init(e) } var t = { list: null, media: {}, events: [], init: function (e) { t.list = e, window.addEventListener("resize", t.poll), window.addEventListener("orientationchange", t.poll), window.addEventListener("load", t.poll), window.addEventListener("fullscreenchange", t.poll) }, active: function (e) { var n, a, s, i, r, d, c; if (!(e in t.media)) { if (">=" == e.substr(0, 2) ? (a = "gte", n = e.substr(2)) : "<=" == e.substr(0, 2) ? (a = "lte", n = e.substr(2)) : ">" == e.substr(0, 1) ? (a = "gt", n = e.substr(1)) : "<" == e.substr(0, 1) ? (a = "lt", n = e.substr(1)) : "!" == e.substr(0, 1) ? (a = "not", n = e.substr(1)) : (a = "eq", n = e), n && n in t.list) if (i = t.list[n], Array.isArray(i)) { if (r = parseInt(i[0]), d = parseInt(i[1]), isNaN(r)) { if (isNaN(d)) return; c = i[1].substr(String(d).length) } else c = i[0].substr(String(r).length); if (isNaN(r)) switch (a) { case "gte": s = "screen"; break; case "lte": s = "screen and (max-width: " + d + c + ")"; break; case "gt": s = "screen and (min-width: " + (d + 1) + c + ")"; break; case "lt": s = "screen and (max-width: -1px)"; break; case "not": s = "screen and (min-width: " + (d + 1) + c + ")"; break; default: s = "screen and (max-width: " + d + c + ")" } else if (isNaN(d)) switch (a) { case "gte": s = "screen and (min-width: " + r + c + ")"; break; case "lte": s = "screen"; break; case "gt": s = "screen and (max-width: -1px)"; break; case "lt": s = "screen and (max-width: " + (r - 1) + c + ")"; break; case "not": s = "screen and (max-width: " + (r - 1) + c + ")"; break; default: s = "screen and (min-width: " + r + c + ")" } else switch (a) { case "gte": s = "screen and (min-width: " + r + c + ")"; break; case "lte": s = "screen and (max-width: " + d + c + ")"; break; case "gt": s = "screen and (min-width: " + (d + 1) + c + ")"; break; case "lt": s = "screen and (max-width: " + (r - 1) + c + ")"; break; case "not": s = "screen and (max-width: " + (r - 1) + c + "), screen and (min-width: " + (d + 1) + c + ")"; break; default: s = "screen and (min-width: " + r + c + ") and (max-width: " + d + c + ")" } } else s = "(" == i.charAt(0) ? "screen and " + i : i; t.media[e] = !!s && s } return t.media[e] !== !1 && window.matchMedia(t.media[e]).matches }, on: function (e, n) { t.events.push({ query: e, handler: n, state: !1 }), t.active(e) && n() }, poll: function () { var e, n; for (e = 0; e < t.events.length; e++)n = t.events[e], t.active(n.query) ? n.state || (n.state = !0, n.handler()) : n.state && (n.state = !1) } }; return e._ = t, e.on = function (e, n) { t.on(e, n) }, e.active = function (e) { return t.active(e) }, e }(); !function (e, t) { "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.breakpoints = t() }(this, function () { return breakpoints });
$("#main").ready(function () {

(function ($) {



	var $window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');



	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});
	// Menu.
	$menu
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

	// Search (header).
	var $search = $('#search'),
		$search_input = $search.find('input');

	$body
		.on('click', '[href="#search"]', function (event) {

			event.preventDefault();

			// Not visible?
			if (!$search.hasClass('visible')) {

				// Reset form.
				$search[0].reset();

				// Show.
				$search.addClass('visible');

				// Focus input.
				$search_input.focus();

			}

		});

	$search_input
		.on('keydown', function (event) {

			if (event.keyCode == 27)
				$search_input.blur();

		})
		.on('blur', function () {
			window.setTimeout(function () {
				$search.removeClass('visible');
			}, 100);
		});

	// Intro.
	var $intro = $('#intro');

		// Breakpoints.
		breakpoints({
			xlarge: ['1281px', '1680px'],
			large: ['981px', '1280px'],
			medium: ['737px', '980px'],
			small: ['481px', '736px'],
			xsmall: [null, '480px']
		});
		// Move to main on <=large, back to sidebar on >large.
		breakpoints.on('<=large', function () {
			$intro.prependTo($main);
		});

		breakpoints.on('>large', function () {
			$intro.prependTo($sidebar);
		});

})(jQuery);

});