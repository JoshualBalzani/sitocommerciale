/* Optional scroll animation compiler. The normal site build uses the bundled public file. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const index = process.argv.indexOf('--modules');
const modules = index >= 0 ? path.resolve(process.argv[index + 1]) : path.join(root, 'node_modules');
const esbuild = require(path.join(modules, 'esbuild'));
esbuild.buildSync({absWorkingDir:root,entryPoints:['scripts/scroll-experience.js'],outfile:'assets/scroll-experience.js',bundle:true,minify:true,format:'iife',globalName:'CCPMotion',target:'es2020',legalComments:'eof',nodePaths:[modules]});
fs.writeFileSync(path.join(root, 'assets/third-party-notices.txt'), 'Scroll interaction: original site code. No third-party animation library is bundled.\n');
console.log('Native scroll interaction compiled.');
