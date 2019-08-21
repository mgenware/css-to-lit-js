# css-to-lit-js

Convert CSS to lit-element JavaScript file

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://img.shields.io/travis/mgenware/css-to-lit-js.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/css-to-lit-js)
[![npm version](https://img.shields.io/npm/v/css-to-lit-js.svg?style=flat-square)](https://npmjs.com/package/css-to-lit-js)
[![Node.js Version](http://img.shields.io/node/v/css-to-lit-js.svg?style=flat-square)](https://nodejs.org/en/)

## Installation

```sh
npm i css-to-lit-js -g
```

## Usage

Given a CSS file like:

```css
body {
  background-color: #ededed;
}
```

Run `css-to-lit-js`:

```sh
css-to-lit-js a.css
```

`a.js` is generated with the following contents:

```js
import { css } from 'lit-element';
export default css`
  body {
    background-color: #ededed;
  }
`;
```
