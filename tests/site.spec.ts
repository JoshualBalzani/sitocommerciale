import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
declare global { interface Window { policyViolations: string[]; } }
const routes=['/','/riscaldamento/','/climatizzazione/','/ventilazione/','/termoidraulica/','/privacy/','/note-legali/','/grazie/'];
for(const route of routes) test(`layout and WCAG checks: ${route}`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 const response=await page.goto(route);expect(response?.status()).toBe(200);
 await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await expect(page.locator('h1')).toHaveCount(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.locator('main>section').evaluateAll(elements=>elements.every(element=>!['sticky','fixed'].includes(getComputedStyle(element).position)))).toBe(true);
 const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(report.violations).toEqual([]);expect(errors).toEqual([]);
});
test('catalog filters, reset and request context',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await page.locator('#catalog-search').fill('rubinetteria');await expect(page.locator('.catalog-card:visible')).toHaveCount(1);
 await page.locator('.catalog-card:visible summary').click();await expect(page.locator('.catalog-card:visible details')).toHaveAttribute('open','');
 await page.locator('.catalog-card:visible .catalog-request').click();await expect(page.locator('#request-product')).toHaveValue('Rubinetteria');await expect(page.locator('#request-category')).toHaveValue('Termoidraulica');
 await page.locator('#catalog-search').fill('inesistente-zz');await expect(page.locator('.catalog-empty')).toBeVisible();
 await page.getByRole('button',{name:'Azzera filtri',exact:true}).click();await expect(page.locator('.catalog-card:visible')).toHaveCount(10);
 await page.locator('[data-filter="Climatizzazione"]').click();await expect(page.locator('.catalog-card:visible')).toHaveCount(3);
 await page.locator('[data-request-brand="Beretta"]').click();await expect(page.locator('#request-brand')).toHaveValue('Beretta');
});
test('validation, confirmed delivery and retained values on failure',async({page})=>{
 let fail=false;let submissions=0;
 await page.route('https://api.web3forms.com/**',async route=>{
  if(route.request().method()==='OPTIONS'){await route.fulfill({status:204,headers:{'access-control-allow-origin':'*','access-control-allow-methods':'POST,OPTIONS','access-control-allow-headers':'content-type,accept'}});return;}
  submissions++;await route.fulfill({status:fail?429:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:JSON.stringify({success:!fail})});
 });
 await page.goto('/#richiesta');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await page.getByRole('button',{name:'Invia richiesta',exact:true}).click();await expect(page.locator('#request-name')).toHaveAttribute('aria-invalid','true');expect(submissions).toBe(0);
 const fill=async()=>{await page.locator('#request-category').selectOption('Termoidraulica');await page.locator('#request-name').fill('Verifica Locale');await page.locator('#request-email').fill('verifica@example.com');await page.locator('#request-message').fill('Test simulato: nessuna email reale viene inviata.');};
 await fill();await page.getByRole('button',{name:'Invia richiesta',exact:true}).click();await expect(page.locator('#form-status')).toHaveAttribute('data-state','success');await expect(page.locator('#request-success')).toBeVisible();expect(submissions).toBe(1);
 fail=true;await fill();await page.getByRole('button',{name:'Invia richiesta',exact:true}).click();await expect(page.locator('#form-status')).toHaveAttribute('data-state','error');await expect(page.locator('#request-name')).toHaveValue('Verifica Locale');await expect(page.locator('.form-fallback')).toBeVisible();await expect(page.locator('#request-success')).toBeHidden();expect(submissions).toBe(2);
});
test('product links and legacy URLs preserve context',async({page})=>{
 await page.goto('/climatizzazione/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await page.locator('.seo-area-cards article').filter({has:page.getByRole('heading',{name:'Pompe di calore',exact:true})}).locator('a').click();
 await expect(page.locator('#request-category')).toHaveValue('Climatizzazione');await expect(page.locator('#request-product')).toHaveValue('Pompe di calore');
 await page.goto('/riscaldamento.html?codice=abc#contenuto');await expect(page).toHaveURL(/\/riscaldamento\/\?codice=abc#contenuto$/);
 await page.goto('/privacy/#cookie');await page.locator('[data-privacy-settings]').click();await expect(page.locator('.privacy-notice')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.privacy-notice')).toHaveCount(0);await expect(page.locator('[data-privacy-settings]')).toBeFocused();
});
test('keyboard entry and natural scroll restoration',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await page.keyboard.press('Tab');await expect(page.locator('.skip-link')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 await page.evaluate(()=>scrollTo(0,1500));const before=await page.evaluate(()=>scrollY);
 await page.goto('/riscaldamento/');await page.goBack();await page.waitForTimeout(200);expect(Math.abs(await page.evaluate(()=>scrollY)-before)).toBeLessThan(60);
});

test('primary navigation on desktop, mobile and inner pages',async({page},testInfo)=>{
 await page.goto('/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 const navigation=page.getByRole('navigation',{name:'Navigazione principale'});
 const toggle=page.locator('.navigation-toggle');const mobile=testInfo.project.name==='mobile';
 if(mobile){await expect(navigation).toBeHidden();await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');}
 await expect(navigation).toBeVisible();
 for(const name of ['Soluzioni','Prodotti','Azienda','Marchi','Contatti','Richiedi un preventivo'])await expect(navigation.getByRole('link',{name,exact:true})).toBeVisible();
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(audit.violations).toEqual([]);
 if(mobile){await page.keyboard.press('Escape');await expect(toggle).toBeFocused();await expect(navigation).toBeHidden();await toggle.click();}
 await navigation.getByRole('link',{name:'Marchi',exact:true}).click();await expect(page).toHaveURL(/\/#marchi$/);
 if(mobile){await expect(navigation).toBeHidden();await expect(page.locator('#marchi')).toBeFocused();}
 await page.goto('/climatizzazione/');if(mobile)await toggle.click();
 await navigation.getByRole('link',{name:'Prodotti',exact:true}).click();await expect(page).toHaveURL(/\/#prodotti$/);
 if(mobile){await page.evaluate(()=>scrollTo(0,0));await toggle.click();await page.setViewportSize({width:1280,height:900});await expect(navigation).toBeVisible();await expect(toggle).toBeHidden();await page.setViewportSize({width:390,height:844});await expect(navigation).toBeHidden();}
});

test('area navigation, footer and request selection',async({page},testInfo)=>{
 await page.goto('/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 const nav=page.getByRole('navigation',{name:'Navigazione principale'});
 if(testInfo.project.name==='mobile')await page.locator('.navigation-toggle').click();
 const summary=nav.locator('.area-menu summary');await summary.click();
 await expect(nav.getByRole('link',{name:'Climatizzazione',exact:true})).toBeVisible();
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(audit.violations).toEqual([]);
 await page.keyboard.press('Escape');await expect(nav.locator('.area-menu')).not.toHaveAttribute('open','');await expect(summary).toBeFocused();await summary.click();
 await nav.getByRole('link',{name:'Climatizzazione',exact:true}).click();await expect(page).toHaveURL(/\/climatizzazione\/$/);
 if(testInfo.project.name==='mobile')await page.locator('.navigation-toggle').click();
 await nav.getByRole('link',{name:'Richiedi un preventivo',exact:true}).click();await expect(page.locator('#request-type')).toHaveValue('Preventivo');
 await page.locator('[data-request-brand="Beretta"]').click();await expect(page.locator('[data-selection-summary]')).toContainText('Beretta');
 await page.locator('[data-clear-selection]').click();await expect(page.locator('.request-selection')).toBeHidden();await expect(page.locator('#request-category')).toBeFocused();await expect(page.locator('#request-brand')).toHaveValue('');
 const footer=page.getByRole('navigation',{name:'Esplora il sito'});await footer.getByRole('link',{name:'Termoidraulica',exact:true}).click();await expect(page).toHaveURL(/\/termoidraulica\/$/);
 await page.getByRole('link',{name:'Torna all’inizio'}).click();await expect(page).toHaveURL(/#inizio$/);await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
});

test('motion respects reduced movement and security policy',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>{window.policyViolations=[];document.addEventListener('securitypolicyviolation',event=>window.policyViolations.push(event.violatedDirective));});
 await page.goto('/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await page.locator('.area-product-card').first().scrollIntoViewIfNeeded();
 expect(await page.evaluate(()=>document.getAnimations().filter(animation=>animation.playState==='running').length)).toBe(0);
 await expect(page.locator('.area-product-card').first()).toHaveCSS('transform','none');
 expect(await page.evaluate(()=>window.policyViolations)).toEqual([]);
 await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#marchi').scrollIntoViewIfNeeded();await page.waitForTimeout(650);
 expect(await page.evaluate(()=>window.policyViolations)).toEqual([]);
});

test('Lenis anchors, wheel input and live reduced-motion preference',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
 await expect(page.locator('html')).toHaveClass(/lenis/);
 await page.mouse.move(100,600);await page.mouse.wheel(0,500);await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100);
 await page.locator('.hero-foundation a[href="#marchi"]').click();await expect(page).toHaveURL(/#marchi$/);
 await expect.poll(()=>page.locator('#marchi').evaluate(element=>Math.round(element.getBoundingClientRect().top)),{timeout:6000}).toBe(24);
 await expect(page.locator('#marchi')).toBeFocused();
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('html')).not.toHaveClass(/lenis/);
 await page.getByRole('link',{name:'Torna all’inizio'}).click();await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(page.locator('html')).toHaveClass(/lenis/);
});
