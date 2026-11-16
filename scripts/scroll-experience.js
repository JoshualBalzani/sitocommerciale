import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function mountMotion() {
 document.documentElement.classList.add('page-motion');
 const media=gsap.matchMedia();let tweens=[],sectionState=null;
 media.add({desktop:'(min-width:960px)',mobile:'(max-width:959px)',sections:'(min-height:320px)'},context=>{
  tweens=[];const mobile=context.conditions.mobile;let disposeSections=()=>{};
  const main=document.querySelector('.studio-home #contenuto');
  if(main&&context.conditions.sections){
   const sections=[...main.children].filter(el=>el.matches('section'));
   main.classList.add('section-stack-active');
   const markers=sections.map((section,index)=>{const marker=document.createElement('span');marker.className='section-marker';marker.setAttribute('aria-hidden','true');main.insertBefore(marker,section);section.classList.add('section-sheet');section.style.setProperty('--section-layer',index+1);return marker;});
   let frame=0,alive=true;
   const header=()=>innerWidth<=760?8:0;
   const measure=()=>sections.forEach(section=>section.style.setProperty('--section-top','min('+header()+'px, calc(100svh - '+section.offsetHeight+'px - '+header()+'px))'));
   const refresh=()=>{if(frame||!alive)return;frame=requestAnimationFrame(()=>{frame=0;if(!alive)return;measure();});};
   measure();
   sectionState={main,sections,markers,header};
   const revealTarget=(hash,behavior='instant')=>{
    if(!hash||hash==='#')return false;let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return false;}
    const section=target?.closest('.section-sheet');const index=sections.indexOf(section);if(index<0)return false;
    const scale=Number(gsap.getProperty(section,'scaleY'))||1;
    const inside=target===section?0:(target.getBoundingClientRect().top-section.getBoundingClientRect().top)/scale+section.scrollTop;
    const natural=true;section.scrollTo({top:natural?0:inside,behavior});window.scrollTo({top:markers[index].getBoundingClientRect().top+scrollY+(natural?inside:0)-header(),behavior});return true;
   };
   const onAnchor=event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const link=event.target.closest('a[href]');if(!link||link.target==='_blank'||link.hasAttribute('download'))return;const url=new URL(link.href,location.href);if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;if(revealTarget(url.hash,'smooth')){event.preventDefault();if(location.hash!==url.hash)history.pushState(null,'',url.hash);}};
   const onHash=()=>requestAnimationFrame(()=>{measure();revealTarget(location.hash);});
   document.addEventListener('click',onAnchor);window.addEventListener('hashchange',onHash);window.addEventListener('popstate',onHash);window.addEventListener('resize',refresh);
   const resize=new ResizeObserver(refresh);sections.forEach(section=>resize.observe(section));
   document.fonts?.ready.then(()=>{if(alive){refresh();if(location.hash)onHash();}});
   if(location.hash)requestAnimationFrame(onHash);
   disposeSections=()=>{alive=false;cancelAnimationFrame(frame);resize.disconnect();document.removeEventListener('click',onAnchor);window.removeEventListener('hashchange',onHash);window.removeEventListener('popstate',onHash);window.removeEventListener('resize',refresh);main.classList.remove('section-stack-active');markers.forEach(marker=>marker.remove());sections.forEach(section=>{section.classList.remove('section-sheet');section.style.removeProperty('--section-layer');section.style.removeProperty('--section-top');});sectionState=null;};
  }
  const ribbon=document.querySelector('.studio-ribbon>div');if(ribbon&&!main)gsap.fromTo(ribbon,{xPercent:3},{xPercent:-25,ease:'none',scrollTrigger:{trigger:ribbon.parentElement,start:'top bottom',end:'bottom top',scrub:.6}});
  const headings='.area-entry-heading,.section-heading>div,.editorial-heading,.about-statement,.process-heading,.faq-grid>div:first-child,.request-intro>h2,.contact-banner-top,.seo-area-hero h1';
  if(!main&&!mobile)for(const element of document.querySelectorAll(headings)){const tween=gsap.fromTo(element,{y:mobile?16:26,opacity:1},{y:0,opacity:1,duration:.6,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 96%',toggleActions:'play none none reverse'}});tweens.push({element,tween});}
  if(!main&&!mobile)for(const element of document.querySelectorAll('.family-card,.client-grid article,.brand-tile,.about-points article,.process-grid article,.guide-steps article,.seo-area-cards article,.area-deepening aside'))gsap.fromTo(element,{y:mobile?18:30,opacity:1},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:element,start:'top 103%',end:'top 85%',scrub:.25,invalidateOnRefresh:true}});
  if(!main)ScrollTrigger.create({start:0,end:()=>ScrollTrigger.maxScroll(window),onUpdate:self=>document.documentElement.style.setProperty('--page-progress',self.progress)});
  return disposeSections;
 });
 const onFocus=event=>{
  if(!event.target.matches('input,textarea,select,[tabindex="-1"]'))return;
  if(sectionState){const {sections,markers,header}=sectionState;const section=event.target.closest('.section-sheet'),index=sections.indexOf(section);if(index>=0){const rect=event.target.getBoundingClientRect(),sheet=section.getBoundingClientRect();if(rect.top<16||rect.bottom>innerHeight-20)window.scrollTo({top:markers[index].getBoundingClientRect().top+scrollY+(rect.top-sheet.top)/(Number(gsap.getProperty(section,'scaleY'))||1)-header()-20,behavior:'instant'});}}
  for(const {element,tween}of tweens)if(element.contains(event.target))tween.progress(1);
 };
 document.addEventListener('focusin',onFocus);
 const refresh=()=>{if(!sectionState)ScrollTrigger.refresh();};document.querySelectorAll('#catalogo-completo').forEach(el=>el.addEventListener('toggle',refresh));requestAnimationFrame(refresh);
 return {dispose(){media.revert();document.removeEventListener('focusin',onFocus);document.querySelectorAll('#catalogo-completo').forEach(el=>el.removeEventListener('toggle',refresh));document.documentElement.classList.remove('page-motion');document.documentElement.style.removeProperty('--page-progress');}};
}
