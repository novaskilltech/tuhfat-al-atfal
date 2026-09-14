const { cpSync, existsSync, mkdirSync, rmSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const output = join(root, 'public');
const staticEntries = ['index.html', 'ar', 'fr', 'assets'];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of staticEntries) {
  const source = join(root, entry);
  if (!existsSync(source)) throw new Error(`Missing static entry: ${entry}`);
  cpSync(source, join(output, entry), { recursive: true });
}
