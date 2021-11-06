define((function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var MenuScrollspy = function MenuScrollspy(customSettings) {
    this.settings = this.getSettings(customSettings);
    this.init();
  };

  MenuScrollspy.prototype = {
    getSettings: function getSettings(customSettings) {
      var defaultSettings = {
        classActive: 'active',
        classMenuItem: 'menu-item',
        classSelector: 'js-menu-scrollspy',
        customEvents: [],
        enterViewportThreshold: 'middle',
        fixedMenuSelector: null,
        reInitOnScroll: false,
        updateUrlFragmentOnScroll: true
      };
      return _extends({}, defaultSettings, customSettings);
    },
    init: function init() {
      var _this = this;

      this.sections = this.getSections();
      this.location = this.getLocation();
      this.windowHeight = window.innerHeight;
      this.run();
      this.setEventListener('scroll');
      this.setEventListener('resize');

      if (this.settings.customEvents) {
        this.settings.customEvents.forEach(function (item, index) {
          _this.setEventListener(item);
        });
      }
    },
    getSections: function getSections() {
      var sections = {};

      for (var _i2 = 0, _document$getElements2 = document.getElementsByClassName(this.settings.classSelector); _i2 < _document$getElements2.length; _i2++) {
        var $section = _document$getElements2[_i2];
        sections[$section.id] = {
          top: $section.offsetTop,
          bottom: $section.offsetTop + $section.offsetHeight
        };
      }

      return sections;
    },
    getLocation: function getLocation() {
      var path = window.location.pathname;
      var location = window.location.origin;

      if (path !== '/') {
        location += path;
      }

      return location;
    },
    run: function run() {
      var i;
      var enterViewportThreshold = this.getEnterViewportThreshold(),
          currentScroll = window.pageYOffset;

      for (i in this.sections) {
        var selector = void 0;

        if (i.includes('http')) {
          selector = "href=\"".concat(this.location, "#").concat(i, "\"");
        } else {
          selector = "href*=\"".concat(i, "\"");
        }

        var $activeMenuItem = document.querySelector(".".concat(this.settings.classMenuItem, ".").concat(this.settings.classActive)),
            $currentMenuItem = document.querySelector(".".concat(this.settings.classMenuItem, "[").concat(selector, "]"));

        if (this.sections[i]['top'] - enterViewportThreshold <= currentScroll && this.sections[i]['bottom'] - enterViewportThreshold >= currentScroll) {
          if ($activeMenuItem !== $currentMenuItem) {
            if ($activeMenuItem !== null) {
              $activeMenuItem.classList.remove(this.settings.classActive);
            }

            $currentMenuItem.classList.add(this.settings.classActive);

            if (this.settings.updateUrlFragmentOnScroll) {
              history.replaceState(null, null, "".concat(this.location, "#").concat(i));
            }
          }
        } else {
          if ($activeMenuItem === $currentMenuItem) {
            $currentMenuItem.classList.remove(this.settings.classActive);

            if (this.settings.updateUrlFragmentOnScroll) {
              history.replaceState(null, null, this.location);
            }
          }
        }
      }
    },
    getEnterViewportThreshold: function getEnterViewportThreshold() {
      switch (this.settings.enterViewportThreshold) {
        case 'top':
          return this.settings.fixedMenuSelector ? document.querySelector(this.settings.fixedMenuSelector).offsetHeight : 0;

        case 'middle':
          return this.windowHeight / 2;

        case 'bottom':
          return this.windowHeight;
      }
    },
    setEventListener: function setEventListener(type) {
      var _this2 = this;

      window.addEventListener(type, function (event) {
        if (type !== 'scroll' || type === 'scroll' && _this2.settings.reInitOnScroll) {
          _this2.sections = _this2.getSections();
          _this2.windowHeight = window.innerHeight;
        }

        _this2.run();
      }, {
        passive: true
      });
    }
  };

  return MenuScrollspy;

}));
