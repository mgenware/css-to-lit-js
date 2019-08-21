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
  console.log(tmpFile);
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
