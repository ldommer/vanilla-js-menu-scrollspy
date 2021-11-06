'use strict';

const MenuScrollspy = function (customSettings) {
    this.settings = this.getSettings(customSettings);

    this.init();
};

MenuScrollspy.prototype = {
    getSettings: function (customSettings) {
        const defaultSettings = {
            classActive: 'active',
            classMenuItem: 'menu-item',
            classSelector: 'js-menu-scrollspy',
            customEvents: [],
            enterViewportThreshold: 'middle',
            fixedMenuSelector: null,
            reInitOnScroll: false,
            updateUrlFragmentOnScroll: true,
        };

        return Object.assign({}, defaultSettings, customSettings);
    },
    init: function () {
        this.sections = this.getSections();
        this.location = this.getLocation();
        this.windowHeight = window.innerHeight;

        this.run();

        this.setEventListener('scroll');
        this.setEventListener('resize');

        if (this.settings.customEvents) {
            this.settings.customEvents.forEach((item, index) => {
                this.setEventListener(item);
            });
        }
    },
    getSections: function () {
        let sections = {};

        for (let $section of document.getElementsByClassName(this.settings.classSelector)) {
            sections[$section.id] = {
                top: $section.offsetTop,
                bottom: $section.offsetTop + $section.offsetHeight,
            };
        }

        return sections;
    },
    getLocation: function () {
        const path = window.location.pathname;
        let location = window.location.origin;

        if (path !== '/') {
            location += path;
        }

        return location;
    },
    run: function () {
        let i;
        const enterViewportThreshold = this.getEnterViewportThreshold(),
            currentScroll = window.pageYOffset;

        for (i in this.sections) {
            let selector;

            if (i.includes('http')) {
                selector = `href="${this.location}#${i}"`;
            } else {
                selector = `href*="${i}"`;
            }

            const $activeMenuItem = document.querySelector(`.${this.settings.classMenuItem}.${this.settings.classActive}`),
                $currentMenuItem = document.querySelector(`.${this.settings.classMenuItem}[${selector}]`);

            if (
                this.sections[i]['top'] - enterViewportThreshold <= currentScroll &&
                this.sections[i]['bottom'] - enterViewportThreshold >= currentScroll
            ) {
                if ($activeMenuItem !== $currentMenuItem) {
                    if ($activeMenuItem !== null) {
                        $activeMenuItem.classList.remove(this.settings.classActive);
                    }

                    $currentMenuItem.classList.add(this.settings.classActive);

                    if (this.settings.updateUrlFragmentOnScroll) {
                        history.replaceState(null, null, `${this.location}#${i}`);
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
    getEnterViewportThreshold: function () {
        switch (this.settings.enterViewportThreshold) {
            case 'top':
                return this.settings.fixedMenuSelector ? document.querySelector(this.settings.fixedMenuSelector).offsetHeight : 0;
            case 'middle':
                return this.windowHeight / 2;
            case 'bottom':
                return this.windowHeight;
        }
    },
    setEventListener: function (type) {
        window.addEventListener(type, (event) => {
            if (type !== 'scroll' || (type === 'scroll' && this.settings.reInitOnScroll)) {
                this.sections = this.getSections();
                this.windowHeight = window.innerHeight;
            }

            this.run();
        }, {passive: true});
    },
};

export default MenuScrollspy;
