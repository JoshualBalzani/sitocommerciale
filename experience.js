/* Respect the saved motion preference without affecting document scrolling. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const key='ccp_motion_reduced_v1';let manual=false;
 try{manual=sessionStorage.getItem(key)==='true';}catch{}
 const update=()=>document.documentElement.classList.toggle('motion-reduced',reduced.matches||manual);
 reduced.addEventListener('change',update);update();
})();
