document.documentElement.classList.add('js');

(function(){ 
  const btn = document.querySelector('.theme');
  const html = document.documentElement;
  let mode = localStorage.getItem('rws-theme') || 'auto';
  function apply(){ html.setAttribute('data-theme', mode); }
  apply();
  btn && btn.addEventListener('click', ()=>{ 
    mode = mode === 'auto' ? 'dark' : mode === 'dark' ? 'light' : 'auto';
    localStorage.setItem('rws-theme', mode);
    apply();
  });
})();

(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=> e.isIntersecting && e.target.classList.add('visible'));
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
})();

(function(){
  const tabs = document.querySelectorAll('.tabs .tab');
  if(!tabs.length) return;
  tabs.forEach(t=> t.addEventListener('click', ()=>{
    const wrap = t.closest('.tabs');
    wrap.querySelectorAll('.tab').forEach(x=> x.classList.remove('is-active'));
    t.classList.add('is-active');
    const id = t.dataset.tab;
    wrap.querySelectorAll('.tabpane').forEach(p=> p.classList.toggle('is-active', p.id === id));
  }));
})();

(function(){
  document.querySelectorAll('.faqitem').forEach((item, idx)=>{
    const btn = item.querySelector('.faq_q');
    const pane = item.querySelector('.faq_a');
    if(!btn || !pane) return;

    if(!pane.id){ pane.id = 'faq-pane-' + idx; }

    if(!pane.querySelector('.faq_inner')){
      const wrap = document.createElement('div');
      wrap.className = 'faq_inner';
      while(pane.firstChild) wrap.appendChild(pane.firstChild);
      pane.appendChild(wrap);
    }

    item.classList.remove('open');
    pane.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', pane.id);
    btn.setAttribute('role', 'button');

    btn.addEventListener('click', ()=>{
      const open = item.classList.toggle('open');
      pane.style.display = open ? 'block' : 'none';
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();

(function(){
  const links = document.querySelectorAll('.nav a');
  if(!links) return;
  const path = location.pathname.replace(/index\.html$/, '') || '/';
  links.forEach(a => {
    try {
      const url = new URL(a.href);
      const p = url.pathname.replace(/index\.html$/, '') || '/';
      if (p === path) a.classList.add('is-active');
    } catch(_){}
  });
})();

(function(){
  const car = document.getElementById('carousel');
  if(!car) return;
  const track = car.querySelector('.track');
  const prev = car.querySelector('.prev');
  const next = car.querySelector('.next');
  next.addEventListener('click', ()=> track.scrollBy({left: track.clientWidth + 16, behavior:'smooth'}));
  prev.addEventListener('click', ()=> track.scrollBy({left: -track.clientWidth - 16, behavior:'smooth'}));
})();

(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = form.querySelector('.status');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(form.querySelector('.honeypot').value) return;
    status.textContent = 'Sending…';
    try {
      const res = await fetch('https://formspree.io/f/mdkdykyg', {
        method:'POST',
        body: new FormData(form),
        headers: { 'Accept':'application/json' }
      });
      if(res.ok) { status.textContent = 'Thanks! We\'ll be in touch shortly.'; form.reset(); }
      else { status.textContent = 'Something went wrong. Please email us directly.'; }
    } catch(e) { status.textContent = 'Network error. Please try again.'; }
  });
})();
