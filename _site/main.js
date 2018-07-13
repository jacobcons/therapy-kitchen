(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

class Fetch {
  async get(url) {
    return await (await fetch(url)).json();
  }

  async post(url, data) {
    return await (await fetch(url, {
      method: 'POST',
      body: data
    })).json();
  }
}

module.exports = new Fetch();

},{}],2:[function(require,module,exports){
'use strict';

var _tinySlider = require('../node_modules/tiny-slider/src/tiny-slider.module');

var _Fetch = require('./Fetch.js');

var _Fetch2 = _interopRequireDefault(_Fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', async () => {
	document.querySelector('.hamburger-menu').addEventListener('click', () => {
		document.querySelector('.hamburger-menu').classList.toggle('hamburger-menu--is-active');
	});

	if (window.location.pathname === '/') {} else if (window.location.pathname === '/services/kitchen-therapy.html' || window.location.pathname === '/services/cookery.html') {
		const slider = (0, _tinySlider.tns)({
			container: '.js-slider-triples',
			items: 1,
			nav: false,
			autoplayButtonOutput: false,
			controlsText: [`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
			</svg>`, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			</svg>`],
			lazyload: true,
			gutter: 8,
			responsive: {
				592: {
					fixedWidth: 592
				}
			}
		});
	} else if (window.location.pathname === '/contact.html') {
		const elTextInputs = document.querySelectorAll('.js-text-input');
		elTextInputs.forEach(input => {
			input.addEventListener('focus', () => input.parentElement.classList.add('input-field--active'));
			input.addEventListener('blur', () => {
				if (!input.value) input.parentElement.classList.remove('input-field--active');
			});
		});

		const elSendBtn = document.querySelector('.js-send-btn');
		elSendBtn.addEventListener('click', async e => {
			e.preventDefault();
			const elForm = document.querySelector('.js-contact-form');
			const elRequiredInputs = document.querySelectorAll('.js-required-input');
			const elEmailInput = document.querySelector('input[name="email"]');
			const elErrors = document.querySelectorAll('.js-input-error');

			elErrors.forEach(error => error.remove());

			let errors = {};
			if (!/.+@.+/.test(elEmailInput.value)) {
				errors.email = {
					text: 'Please enter a valid email',
					input: elEmailInput
				};
			}
			elRequiredInputs.forEach(input => {
				if (!input.value) {
					errors[input.name] = {
						text: 'Please fill out the required field',
						input
					};
				}
			});

			const errorNames = Object.keys(errors);
			if (errorNames.length === 0) {
				const queryString = new URLSearchParams(new FormData(elForm)).toString();
				const res = await _Fetch2.default.get(`${elForm.getAttribute('action')}&${queryString}`);
				if (res.success) {
					document.body.insertAdjacentHTML('beforeend', `
					<div class="modal">
						<div class="modal__inner">
							<span>Thank you for your email :)</span>
							<span class="modal__close">X</span>
						</div>
					</div>`);
				}
				const elModal = document.querySelector('.modal');
				const elModalInner = document.querySelector('.modal__inner');
				const elModalClose = document.querySelector('.modal__close');
				elModal.addEventListener('click', e => {
					if (e.target !== elModalInner) elModal.remove();
				});
				elModalClose.addEventListener('click', () => elModal.remove());
			} else {
				errorNames.forEach(name => errors[name].input.insertAdjacentHTML('afterend', `<span class="input-field__error js-input-error">${errors[name].text}</span>`));
			}
		});
	}
});

},{"../node_modules/tiny-slider/src/tiny-slider.module":45,"./Fetch.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCSSRule = addCSSRule;

var _raf = require('./raf');

function addCSSRule(sheet, selector, rules, index) {
  // return raf(function() {
  'insertRule' in sheet ? sheet.insertRule(selector + '{' + rules + '}', index) : sheet.addRule(selector, rules, index);
  // });
} // cross browsers addRule method

},{"./raf":32}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = undefined;

var _hasClass = require('./hasClass');

var addClass = _hasClass.classListSupport ? function (el, str) {
  if (!(0, _hasClass.hasClass)(el, str)) {
    el.classList.add(str);
  }
} : function (el, str) {
  if (!(0, _hasClass.hasClass)(el, str)) {
    el.className += ' ' + str;
  }
};

exports.addClass = addClass;

},{"./hasClass":24}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEvents = addEvents;

var _passiveOption = require('./passiveOption');

function addEvents(el, obj) {
  for (var prop in obj) {
    var option = prop === 'touchstart' || prop === 'touchmove' ? _passiveOption.passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

},{"./passiveOption":31}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayFromNodeList = arrayFromNodeList;
function arrayFromNodeList(nl) {
  var arr = [];
  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }
  return arr;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;

var caf = exports.caf = win.cancelAnimationFrame || win.mozCancelAnimationFrame || function (id) {
  clearTimeout(id);
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calc = calc;

require('./childNode.remove');

var _getBody = require('./getBody');

var _setFakeBody = require('./setFakeBody');

var _resetFakeBody = require('./resetFakeBody');

// get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc(); 
function calc() {
  var doc = document,
      body = (0, _getBody.getBody)(),
      docOverflow = (0, _setFakeBody.setFakeBody)(body),
      div = doc.createElement('div'),
      result = false;

  body.appendChild(div);
  try {
    var vals = ['calc(10px)', '-moz-calc(10px)', '-webkit-calc(10px)'],
        val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 10) {
        result = val.replace('(10px)', '');
        break;
      }
    }
  } catch (e) {}

  body.fake ? (0, _resetFakeBody.resetFakeBody)(body, docOverflow) : div.remove();

  return result;
}

},{"./childNode.remove":10,"./getBody":18,"./resetFakeBody":37,"./setFakeBody":39}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkStorageValue = checkStorageValue;
function checkStorageValue(value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}

},{}],10:[function(require,module,exports){
"use strict";

// ChildNode.remove
(function () {
  "use strict";

  if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
})();

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classListSupport = exports.classListSupport = 'classList' in document.createElement('_');

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStyleSheet = createStyleSheet;
// create and append style sheet
function createStyleSheet(media) {
  // Create the <style> tag
  var style = document.createElement("style");
  // style.setAttribute("type", "text/css");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")
  if (media) {
    style.setAttribute("media", media);
  }

  // WebKit hack :(
  // style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.querySelector('head').appendChild(style);

  return style.sheet ? style.sheet : style.styleSheet;
};

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docElement = exports.docElement = document.documentElement;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = Events;
function Events() {
  return {
    topics: {},
    on: function on(eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function off(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function emit(eventName, data) {
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function (fn) {
          fn(data);
        });
      }
    }
  };
};

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
function extend() {
  var obj,
      name,
      copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachNodeList = forEachNodeList;
// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEachNodeList(arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttr = getAttr;
function getAttr(el, attr) {
  return el.getAttribute(attr);
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBody = getBody;
function getBody() {
  var doc = document,
      body = doc.body;

  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }

  return body;
}

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCssRulesLength = getCssRulesLength;
function getCssRulesLength(sheet) {
  var rule = 'insertRule' in sheet ? sheet.cssRules : sheet.rules;
  return rule.length;
}

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEndProperty = getEndProperty;
// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSlideId = getSlideId;
function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;

  return 'tns' + window.tnsId;
}

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTouchDirection = getTouchDirection;
function getTouchDirection(angle, range) {
  var direction = false,
      gap = Math.abs(90 - Math.abs(angle));

  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }

  return direction;
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasAttr = hasAttr;
function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = exports.classListSupport = undefined;

var _classListSupport = require('./classListSupport');

var hasClass = _classListSupport.classListSupport ? function (el, str) {
    return el.classList.contains(str);
} : function (el, str) {
    return el.className.indexOf(str) >= 0;
};

exports.classListSupport = _classListSupport.classListSupport;
exports.hasClass = hasClass;

},{"./classListSupport":11}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideElement = hideElement;

var _hasAttr = require('./hasAttr');

var _setAttrs = require('./setAttrs');

function hideElement(el) {
  if (!(0, _hasAttr.hasAttr)(el, 'hidden')) {
    (0, _setAttrs.setAttrs)(el, { 'hidden': '' });
  }
}

},{"./hasAttr":23,"./setAttrs":38}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNodeList = isNodeList;
function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined";
}

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVisible = isVisible;
function isVisible(el) {
  return el.offsetWidth > 0 && el.offsetHeight > 0;
}

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsTransform = jsTransform;
function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = to.indexOf('%') >= 0 ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick,
      running;

  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) {
      setTimeout(moveElement, tick);
    } else {
      callback();
    }
  }
}

},{}],29:[function(require,module,exports){
"use strict";

// keys
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mediaquerySupport = mediaquerySupport;

require('./childNode.remove');

var _getBody = require('./getBody');

var _setFakeBody = require('./setFakeBody');

var _resetFakeBody = require('./resetFakeBody');

function mediaquerySupport() {
  var doc = document,
      body = (0, _getBody.getBody)(),
      docOverflow = (0, _setFakeBody.setFakeBody)(body),
      div = doc.createElement('div'),
      style = doc.createElement('style'),
      rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
      position;

  style.type = 'text/css';
  div.className = 'tns-mq-test';

  body.appendChild(style);
  body.appendChild(div);

  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(doc.createTextNode(rule));
  }

  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];

  body.fake ? (0, _resetFakeBody.resetFakeBody)(body, docOverflow) : div.remove();

  return position === "absolute";
}

},{"./childNode.remove":10,"./getBody":18,"./resetFakeBody":37,"./setFakeBody":39}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = exports.passiveOption = supportsPassive ? { passive: true } : false;

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;

var raf = exports.raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.msRequestAnimationFrame || function (cb) {
  return setTimeout(cb, 16);
};

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAttrs = removeAttrs;

var _isNodeList = require("./isNodeList");

function removeAttrs(els, attrs) {
  els = (0, _isNodeList.isNodeList)(els) || els instanceof Array ? els : [els];
  attrs = attrs instanceof Array ? attrs : [attrs];

  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

},{"./isNodeList":26}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeClass = undefined;

var _hasClass = require('./hasClass');

var removeClass = _hasClass.classListSupport ? function (el, str) {
  if ((0, _hasClass.hasClass)(el, str)) {
    el.classList.remove(str);
  }
} : function (el, str) {
  if ((0, _hasClass.hasClass)(el, str)) {
    el.className = el.className.replace(str, '');
  }
};

exports.removeClass = removeClass;

},{"./hasClass":24}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeElementStyles = removeElementStyles;
function removeElementStyles(el) {
  el.style.cssText = '';
}

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEvents = removeEvents;

var _passiveOption = require('./passiveOption');

function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? _passiveOption.passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

},{"./passiveOption":31}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetFakeBody = resetFakeBody;

require('./childNode.remove');

var _docElement = require('./docElement');

function resetFakeBody(body, docOverflow) {
  if (body.fake) {
    body.remove();
    _docElement.docElement.style.overflow = docOverflow;
    // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line
    _docElement.docElement.offsetHeight;
  }
}

},{"./childNode.remove":10,"./docElement":13}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttrs = setAttrs;

var _isNodeList = require("./isNodeList");

function setAttrs(els, attrs) {
  els = (0, _isNodeList.isNodeList)(els) || els instanceof Array ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') {
    return;
  }

  for (var i = els.length; i--;) {
    for (var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

},{"./isNodeList":26}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFakeBody = setFakeBody;

var _docElement = require('./docElement');

function setFakeBody(body) {
  var docOverflow = '';
  if (body.fake) {
    docOverflow = _docElement.docElement.style.overflow;
    //avoid crashing IE8, if background image is used
    body.style.background = '';
    //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
    body.style.overflow = _docElement.docElement.style.overflow = 'hidden';
    _docElement.docElement.appendChild(body);
  }

  return docOverflow;
}

},{"./docElement":13}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocalStorage = setLocalStorage;
function setLocalStorage(key, value, access) {
  if (access) {
    localStorage.setItem(key, value);
  }
  return value;
}

},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showElement = showElement;

var _hasAttr = require('./hasAttr');

var _removeAttrs = require('./removeAttrs');

function showElement(el) {
  if ((0, _hasAttr.hasAttr)(el, 'hidden')) {
    (0, _removeAttrs.removeAttrs)(el, 'hidden');
  }
}

},{"./hasAttr":23,"./removeAttrs":33}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subpixelLayout = subpixelLayout;

require('./childNode.remove');

var _getBody = require('./getBody');

var _setFakeBody = require('./setFakeBody');

var _resetFakeBody = require('./resetFakeBody');

// get subpixel support value
// @return - boolean
function subpixelLayout() {
    var doc = document,
        body = (0, _getBody.getBody)(),
        docOverflow = (0, _setFakeBody.setFakeBody)(body),
        parent = doc.createElement('div'),
        child1 = doc.createElement('div'),
        child2,
        supported;

    parent.style.cssText = 'width: 10px';
    child1.style.cssText = 'float: left; width: 5.5px; height: 10px;';
    child2 = child1.cloneNode(true);

    parent.appendChild(child1);
    parent.appendChild(child2);
    body.appendChild(parent);

    supported = child1.offsetTop !== child2.offsetTop;

    body.fake ? (0, _resetFakeBody.resetFakeBody)(body, docOverflow) : parent.remove();

    return supported;
}

},{"./childNode.remove":10,"./getBody":18,"./resetFakeBody":37,"./setFakeBody":39}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDegree = toDegree;
function toDegree(y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whichProperty = whichProperty;
function whichProperty(props) {
  var el = document.createElement('fakeelement'),
      len = props.length;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (el.style[prop] !== undefined) {
      return prop;
    }
  }

  return false; // explicit for ie9-
}

},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tns = undefined;

require('./helpers/keys');

require('./helpers/childNode.remove');

var _raf = require('./helpers/raf');

var _caf = require('./helpers/caf');

var _extend = require('./helpers/extend');

var _checkStorageValue = require('./helpers/checkStorageValue');

var _setLocalStorage = require('./helpers/setLocalStorage');

var _getSlideId = require('./helpers/getSlideId');

var _calc = require('./helpers/calc');

var _subpixelLayout = require('./helpers/subpixelLayout');

var _mediaquerySupport = require('./helpers/mediaquerySupport');

var _createStyleSheet = require('./helpers/createStyleSheet');

var _addCSSRule = require('./helpers/addCSSRule');

var _getCssRulesLength = require('./helpers/getCssRulesLength');

var _toDegree = require('./helpers/toDegree');

var _getTouchDirection = require('./helpers/getTouchDirection');

var _forEachNodeList = require('./helpers/forEachNodeList');

var _hasClass = require('./helpers/hasClass');

var _addClass = require('./helpers/addClass');

var _removeClass = require('./helpers/removeClass');

var _hasAttr = require('./helpers/hasAttr');

var _getAttr = require('./helpers/getAttr');

var _setAttrs = require('./helpers/setAttrs');

var _removeAttrs = require('./helpers/removeAttrs');

var _removeElementStyles = require('./helpers/removeElementStyles');

var _arrayFromNodeList = require('./helpers/arrayFromNodeList');

var _hideElement = require('./helpers/hideElement');

var _showElement = require('./helpers/showElement');

var _isVisible = require('./helpers/isVisible');

var _whichProperty = require('./helpers/whichProperty');

var _getEndProperty = require('./helpers/getEndProperty');

var _addEvents = require('./helpers/addEvents');

var _removeEvents = require('./helpers/removeEvents');

var _events = require('./helpers/events');

var _jsTransform = require('./helpers/jsTransform');

// check browser version and local storage
// if browser upgraded, 
// 1. delete browser ralated data from local storage and 
// 2. recheck these options and save them to local storage
var browserInfo = navigator.userAgent,
    localStorageAccess = true,
    tnsStorage = {};

// tC => calc
// tSP => subpixel
// tMQ => mediaquery
// tTf => transform
// tTDu => transitionDuration
// tTDe => transitionDelay
// tADu => animationDuration
// tADe => animationDelay
// tTE => transitionEnd
// tAE => animationEnd
// Format: ES MODULE
// Version: 2.7.1

// helper functions
try {
  tnsStorage = localStorage;
  // remove storage when browser version changes
  if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
    ['tC', 'tSP', 'tMQ', 'tTf', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function (item) {
      tnsStorage.removeItem(item);
    });
  }
  // update browserInfo
  tnsStorage['tnsApp'] = browserInfo;
} catch (e) {
  localStorageAccess = false;
}

// reset tnsStorage when localStorage is null (on some versions of Chrome Mobile #134)
// https://stackoverflow.com/questions/8701015/html-localstorage-is-null-on-android-when-using-webview
if (localStorageAccess && !localStorage) {
  tnsStorage = {};
}

// get browser related data from local storage if they exist
// otherwise, run the functions again and save these data to local storage
// checkStorageValue() convert non-string value to its original value: 'true' > true
var doc = document,
    win = window,
    KEYS = {
  ENTER: 13,
  SPACE: 32,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
},
    CALC = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tC']) || (0, _setLocalStorage.setLocalStorage)('tC', (0, _calc.calc)(), localStorageAccess),
    SUBPIXEL = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tSP']) || (0, _setLocalStorage.setLocalStorage)('tSP', (0, _subpixelLayout.subpixelLayout)(), localStorageAccess),
    CSSMQ = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tMQ']) || (0, _setLocalStorage.setLocalStorage)('tMQ', (0, _mediaquerySupport.mediaquerySupport)(), localStorageAccess),
    TRANSFORM = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tTf']) || (0, _setLocalStorage.setLocalStorage)('tTf', (0, _whichProperty.whichProperty)(['transform', 'WebkitTransform', 'MozTransform', 'msTransform', 'OTransform']), localStorageAccess),
    TRANSITIONDURATION = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tTDu']) || (0, _setLocalStorage.setLocalStorage)('tTDu', (0, _whichProperty.whichProperty)(['transitionDuration', 'WebkitTransitionDuration', 'MozTransitionDuration', 'OTransitionDuration']), localStorageAccess),
    TRANSITIONDELAY = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tTDe']) || (0, _setLocalStorage.setLocalStorage)('tTDe', (0, _whichProperty.whichProperty)(['transitionDelay', 'WebkitTransitionDelay', 'MozTransitionDelay', 'OTransitionDelay']), localStorageAccess),
    ANIMATIONDURATION = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tADu']) || (0, _setLocalStorage.setLocalStorage)('tADu', (0, _whichProperty.whichProperty)(['animationDuration', 'WebkitAnimationDuration', 'MozAnimationDuration', 'OAnimationDuration']), localStorageAccess),
    ANIMATIONDELAY = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tADe']) || (0, _setLocalStorage.setLocalStorage)('tADe', (0, _whichProperty.whichProperty)(['animationDelay', 'WebkitAnimationDelay', 'MozAnimationDelay', 'OAnimationDelay']), localStorageAccess),
    TRANSITIONEND = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tTE']) || (0, _setLocalStorage.setLocalStorage)('tTE', (0, _getEndProperty.getEndProperty)(TRANSITIONDURATION, 'Transition'), localStorageAccess),
    ANIMATIONEND = (0, _checkStorageValue.checkStorageValue)(tnsStorage['tAE']) || (0, _setLocalStorage.setLocalStorage)('tAE', (0, _getEndProperty.getEndProperty)(ANIMATIONDURATION, 'Animation'), localStorageAccess);

// reset SUBPIXEL for IE8
if (!CSSMQ) {
  SUBPIXEL = false;
}

var tns = exports.tns = function tns(options) {
  options = (0, _extend.extend)({
    container: '.slider',
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    fixedWidthViewportWidth: false,
    slideBy: 1,
    controls: true,
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    // animateIn: 'tns-fadeIn',
    // animateOut: 'tns-fadeOut',
    // animateNormal: 'tns-normal',
    // animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    freezable: true,
    // startIndex: 0,
    onInit: false
  }, options || {});

  // get element nodes from selectors
  var supportConsoleWarn = win.console && typeof win.console.warn === "function";
  var list = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'];
  for (var i = list.length; i--;) {
    var item = list[i];
    if (typeof options[item] === 'string') {
      var el = doc.querySelector(options[item]);

      if (el && el.nodeName) {
        options[item] = el;
      } else {
        if (supportConsoleWarn) {
          console.warn('Can\'t find', options[item]);
        }
        return;
      }
    }
  }

  // make sure at least 1 slide
  if (options.container.children && options.container.children.length < 1) {
    if (supportConsoleWarn) {
      console.warn('No slides found in', options.container);
    }
    return;
  }

  // update responsive
  // from: { 
  //    300: 2, 
  //    800: {
  //      loop: false
  //    }
  // }
  // to: {
  //    300: { 
  //      items: 2 
  //    }, 
  //    800: {
  //      loop: false
  //    }
  // }
  if (options.responsive) {
    var resTem = {},
        res = options.responsive;
    for (var key in res) {
      var val = res[key];
      resTem[key] = typeof val === 'number' ? { items: val } : val;
    }

    options.responsive = resTem;
    resTem = null;

    // apply responsive[0] to options and remove it
    if (0 in options.responsive) {
      options = (0, _extend.extend)(options, options.responsive[0]);
      delete options.responsive[0];
    }
  }

  // === define and set variables ===
  var carousel = options.mode === 'carousel' ? true : false;

  if (!carousel) {
    options.axis = 'horizontal';
    options.rewind = false;
    // options.loop = true;
    options.edgePadding = false;

    var animateIn = 'tns-fadeIn',
        animateOut = 'tns-fadeOut',
        animateDelay = false,
        animateNormal = options.animateNormal || 'tns-normal';

    if (TRANSITIONEND && ANIMATIONEND) {
      animateIn = options.animateIn || animateIn;
      animateOut = options.animateOut || animateOut;
      animateDelay = options.animateDelay || animateDelay;
    }
  }

  var horizontal = options.axis === 'horizontal' ? true : false,
      outerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      container = options.container,
      containerParent = container.parentNode,
      slideItems = container.children,
      slideCount = slideItems.length,
      vpInner,
      responsive = options.responsive,
      responsiveItems = [],
      breakpoints = false,
      breakpointZone = 0,
      windowWidth = getWindowWidth(),
      isOn;

  if (options.fixedWidth) {
    var vpOuter = getViewportWidth(containerParent);
  }

  if (responsive) {
    breakpoints = Object.keys(responsive).map(function (x) {
      return parseInt(x);
    }).sort(function (a, b) {
      return a - b;
    });

    // get all responsive items
    breakpoints.forEach(function (bp) {
      responsiveItems = responsiveItems.concat(Object.keys(responsive[bp]));
    });

    // remove duplicated items
    var arr = [];
    responsiveItems.forEach(function (item) {
      if (arr.indexOf(item) < 0) {
        arr.push(item);
      }
    });
    responsiveItems = arr;

    setBreakpointZone();
  }

  var items = getOption('items'),
      slideBy = getOption('slideBy') === 'page' ? items : getOption('slideBy'),
      nested = options.nested,
      gutter = getOption('gutter'),
      edgePadding = getOption('edgePadding'),
      fixedWidth = getOption('fixedWidth'),
      fixedWidthViewportWidth = options.fixedWidthViewportWidth,
      arrowKeys = getOption('arrowKeys'),
      speed = getOption('speed'),
      rewind = options.rewind,
      loop = rewind ? false : options.loop,
      autoHeight = getOption('autoHeight'),
      sheet = (0, _createStyleSheet.createStyleSheet)(),
      lazyload = options.lazyload,
      slideOffsetTops,
      // collection of slide offset tops
  slideItemsOut = [],
      hasEdgePadding = checkOption('edgePadding'),
      cloneCount = loop ? getCloneCountForLoop() : 0,
      slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = fixedWidth && !loop && !edgePadding ? true : false,
      updateIndexBeforeTransform = !carousel || !loop ? true : false,

  // transform
  transformAttr = horizontal ? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',

  // index
  startIndex = getOption('startIndex'),
      index = startIndex ? updateStartIndex(startIndex) : !carousel ? 0 : cloneCount,
      indexCached = index,
      indexMin = 0,
      indexMax = getIndexMax(),

  // resize
  resizeTimer,
      swipeAngle = options.swipeAngle,
      moveDirectionExpected = swipeAngle ? '?' : true,
      running = false,
      onInit = options.onInit,
      events = new _events.Events(),

  // id, class
  containerIdCached = container.id,
      classContainer = ' tns-slider tns-' + options.mode,
      slideId = container.id || (0, _getSlideId.getSlideId)(),
      disable = getOption('disable'),
      freezable = options.freezable,
      freeze = disable ? true : freezable ? slideCount <= items : false,
      frozen,
      importantStr = nested === 'inner' ? ' !important' : '',
      controlsEvents = {
    'click': onControlsClick,
    'keydown': onControlsKeydown
  },
      navEvents = {
    'click': onNavClick,
    'keydown': onNavKeydown
  },
      hoverEvents = {
    'mouseover': mouseoverPause,
    'mouseout': mouseoutRestart
  },
      visibilityEvent = { 'visibilitychange': onVisibilityChange },
      docmentKeydownEvent = { 'keydown': onDocumentKeydown },
      touchEvents = {
    'touchstart': onPanStart,
    'touchmove': onPanMove,
    'touchend': onPanEnd,
    'touchcancel': onPanEnd
  },
      dragEvents = {
    'mousedown': onPanStart,
    'mousemove': onPanMove,
    'mouseup': onPanEnd,
    'mouseleave': onPanEnd
  },
      hasControls = checkOption('controls'),
      hasNav = checkOption('nav'),
      navAsThumbnails = options.navAsThumbnails,
      hasAutoplay = checkOption('autoplay'),
      hasTouch = checkOption('touch'),
      hasMouseDrag = checkOption('mouseDrag'),
      slideActiveClass = 'tns-slide-active',
      imgCompleteClass = 'tns-complete',
      imgEvents = {
    'load': imgLoadedOrError,
    'error': imgLoadedOrError
  },
      imgsComplete;

  // controls
  if (hasControls) {
    var controls = getOption('controls'),
        controlsText = getOption('controlsText'),
        controlsContainer = options.controlsContainer,
        prevButton = options.prevButton,
        nextButton = options.nextButton,
        prevIsButton,
        nextIsButton;
  }

  // nav
  if (hasNav) {
    var nav = getOption('nav'),
        navContainer = options.navContainer,
        navItems,
        visibleNavIndexes = [],
        visibleNavIndexesCached = visibleNavIndexes,
        navClicked = -1,
        navCurrentIndex = getAbsIndex(),
        navCurrentIndexCached = navCurrentIndex,
        navActiveClass = 'tns-nav-active';
  }

  // autoplay
  if (hasAutoplay) {
    var autoplay = getOption('autoplay'),
        autoplayTimeout = getOption('autoplayTimeout'),
        autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
        autoplayText = getOption('autoplayText'),
        autoplayHoverPause = getOption('autoplayHoverPause'),
        autoplayButton = options.autoplayButton,
        autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
        autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
        autoplayTimer,
        animating,
        autoplayHoverPaused,
        autoplayUserPaused,
        autoplayVisibilityPaused;
  }

  if (hasTouch || hasMouseDrag) {
    var initPosition = {},
        lastPosition = {},
        translateInit,
        disX,
        disY,
        panStart = false,
        rafIndex = 0,
        getDist = horizontal ? function (a, b) {
      return a.x - b.x;
    } : function (a, b) {
      return a.y - b.y;
    };
  }

  // touch
  if (hasTouch) {
    var touch = getOption('touch');
  }

  // mouse drag
  if (hasMouseDrag) {
    var mouseDrag = getOption('mouseDrag');
  }

  // disable slider when slidecount <= items
  if (freeze) {
    controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
  }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';
    transformPrefix += horizontal ? 'X(' : 'Y(';
    transformPostfix = ')';
  }

  // === COMMON FUNCTIONS === //
  function getIndexMax() {
    return carousel ? slideCountNew - items : loop ? slideCount - slideCount % items : slideCountNew - 1;
  }

  function updateStartIndex(indexTem) {
    indexTem = indexTem % slideCount;
    if (indexTem < 0) {
      indexTem += slideCount;
    }
    indexTem = Math.min(indexTem, slideCountNew - items);
    return indexTem;
  }

  function getAbsIndex(i) {
    if (i === undefined) {
      i = index;
    }
    while (i < cloneCount) {
      i += slideCount;
    }
    return (i - cloneCount) % slideCount;
  }

  function getItemsMax() {
    if (fixedWidth && !fixedWidthViewportWidth) {
      return slideCount - 1;
    } else {
      var str = fixedWidth ? 'fixedWidth' : 'items',
          isFW = fixedWidth,
          arr = [];

      if (isFW || options[str] < slideCount) {
        arr.push(options[str]);
      }

      if (breakpoints && responsiveItems.indexOf(str) >= 0) {
        breakpoints.forEach(function (bp) {
          var tem = responsive[bp][str];
          if (tem && (isFW || tem < slideCount)) {
            arr.push(tem);
          }
        });
      }

      if (!arr.length) {
        arr.push(0);
      }

      return isFW ? Math.ceil(fixedWidthViewportWidth / Math.min.apply(null, arr)) : Math.max.apply(null, arr);
    }
  }

  function getCloneCountForLoop() {
    var itemsMax = getItemsMax(),
        result = carousel ? Math.ceil((itemsMax * 5 - slideCount) / 2) : itemsMax * 3 - slideCount;
    result = Math.max(itemsMax, result);

    return hasEdgePadding ? result + 1 : result;
  }

  function getWindowWidth() {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  function getViewportWidth(el) {
    return el.clientWidth || getViewportWidth(el.parentNode);
  }

  function checkOption(item) {
    var result = options[item];
    if (!result && breakpoints && responsiveItems.indexOf(item) >= 0) {
      breakpoints.forEach(function (bp) {
        if (responsive[bp][item]) {
          result = true;
        }
      });
    }
    return result;
  }

  function getOption(item, viewport) {
    viewport = viewport ? viewport : windowWidth;

    var obj = {
      slideBy: 'page',
      edgePadding: false
    },
        result;

    if (!carousel && item in obj) {
      result = obj[item];
    } else {
      if (item === 'items' && getOption('fixedWidth')) {
        result = Math.floor(vpOuter / (getOption('fixedWidth') + getOption('gutter')));
      } else if (item === 'autoHeight' && nested === 'outer') {
        result = true;
      } else {
        result = options[item];

        if (breakpoints && responsiveItems.indexOf(item) >= 0) {
          for (var i = 0, len = breakpoints.length; i < len; i++) {
            var bp = breakpoints[i];
            if (viewport >= bp) {
              if (item in responsive[bp]) {
                result = responsive[bp][item];
              }
            } else {
              break;
            }
          }
        }
      }
    }

    if (item === 'slideBy' && result === 'page') {
      result = getOption('items');
    }

    return result;
  }

  function getSlideMarginLeft(i) {
    var str = CALC ? CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' : i * 100 / slideCountNew + '%';
    return str;
  }

  function getInnerWrapperStyles(edgePaddingTem, gutterTem, fixedWidthTem, speedTem) {
    var str = '';

    if (edgePaddingTem) {
      var gap = edgePaddingTem;
      if (gutterTem) {
        gap += gutterTem;
      }
      if (fixedWidthTem) {
        str = 'margin: 0px ' + (vpOuter % (fixedWidthTem + gutterTem) + gutterTem) / 2 + 'px';
      } else {
        str = horizontal ? 'margin: 0 ' + edgePaddingTem + 'px 0 ' + gap + 'px;' : 'padding: ' + gap + 'px 0 ' + edgePaddingTem + 'px 0;';
      }
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
          dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';';
    }

    if (TRANSITIONDURATION && speedTem) {
      str += getTrsnsitionDurationStyle(speedTem);
    }

    return str;
  }

  function getContainerWidth(fixedWidthTem, gutterTem, itemsTem) {
    var str;

    if (fixedWidthTem) {
      str = (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      str = CALC ? CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' : slideCountNew * 100 / itemsTem + '%';
    }

    return str;
  }

  function getSlideWidthStyle(fixedWidthTem, gutterTem, itemsTem) {
    var str = '';

    if (horizontal) {
      str = 'width:';
      if (fixedWidthTem) {
        str += fixedWidthTem + gutterTem + 'px';
      } else {
        var dividend = carousel ? slideCountNew : itemsTem;
        str += CALC ? CALC + '(100% / ' + dividend + ')' : 100 / dividend + '%';
      }
      str += importantStr + ';';
    }

    return str;
  }

  function getSlideGutterStyle(gutterTem) {
    var str = '';

    // gutter maybe interger || 0
    // so can't use 'if (gutter)'
    if (gutterTem !== false) {
      var prop = horizontal ? 'padding-' : 'margin-',
          dir = horizontal ? 'right' : 'bottom';
      str = prop + dir + ': ' + gutterTem + 'px;';
    }

    return str;
  }

  function getCSSPrefix(name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();
    if (prefix) {
      prefix = '-' + prefix + '-';
    }

    return prefix;
  }

  function getTrsnsitionDurationStyle(speed) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
  }

  function getAnimationDurationStyle(speed) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
  }

  (function sliderInit() {
    // First thing first, wrap container with 'outerWrapper > innerWrapper',
    // to get the correct view width
    outerWrapper.appendChild(innerWrapper);
    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);
    vpInner = getViewportWidth(innerWrapper);

    var classOuter = 'tns-outer',
        classInner = 'tns-inner',
        hasGutter = checkOption('gutter');

    if (carousel) {
      if (horizontal) {
        if (checkOption('edgePadding') || hasGutter && !options.fixedWidth) {
          classOuter += ' tns-ovh';
        } else {
          classInner += ' tns-ovh';
        }
      } else {
        classInner += ' tns-ovh';
      }
    } else if (hasGutter) {
      classOuter += ' tns-ovh';
    }

    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    innerWrapper.id = slideId + '-iw';
    if (autoHeight) {
      innerWrapper.className += ' tns-ah';
      innerWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }

    // set container properties
    if (container.id === '') {
      container.id = slideId;
    }
    classContainer += SUBPIXEL ? ' tns-subpixel' : ' tns-no-subpixel';
    classContainer += CALC ? ' tns-calc' : ' tns-no-calc';
    if (carousel) {
      classContainer += ' tns-' + options.axis;
    }
    container.className += classContainer;
    // add event
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      (0, _addEvents.addEvents)(container, eve);
    }

    // delete datas after init
    classOuter = classInner = null;

    // add id, class, aria attributes 
    // before clone slides
    for (var x = 0; x < slideCount; x++) {
      var item = slideItems[x];
      if (!item.id) {
        item.id = slideId + '-item' + x;
      }
      (0, _addClass.addClass)(item, 'tns-item');
      if (!carousel && animateNormal) {
        (0, _addClass.addClass)(item, animateNormal);
      }
      (0, _setAttrs.setAttrs)(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    }

    // clone slides
    if (loop || edgePadding) {
      var fragmentBefore = doc.createDocumentFragment(),
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j % slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        (0, _removeAttrs.removeAttrs)(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          (0, _removeAttrs.removeAttrs)(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }

    // add image events
    if (checkOption('autoHeight') || !carousel) {
      var imgs = container.querySelectorAll('img');

      // check all image complete status
      // add complete class if true
      (0, _forEachNodeList.forEachNodeList)(imgs, function (img) {
        (0, _addEvents.addEvents)(img, imgEvents);

        var src = img.src;
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
      });

      // set imgsComplete to true 
      // when all images are compulete (loaded or error)
      (0, _raf.raf)(function () {
        checkImagesLoaded((0, _arrayFromNodeList.arrayFromNodeList)(imgs), function () {
          imgsComplete = true;
        });
      });
    }

    // activate visible slides
    // add aria attrs
    // set animation classes and left value for gallery slider
    // use slide count when slides are fewer than items
    for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
      var item = slideItems[i];
      (0, _setAttrs.setAttrs)(item, { 'aria-hidden': 'false' });
      (0, _removeAttrs.removeAttrs)(item, ['tabindex']);
      (0, _addClass.addClass)(item, slideActiveClass);

      if (!carousel) {
        item.style.left = (i - index) * 100 / items + '%';
        (0, _addClass.addClass)(item, animateIn);
        (0, _removeClass.removeClass)(item, animateNormal);
      }
    }

    if (carousel && horizontal) {
      // set font-size rules
      // for modern browsers
      if (SUBPIXEL) {
        // set slides font-size first
        (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', (0, _getCssRulesLength.getCssRulesLength)(sheet));
        (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId, 'font-size:0;', (0, _getCssRulesLength.getCssRulesLength)(sheet));

        // slide left margin
        // for IE8 & webkit browsers (no subpixel)
      } else {
        (0, _forEachNodeList.forEachNodeList)(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    }

    // all browsers which support CSS transitions support CSS media queries
    if (CSSMQ) {
      // inner wrapper styles
      var str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed);
      (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId + '-iw', str, (0, _getCssRulesLength.getCssRulesLength)(sheet));

      // container styles
      if (carousel) {
        str = horizontal ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
        if (TRANSITIONDURATION) {
          str += getTrsnsitionDurationStyle(speed);
        }
        (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId, str, (0, _getCssRulesLength.getCssRulesLength)(sheet));
      }

      // slide styles
      if (horizontal || options.gutter) {
        str = getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) + getSlideGutterStyle(options.gutter);
        // set gallery items transition-duration
        if (!carousel) {
          if (TRANSITIONDURATION) {
            str += getTrsnsitionDurationStyle(speed);
          }
          if (ANIMATIONDURATION) {
            str += getAnimationDurationStyle(speed);
          }
        }
        (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId + ' > .tns-item', str, (0, _getCssRulesLength.getCssRulesLength)(sheet));
      }

      // non CSS mediaqueries: IE8
      // ## update inner wrapper, container, slides if needed
      // set inline styles for inner wrapper & container
      // insert stylesheet (one line) for slides only (since slides are many)
    } else {
      // inner wrapper styles
      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth);

      // container styles
      if (carousel && horizontal) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      }

      // slide styles
      if (horizontal || gutter) {
        var str = getSlideWidthStyle(fixedWidth, gutter, items) + getSlideGutterStyle(gutter);
        // append to the last line
        (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId + ' > .tns-item', str, (0, _getCssRulesLength.getCssRulesLength)(sheet));
      }
    }

    if (!horizontal && !disable) {
      getSlideOffsetTops();
      updateContentWrapperHeight();
    }

    // media queries
    if (responsive && CSSMQ) {
      breakpoints.forEach(function (bp) {
        var opts = responsive[bp],
            str = '',
            innerWrapperStr = '',
            containerStr = '',
            slideStr = '',
            itemsBP = getOption('items', bp),
            fixedWidthBP = getOption('fixedWidth', bp),
            speedBP = getOption('speed', bp),
            edgePaddingBP = getOption('edgePadding', bp),
            gutterBP = getOption('gutter', bp);

        // inner wrapper string
        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP) + '}';
        }

        // container string
        if (carousel && horizontal && ('fixedWidth' in opts || 'gutter' in opts || 'items' in opts)) {
          containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
        }
        if (TRANSITIONDURATION && 'speed' in opts) {
          containerStr += getTrsnsitionDurationStyle(speedBP);
        }
        if (containerStr) {
          containerStr = '#' + slideId + '{' + containerStr + '}';
        }

        // slide string
        if ('fixedWidth' in opts || checkOption('fixedWidth') && 'gutter' in opts || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        }
        // set gallery items transition-duration
        if (!carousel && 'speed' in opts) {
          if (TRANSITIONDURATION) {
            slideStr += getTrsnsitionDurationStyle(speedBP);
          }
          if (ANIMATIONDURATION) {
            slideStr += getAnimationDurationStyle(speedBP);
          }
        }
        if (slideStr) {
          slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}';
        }

        // add up
        str = innerWrapperStr + containerStr + slideStr;

        if (str) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      });
    }

    // set container transform property
    if (carousel && !disable) {
      doContainerTransformSilent();
    }

    // == msInit ==
    // for IE10
    if (navigator.msMaxTouchPoints) {
      (0, _addClass.addClass)(outerWrapper, 'ms-touch');
      (0, _addEvents.addEvents)(outerWrapper, { 'scroll': ie10Scroll });
      setSnapInterval();
    }

    // == navInit ==
    if (hasNav) {
      var initIndex = !carousel ? 0 : cloneCount;
      // customized nav
      // will not hide the navs in case they're thumbnails
      if (navContainer) {
        (0, _setAttrs.setAttrs)(navContainer, { 'aria-label': 'Carousel Pagination' });
        navItems = navContainer.children;
        (0, _forEachNodeList.forEachNodeList)(navItems, function (item, i) {
          (0, _setAttrs.setAttrs)(item, {
            'data-nav': i,
            'tabindex': '-1',
            'aria-selected': 'false',
            'aria-controls': slideItems[initIndex + i].id
          });
        });

        // generated nav 
      } else {
        var navHtml = '',
            hiddenStr = navAsThumbnails ? '' : 'hidden';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button data-nav="' + i + '" tabindex="-1" aria-selected="false" aria-controls="' + slideItems[initIndex + i].id + '" ' + hiddenStr + ' type="button"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML('afterbegin', navHtml);

        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;
      }

      updateNavVisibility();

      // add transition
      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
            str = 'transition: all ' + speed / 1000 + 's';

        if (prefix) {
          str = '-' + prefix + '-' + str;
        }

        (0, _addCSSRule.addCSSRule)(sheet, '[aria-controls^=' + slideId + '-item]', str, (0, _getCssRulesLength.getCssRulesLength)(sheet));
      }

      (0, _setAttrs.setAttrs)(navItems[navCurrentIndex], { 'tabindex': '0', 'aria-selected': 'true' });
      (0, _addClass.addClass)(navItems[navCurrentIndex], navActiveClass);

      // add events
      (0, _addEvents.addEvents)(navContainer, navEvents);

      if (!nav) {
        (0, _hideElement.hideElement)(navContainer);
      }
    }

    // == autoplayInit ==
    if (hasAutoplay) {
      var txt = autoplay ? 'stop' : 'start';
      if (autoplayButton) {
        (0, _setAttrs.setAttrs)(autoplayButton, { 'data-action': txt });
      } else if (options.autoplayButtonOutput) {
        innerWrapper.insertAdjacentHTML('beforebegin', '<button data-action="' + txt + '" type="button">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
        autoplayButton = outerWrapper.querySelector('[data-action]');
      }

      // add event
      if (autoplayButton) {
        (0, _addEvents.addEvents)(autoplayButton, { 'click': toggleAutoplay });
      }

      if (!autoplay) {
        if (autoplayButton) {
          (0, _hideElement.hideElement)(autoplayButton);
        }
      } else {
        startAutoplay();
        if (autoplayHoverPause) {
          (0, _addEvents.addEvents)(container, hoverEvents);
        }
        if (autoplayResetOnVisibility) {
          (0, _addEvents.addEvents)(container, visibilityEvent);
        }
      }
    }

    // == controlsInit ==
    if (hasControls) {
      if (controlsContainer || prevButton && nextButton) {
        if (controlsContainer) {
          prevButton = controlsContainer.children[0];
          nextButton = controlsContainer.children[1];
          (0, _setAttrs.setAttrs)(controlsContainer, {
            'aria-label': 'Carousel Navigation',
            'tabindex': '0'
          });
          (0, _setAttrs.setAttrs)(controlsContainer.children, {
            'aria-controls': slideId,
            'tabindex': '-1'
          });
        }

        (0, _setAttrs.setAttrs)(prevButton, { 'data-controls': 'prev' });
        (0, _setAttrs.setAttrs)(nextButton, { 'data-controls': 'next' });
      } else {
        outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + slideId + '" type="button">' + controlsText[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + slideId + '" type="button">' + controlsText[1] + '</button></div>');

        controlsContainer = outerWrapper.querySelector('.tns-controls');
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);

      updateControlsStatus();

      // add events
      if (controlsContainer) {
        (0, _addEvents.addEvents)(controlsContainer, controlsEvents);
      } else {
        (0, _addEvents.addEvents)(prevButton, controlsEvents);
        (0, _addEvents.addEvents)(nextButton, controlsEvents);
      }

      if (!controls) {
        (0, _hideElement.hideElement)(controlsContainer);
      }
    }

    if (carousel && touch) {
      (0, _addEvents.addEvents)(container, touchEvents);
    }
    if (carousel && mouseDrag) {
      (0, _addEvents.addEvents)(container, dragEvents);
    }
    if (arrowKeys) {
      (0, _addEvents.addEvents)(doc, docmentKeydownEvent);
    }

    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else {
      (0, _addEvents.addEvents)(win, { 'resize': onResize });
    }

    if (nested === 'outer') {
      events.on('innerLoaded', runAutoHeight);
    } else if ((autoHeight || !carousel) && !disable) {
      runAutoHeight();
    }

    lazyLoad();
    toggleSlideDisplayAndEdgePadding();
    updateFixedWidthInnerWrapperStyle();

    events.on('indexChanged', additionalUpdates);

    if (typeof onInit === 'function') {
      onInit(info());
    }
    if (nested === 'inner') {
      events.emit('innerLoaded', info());
    }

    if (disable) {
      disableSlider(true);
    }

    isOn = true;
  })();

  // === ON RESIZE ===
  function onResize(e) {
    (0, _raf.raf)(function () {
      resizeTasks(getEvent(e));
    });
  }

  function resizeTasks(e) {
    if (!isOn) {
      return;
    }

    windowWidth = getWindowWidth();
    if (nested === 'outer') {
      events.emit('outerResized', info(e));
    }

    var breakpointZoneTem = breakpointZone,
        indexTem = index,
        itemsTem = items,
        freezeTem = freeze,
        needContainerTransform = false;

    if (fixedWidth) {
      vpOuter = getViewportWidth(outerWrapper);
    }
    vpInner = getViewportWidth(innerWrapper);
    if (breakpoints) {
      setBreakpointZone();
    }

    // things do when breakpoint zone change
    if (breakpointZoneTem !== breakpointZone || fixedWidth) {
      var slideByTem = slideBy,
          arrowKeysTem = arrowKeys,
          autoHeightTem = autoHeight,
          fixedWidthTem = fixedWidth,
          edgePaddingTem = edgePadding,
          gutterTem = gutter,
          disableTem = disable;

      // update variables
      items = getOption('items');
      slideBy = getOption('slideBy');
      disable = getOption('disable');
      freeze = disable ? true : freezable ? slideCount <= items : false;

      if (items !== itemsTem) {
        indexMax = getIndexMax();
        // check index before transform in case
        // slider reach the right edge then items become bigger
        updateIndex();
      }

      if (disable !== disableTem) {
        disableSlider(disable);
      }

      if (freeze !== freezeTem) {
        // reset index to initial status
        if (freeze) {
          index = !carousel ? 0 : cloneCount;
        }

        toggleSlideDisplayAndEdgePadding();
      }

      if (breakpointZoneTem !== breakpointZone) {
        speed = getOption('speed');
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');

        fixedWidth = getOption('fixedWidth');
        if (!disable && fixedWidth !== fixedWidthTem) {
          needContainerTransform = true;
        }

        autoHeight = getOption('autoHeight');
        if (autoHeight !== autoHeightTem) {
          if (!autoHeight) {
            innerWrapper.style.height = '';
          }
        }
      }

      arrowKeys = freeze ? false : getOption('arrowKeys');
      if (arrowKeys !== arrowKeysTem) {
        arrowKeys ? (0, _addEvents.addEvents)(doc, docmentKeydownEvent) : (0, _removeEvents.removeEvents)(doc, docmentKeydownEvent);
      }

      if (hasControls) {
        var controlsTem = controls,
            controlsTextTem = controlsText;
        controls = freeze ? false : getOption('controls');
        controlsText = getOption('controlsText');

        if (controls !== controlsTem) {
          controls ? (0, _showElement.showElement)(controlsContainer) : (0, _hideElement.hideElement)(controlsContainer);
        }
        if (controlsText !== controlsTextTem) {
          prevButton.innerHTML = controlsText[0];
          nextButton.innerHTML = controlsText[1];
        }
      }
      if (hasNav) {
        var navTem = nav;
        nav = freeze ? false : getOption('nav');

        if (nav !== navTem) {
          if (nav) {
            (0, _showElement.showElement)(navContainer);
            updateNavVisibility();
          } else {
            (0, _hideElement.hideElement)(navContainer);
          }
        }
      }
      if (hasTouch) {
        var touchTem = touch;
        touch = freeze ? false : getOption('touch');

        if (touch !== touchTem && carousel) {
          touch ? (0, _addEvents.addEvents)(container, touchEvents) : (0, _removeEvents.removeEvents)(container, touchEvents);
        }
      }
      if (hasMouseDrag) {
        var mouseDragTem = mouseDrag;
        mouseDrag = freeze ? false : getOption('mouseDrag');

        if (mouseDrag !== mouseDragTem && carousel) {
          mouseDrag ? (0, _addEvents.addEvents)(container, dragEvents) : (0, _removeEvents.removeEvents)(container, dragEvents);
        }
      }
      if (hasAutoplay) {
        var autoplayTem = autoplay,
            autoplayHoverPauseTem = autoplayHoverPause,
            autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
            autoplayTextTem = autoplayText;

        if (freeze) {
          autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
        } else {
          autoplay = getOption('autoplay');

          if (autoplay) {
            autoplayHoverPause = getOption('autoplayHoverPause');
            autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');
          } else {
            autoplayHoverPause = autoplayResetOnVisibility = false;
          }
        }
        autoplayText = getOption('autoplayText');
        autoplayTimeout = getOption('autoplayTimeout');

        if (autoplay !== autoplayTem) {
          if (autoplay) {
            if (autoplayButton) {
              (0, _showElement.showElement)(autoplayButton);
            }
            if (!animating && !autoplayUserPaused) {
              startAutoplay();
            }
          } else {
            if (autoplayButton) {
              (0, _hideElement.hideElement)(autoplayButton);
            }
            if (animating) {
              stopAutoplay();
            }
          }
        }
        if (autoplayHoverPause !== autoplayHoverPauseTem) {
          autoplayHoverPause ? (0, _addEvents.addEvents)(container, hoverEvents) : (0, _removeEvents.removeEvents)(container, hoverEvents);
        }
        if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
          autoplayResetOnVisibility ? (0, _addEvents.addEvents)(doc, visibilityEvent) : (0, _removeEvents.removeEvents)(doc, visibilityEvent);
        }
        if (autoplayButton && autoplayText !== autoplayTextTem) {
          var i = autoplay ? 1 : 0,
              html = autoplayButton.innerHTML,
              len = html.length - autoplayTextTem[i].length;
          if (html.substring(len) === autoplayTextTem[i]) {
            autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
          }
        }
      }

      // IE8
      // ## update inner wrapper, container, slides if needed
      // set inline styles for inner wrapper & container
      // insert stylesheet (one line) for slides only (since slides are many)
      if (!CSSMQ) {
        // inner wrapper styles
        if (!freeze && (edgePadding !== edgePaddingTem || gutter !== gutterTem)) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth);
        }

        // container styles
        if (carousel && horizontal && (fixedWidth !== fixedWidthTem || gutter !== gutterTem || items !== itemsTem)) {
          container.style.width = getContainerWidth(fixedWidth, gutter, items);
        }

        // slide styles
        if (horizontal && (items !== itemsTem || gutter !== gutterTem || fixedWidth != fixedWidthTem)) {
          var str = getSlideWidthStyle(fixedWidth, gutter, items) + getSlideGutterStyle(gutter);

          // remove the last line and
          // add new styles
          sheet.removeRule((0, _getCssRulesLength.getCssRulesLength)(sheet) - 1);
          (0, _addCSSRule.addCSSRule)(sheet, '#' + slideId + ' > .tns-item', str, (0, _getCssRulesLength.getCssRulesLength)(sheet));
        }

        if (!fixedWidth) {
          needContainerTransform = true;
        }
      }

      if (index !== indexTem) {
        events.emit('indexChanged', info());
        needContainerTransform = true;
      }

      if (items !== itemsTem) {
        additionalUpdates();
        updateSlidePosition();

        if (navigator.msMaxTouchPoints) {
          setSnapInterval();
        }
      }
    }

    // things always do regardless of breakpoint zone changing
    if (!horizontal && !disable) {
      getSlideOffsetTops();
      updateContentWrapperHeight();
      needContainerTransform = true;
    }

    if (needContainerTransform) {
      doContainerTransformSilent();
      indexCached = index;
    }

    updateFixedWidthInnerWrapperStyle(true);

    // auto height
    if ((autoHeight || !carousel) && !disable) {
      runAutoHeight();
    }
  }

  // === INITIALIZATION FUNCTIONS === //
  function setBreakpointZone() {
    breakpointZone = 0;
    breakpoints.forEach(function (bp, i) {
      if (windowWidth >= bp) {
        breakpointZone = i + 1;
      }
    });
  }

  function loopNumber(num, min, max) {
    return index >= indexMin && index <= indexMax ? index : index > indexMax ? index - slideCount : index + slideCount;
  }

  function cutindexber(index, min, indexMax) {
    return index >= indexMin && index <= indexMax ? index : index > indexMax ? indexMax : indexMin;
  }

  // (slideBy, indexMin, indexMax) => index
  var updateIndex = function () {
    return loop ? carousel ? function () {
      var leftEdge = indexMin,
          rightEdge = indexMax;

      leftEdge += slideBy;
      rightEdge -= slideBy;

      // adjust edges when edge padding is true
      // or fixed-width slider with extra space on the right side
      if (edgePadding) {
        leftEdge += 1;
        rightEdge -= 1;
      } else if (fixedWidth) {
        var gt = gutter ? gutter : 0;
        if (vpOuter % (fixedWidth + gt) > gt) {
          rightEdge -= 1;
        }
      }

      if (cloneCount) {
        if (index > rightEdge) {
          index -= slideCount;
        } else if (index < leftEdge) {
          index += slideCount;
        }
      }
    } : function () {
      index = index >= indexMin && index <= indexMax ? index : index > indexMax ? index - slideCount : index + slideCount;
    } : function () {
      index = index >= indexMin && index <= indexMax ? index : index > indexMax ? indexMax : indexMin;
    };
  }();

  function toggleSlideDisplayAndEdgePadding() {
    // if (cloneCount) {
    // if (fixedWidth && cloneCount) {
    var str = 'tns-transparent';

    if (freeze) {
      if (!frozen) {
        // remove edge padding from inner wrapper
        if (edgePadding) {
          innerWrapper.style.margin = '0px';
        }

        // add class tns-transparent to cloned slides
        if (cloneCount) {
          for (var i = cloneCount; i--;) {
            if (carousel) {
              (0, _addClass.addClass)(slideItems[i], str);
            }
            (0, _addClass.addClass)(slideItems[slideCountNew - i - 1], str);
          }
        }

        frozen = true;
      }
    } else if (frozen) {
      // restore edge padding for inner wrapper
      // for mordern browsers
      if (edgePadding && !fixedWidth && CSSMQ) {
        innerWrapper.style.margin = '';
      }

      // remove class tns-transparent to cloned slides
      if (cloneCount) {
        for (var i = cloneCount; i--;) {
          if (carousel) {
            (0, _removeClass.removeClass)(slideItems[i], str);
          }
          (0, _removeClass.removeClass)(slideItems[slideCountNew - i - 1], str);
        }
      }

      frozen = false;
    }
    // }
  }

  function updateFixedWidthInnerWrapperStyle(resize) {
    if (fixedWidth && edgePadding) {
      // remove edge padding when freeze or viewport narrower than one slide
      if (freeze || vpOuter <= fixedWidth + gutter) {
        if (innerWrapper.style.margin !== '0px') {
          innerWrapper.style.margin = '0px';
        }
        // update edge padding on resize
      } else if (resize) {
        innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth);
      }
    }
  }

  function disableSlider(disable) {
    var len = slideItems.length;

    if (disable) {
      sheet.disabled = true;
      container.className = container.className.replace(classContainer.substring(1), '');
      (0, _removeElementStyles.removeElementStyles)(container);
      if (loop) {
        for (var j = cloneCount; j--;) {
          if (carousel) {
            (0, _hideElement.hideElement)(slideItems[j]);
          }
          (0, _hideElement.hideElement)(slideItems[len - j - 1]);
        }
      }

      // vertical slider
      if (!horizontal || !carousel) {
        (0, _removeElementStyles.removeElementStyles)(innerWrapper);
      }

      // gallery
      if (!carousel) {
        for (var i = index, l = index + slideCount; i < l; i++) {
          var item = slideItems[i];
          (0, _removeElementStyles.removeElementStyles)(item);
          (0, _removeClass.removeClass)(item, animateIn);
          (0, _removeClass.removeClass)(item, animateNormal);
        }
      }
    } else {
      sheet.disabled = false;
      container.className += classContainer;

      // vertical slider: get offsetTops before container transform
      if (!horizontal) {
        getSlideOffsetTops();
      }

      doContainerTransformSilent();
      if (loop) {
        for (var j = cloneCount; j--;) {
          if (carousel) {
            (0, _showElement.showElement)(slideItems[j]);
          }
          (0, _showElement.showElement)(slideItems[len - j - 1]);
        }
      }

      // gallery
      if (!carousel) {
        for (var i = index, l = index + slideCount; i < l; i++) {
          var item = slideItems[i],
              classN = i < index + items ? animateIn : animateNormal;
          item.style.left = (i - index) * 100 / items + '%';
          (0, _addClass.addClass)(item, classN);
        }
      }
    }
  }

  // lazyload
  function lazyLoad() {
    if (lazyload && !disable) {
      var i = index,
          len = index + items;

      if (edgePadding) {
        i -= 1;
        len += 1;
      }

      for (; i < len; i++) {
        (0, _forEachNodeList.forEachNodeList)(slideItems[i].querySelectorAll('.tns-lazy-img'), function (img) {
          // stop propagationl transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) {
            e.stopPropagation();
          };
          (0, _addEvents.addEvents)(img, eve);

          if (!(0, _hasClass.hasClass)(img, 'loaded')) {
            img.src = (0, _getAttr.getAttr)(img, 'data-src');
            (0, _addClass.addClass)(img, 'loaded');
          }
        });
      }
    }
  }

  function imgLoadedOrError(e) {
    var img = getTarget(e);
    (0, _addClass.addClass)(img, imgCompleteClass);
    (0, _removeEvents.removeEvents)(img, imgEvents);
  }

  function getImageArray(slideStart, slideRange) {
    var imgs = [];
    for (var i = slideStart, l = slideStart + slideRange; i < l; i++) {
      (0, _forEachNodeList.forEachNodeList)(slideItems[i].querySelectorAll('img'), function (img) {
        imgs.push(img);
      });
    }

    return imgs;
  }

  // check if all visible images are loaded
  // and update container height if it's done
  function runAutoHeight() {
    var imgs = autoHeight ? getImageArray(index, items) : getImageArray(cloneCount, slideCount);

    (0, _raf.raf)(function () {
      checkImagesLoaded(imgs, updateInnerWrapperHeight);
    });
  }

  function checkImagesLoaded(imgs, cb) {
    // directly execute callback function if all images are complete
    if (imgsComplete) {
      return cb();
    }

    // check selected image classes otherwise
    imgs.forEach(function (img, index) {
      if ((0, _hasClass.hasClass)(img, imgCompleteClass)) {
        imgs.splice(index, 1);
      }
    });

    // execute callback function if selected images are all complete
    if (!imgs.length) {
      return cb();
    }

    // otherwise execute this functiona again
    (0, _raf.raf)(function () {
      checkImagesLoaded(imgs, cb);
    });
  }

  function additionalUpdates() {
    lazyLoad();
    updateSlideStatus();
    updateControlsStatus();
    updateNavVisibility();
    updateNavStatus();
  }

  function getMaxSlideHeight(slideStart, slideRange) {
    var heights = [];
    for (var i = slideStart, l = slideStart + slideRange; i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }

    return Math.max.apply(null, heights);
  }

  // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done
  function updateInnerWrapperHeight() {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount);

    if (innerWrapper.style.height !== maxHeight) {
      innerWrapper.style.height = maxHeight + 'px';
    }
  }

  // get the distance from the top edge of the first slide to each slide
  // (init) => slideOffsetTops
  function getSlideOffsetTops() {
    slideOffsetTops = [0];
    var topFirst = slideItems[0].getBoundingClientRect().top,
        attr;
    for (var i = 1; i < slideCountNew; i++) {
      attr = slideItems[i].getBoundingClientRect().top;
      slideOffsetTops.push(attr - topFirst);
    }
  }

  // set snapInterval (for IE10)
  function setSnapInterval() {
    outerWrapper.style.msScrollSnapPointsX = 'snapInterval(0%, ' + 100 / items + '%)';
  }

  // update slide
  function updateSlideStatus() {
    var l = index + Math.min(slideCount, items);
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];

      // visible slides
      if (i >= index && i < l) {
        if ((0, _hasAttr.hasAttr)(item, 'tabindex')) {
          (0, _setAttrs.setAttrs)(item, { 'aria-hidden': 'false' });
          (0, _removeAttrs.removeAttrs)(item, ['tabindex']);
          (0, _addClass.addClass)(item, slideActiveClass);
        }
        // hidden slides
      } else {
        if (!(0, _hasAttr.hasAttr)(item, 'tabindex')) {
          (0, _setAttrs.setAttrs)(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
        }
        if ((0, _hasClass.hasClass)(item, slideActiveClass)) {
          (0, _removeClass.removeClass)(item, slideActiveClass);
        }
      }
    }
  }

  // gallery: update slide position
  function updateSlidePosition() {
    if (!carousel) {
      var l = index + Math.min(slideCount, items);
      for (var i = slideCountNew; i--;) {
        var item = slideItems[i];

        if (i >= index && i < l) {
          // add transitions to visible slides when adjusting their positions
          (0, _addClass.addClass)(item, 'tns-moving');

          item.style.left = (i - index) * 100 / items + '%';
          (0, _addClass.addClass)(item, animateIn);
          (0, _removeClass.removeClass)(item, animateNormal);
        } else if (item.style.left) {
          item.style.left = '';
          (0, _addClass.addClass)(item, animateNormal);
          (0, _removeClass.removeClass)(item, animateIn);
        }

        // remove outlet animation
        (0, _removeClass.removeClass)(item, animateOut);
      }

      // removing '.tns-moving'
      setTimeout(function () {
        (0, _forEachNodeList.forEachNodeList)(slideItems, function (el) {
          (0, _removeClass.removeClass)(el, 'tns-moving');
        });
      }, 300);
    }
  }

  // set tabindex & aria-selected on Nav
  function updateNavStatus() {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked !== -1 ? navClicked : getAbsIndex();
      navClicked = -1;

      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
            navCurrent = navItems[navCurrentIndex];

        (0, _setAttrs.setAttrs)(navPrev, {
          'tabindex': '-1',
          'aria-selected': 'false'
        });
        (0, _setAttrs.setAttrs)(navCurrent, {
          'tabindex': '0',
          'aria-selected': 'true'
        });
        (0, _removeClass.removeClass)(navPrev, navActiveClass);
        (0, _addClass.addClass)(navCurrent, navActiveClass);
      }
    }
  }

  function getLowerCaseNodeName(el) {
    return el.nodeName.toLowerCase();
  }

  function isButton(el) {
    return getLowerCaseNodeName(el) === 'button';
  }

  function isAriaDisabled(el) {
    return el.getAttribute('aria-disabled') === 'true';
  }

  function disEnableElement(isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    } else {
      el.setAttribute('aria-disabled', val.toString());
    }
  }

  // set 'disabled' to true on controls when reach the edges
  function updateControlsStatus() {
    if (!controls || rewind || loop) {
      return;
    }

    var prevDisabled = prevIsButton ? prevButton.disabled : isAriaDisabled(prevButton),
        nextDisabled = nextIsButton ? nextButton.disabled : isAriaDisabled(nextButton),
        disablePrev = index === indexMin ? true : false,
        disableNext = !rewind && index === indexMax ? true : false;

    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  }

  // set duration
  function resetDuration(el, str) {
    if (TRANSITIONDURATION) {
      el.style[TRANSITIONDURATION] = str;
    }
  }

  function getContainerTransformValue() {
    var val;
    if (horizontal) {
      if (fixedWidth) {
        val = -(fixedWidth + gutter) * index + 'px';
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;
        val = -index * 100 / denominator + '%';
      }
    } else {
      val = -slideOffsetTops[index] + 'px';
    }
    return val;
  }

  function doContainerTransformSilent(val) {
    resetDuration(container, '0s');
    doContainerTransform(val);
    setTimeout(function () {
      resetDuration(container, '');
    }, 0);
  }

  function doContainerTransform(val, test) {
    if (!val) {
      val = getContainerTransformValue();
    }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide(number, classOut, classIn, isOut) {
    var l = number + items;
    if (!loop) {
      l = Math.min(l, slideCountNew);
    }

    for (var i = number; i < l; i++) {
      var item = slideItems[i];

      // set item positions
      if (!isOut) {
        item.style.left = (i - index) * 100 / items + '%';
      }

      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      (0, _removeClass.removeClass)(item, classOut);
      (0, _addClass.addClass)(item, classIn);

      if (isOut) {
        slideItemsOut.push(item);
      }
    }
  }

  // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers
  var transformCore = function () {
    return carousel ? function (duration, distance) {
      if (!distance) {
        distance = getContainerTransformValue();
      }

      // constrain the distance when non-loop no-edgePadding fixedWidth reaches the right edge
      if (hasRightDeadZone && index === indexMax) {
        distance = -((fixedWidth + gutter) * slideCountNew - vpInner) + 'px';
      }

      if (TRANSITIONDURATION || !duration) {
        // for morden browsers with non-zero duration or 
        // zero duration for all browsers
        doContainerTransform(distance);
        // run fallback function manually 
        // when duration is 0 / container is hidden
        if (!duration || !(0, _isVisible.isVisible)(container)) {
          onTransitionEnd();
        }
      } else {
        // for old browser with non-zero duration
        (0, _jsTransform.jsTransform)(container, transformAttr, transformPrefix, transformPostfix, distance, speed, onTransitionEnd);
      }

      if (!horizontal) {
        updateContentWrapperHeight();
      }
    } : function (duration) {
      slideItemsOut = [];

      var eve = {};
      eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
      (0, _removeEvents.removeEvents)(slideItems[indexCached], eve);
      (0, _addEvents.addEvents)(slideItems[index], eve);

      animateSlide(indexCached, animateIn, animateOut, true);
      animateSlide(index, animateNormal, animateIn);

      // run fallback function manually 
      // when transition or animation not supported / duration is 0
      if (!TRANSITIONEND || !ANIMATIONEND || !duration) {
        onTransitionEnd();
      }
    };
  }();

  function doTransform(duration, distance) {
    // check duration is defined and is a number
    if (isNaN(duration)) {
      duration = speed;
    }

    // if container is hidden, set duration to 0
    // to fix an issue where browser doesn't fire ontransitionend on hidden element
    if (animating && !(0, _isVisible.isVisible)(container)) {
      duration = 0;
    }

    transformCore(duration, distance);
  }

  function render(e, sliderMoved) {
    if (updateIndexBeforeTransform) {
      updateIndex();
    }

    // render when slider was moved (touch or drag) even though index may not change
    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());

      // pause autoplay when click or keydown from user
      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) {
        stopAutoplay();
      }

      running = true;
      doTransform();
    }
  }

  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */
  function strTrans(str) {
    return str.toLowerCase().replace(/-/g, '');
  }

  // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height
  function onTransitionEnd(event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));

      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item = slideItemsOut[i];
          // set item positions
          item.style.left = '';

          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item.style[ANIMATIONDELAY] = '';
            item.style[TRANSITIONDELAY] = '';
          }
          (0, _removeClass.removeClass)(item, animateOut);
          (0, _addClass.addClass)(item, animateNormal);
        }
      }

      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event' 
       *    have to check event first, otherwise event.target will cause an error 
       * => or 'gallery' mode: 
       *   + event target is slide item
       * => or 'carousel' mode: 
       *   + event target is container, 
       *   + event.property is the same with transform attribute
       */
      if (!event || !carousel && event.target.parentNode === container || event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {

        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) {
            events.emit('indexChanged', info());

            doContainerTransformSilent();
          }
        }

        if (autoHeight) {
          runAutoHeight();
        }

        if (nested === 'inner') {
          events.emit('innerLoaded', info());
        }
        running = false;
        navCurrentIndexCached = navCurrentIndex;
        indexCached = index;
      }
    }
  }

  // # ACTIONS
  function goTo(targetIndex, e) {
    if (freeze) {
      return;
    }

    // prev slideBy
    if (targetIndex === 'prev') {
      onControlsClick(e, -1);

      // next slideBy
    } else if (targetIndex === 'next') {
      onControlsClick(e, 1);

      // go to exact slide
    } else {
      if (running) {
        onTransitionEnd();
      }

      // } else if (!running) {
      var absIndex = getAbsIndex(),
          indexGap = 0;
      if (absIndex < 0) {
        absIndex += slideCount;
      }

      if (targetIndex === 'first') {
        indexGap = -absIndex;
      } else if (targetIndex === 'last') {
        indexGap = slideCount - items - absIndex;
      } else {
        if (typeof targetIndex !== 'number') {
          targetIndex = parseInt(targetIndex);
        }
        if (!isNaN(targetIndex)) {
          var absTargetIndex = getAbsIndex(targetIndex);
          if (absTargetIndex < 0) {
            absTargetIndex += slideCount;
          }
          indexGap = absTargetIndex - absIndex;
        }
      }

      index += indexGap;

      // if index is changed, start rendering
      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }
    }
  }

  // on controls click
  function onControlsClick(e, dir) {
    // if (!running) {
    if (running) {
      onTransitionEnd();
    }

    var passEventObject;

    if (!dir) {
      e = getEvent(e);
      var target = e.target || e.srcElement;

      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) {
        target = target.parentNode;
      }

      var targetIn = [prevButton, nextButton].indexOf(target);
      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }

    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo('last', e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo(0, e);
        return;
      }
    }

    if (dir) {
      index += slideBy * dir;
      // pass e when click control buttons or keydown
      render(passEventObject || e && e.type === 'keydown' ? e : null);
    }
    // }
  }

  // on nav click
  function onNavClick(e) {
    // if (!running) {
    if (running) {
      onTransitionEnd();
    }

    e = getEvent(e);
    var target = e.target || e.srcElement,
        navIndex;

    // find the clicked nav item
    while (target !== navContainer && !(0, _hasAttr.hasAttr)(target, 'data-nav')) {
      target = target.parentNode;
    }
    if ((0, _hasAttr.hasAttr)(target, 'data-nav')) {
      navIndex = navClicked = [].indexOf.call(navItems, target);
      goTo(navIndex + cloneCount, e);
    }
    // }
  }

  // autoplay functions
  function setAutoplayTimer() {
    autoplayTimer = setInterval(function () {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);

    animating = true;
  }

  function stopAutoplayTimer() {
    clearInterval(autoplayTimer);
    animating = false;
  }

  function updateAutoplayButton(action, txt) {
    (0, _setAttrs.setAttrs)(autoplayButton, { 'data-action': action });
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }

  function startAutoplay() {
    setAutoplayTimer();
    if (autoplayButton) {
      updateAutoplayButton('stop', autoplayText[1]);
    }
  }

  function stopAutoplay() {
    stopAutoplayTimer();
    if (autoplayButton) {
      updateAutoplayButton('start', autoplayText[0]);
    }
  }

  // programaitcally play/pause the slider
  function play() {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function pause() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }

  function toggleAutoplay() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    } else {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }

  function onVisibilityChange() {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }

  function mouseoverPause() {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }

  function mouseoutRestart() {
    if (autoplayHoverPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  }

  // keydown events on document 
  function onDocumentKeydown(e) {
    e = getEvent(e);
    switch (e.keyCode) {
      case KEYS.LEFT:
        onControlsClick(e, -1);
        break;
      case KEYS.RIGHT:
        onControlsClick(e, 1);
    }
  }

  // on key control
  function onControlsKeydown(e) {
    e = getEvent(e);
    var code = e.keyCode;

    switch (code) {
      case KEYS.LEFT:
      case KEYS.UP:
      case KEYS.PAGEUP:
        if (!prevButton.disabled) {
          onControlsClick(e, -1);
        }
        break;
      case KEYS.RIGHT:
      case KEYS.DOWN:
      case KEYS.PAGEDOWN:
        if (!nextButton.disabled) {
          onControlsClick(e, 1);
        }
        break;
      case KEYS.HOME:
        goTo(0, e);
        break;
      case KEYS.END:
        goTo(slideCount - 1, e);
        break;
    }
  }

  // set focus
  function setFocus(focus) {
    focus.focus();
  }

  // on key nav
  function onNavKeydown(e) {
    var curElement = doc.activeElement;
    if (!(0, _hasAttr.hasAttr)(curElement, 'data-nav')) {
      return;
    }

    e = getEvent(e);
    var code = e.keyCode,
        navIndex = [].indexOf.call(navItems, curElement),
        len = visibleNavIndexes.length,
        current = visibleNavIndexes.indexOf(navIndex);

    if (options.navContainer) {
      len = slideCount;
      current = navIndex;
    }

    function getNavIndex(num) {
      return options.navContainer ? num : visibleNavIndexes[num];
    }

    switch (code) {
      case KEYS.LEFT:
      case KEYS.PAGEUP:
        if (current > 0) {
          setFocus(navItems[getNavIndex(current - 1)]);
        }
        break;

      case KEYS.UP:
      case KEYS.HOME:
        if (current > 0) {
          setFocus(navItems[getNavIndex(0)]);
        }
        break;

      case KEYS.RIGHT:
      case KEYS.PAGEDOWN:
        if (current < len - 1) {
          setFocus(navItems[getNavIndex(current + 1)]);
        }
        break;

      case KEYS.DOWN:
      case KEYS.END:
        if (current < len - 1) {
          setFocus(navItems[getNavIndex(len - 1)]);
        }
        break;

      // Can't use onNavClick here,
      // Because onNavClick require event.target as nav items
      case KEYS.ENTER:
      case KEYS.SPACE:
        navClicked = navIndex;
        goTo(navIndex + cloneCount, e);
        break;
    }
  }

  // IE10 scroll function
  function ie10Scroll() {
    transformCore(0, container.scrollLeft());
    indexCached = index;
  }

  function getEvent(e) {
    e = e || win.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }
  function getTarget(e) {
    return e.target || win.event.srcElement;
  }

  function isTouchEvent(e) {
    return e.type.indexOf('touch') >= 0;
  }

  function preventDefaultBehavior(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }

  function onPanStart(e) {
    if (running) {
      onTransitionEnd();
    }

    panStart = true;
    (0, _caf.caf)(rafIndex);
    rafIndex = (0, _raf.raf)(function () {
      panUpdate(e);
    });

    var $ = getEvent(e);
    events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));

    if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }

    lastPosition.x = initPosition.x = parseInt($.clientX);
    lastPosition.y = initPosition.y = parseInt($.clientY);
    translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, '').replace(transformPostfix, ''));

    resetDuration(container, '0s');
  }

  function onPanMove(e) {
    if (panStart) {
      var $ = getEvent(e);
      lastPosition.x = parseInt($.clientX);
      lastPosition.y = parseInt($.clientY);
    }
  }

  function panUpdate(e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }
    (0, _caf.caf)(rafIndex);
    if (panStart) {
      rafIndex = (0, _raf.raf)(function () {
        panUpdate(e);
      });
    }

    if (moveDirectionExpected === '?' && lastPosition.x !== initPosition.x && lastPosition.y !== initPosition.y) {
      moveDirectionExpected = (0, _getTouchDirection.getTouchDirection)((0, _toDegree.toDegree)(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
    }

    if (moveDirectionExpected) {
      events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));

      var x = translateInit,
          dist = getDist(lastPosition, initPosition);
      if (!horizontal || fixedWidth) {
        x += dist;
        x += 'px';
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / (vpInner * slideCountNew) : dist * 100 / vpInner;
        x += percentageX;
        x += '%';
      }

      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }

  function onPanEnd(e) {
    if (swipeAngle) {
      moveDirectionExpected = '?';
    } // reset

    if (panStart) {
      (0, _caf.caf)(rafIndex);
      resetDuration(container, '');
      panStart = false;

      var $ = getEvent(e);
      lastPosition.x = parseInt($.clientX);
      lastPosition.y = parseInt($.clientY);
      var dist = getDist(lastPosition, initPosition);

      // initPosition = {x:0, y:0}; // reset positions
      // lastPosition = {x:0, y:0}; // reset positions

      if (Math.abs(dist) >= 5) {
        // drag vs click
        if (!isTouchEvent(e)) {

          // prevent "click"
          var target = getTarget(e);
          (0, _addEvents.addEvents)(target, { 'click': function preventClick(e) {
              preventDefaultBehavior(e);
              (0, _removeEvents.removeEvents)(target, { 'click': preventClick });
            } });
        }

        rafIndex = (0, _raf.raf)(function () {
          events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));

          if (horizontal) {
            var indexMoved = -dist * items / vpInner;
            indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
            index += indexMoved;
          } else {
            var moved = -(translateInit + dist);
            if (moved <= 0) {
              index = indexMin;
            } else if (moved >= slideOffsetTops[slideOffsetTops.length - 1]) {
              index = indexMax;
            } else {
              var i = 0;
              do {
                i++;
                index = dist < 0 ? i + 1 : i;
              } while (i < slideCountNew && moved >= slideOffsetTops[i + 1]);
            }
          }

          render(e, dist);
        });
      }
    }
  }

  // === RESIZE FUNCTIONS === //
  // (slideOffsetTops, index, items) => vertical_conentWrapper.height
  function updateContentWrapperHeight() {
    innerWrapper.style.height = slideOffsetTops[index + items] - slideOffsetTops[index] + 'px';
  }

  /*
   * get nav item indexes per items
   * add 1 more if the nav items cann't cover all slides
   * [0, 1, 2, 3, 4] / 3 => [0, 3]
   */
  function getVisibleNavIndex() {
    // reset visibleNavIndexes
    visibleNavIndexes = [];

    var absIndexMin = getAbsIndex() % items;
    while (absIndexMin < slideCount) {
      if (!loop && absIndexMin + items > slideCount) {
        absIndexMin = slideCount - items;
      }
      visibleNavIndexes.push(absIndexMin);
      absIndexMin += items;
    }

    // nav count * items < slide count means
    // some slides can not be displayed only by nav clicking
    if (loop && visibleNavIndexes.length * items < slideCount || !loop && visibleNavIndexes[0] > 0) {
      visibleNavIndexes.unshift(0);
    }
  }

  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */
  function updateNavVisibility() {
    if (!nav || navAsThumbnails) {
      return;
    }
    getVisibleNavIndex();

    if (visibleNavIndexes !== visibleNavIndexesCached) {
      (0, _forEachNodeList.forEachNodeList)(navItems, function (el, i) {
        if (visibleNavIndexes.indexOf(i) < 0) {
          (0, _hideElement.hideElement)(el);
        } else {
          (0, _showElement.showElement)(el);
        }
      });

      // cache visible nav indexes
      visibleNavIndexesCached = visibleNavIndexes;
    }
  }

  function info(e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      visibleNavIndexes: visibleNavIndexes,
      visibleNavIndexesCached: visibleNavIndexesCached,
      sheet: sheet,
      event: e || {}
    };
  }

  return {
    getInfo: info,
    events: events,
    goTo: goTo,
    play: play,
    pause: pause,
    isOn: isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    rebuild: function rebuild() {
      return tns(options);
    },

    destroy: function destroy() {
      // remove win event listeners
      (0, _removeEvents.removeEvents)(win, { 'resize': onResize });

      // remove arrowKeys eventlistener
      (0, _removeEvents.removeEvents)(doc, docmentKeydownEvent);

      // sheet
      sheet.disabled = true;

      // cloned items
      if (loop) {
        for (var j = cloneCount; j--;) {
          if (carousel) {
            slideItems[0].remove();
          }
          slideItems[slideItems.length - 1].remove();
        }
      }

      // Slide Items
      var slideClasses = ['tns-item', slideActiveClass];
      if (!carousel) {
        slideClasses = slideClasses.concat('tns-normal', animateIn);
      }

      for (var i = slideCount; i--;) {
        var slide = slideItems[i];
        if (slide.id.indexOf(slideId + '-item') >= 0) {
          slide.id = '';
        }

        slideClasses.forEach(function (cl) {
          (0, _removeClass.removeClass)(slide, cl);
        });
      }
      (0, _removeAttrs.removeAttrs)(slideItems, ['style', 'aria-hidden', 'tabindex']);
      slideItems = slideId = slideCount = slideCountNew = cloneCount = null;

      // controls
      if (controls) {
        (0, _removeEvents.removeEvents)(controlsContainer, controlsEvents);
        if (options.controlsContainer) {
          (0, _removeAttrs.removeAttrs)(controlsContainer, ['aria-label', 'tabindex']);
          (0, _removeAttrs.removeAttrs)(controlsContainer.children, ['aria-controls', 'aria-disabled', 'tabindex']);
        }
        controlsContainer = prevButton = nextButton = null;
      }

      // nav
      if (nav) {
        (0, _removeEvents.removeEvents)(navContainer, navEvents);
        if (options.navContainer) {
          (0, _removeAttrs.removeAttrs)(navContainer, ['aria-label']);
          (0, _removeAttrs.removeAttrs)(navItems, ['aria-selected', 'aria-controls', 'tabindex']);
        }
        navContainer = navItems = null;
      }

      // auto
      if (autoplay) {
        clearInterval(autoplayTimer);
        if (autoplayButton) {
          (0, _removeEvents.removeEvents)(autoplayButton, { 'click': toggleAutoplay });
        }
        (0, _removeEvents.removeEvents)(container, hoverEvents);
        (0, _removeEvents.removeEvents)(container, visibilityEvent);
        if (options.autoplayButton) {
          (0, _removeAttrs.removeAttrs)(autoplayButton, ['data-action']);
        }
      }

      // container
      container.id = containerIdCached || '';
      container.className = container.className.replace(classContainer, '');
      (0, _removeElementStyles.removeElementStyles)(container);
      if (carousel && TRANSITIONEND) {
        var eve = {};
        eve[TRANSITIONEND] = onTransitionEnd;
        (0, _removeEvents.removeEvents)(container, eve);
      }
      (0, _removeEvents.removeEvents)(container, touchEvents);
      (0, _removeEvents.removeEvents)(container, dragEvents);

      // outerWrapper
      containerParent.insertBefore(container, outerWrapper);
      outerWrapper.remove();
      outerWrapper = innerWrapper = container = index = indexCached = items = slideBy = navCurrentIndex = navCurrentIndexCached = hasControls = visibleNavIndexes = visibleNavIndexesCached = this.getInfo = this.events = this.goTo = this.play = this.pause = this.destroy = null;
      this.isOn = isOn = false;
    }
  };
};

},{"./helpers/addCSSRule":3,"./helpers/addClass":4,"./helpers/addEvents":5,"./helpers/arrayFromNodeList":6,"./helpers/caf":7,"./helpers/calc":8,"./helpers/checkStorageValue":9,"./helpers/childNode.remove":10,"./helpers/createStyleSheet":12,"./helpers/events":14,"./helpers/extend":15,"./helpers/forEachNodeList":16,"./helpers/getAttr":17,"./helpers/getCssRulesLength":19,"./helpers/getEndProperty":20,"./helpers/getSlideId":21,"./helpers/getTouchDirection":22,"./helpers/hasAttr":23,"./helpers/hasClass":24,"./helpers/hideElement":25,"./helpers/isVisible":27,"./helpers/jsTransform":28,"./helpers/keys":29,"./helpers/mediaquerySupport":30,"./helpers/raf":32,"./helpers/removeAttrs":33,"./helpers/removeClass":34,"./helpers/removeElementStyles":35,"./helpers/removeEvents":36,"./helpers/setAttrs":38,"./helpers/setLocalStorage":40,"./helpers/showElement":41,"./helpers/subpixelLayout":42,"./helpers/toDegree":43,"./helpers/whichProperty":44}]},{},[2]);
