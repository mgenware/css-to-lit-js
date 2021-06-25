#!/usr/bin/env node
/* eslint-disable arrow-body-style */
import * as mfs from 'm-fs';
import rename from 'node-rename-path';
import * as nodepath from 'path';
import convert from './main';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const args = require('gar')(process.argv.slice(2));

(async () => {
  const inputArray = args._;
  const inputFile = Array.isArray(inputArray) ? inputArray[0] : (inputArray as string);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!inputFile) {
    console.error('No input file');
    process.exit(1);
  }

  const src = await mfs.readTextFileAsync(inputFile);
  const dest = convert(src);
  let destPath: string;
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (args.out) {
    destPath = args.out;
  } else {
    const destFileName = rename(inputFile, () => {
      return {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        ext: `.${args.ext || 'js'}`,
      };
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (args.outdir) {
      destPath = nodepath.join(args.outdir, nodepath.basename(destFileName));
    } else {
      destPath = destFileName;
    }
  }
  // eslint-disable-next-line no-console
  console.log(`Writing file "${destPath}"`);
  await mfs.writeFileAsync(destPath, dest);
})();
