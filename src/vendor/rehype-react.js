// Modified version of rehype-react
// Linted + properties change to allow for generated div to respond to props if you so chose.

// from https://github.com/rhysd/rehype-react
// commit: ef29ab7e270aa3b9954cf2d4ba0a2b0de4ec175c

/* LICENCE
(The MIT License)

Copyright (c) 2016 rhysd
Copyright (c) 2015 Mapbox
Copyright (c) 2015 Titus Wormer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// tslint:disable
/* eslint-disable */

"use strict"

/* Dependencies. */
var has = require("has")
var toH = require("hast-to-hyperscript")

/* Expose `rehype-react`. */
module.exports = rehype2react

/**
 * Attach a react compiler.
 *
 * @param {Unified} processor - Instance.
 * @param {Object?} [options]
 * @param {Object?} [options.components]
 *   - Components.
 * @param {string?} [options.prefix]
 *   - Key prefix.
 * @param {Function?} [options.createElement]
 *   - `h()`.
 */
function rehype2react(options) {
  var settings = options || {}
  var createElement = settings.createElement
  var components = settings.components || {}

  this.Compiler = compiler

  /* Compile HAST to React. */
  function compiler(node) {
    if (node.type === "root") {
      if (node.children.length === 1 && node.children[0].type === "element") {
        node = node.children[0]
      } else {
        node = {
          children: node.children,
          properties: node.properties || {},
          tagName: "div",
          type: "element",
        }
      }
    }

    return toH(h, node, settings.prefix)
  }

  /* Wrap `createElement` to pass components in. */
  function h(name, props, children) {
    var component = has(components, name) ? components[name] : name
    return createElement(component, props, children)
  }
}
