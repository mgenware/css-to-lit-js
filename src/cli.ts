#!/usr/bin/env node
/* eslint-disable arrow-body-style */
import * as mfs from 'm-fs';
import rename from 'node-rename-path';
import * as nodepath from 'path';
import parseArgs from 'meow';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import convert from './main.js';

const dirname = nodepath.dirname(fileURLToPath(import.meta.url));
const json = JSON.parse(await readFile(nodepath.join(dirname, '../package.json'), 'utf8'));

const cli = parseArgs(
  `
  Usage
    $ ${json.name} <task>

  Options
    --ext          Out file extension, defaults to 'js'
    --version, -v  Print version information
    
`,
  {
    importMeta: import.meta,
    flags: {
      ext: {
        type: 'string',
      },
      out: {
        type: 'string',
      },
      outdir: {
        type: 'string',
      },
      version: {
        type: 'boolean',
        alias: 'v',
      },
    },
  },
);

const { flags } = cli;
if (flags.version) {
  // eslint-disable-next-line no-console
  console.log(json.version);
  process.exit();
}

(async () => {
  const inputArray = cli.input;
  const inputFile = Array.isArray(inputArray) ? inputArray[0] : (inputArray as string);
  if (!inputFile) {
    console.error('No input file');
    process.exit(1);
  }

  const src = await mfs.readTextFileAsync(inputFile);
  const dest = convert(src);
  let destPath: string;
  if (flags.out) {
    destPath = flags.out;
  } else {
    const destFileName = rename(inputFile, () => {
      return {
        ext: `.${flags.ext || 'js'}`,
      };
    });
    if (flags.outdir) {
      destPath = nodepath.join(flags.outdir, nodepath.basename(destFileName));
    } else {
      destPath = destFileName;
    }
  }
  // eslint-disable-next-line no-console
  console.log(`Writing file "${destPath}"`);
  await mfs.writeFileAsync(destPath, dest);
})();
