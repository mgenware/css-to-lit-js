import * as assert from 'assert';
import * as tempy from 'tempy';
import * as mfs from 'm-fs';
import { execSync } from 'child_process';

it('Basic', async () => {
  const tmpFile = tempy.file();
  console.log(' tmp ', tmpFile);
  await mfs.writeFileAsync(tmpFile, `123\n\n"'\\\`$`);
  execSync(`node ./dist/main.js "${tmpFile}"`);
  const contents = await mfs.readTextFileAsync(tmpFile);
  assert.equal(contents, `123\n\n"'\\\`\$`);
});
