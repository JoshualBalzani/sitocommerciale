/* Native CSS stacking, measured against the stable viewport without scroll handlers. */
export function mountMotion() {
 const main=document.querySelector('.studio-home #contenuto,.subpage-cards .seo-area-page');
 if(!main)return {dispose(){}};
 const sheets=[...main.children].filter(el=>el.matches('section'));
 const ruler=document.createElement('span');
 ruler.setAttribute('aria-hidden','true');
 ruler.style.cssText='position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none';
 document.body.append(ruler);
 let frame=0,active=true;
 main.classList.add('section-stack-active');
 sheets.forEach((sheet,index)=>{sheet.classList.add('section-sheet');sheet.style.setProperty('--section-layer',index+1);});
 const measure=()=>{frame=0;if(!active)return;const height=ruler.getBoundingClientRect().height;sheets.forEach(sheet=>{sheet.classList.toggle('section-flow',sheet.id==='richiesta');sheet.style.setProperty('--section-top',Math.min(0,height-sheet.offsetHeight)+'px');});};
 const refresh=()=>{if(!frame&&active)frame=requestAnimationFrame(measure);};
 const resize=new ResizeObserver(refresh);sheets.forEach(sheet=>resize.observe(sheet));resize.observe(ruler);
 window.addEventListener('resize',refresh,{passive:true});
 document.fonts?.ready.then(refresh);measure();
 return {dispose(){active=false;cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('resize',refresh);ruler.remove();main.classList.remove('section-stack-active');sheets.forEach(sheet=>{sheet.classList.remove('section-sheet','section-flow');sheet.style.removeProperty('--section-layer');sheet.style.removeProperty('--section-top');});}};
}
