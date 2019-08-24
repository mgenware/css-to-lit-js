#!/usr/bin/env node
import * as mfs from 'm-fs';
import encode from 'string-to-template-literal';
import rename from 'node-rename-path';
const args = require('gar')(process.argv.slice(2));

(async () => {
  const inputArray = args._;
  const inputFile = Array.isArray(inputArray)
    ? inputArray[0]
    : (inputArray as string);
  if (!inputFile) {
    console.log('No input file');
    process.exit(1);
  }

  const srcContents = await mfs.readTextFileAsync(inputFile);
  const encoded = encode(srcContents);
  const destContents = `import {css} from 'lit-element';export default css${encoded};`;
  const destFile =
    args.out ||
    rename(inputFile, () => {
      return {
        ext: `.${args.ext || 'js'}`,
      };
    });
  await mfs.writeFileAsync(destFile, destContents);
})();
