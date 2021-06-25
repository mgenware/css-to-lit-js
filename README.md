# css-to-lit-js

[![Build Status](https://github.com/mgenware/css-to-lit-js/workflows/Build/badge.svg)](https://github.com/mgenware/css-to-lit-js/actions)
[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![npm version](https://img.shields.io/npm/v/css-to-lit-js.svg?style=flat-square)](https://npmjs.com/package/css-to-lit-js)
[![Node.js Version](http://img.shields.io/node/v/css-to-lit-js.svg?style=flat-square)](https://nodejs.org/en/)

Convert CSS to lit JavaScript file

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

It generates a `a.js`:

```js
import { css } from 'lit';
export default css`
  body {
    background-color: #ededed;
  }
`;
```

### Options

- `--ext` sets the extension for the output file, defaults to `js`, e.g. `css-to-lit-js a.css --ext ts`.

### API

Install `css-to-lit-js` locally:

```sh
yarn add css-to-lit-js
```

```ts
import convert from 'css-to-lit-js';

convert(`
body {
  background-color: #ededed;
}`);
/*
  Returns the following string:

import { css } from 'lit';
export default css`
  body {
    background-color: #ededed;
  }
`;

*/
```
