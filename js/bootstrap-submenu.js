'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-submenu requires jQuery');
}

(function($) {
	function Submenupicker(element) {
		this.$element = $(element);
		this.$menu = this.$element.parent();
		this.$submenus = this.$menu.parent().find('.dropdown-submenu');

		this.init();
	}

	Submenupicker.prototype = {
		init: function() {
			this.$element.on('click.bs.dropdown', this.toggle.bind(this));
			this.$menu.keydown(this.keydown.bind(this));
		},
		toggle: function(event) {
			event.stopPropagation();

			var isActive = this.$menu.hasClass('open');

			this.$submenus.removeClass('open');

			if (!isActive) {
				this.$menu.addClass('open');
			}
		},
		keydown: function(event) {
			// 13: Return, 32: Spacebar

			// Off vertical scrolling
			if (event.keyCode == 32) {
				event.preventDefault();
			}

			if (/^(13|32)$/.test(event.keyCode)) {
				this.toggle();
			}
		}
	};

	$.fn.submenupicker = function() {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.submenu');

			if (!data) {
				new Submenupicker(this);

				$this.data('bs.submenu', true);
			}
		});
	};
}(jQuery));
