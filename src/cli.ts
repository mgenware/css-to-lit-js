#!/usr/bin/env node
import * as mfs from 'm-fs';
import rename from 'node-rename-path';
import * as nodepath from 'path';
import convert from './main';
const args = require('gar')(process.argv.slice(2));

(async () => {
  const inputArray = args._;
  const inputFile = Array.isArray(inputArray)
    ? inputArray[0]
    : (inputArray as string);
  if (!inputFile) {
    console.error('No input file');
    process.exit(1);
  }

  const src = await mfs.readTextFileAsync(inputFile);
  const dest = convert(src);
  let destPath: string;
  if (args.out) {
    destPath = args.out;
  } else {
    const destFileName = rename(inputFile, () => {
      return {
        ext: `.${args.ext || 'js'}`,
      };
    });
    if (args.outdir) {
      destPath = nodepath.join(args.outdir, nodepath.basename(destFileName));
    } else {
      destPath = destFileName;
    }
  }
  console.log(`Writing file "${destPath}"`);
  await mfs.writeFileAsync(destPath, dest);
})();
