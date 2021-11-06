# Vanilla JS Menu Scrollspy

Vanilla JS Menu Scrollspy is a script that tracks website scrolling and automatically marks and unmarks menu links of
website sections according to the current scrolling position.

## Bundles

Inside the `dist` folder you will find four different bundles:

| Filename                   | Module Type                                                   |
| -------------------------- | ------------------------------------------------------------- |
| menu-scrollspy.amd.min.js  | AMD <small>(Asynchronous Module Definition)</small>           |
| menu-scrollspy.esm.min.js  | ES Module <small>(ES6 Module)</small>                         |
| menu-scrollspy.iife.min.js | IIFE <small>(Immediately Invoked Function Expression)</small> |
| menu-scrollspy.min.js      | UMD <small>(Universal Module Definition)</small>              |

## Installation

### Via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vanilla-js-menu-scrollspy@latest/dist/menu-scrollspy.min.js"></script>
```

### Via Downloading / Self-Hosting:

```html
<script src="/js/menu-scrollspy.min.js"></script>
```

### Via npm:

```bash
npm i vanilla-js-menu-scrollspy --save-dev
```

```javascript
import MenuScrollspy from 'vanilla-js-menu-scrollspy';
```

## Usage

Include the script via CDN, downloading / self-hosting or install the package via npm and import the script as module.

Invoke the script after the DOM has been fully loaded ...

... with Vanilla JavaScript:

```javascript
window.addEventListener('load', (event) => {
    const menuScrollspy = new MenuScrollspy();
}, {passive: true});
```

... with jQuery:

```javascript
$(document).ready(function () {
    const menuScrollspy = new MenuScrollspy();
});
```

Add some styling with SCSS:

```scss
$accent: #64b5f6;

.menu-item {
  transition: color 0.25s ease-in-out;

  &:hover,
  &.active {
    color: $accent;
  }

  // also add styling for included icons / SVGs
}
```

Set custom config / options when needed.

## API / Config / Options

You can pass an object with the following config / options to the `new MenuScrollspy();` constructor to change the
default behaviour of the script:

```javascript
const menuScrollspy = new MenuScrollspy({
    // config / options
});
```

| Name                      | Meaning                                                                                                                                 | Default&nbsp;Value              | Example&nbsp;value(s)                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------- |
| classActive               | The class applied to the active menu link.                                                                                              | 'active'                        | 'class&#8209;name'                                        |
| classMenuItem             | The class by which menu items are identified.                                                                                           | 'menu&#8209;item'               | 'class&#8209;name'                                        |
| classSelector             | The class by which website sections are registered.                                                                                     | 'js&#8209;menu&#8209;scrollspy' | 'class&#8209;name'                                        |
| customEvents              | Events that should re-init the script (resize is already provided).                                                                     | []                              | ['hyphenopoly&#8209;done',&nbsp;'lazyloading&#8209;done'] |
| enterViewportThreshold    | The viewport line which website sections need to enter or leave to mark and unmark menu links.                                          | 'middle'                        | 'top'&#124;'middle'&#124;'bottom'                         |
| fixedMenuSelector         | Valid selector for document.querySelector() to get the height of a fixed menu and use it in the viewport threshold calculation.         | null                            | '#nav'                                                    |
| reInitOnScroll            | If scrolling should re-init the script (for example lazy loading content like images without placeholders changing the website height). | false                           | true&#124;false                                           |
| updateUrlFragmentOnScroll | If scrolling should update the URL fragment (and the browser history).                                                                  | true                            | true&#124;false                                           |

## Demo

<a href="https://www.lennart-dommer.de" target="_blank" title="Webentwicklung & Webdesign Osnabrück | Lennart Dommer">
Check out</a> the Vanilla JS Menu Scrollspy script in action.

## License

The Vanilla JS Menu Scrollspy package is open-sourced software licensed under
the [MIT license](http://opensource.org/licenses/MIT).
