/* =========================================================
   Akhil — Portfolio interactions
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------------- Page Loader ---------------- */
  const loader = document.getElementById('pageLoader');
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('is-hidden');
    document.body.classList.add('is-ready');
    setTimeout(() => loader.remove(), 900);
  };
  // Wait for window load so the bar animates to full
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 600);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 600));
    // safety fallback
    setTimeout(hideLoader, 3500);
  }

  /* ---------------- Smooth anchor scrolling ---------------- */
  const NAV_OFFSET = 80; // approx nav height
  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({
      top,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  };

  // Honor hash on initial load (after loader is gone)
  const applyInitialHash = () => {
    const id = (window.location.hash || '').replace('#', '');
    if (!id) return;
    const el = document.getElementById(id);
    if (el) scrollToId(id);
  };
  // Defer until loader is gone so smooth scroll isn't interrupted
  window.addEventListener('load', () => setTimeout(applyInitialHash, 1200));

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const id = target.id;
      // close mobile menu if open
      closeMobileMenu();
      scrollToId(id);
    });
  });

  /* ---------------- Navigation active state ---------------- */
  const sections = ['home', 'about', 'work', 'project', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('.nav-link, .mobile-links a');

  const setActive = (id) => {
    navLinks.forEach((l) => {
      const matches = l.dataset.target === id;
      l.classList.toggle('is-active', matches);
    });
  };

  const onScroll = () => {
    // sticky nav
    const nav = document.getElementById('nav');
    if (nav) {
      nav.classList.toggle('is-stuck', window.scrollY > 30);
    }

    // active section
    const trigger = window.scrollY + window.innerHeight * 0.35;
    let active = sections[0]?.id || 'home';
    for (const sec of sections) {
      if (sec.offsetTop <= trigger) active = sec.id;
    }
    setActive(active);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  const openMobileMenu = () => {
    burger?.classList.add('is-open');
    burger?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'false');
  };
  const closeMobileMenu = () => {
    burger?.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
  };
  burger?.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('is-open')) closeMobileMenu();
    else openMobileMenu();
  });
  document.addEventListener('click', (e) => {
    if (!mobileMenu || !burger) return;
    if (mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');

  // Only animate hides if JS is actually running and user wants motion.
  if (!reduceMotion) {
    document.documentElement.classList.add('js-reveal-ready');
  }

  const fireReveal = (el) => el.classList.add('is-in');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fireReveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach((el) => io.observe(el));

    // Safety net: if a reveal never enters the viewport
    // (e.g. very short page or hash-scroll that finishes late),
    // make sure everything is shown within 1.5s.
    setTimeout(() => revealEls.forEach(fireReveal), 1500);
  } else {
    revealEls.forEach(fireReveal);
  }

  /* ---------------- Cursor light ---------------- */
  if (!isTouch && !reduceMotion) {
    const light = document.querySelector('.cursor-light');
    let mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
    }, { passive: true });
    const tick = () => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      if (light) light.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- Hero parallax + avatar tilt ---------------- */
  const avatar = document.getElementById('avatarWrap');
  const heroVisual = document.querySelector('.hero-visual');

  if (!reduceMotion && !isTouch) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      if (avatar) {
        avatar.style.transform = `perspective(1200px) rotateY(${-4 + x * 6}deg) rotateX(${-y * 4}deg)`;
      }
      if (heroVisual) {
        heroVisual.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
      }
    }, { passive: true });
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (!reduceMotion && !isTouch) {
    document.querySelectorAll('.btn, .nav-cta').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---------------- 3D tilt for work cards ---------------- */
  if (!reduceMotion && !isTouch) {
    document.querySelectorAll('.work-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------------- Hero parallax on scroll ---------------- */
  const heroBg = document.querySelector('.hero-bg');
  const aboutCard = document.querySelector('.about-card-frame');
  const projectVisual = document.querySelector('.project-visual');

  if (!reduceMotion) {
    const parallaxOnScroll = () => {
      const y = window.scrollY;
      if (heroBg) heroBg.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      if (aboutCard && y < 1200) aboutCard.style.transform = `rotate(-3deg) translateY(${Math.max(0, (y - 600) * 0.06)}px)`;
      if (projectVisual && y > 1000) projectVisual.style.transform = `translateY(${Math.min(0, (1500 - y) * 0.05)}px)`;
    };
    window.addEventListener('scroll', parallaxOnScroll, { passive: true });
  }
})();