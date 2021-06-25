import * as assert from 'assert';
import convert from '../dist/main.js';

it('API', async () => {
  const converted = convert(`123\n\n"'\\\`$`);
  assert.equal(
    converted,
    `/* eslint-disable */
import { css } from 'lit';
export default css\`123
"'\\\\\\\`\\$\`;
`,
  );
});
