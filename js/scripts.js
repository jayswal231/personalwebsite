/**
 * Mukesh Jayswal — Portfolio Website
 * scripts.js — Handles all page interactions
 */

/* ============================================================
   1. NAVBAR — scroll glass effect + mobile toggle
============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('navMobile');

  // Glass effect on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Trigger once on load
  if (window.scrollY > 20) navbar.classList.add('scrolled');

  // Mobile hamburger toggle
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when a link inside it is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
})();

/* ============================================================
   2. TYPED ROLE EFFECT (index.html)
============================================================ */
(function initTyped() {
  const el = document.getElementById('typedRole');
  if (!el) return;

  const roles   = ['AI Engineer', 'Computer Vision Engineer', 'Python Developer', 'ML Engineer'];
  let roleIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pauseTime = 0;

  el.innerHTML = '<span class="typed-text"></span><span class="typed-cursor">|</span>';
  const textEl = el.querySelector('.typed-text');

  function type() {
    const current = roles[roleIdx];

    if (deleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    textEl.textContent = current.slice(0, charIdx);

    let speed = deleting ? 60 : 100;

    if (!deleting && charIdx === current.length) {
      // Full word typed — pause before deleting
      pauseTime = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      // Finished deleting — move to next role
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      pauseTime = 300;
    }

    setTimeout(type, pauseTime > 0 ? (() => { const p = pauseTime; pauseTime = 0; return p; })() : speed);
  }

  setTimeout(type, 600);
})();

/* ============================================================
   3. SKILLS MARQUEE (index.html)
============================================================ */
(function initMarquee() {
  const strip = document.getElementById('skillsMarquee');
  if (!strip) return;

  const skills = [
    { icon: 'fa-brands fa-python',     label: 'Python' },
    { icon: 'fa-solid fa-eye',         label: 'Computer Vision' },
    { icon: 'fa-solid fa-brain',       label: 'Deep Learning' },
    { icon: 'fa-solid fa-comments',    label: 'NLP & Chatbots' },
    { icon: 'fa-solid fa-magnifying-glass', label: 'RAG · FAISS' },
    { icon: 'fa-solid fa-chart-bar',   label: 'NumPy · Pandas' },
    { icon: 'fa-solid fa-paw',         label: 'YOLO' },
    { icon: 'fa-solid fa-globe',       label: 'Django REST API' },
    { icon: 'fa-solid fa-database',    label: 'PostgreSQL' },
    { icon: 'fa-brands fa-git-alt',    label: 'Git' },
    { icon: 'fa-solid fa-columns',     label: 'Jira' },
    { icon: 'fa-solid fa-microchip',   label: 'OpenAI API' },
    { icon: 'fa-solid fa-wave-square', label: 'Anomaly Detection' },
    { icon: 'fa-solid fa-database',    label: 'MySQL' },
  ];

  // Double the list for seamless loop
  const doubled = [...skills, ...skills];
  strip.innerHTML = doubled.map(s =>
    `<span class="skill-chip"><i class="${s.icon}"></i>${s.label}</span>`
  ).join('');
})();

/* ============================================================
   4. SCROLL REVEAL ANIMATIONS
============================================================ */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
})();

/* ============================================================
   5. SKILL BAR ANIMATION (about.html)
============================================================ */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width') || 0;
        fill.style.width = width + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ============================================================
   6. PORTFOLIO FILTER (portfolio.html)
============================================================ */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects   = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projects.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        const show = filter === 'all' || categories.includes(filter);

        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          card.style.opacity    = '1';
          card.style.transform  = 'scale(1)';
          card.style.display    = 'flex';
        } else {
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.95)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all') {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
})();

/* ============================================================
   7. CONTACT FORM (contact.html)
============================================================ */
(function initContactForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('#fname').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showStatus('error', 'Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(email)) {
      showStatus('error', 'Please enter a valid email address.');
      return;
    }

    // Compose mailto link
    const subject = form.querySelector('#subject').value.trim() || 'Portfolio Contact';
    const lname   = form.querySelector('#lname')?.value.trim() || '';
    const body    = `Name: ${name} ${lname}\nEmail: ${email}\n\n${message}`;
    const mailto  = `mailto:mukesh18jayswal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    showStatus('success', '✓ Opening your email client... Thank you for reaching out!');
    form.reset();
  });

  function showStatus(type, msg) {
    if (!status) return;
    status.className = 'form-status ' + type;
    status.textContent = msg;
    setTimeout(() => { status.className = 'form-status'; }, 6000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();

/* ============================================================
   8. DYNAMIC YEAR IN FOOTER
============================================================ */
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
