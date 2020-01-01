import * as assert from 'assert';
import convert from '..';

it('API', async () => {
  const converted = convert(`123\n\n"'\\\`$`);
  assert.equal(
    converted,
    `import { css } from 'lit-element';
export default css\`123

"'\\\\\\\`\\\$\`;
`,
  );
});
