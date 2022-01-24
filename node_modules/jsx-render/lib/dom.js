"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.portalCreator = exports.Fragment = exports.default = void 0;

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * The tag name and create an html together with the attributes
 *
 * @param  {String} tagName name as string, e.g. 'div', 'span', 'svg'
 * @param  {Object} attrs html attributes e.g. data-, width, src
 * @param  {Array} children html nodes from inside de elements
 * @return {HTMLElement} html node with attrs
 */
function createElements(tagName, attrs, children) {
  var element = (0, _utils.isSVG)(tagName) ? document.createElementNS('http://www.w3.org/2000/svg', tagName) : document.createElement(tagName); // one or multiple will be evaluated to append as string or HTMLElement

  var fragment = (0, _utils.createFragmentFrom)(children);
  element.appendChild(fragment);
  Object.keys(attrs || {}).forEach(function (prop) {
    if (prop === 'style') {
      // e.g. origin: <element style={{ prop: value }} />
      element.style.cssText = (0, _utils.objectToStyleString)(attrs[prop]);
    } else if (prop === 'ref' && typeof attrs.ref === 'function') {
      attrs.ref(element, attrs);
    } else if (prop === 'className') {
      element.setAttribute('class', attrs[prop]);
    } else if (prop === 'xlinkHref') {
      element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[prop]);
    } else if (prop === 'dangerouslySetInnerHTML') {
      // eslint-disable-next-line no-underscore-dangle
      element.innerHTML = attrs[prop].__html;
    } else {
      // any other prop will be set as attribute
      element.setAttribute(prop, attrs[prop]);
    }
  });
  return element;
}
/**
 * The JSXTag will be unwrapped returning the html
 *
 * @param  {Function} JSXTag name as string, e.g. 'div', 'span', 'svg'
 * @param  {Object} elementProps custom jsx attributes e.g. fn, strings
 * @param  {Array} children html nodes from inside de elements
 *
 * @return {Function} returns de 'dom' (fn) executed, leaving the HTMLElement
 *
 * JSXTag:  function Comp(props) {
 *   return dom("span", null, props.num);
 * }
 */


function composeToFunction(JSXTag, elementProps, children) {
  var props = Object.assign({}, JSXTag.defaultProps || {}, elementProps, {
    children: children
  });
  var bridge = JSXTag.prototype.render ? new JSXTag(props).render : JSXTag;
  var result = bridge(props);

  switch (result) {
    case 'FRAGMENT':
      return (0, _utils.createFragmentFrom)(children);
    // Portals are useful to render modals
    // allow render on a different element than the parent of the chain
    // and leave a comment instead

    case 'PORTAL':
      bridge.target.appendChild((0, _utils.createFragmentFrom)(children));
      return document.createComment('Portal Used');

    default:
      return result;
  }
}

function dom(element, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // Custom Components will be functions
  if (typeof element === 'function') {
    // e.g. const CustomTag = ({ w }) => <span width={w} />
    // will be used
    // e.g. <CustomTag w={1} />
    // becomes: CustomTag({ w: 1})
    return composeToFunction(element, attrs, children);
  } // regular html components will be strings to create the elements
  // this is handled by the babel plugins


  if (typeof element === 'string') {
    return createElements(element, attrs, children);
  }

  return console.error("jsx-render does not handle ".concat(typeof tag === "undefined" ? "undefined" : _typeof(tag)));
}

var _default = dom;
exports.default = _default;

var Fragment = function Fragment() {
  return 'FRAGMENT';
};

exports.Fragment = Fragment;

var portalCreator = function portalCreator(node) {
  function Portal() {
    return 'PORTAL';
  }

  Portal.target = document.body;

  if (node && node.nodeType === Node.ELEMENT_NODE) {
    Portal.target = node;
  }

  return Portal;
};

exports.portalCreator = portalCreator;