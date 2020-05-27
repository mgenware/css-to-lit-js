import encode from 'string-to-template-literal';

export default function convert(css: string): string {
  const encoded = encode(css);
  return `/* eslint-disable */\nimport { css } from 'lit-element';\nexport default css${encoded};\n`;
}
