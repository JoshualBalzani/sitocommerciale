const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'pages.config.json'),'utf8'));
const at=process.argv.indexOf('--site-url');
let siteUrl=at>=0?process.argv[at+1]:config.siteUrl||process.env.PAGES_SITE_URL;
if(!siteUrl&&process.env.GITHUB_REPOSITORY){const [owner,repo]=process.env.GITHUB_REPOSITORY.split('/');if(owner&&repo)siteUrl='https://'+owner+'.github.io'+(repo.toLowerCase()===owner.toLowerCase()+'.github.io'?'':'/'+repo);}
if(!siteUrl)throw Error('URL Pages non ancora impostato. GitHub Actions lo ricava automaticamente; per una build locale usa --site-url https://TUO-URL oppure pages.config.json.');
const site=new URL(siteUrl);
if(site.protocol!=='https:'||site.search||site.hash||site.username||site.password)throw Error('Usa un URL HTTPS senza parametri, frammenti o credenziali.');
const basePath=site.pathname.replace(/\/+$/,'');
const baseUrl=site.origin+basePath;
const publicPath=basePath+'/';
execFileSync(process.execPath,[path.join(__dirname,'build-site.cjs')],{cwd:root,stdio:'inherit',env:{...process.env,PAGES_SITE_URL:baseUrl,PAGES_GOOGLE_VERIFICATION:process.env.PAGES_GOOGLE_VERIFICATION||config.googleSiteVerification||'',HOSTING_TARGET:'github-pages',SITE_BUILD_DIRECTORY:'dist-github'}});
const output=path.join(root,'dist-github');
const policy="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.web3forms.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests";
const encode=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
function rewrite(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);if(entry.isDirectory()){rewrite(file);continue;}if(!entry.name.endsWith('.html'))continue;let html=fs.readFileSync(file,'utf8');
 html=html.replace(/\b(href|src|action)="\/(?!\/)([^\"]*)"/g,(_,attr,value)=>attr+'="'+publicPath+value+'"');
 html=html.replace(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>\s*/gi,'').replace(/<meta\b[^>]*name="referrer"[^>]*>\s*/gi,'');
 html=html.replace(/(<meta charset="utf-8"\s*\/?>)/i,'$1\n<meta http-equiv="Content-Security-Policy" content="'+encode(policy)+'">\n<meta name="referrer" content="strict-origin-when-cross-origin">');
 fs.writeFileSync(file,html);
}}
rewrite(output);
const manifest=JSON.parse(fs.readFileSync(path.join(output,'site.webmanifest'),'utf8'));manifest.id=publicPath;manifest.start_url=publicPath;manifest.scope=publicPath;manifest.icons.forEach(icon=>icon.src=publicPath+path.basename(icon.src));fs.writeFileSync(path.join(output,'site.webmanifest'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(output,'.nojekyll'),'');
fs.writeFileSync(path.join(output,'pages-runtime.json'),JSON.stringify({siteUrl:baseUrl,basePath},null,2)+'\n');
const cnamePath=path.join(output,'CNAME');if(fs.existsSync(cnamePath)&&fs.statSync(cnamePath).isFile())fs.unlinkSync(cnamePath);
if(site.pathname.replace(/\/+$/,'')===''&&!site.hostname.endsWith('.github.io'))fs.writeFileSync(path.join(output,'CNAME'),site.hostname+'\n');
const {routeMap}=require('./apply-seo.cjs');
fs.writeFileSync(path.join(output,'legacy-route.js'),`(()=>{const canonical=document.querySelector('link[rel="canonical"]');if(!canonical)return;const target=new URL(canonical.href);target.search=location.search;target.hash=location.hash;location.replace(target.pathname+target.search+target.hash);})();\n`);
for(const [file,route]of Object.entries(routeMap)){if(file==='index.html'||file==='404.html')continue;const canonical=baseUrl+route;fs.writeFileSync(path.join(output,file),'<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="'+encode(policy)+'"><title>Pagina trasferita | Commerciale Clima Plus</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="'+canonical+'"><meta http-equiv="refresh" content="1;url='+canonical+'"><script src="'+publicPath+'legacy-route.js" defer></script></head><body><p>La pagina è stata trasferita. <a href="'+publicPath+route.slice(1)+'">Apri la pagina aggiornata</a>.</p></body></html>');}
console.log('GitHub Pages pronto: '+baseUrl+'/ — directory dist-github/.');
