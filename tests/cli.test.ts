import * as assert from 'assert';
import * as tempy from 'tempy';
import * as mfs from 'm-fs';
import * as nodepath from 'path';
import { execSync } from 'child_process';
import rename from 'node-rename-path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');
const CLI = `node ${pkg.bin[pkg.name]}`;

function newFile(): string {
  return tempy.file({ extension: '.css' });
}

it('Basic', async () => {
  const tmpFile = newFile();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`${CLI} "${tmpFile}"`);
  const contents = await mfs.readTextFileAsync(
    rename(tmpFile, () => {
      return {
        ext: '.js',
      };
    }),
  );
  assert.equal(
    contents,
    `/* eslint-disable */
import { css } from 'lit-element';
export default css\`123

"'\\\\\\\`\\\$\`;
`,
  );
});

it('`ext` option', async () => {
  const tmpFile = newFile();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`${CLI} "${tmpFile}" -ext ts`);
  const contents = await mfs.readTextFileAsync(
    rename(tmpFile, () => {
      return {
        ext: '.ts',
      };
    }),
  );
  assert.equal(
    contents,
    `/* eslint-disable */
import { css } from 'lit-element';
export default css\`123

"'\\\\\\\`\\\$\`;
`,
  );
});

it('`out` option', async () => {
  const tmpFile = newFile();
  const tmpDestFile = newFile();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`${CLI} "${tmpFile}" -ext ts -out "${tmpDestFile}"`);
  const contents = await mfs.readTextFileAsync(tmpDestFile);
  assert.equal(
    contents,
    `/* eslint-disable */
import { css } from 'lit-element';
export default css\`123

"'\\\\\\\`\\\$\`;
`,
  );
});

it('`outdir` option', async () => {
  const tmpFile = newFile();
  const tmpDir = tempy.directory();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`${CLI} "${tmpFile}" -ext ts -outdir "${tmpDir}"`);
  const contents = await mfs.readTextFileAsync(
    nodepath.join(tmpDir, nodepath.parse(tmpFile).name + '.ts'),
  );
  assert.equal(
    contents,
    `/* eslint-disable */
import { css } from 'lit-element';
export default css\`123

"'\\\\\\\`\\\$\`;
`,
  );
});
