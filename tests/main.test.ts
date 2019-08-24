import * as assert from 'assert';
import * as tempy from 'tempy';
import * as mfs from 'm-fs';
import { execSync } from 'child_process';
import rename from 'node-rename-path';

function newFile(): string {
  return tempy.file({ extension: '.css' });
}

it('Basic', async () => {
  const tmpFile = newFile();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`node ./dist/main.js "${tmpFile}"`);
  const contents = await mfs.readTextFileAsync(
    rename(tmpFile, () => {
      return {
        ext: '.js',
      };
    }),
  );
  assert.equal(
    contents,
    `import {css} from 'lit-element';export default css\`123

"'\\\\\\\`\\\$\`;`,
  );
});

it('`ext` option', async () => {
  const tmpFile = newFile();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`node ./dist/main.js "${tmpFile}" -ext ts`);
  const contents = await mfs.readTextFileAsync(
    rename(tmpFile, () => {
      return {
        ext: '.ts',
      };
    }),
  );
  assert.equal(
    contents,
    `import {css} from 'lit-element';export default css\`123

"'\\\\\\\`\\\$\`;`,
  );
});

it('`out` option', async () => {
  const tmpFile = newFile();
  const tmpDestFile = newFile();
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`node ./dist/main.js "${tmpFile}" -ext ts -out "${tmpDestFile}"`);
  const contents = await mfs.readTextFileAsync(tmpDestFile);
  assert.equal(
    contents,
    `import {css} from 'lit-element';export default css\`123

"'\\\\\\\`\\\$\`;`,
  );
});
