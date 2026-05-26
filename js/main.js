/* =========================================
   ALORA BALLOONS — MAIN JS
   ========================================= */

/* ---- Nav scroll behaviour ---- */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ---- Mobile hamburger ---- */
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

/* ---- Active nav link ---- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

/* ---- Lightbox ---- */
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');
  let items = [], currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    lbImg.src = items[idx].src;
    lbImg.alt = items[idx].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-full-item, .gallery-item').forEach((el, i) => {
    const img = el.querySelector('img');
    items.push({ src: img.src, alt: img.alt || '' });
    el.addEventListener('click', () => openLightbox(i));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  if (lbPrev) lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + items.length) % items.length;
    lbImg.src = items[currentIdx].src;
  });
  if (lbNext) lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % items.length;
    lbImg.src = items[currentIdx].src;
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev && lbPrev.click();
    if (e.key === 'ArrowRight') lbNext && lbNext.click();
  });
}

/* ---- Booking / Contact form ---- */
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('event_date').value;
    const service = document.getElementById('service').value;
    const guests = document.getElementById('guests').value.trim();
    const message = document.getElementById('message').value.trim();

    // Build WhatsApp message
    const waText = encodeURIComponent(
      `Hello Alora Balloons! 🎈\n\n` +
      `*New Booking Enquiry*\n` +
      `---------------------------\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Event Date:* ${date}\n` +
      `*Service:* ${service}\n` +
      `*Guests:* ${guests}\n` +
      `*Message:* ${message}`
    );
    window.open(`https://wa.me/27633023417?text=${waText}`, '_blank');

    // Show success
    bookingForm.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) { success.classList.add('show'); }
  });
}

/* ---- WhatsApp float quick message ---- */
document.querySelectorAll('.whatsapp-float, .whatsapp-direct-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = encodeURIComponent("Hello Alora Balloons! 🎈 I'd like to enquire about your services.");
    window.open(`https://wa.me/27633023417?text=${msg}`, '_blank');
  });
});
