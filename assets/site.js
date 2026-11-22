(()=>{'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if('IntersectionObserver' in window&&!reduced){document.documentElement.classList.add('js-reveal');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
 const menu=document.querySelector('#mobile-menu');
 document.querySelector('.menu-toggle')?.addEventListener('click',()=>{menu.showModal();document.body.style.overflow='hidden';});
 document.querySelector('.menu-close')?.addEventListener('click',()=>menu.close());
 menu?.addEventListener('close',()=>{document.body.style.overflow='';});
 const items=[...document.querySelectorAll('.archive-item')];
 if(items.length){
  const filters=[...document.querySelectorAll('[data-filter]')],pagination=document.querySelector('.pagination'),status=document.querySelector('#archive-status'),lightbox=document.querySelector('#lightbox'),image=lightbox.querySelector('img'),caption=lightbox.querySelector('figcaption');
  const pageSize=18;let filter='all',page=1,filtered=items,active=0,opener=null;
  function readURL(){const params=new URLSearchParams(location.search);const value=params.get('category')||'all';filter=filters.some(b=>b.dataset.filter===value)?value:'all';page=Math.max(1,parseInt(params.get('page')||'1',10)||1);}
  function updateURL(){const url=new URL(location.href);if(filter==='all')url.searchParams.delete('category');else url.searchParams.set('category',filter);if(page===1)url.searchParams.delete('page');else url.searchParams.set('page',page);history.replaceState(null,'',url);}
  function pageButton(label,target,disabled=false,current=false){const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=disabled;b.setAttribute('aria-label',current?`Page ${target}, current page`:(label==='Previous'?'Go to previous page':label==='Next'?'Go to next page':`Go to page ${target}`));if(current)b.setAttribute('aria-current','page');b.addEventListener('click',()=>{page=target;render();updateURL();document.querySelector('.archive-toolbar').scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});pagination.querySelector('[aria-current]')?.focus({preventScroll:true});});return b;}
  function render(){filtered=items.filter(i=>filter==='all'||i.dataset.category===filter);const pages=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.min(page,pages);const shown=new Set(filtered.slice((page-1)*pageSize,page*pageSize));items.forEach(item=>item.hidden=!shown.has(item));filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));status.textContent=`${(page-1)*pageSize+1}–${Math.min(page*pageSize,filtered.length)} of ${filtered.length} photographs`;pagination.replaceChildren(pageButton('Previous',page-1,page===1));for(let n=1;n<=pages;n++)pagination.append(pageButton(String(n),n,false,n===page));pagination.append(pageButton('Next',page+1,page===pages));pagination.hidden=pages<=1;}
  filters.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;page=1;render();updateURL();}));
  function display(index){active=(index+filtered.length)%filtered.length;const item=filtered[active];image.src=item.dataset.src;image.alt=item.dataset.alt;caption.textContent=`${active+1} / ${filtered.length} · ${item.dataset.alt}`;}
  items.forEach(item=>item.addEventListener('click',()=>{opener=item;display(filtered.indexOf(item));lightbox.showModal();document.body.style.overflow='hidden';}));
  lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>display(active-1));lightbox.querySelector('.lightbox-next').addEventListener('click',()=>display(active+1));
  lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();display(active+1);}if(event.key==='ArrowLeft'){event.preventDefault();display(active-1);}});
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});lightbox.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true});});
  window.addEventListener('popstate',()=>{readURL();render();});readURL();render();
 }
 const form=document.querySelector('#enquiry-form');
 form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject=`Website enquiry: ${data.get('topic')}`;const body=`Hello Krithi,\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`;location.href=`mailto:kailarkrithi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Your email app should open with a draft. Please review and send it there. If it does not open, email kailarkrithi@gmail.com or message 8431534682 on WhatsApp.';});
})();

(() => {
 const control = document.querySelector('.profile-download');
 if (!control) return;
 const trigger = control.querySelector('summary');
 let hoverOpened = false;
 control.addEventListener('pointerenter', event => {
   if (event.pointerType === 'mouse' && !control.open) {
     control.open = true;
     hoverOpened = true;
   }
 });
 trigger.addEventListener('click', event => {
   if (hoverOpened && control.open) event.preventDefault();
   hoverOpened = false;
 });
 control.addEventListener('pointerleave', () => {
   if (hoverOpened && !control.contains(document.activeElement)) control.open = false;
   hoverOpened = false;
 });
 document.addEventListener('pointerdown', event => {
   if (!control.contains(event.target)) control.open = false;
 });
 control.addEventListener('focusout', event => {
   if (!control.contains(event.relatedTarget)) control.open = false;
 });
 document.addEventListener('keydown', event => {
   if (event.key === 'Escape' && control.open) {
     control.open = false;
     if (control.contains(document.activeElement)) trigger.focus();
   }
 });
 control.querySelectorAll('a').forEach(card => card.addEventListener('click', () => {
   trigger.focus();
   control.open = false;
 }));
})();

const mysuruDate = new Intl.DateTimeFormat('en-CA', {
 timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());
if (mysuruDate === '2026-11-22') {
 const notice = document.querySelector('.announcement');
 notice.querySelector('span:nth-child(2)').textContent = 'Today, 22 November · Krithi at Rama Govinda Ranga Mandira, Mysuru';
 const details = notice.querySelector('a');
 details.href = 'performances.html#rama-govinda';
 details.textContent = 'Performance details';
}
