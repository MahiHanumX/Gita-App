import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const procPath = path.join(root, 'node_modules', 'native-sim', 'src', 'lib', 'proc.js');
const ghPath = path.join(root, 'node_modules', 'native-sim', 'src', 'lib', 'gh.js');

if (fs.existsSync(procPath)) {
  let content = fs.readFileSync(procPath, 'utf8');
  if (content.includes("return sh('which', [cmd]).ok;")) {
    content = content.replace(
      "return sh('which', [cmd]).ok;",
      "const binary = process.platform === 'win32' ? 'where' : 'which';\n  return sh(binary, [cmd]).ok || sh(cmd, ['--version']).ok;"
    );
    fs.writeFileSync(procPath, content, 'utf8');
    console.log('✓ Patched native-sim proc.js for Windows');
  }
}

if (fs.existsSync(ghPath)) {
  let content = fs.readFileSync(ghPath, 'utf8');
  if (content.includes("if (!sh('which', ['gh']).ok)")) {
    content = content.replace("import { sh, shx } from './proc.js';", "import { sh, shx, has } from './proc.js';");
    content = content.replace("if (!sh('which', ['gh']).ok)", "if (!has('gh'))");
    fs.writeFileSync(ghPath, content, 'utf8');
    console.log('✓ Patched native-sim gh.js for Windows');
  }
}
