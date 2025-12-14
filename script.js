// Theme persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const yearEl = document.getElementById('year');
const form = document.getElementById('contactForm');
const formHint = document.getElementById('formHint');
const loader = document.getElementById('loader');

function getSystemPrefersLight() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.querySelector('.theme-toggle__icon').textContent = '☼';
  } else {
    root.removeAttribute('data-theme');
    themeToggle.querySelector('.theme-toggle__icon').textContent = '☾';
  }
}

function initTheme() {
  const stored = localStorage.getItem('theme');
  const theme = stored || (getSystemPrefersLight() ? 'light' : 'dark');
  applyTheme(theme);
}

themeToggle?.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Mobile nav toggle
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu?.classList.toggle('is-open');
});

// Close menu on link click (mobile)
navMenu?.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement) {
    navMenu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Smooth scroll offset for sticky header
function smoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const header = document.querySelector('.site-header');
      const offset = header ? (header.getBoundingClientRect().height + 12) : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', href);
    });
  });
}

// Simple form validation mock
function handleForm() {
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (!name || !email || !message) {
      formHint.textContent = 'Veuillez remplir tous les champs.';
      formHint.style.color = 'var(--danger)';
      return;
    }
    formHint.textContent = 'Merci, votre message a été simulé comme envoyé ✔';
    formHint.style.color = 'var(--success)';
    form.reset();
  });
}

function setYear() {
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Init
initTheme();
smoothAnchorScroll();
handleForm();
setYear();

// Loader lifecycle: wait for window load, then fade out after water fill
window.addEventListener('load', () => {
  // Give time for the fill animation to be seen (matches CSS 1.8s)
  const total = 1900; // ms
  window.setTimeout(() => {
    loader?.classList.add('is-done');
  }, total);
});


