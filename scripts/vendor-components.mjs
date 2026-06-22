import { access, cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesRoot = path.resolve(
  process.env.OPENVOX_EDITOR_SERVICES_DIR ?? path.join(projectRoot, '..', 'openvox-editor-services'),
);
const syntaxRoot = path.resolve(
  process.env.OPENVOX_EDITOR_SYNTAX_DIR ?? path.join(projectRoot, '..', 'openvox-editor-syntax'),
);
const languageServerTarget = path.join(projectRoot, 'vendor', 'languageserver');
const syntaxTarget = path.join(projectRoot, 'syntaxes', 'puppet.tmLanguage');

const requiredServicePaths = [
  'lib',
  'vendor',
  'openvox-languageserver',
  'openvox-languageserver-sidecar',
  'LICENSE',
];

await access(path.join(servicesRoot, 'vendor', 'puppet-lint', 'lib'));
await access(path.join(servicesRoot, 'vendor', 'puppetfile-resolver', 'lib'));

await rm(languageServerTarget, { recursive: true, force: true });
await rm(syntaxTarget, { force: true });
await mkdir(languageServerTarget, { recursive: true });
await mkdir(path.dirname(syntaxTarget), { recursive: true });

for (const relativePath of requiredServicePaths) {
  await cp(
    path.join(servicesRoot, relativePath),
    path.join(languageServerTarget, relativePath),
    { recursive: true },
  );
}

await cp(path.join(syntaxRoot, 'syntaxes', 'puppet.tmLanguage'), syntaxTarget);
await cp(path.join(syntaxRoot, 'LICENSE'), path.join(projectRoot, 'LICENSE.editor-syntax'));
await cp(path.join(syntaxRoot, 'NOTICE'), path.join(projectRoot, 'NOTICE.editor-syntax'));

console.log(`Vendored editor services from ${servicesRoot}`);
console.log(`Vendored editor syntax from ${syntaxRoot}`);
