/* Optional scroll animation compiler. The normal site build uses the bundled public file. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const index = process.argv.indexOf('--modules');
const modules = index >= 0 ? path.resolve(process.argv[index + 1]) : path.join(root, 'node_modules');
const esbuild = require(path.join(modules, 'esbuild'));
esbuild.buildSync({absWorkingDir:root,entryPoints:['scripts/scroll-experience.js'],outfile:'assets/scroll-experience.js',bundle:true,minify:true,format:'iife',globalName:'CCPMotion',target:'es2020',legalComments:'eof',nodePaths:[modules]});
let notices = 'Third-party software notices\nLocally bundled libraries; no CDN requests.\n\n';

notices += '\n\nGSAP 3.15.1\n';
const gsapSource = fs.readFileSync(path.join(modules, 'gsap/gsap-core.js'), 'utf8');
const notice = gsapSource.match(/\/\*![\s\S]*?\*\//);
if (!notice) throw Error('Missing GSAP license notice');
notices += notice[0] + '\n';
fs.writeFileSync(path.join(root, 'assets/third-party-notices.txt'), notices);
console.log('Local scroll animation bundle compiled.');
