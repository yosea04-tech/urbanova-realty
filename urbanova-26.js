// 26 mejoras finales Urbanova
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  function initFaq(){
    $$('.faq-item button').forEach(btn=>{
      btn.addEventListener('click',()=>btn.closest('.faq-item')?.classList.toggle('open'));
    });
  }

  function initBackTop(){
    const btn=document.createElement('button');
    btn.className='back-top';
    btn.type='button';
    btn.setAttribute('aria-label','Volver arriba');
    btn.textContent='↑';
    document.body.appendChild(btn);
    btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>600),{passive:true});
  }

  function initLeadForm(){
    const form=$('#quickLeadForm');
    if(!form)return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const zona=$('#leadZona')?.value?.trim()||'por definir';
      const credito=$('#leadCredito')?.value||'por definir';
      const presupuesto=$('#leadPresupuesto')?.value?.trim()||'por definir';
      const text=encodeURIComponent(`Hola Urbanova, quiero asesoría. Zona: ${zona}. Crédito: ${credito}. Presupuesto: ${presupuesto}.`);
      window.open(`https://wa.me/525646514956?text=${text}`,'_blank','noopener');
    });
  }

  function initActiveNav(){
    const file=location.pathname.split('/').pop()||'index.html';
    $$('.nav-links a').forEach(a=>{
      const href=a.getAttribute('href')||'';
      if(href===file){a.classList.add('active')}
    });
  }

  function initCardsKeyboard(){
    $$('.service-card,.property-card').forEach(card=>card.setAttribute('tabindex','0'));
  }

  function initPhoneCleaner(){
    $$('input[type="tel"]').forEach(input=>{
      input.addEventListener('input',()=>{input.value=input.value.replace(/[^0-9+\s]/g,'').slice(0,18)});
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    initFaq(); initBackTop(); initLeadForm(); initActiveNav(); initCardsKeyboard(); initPhoneCleaner();
  });
})();
