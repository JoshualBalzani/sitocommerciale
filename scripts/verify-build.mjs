import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist-github');
const {siteUrl}=JSON.parse(fs.readFileSync(path.join(root,'pages-runtime.json'),'utf8'));
const origin=new URL(siteUrl).origin;
let count=0;
function check(directory){
 for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
  const file=path.join(directory,entry.name);
  assert(!/visura|node_modules|\.pdf$|^\.seo$|^\.github$/.test(entry.name),`Private file in output: ${file}`);
  if(entry.isDirectory()){check(file);continue;}
  if(!file.endsWith('.html'))continue;
  count++;const html=fs.readFileSync(file,'utf8');
  assert.match(html,/<html lang="it"/);assert.match(html,/http-equiv="Content-Security-Policy"/);
  assert(!/section-stack-active|hero-brand-mark|hero-scroll-cue|<canvas|main\.js|studio\.css|linear\.css/.test(html),`Legacy implementation: ${file}`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,`Expected one h1: ${file}`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);assert.equal(new Set(ids).size,ids.length,`Duplicate IDs: ${file}`);
  for(const match of html.matchAll(/\b(?:href|src|action)="([^"]+)"/g)){
   const value=match[1].replaceAll('&amp;','&');if(/^(?:mailto:|tel:|data:)/.test(value))continue;
   const url=new URL(value,new URL(path.relative(root,file).replaceAll(path.sep,'/'),siteUrl+'/'));
   if(url.origin!==origin)continue;
   let target=path.join(root,decodeURIComponent(url.pathname));if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
   assert(fs.existsSync(target),`Missing public resource: ${value} in ${file}`);
   if(url.hash&&target.endsWith('.html'))assert(fs.readFileSync(target,'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing anchor: ${value}`);
  }
 }
}
check(root);
assert(fs.existsSync(path.join(root,'.nojekyll')));assert(fs.existsSync(path.join(root,'404.html')));
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);assert.equal(urls.length,18);assert.equal(new Set(urls).size,urls.length);assert(urls.every(url=>url.startsWith(siteUrl+'/')));
for(const url of urls) assert(fs.existsSync(path.join(root,new URL(url).pathname,'index.html')),`Missing sitemap page: ${url}`);
console.log(`${count} static pages: routes, links, anchors, metadata, CSP and public assets verified.`);
