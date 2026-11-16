/* Scroll animation only, with no product scene or WebGL library. */
(() => {
  const scriptBase=new URL('.',document.currentScript.src);
  const root=document.querySelector('.cinema');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const key='ccp_motion_reduced_v1';let manual=false,version=0,motion,loading;
  try{manual=sessionStorage.getItem(key)==='true';}catch{}
  const control=root?.querySelector('.motion-preference');
  if(control){control.hidden=false;root.querySelector('.cinema-actions').append(control);}
  const footerControls=[...document.querySelectorAll('[data-motion-settings]')];
  footerControls.forEach(button=>{button.hidden=false;button.addEventListener('click',toggleMotion);});
  const load=()=>loading||=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('assets/scroll-experience.js?v=20261116-8',scriptBase).href;script.async=true;script.onload=resolve;script.onerror=reject;document.head.append(script);});
  async function update(){
    const turn=++version;motion?.dispose();motion=null;
    const limited=reduced.matches||manual;document.documentElement.classList.toggle('motion-reduced',limited);
    if(control){control.setAttribute('aria-pressed',String(limited));control.textContent=reduced.matches?'Animazioni ridotte dal sistema':limited?'Attiva animazioni':'Riduci animazioni';control.disabled=reduced.matches;}
    footerControls.forEach(button=>{button.setAttribute('aria-pressed',String(limited));button.textContent=reduced.matches?'Animazioni ridotte dal sistema':limited?'Attiva animazioni':'Riduci animazioni';button.disabled=reduced.matches;});
    if(limited)return;
    try{await load();if(turn!==version||document.hidden)return;motion=window.CCPMotion.mountMotion({root});}catch{document.documentElement.classList.remove('page-motion');}
  }
  function toggleMotion(){if(reduced.matches)return;manual=!manual;try{sessionStorage.setItem(key,String(manual));}catch{}update();}
  control?.addEventListener('click',toggleMotion);
  reduced.addEventListener('change',update);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!motion)update();});
  window.addEventListener('pagehide',()=>{version++;motion?.dispose();motion=null;});
  window.addEventListener('pageshow',event=>{if(event.persisted)update();});
  update();
})();
