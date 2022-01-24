"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSVG = isSVG;
exports.objectToStyleString = objectToStyleString;
exports.createFragmentFrom = createFragmentFrom;

function isSVG(element) {
  var patt = new RegExp("^".concat(element, "$"), 'i');
  var SVGTags = ['path', 'svg', 'use', 'g'];
  return SVGTags.some(function (tag) {
    return patt.test(tag);
  });
}

function objectToStyleString(styles) {
  return Object.keys(styles).map(function (prop) {
    return "".concat(prop, ": ").concat(styles[prop]);
  }).join(';');
}

function createFragmentFrom(children) {
  // fragments will help later to append multiple children to the initial node
  var fragment = document.createDocumentFragment();

  function processDOMNodes(child) {
    if (child instanceof HTMLElement || child instanceof SVGElement || child instanceof Comment || child instanceof DocumentFragment) {
      fragment.appendChild(child);
    } else if (typeof child === 'string' || typeof child === 'number') {
      var textnode = document.createTextNode(child);
      fragment.appendChild(textnode);
    } else if (child instanceof Array) {
      child.forEach(processDOMNodes);
    } else if (child === false || child === null) {// expression evaluated as false e.g. {false && <Elem />}
      // expression evaluated as false e.g. {null && <Elem />}
    } else if (process.env.NODE_ENV) {
      // later other things could not be HTMLElement nor strings
      console.log(child, 'is not appendable');
    }
  }

  children.forEach(processDOMNodes);
  return fragment;
}