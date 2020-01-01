import encode from 'string-to-template-literal';

export default function convert(css: string): string {
  const encoded = encode(css);
  return `import { css } from 'lit-element';\nexport default css${encoded};\n`;
}
