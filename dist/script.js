'use strict';
// Configure real contact destinations here before accepting visitor inquiries.
// Leave blank to provide copy-only inquiry drafts without pretending to send them.
const FITPAD_CONTACT = { email: '', whatsapp: '' };
const $ = (selector) => document.querySelector(selector);
const menu = $('.menu-toggle');
const nav = $('#nav');
const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  if (!reducedMotion.matches) document.querySelectorAll('.reveal').forEach(el => { if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('is-pending'); revealObserver.observe(el); } });
  reducedMotion.addEventListener('change', event => { if (event.matches) { document.querySelectorAll('.is-pending').forEach(el => el.classList.remove('is-pending')); revealObserver.disconnect(); } });
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(a => { if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); } }), { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#space,#training,#classes,#community').forEach(section => activeObserver.observe(section));
}
let scrollFrame = false;
function updateProgress() { const max = document.documentElement.scrollHeight - window.innerHeight; $('.scroll-progress').style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`; scrollFrame = false; }
window.addEventListener('scroll', () => { if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(updateProgress); } }, { passive: true });
window.addEventListener('resize', updateProgress); updateProgress();
$('#year').textContent = new Date().getFullYear();
const dialog = $('#inquiry');
let trigger = null;
const makeMessage = () => { const interest = $('#interest').value; const name = $('#name').value.trim(); return `Hi Fitpad! ${name ? `I'm ${name}. ` : ''}I'm interested in ${interest.toLowerCase()}. Could you share the available times, rates, and how to get started?`; };
function resetMessage() { $('#message').value = makeMessage(); $('#form-status').textContent = ''; }
document.querySelectorAll('[data-inquiry]').forEach(button => button.addEventListener('click', () => { trigger = button; closeMenu(); $('#interest').value = button.dataset.inquiry; resetMessage(); dialog.showModal(); document.body.classList.add('modal-open'); }));
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); trigger?.focus(); });
$('#interest').addEventListener('change', resetMessage);
$('#name').addEventListener('change', resetMessage);
if (FITPAD_CONTACT.email || FITPAD_CONTACT.whatsapp) {
  $('#submit-inquiry').innerHTML = 'Open message <span aria-hidden="true">↗</span>';
  $('#contact-notice').textContent = 'Your messaging app will open with this draft. Send it to the Fitpad team to confirm availability. A visit is only booked once the team confirms.';
}
$('#inquiry-form').addEventListener('submit', async event => {
  event.preventDefault();
  const message = $('#message').value.trim();
  if (!message) { $('#form-status').textContent = 'Please enter a message first.'; $('#message').focus(); return; }
  if (FITPAD_CONTACT.whatsapp) { window.open('https://wa.me/' + FITPAD_CONTACT.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer'); return; }
  if (FITPAD_CONTACT.email) { window.location.href = 'mailto:' + encodeURIComponent(FITPAD_CONTACT.email) + '?subject=' + encodeURIComponent('Fitpad — ' + $('#interest').value) + '&body=' + encodeURIComponent(message); return; }
  try { await navigator.clipboard.writeText(message); $('#form-status').textContent = 'Copied! Paste this message into your chat with Fitpad. Nothing has been sent yet.'; }
  catch { $('#message').focus(); $('#message').select(); $('#form-status').textContent = 'Your message is selected. Use Copy, then paste it into your chat with Fitpad.'; }
});

$('.ticker-pause').addEventListener('click', event => { const paused = $('.ticker').classList.toggle('is-paused'); event.currentTarget.setAttribute('aria-pressed', String(paused)); event.currentTarget.setAttribute('aria-label', paused ? 'Resume scrolling text' : 'Pause scrolling text'); event.currentTarget.textContent = paused ? 'Play' : 'Pause'; });
