import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const slugs = ['chaffoteaux','beretta','sylber','aux','fiore','la-termocamino','itap','facot','ideal-clima'];
for (const path of ['/marchi/','/zone-servite/',...slugs.map(slug=>`/marchi/${slug}/`)]) {
  test(`brand coverage, images and accessibility: ${path}`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', e=>errors.push(e.message));
    expect((await page.goto(path))?.status()).toBe(200);
    await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await expect(page.locator('main .brand-photo')).toHaveCount(2);
    for(const photo of await page.locator('main .brand-photo img').all()) {
      await photo.scrollIntoViewIfNeeded(); await expect(photo).toBeVisible();
      await expect.poll(()=>photo.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    }
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}')['@graph'];
    const business=graph.find((item:Record<string,unknown>)=>item['@type']==='LocalBusiness');
    expect(business.areaServed).toHaveLength(4);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://www.commercialeclimaplus.it${path}`);
    if(path.startsWith('/marchi/')&&path!=='/marchi/') {
      expect(graph.find((item:Record<string,unknown>)=>item['@type']==='BreadcrumbList').itemListElement).toHaveLength(3);
      await expect(page.locator('.brand-territory li')).toHaveText(['Forlì-Cesena','Ravenna','Rimini','Bologna']);
      expect(await page.locator('.brand-family li').count()).toBeGreaterThan(6);
    }
    const external=await page.locator('main a[href^="http"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
    expect(external).toEqual([]);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(audit.violations).toEqual([]);expect(errors).toEqual([]);
  });
}
test('brand family links prefill a valid commercial request',async({page})=>{
  await page.goto('/marchi/aux/');await page.getByRole('button',{name:'Continua senza tracciamento',exact:true}).click();
  await page.locator('.brand-family').filter({has:page.getByRole('heading',{name:'Commerciale leggero',exact:true})}).getByRole('link').click();
  await expect(page.locator('#request-brand')).toHaveValue('AUX');
  await expect(page.locator('#request-category')).toHaveValue('Climatizzazione');
  await expect(page.locator('#request-product')).toHaveValue('Commerciale leggero');
  await expect(page.locator('[data-selection-summary]')).toContainText('AUX');
  await page.goto('/?categoria=Termoidraulica&marchio=invalid#richiesta');await expect(page.locator('#request-brand')).toHaveValue('');
});
test('sitemap includes all new canonical pages and directory links',async({page,request})=>{
  const response=await request.get('/sitemap.xml');const xml=await response.text();
  expect((xml.match(/<loc>/g)??[]).length).toBe(18);
  for(const slug of slugs)expect(xml).toContain(`/marchi/${slug}/</loc>`);
  expect(xml).toContain('/zone-servite/</loc>');
  await page.goto('/marchi/');await expect(page.locator('#rappresentanze .brand-directory-item')).toHaveCount(9);
});
