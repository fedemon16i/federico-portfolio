/* =========================================================
   FEDERICO MONROY — PORTFOLIO MAIN JS
   assets/main.js
   ========================================================= */

(function () {
  'use strict';

  /* ---- Reduced Motion Check ---- */
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- NAV: Dropdown Logic ---- */
  const dropdownToggle = document.getElementById('nav-dropdown-toggle');
  const dropdownMenu  = document.getElementById('nav-dropdown-menu');

  function openDropdown() {
    dropdownMenu.classList.add('open');
    dropdownToggle.setAttribute('aria-expanded', 'true');
    // Focus first item
    const firstItem = dropdownMenu.querySelector('.nav-dropdown-item');
    if (firstItem) firstItem.focus();
  }

  function closeDropdown() {
    dropdownMenu.classList.remove('open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  if (dropdownToggle && dropdownMenu) {
    // Click toggle
    dropdownToggle.addEventListener('click', () => {
      const isOpen = dropdownMenu.classList.contains('open');
      isOpen ? closeDropdown() : openDropdown();
    });

    // Keyboard: Enter/Space open, Escape close
    dropdownToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = dropdownMenu.classList.contains('open');
        isOpen ? closeDropdown() : openDropdown();
      }
      if (e.key === 'Escape') closeDropdown();
    });

    // Arrow key navigation within menu
    dropdownMenu.addEventListener('keydown', (e) => {
      const items = [...dropdownMenu.querySelectorAll('.nav-dropdown-item')];
      const current = document.activeElement;
      const idx = items.indexOf(current);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[idx + 1] || items[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[idx - 1] || items[items.length - 1];
        prev.focus();
      } else if (e.key === 'Escape') {
        closeDropdown();
        dropdownToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close on Escape anywhere
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  /* ---- Mobile Hamburger ---- */
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileNav  = document.getElementById('nav-mobile');

  function openMobileNav() {
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      isOpen ? closeMobileNav() : openMobileNav();
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ---- Scroll: Nav border emphasis ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
      } else {
        nav.style.borderBottomColor = '';
      }
    }, { passive: true });
  }

  /* ---- Entrance Animations (skip if reduced-motion) ---- */
  if (!prefersReducedMotion) {
    const animTargets = document.querySelectorAll('[data-anim]');

    if (animTargets.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

      // Inject animation styles
      const style = document.createElement('style');
      style.textContent = `
        [data-anim] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 500ms ease, transform 500ms ease;
        }
        [data-anim][data-anim-delay="1"] { transition-delay: 80ms; }
        [data-anim][data-anim-delay="2"] { transition-delay: 160ms; }
        [data-anim][data-anim-delay="3"] { transition-delay: 240ms; }
        [data-anim][data-anim-delay="4"] { transition-delay: 320ms; }
        [data-anim][data-anim-delay="5"] { transition-delay: 400ms; }
        [data-anim][data-anim-delay="6"] { transition-delay: 480ms; }
        [data-anim].anim-in {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);

      animTargets.forEach(t => observer.observe(t));
    }
  }

  /* ---- Active Nav Link highlight ---- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  /* ---- Project Card keyboard click ---- */
  document.querySelectorAll('.project-card, .personal-tile').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = card.href || card.querySelector('a')?.href;
        if (link) window.location.href = link;
        else card.click();
      }
    });
  });

  /* ---- Scroll Progress (project pages) ---- */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

})();
