/**
 * Exécute image-optimizer/optimize.py en essayant plusieurs commandes Python.
 * Usage: node scripts/invoke-image-optimizer.mjs [args... passés à optimize.py]
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const script = join(root, 'image-optimizer', 'optimize.py');
const extra = process.argv.slice(2);

const candidates =
  process.platform === 'win32'
    ? [
        ['py', ['-3', script, ...extra]],
        ['python', [script, ...extra]],
        ['py', [script, ...extra]],
      ]
    : [
        ['python3', [script, ...extra]],
        ['python', [script, ...extra]],
      ];

for (const [cmd, args] of candidates) {
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: false });
  if (r.error?.code === 'ENOENT') {
    continue;
  }
  process.exit(r.status ?? 0);
}

// eslint-disable-next-line no-console
console.error(
  "Python n'a pas été trouvé. Installez Python 3, puis: pip install -r image-optimizer/requirements.txt",
);
process.exit(1);
