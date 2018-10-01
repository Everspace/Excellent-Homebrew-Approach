// jest-preprocess.js
// const babelOptions = {
//   presets: ["@babel/react", "@babel/env"],
//   plugins: [
//     "@babel/plugin-proposal-optional-chaining",
//     "@babel/plugin-proposal-class-properties",
//   ],
// }

const babelOptions = require("./babel.config")

module.exports = require("babel-jest").createTransformer(babelOptions)
