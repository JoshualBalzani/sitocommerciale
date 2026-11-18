import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = path.resolve('dist-github');
const config = JSON.parse(fs.readFileSync('pages.config.json', 'utf8'));
const siteUrl = config.siteUrl.replace(/\/$/, '');
const basePolicy = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.web3forms.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests";
function visit(directory) {
  for (const entry of fs.readdirSync(directory,{withFileTypes:true})) {
    const file = path.join(directory,entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!file.endsWith('.html')) continue;
    let html = fs.readFileSync(file,'utf8');
    const scripts = [], styles = [];
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc\s*=|application\/ld\+json|application\/json/i.test(match[1]) || !match[2].trim()) continue;
      scripts.push(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`);
    }
    for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) styles.push(`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`);
    const policy = basePolicy.replace("script-src 'self'",`script-src 'self' ${[...new Set(scripts)].join(' ')}`.trim()).replace("style-src 'self'",`style-src 'self' ${[...new Set(styles)].join(' ')}`.trim());
    html = html.replace(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/gi,`<meta http-equiv="Content-Security-Policy" content="${policy}">`);
    fs.writeFileSync(file,html);
  }
}
visit(root);
fs.writeFileSync(path.join(root,'.nojekyll'),'');
fs.writeFileSync(path.join(root,'CNAME'),new URL(siteUrl).hostname+'\n');
fs.writeFileSync(path.join(root,'pages-runtime.json'),JSON.stringify({siteUrl,basePath:''},null,2)+'\n');
console.log(`Astro static output finalized for ${siteUrl}/`);
