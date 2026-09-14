// ---------- Header solid on scroll ----------
const header = document.getElementById('siteHeader');
function updateHeader(){
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive:true });

// ---------- Mobile nav ----------
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
burger.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- CTA form -> Formspree (envío por email) ----------
const ctaForm = document.getElementById('ctaForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = ctaForm.querySelector('button[type="submit"]');

ctaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  formMsg.className = 'form-msg';
  formMsg.textContent = '';

  try {
    const response = await fetch(ctaForm.action, {
      method: 'POST',
      body: new FormData(ctaForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      ctaForm.reset();
      formMsg.textContent = '¡Gracias! Hemos recibido tu solicitud, te contactaremos muy pronto.';
      formMsg.classList.add('success');
    } else {
      throw new Error('Formspree error');
    }
  } catch (err) {
    formMsg.textContent = 'No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp directo.';
    formMsg.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar solicitud';
  }
});
