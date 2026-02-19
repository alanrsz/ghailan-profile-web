/* ============================================
   GHAILAN RASENDRIYA SAMARA - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM ELEMENTS ---------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const modal = document.getElementById('imageModal');

  /* ---------- NAVBAR SCROLL EFFECT ---------- */
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---------- HAMBURGER MENU ---------- */
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  (function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  })();

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
    var windowHeight = window.innerHeight;

    reveals.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      var revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  // Trigger on load
  setTimeout(revealOnScroll, 100);

  /* ---------- SKILL BAR ANIMATION ---------- */
  function animateSkillBars() {
    var bars = document.querySelectorAll('.skill-bar-fill');
    var windowHeight = window.innerHeight;

    bars.forEach(function (bar) {
      var rect = bar.getBoundingClientRect();
      if (rect.top < windowHeight - 50 && !bar.classList.contains('animated')) {
        var width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
          bar.classList.add('animated');
        }
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars, { passive: true });
  setTimeout(animateSkillBars, 300);

  /* ---------- MODAL / LIGHTBOX ---------- */
  // Make functions globally accessible
  window.openModal = function (src, caption) {
    if (!modal) return;
    var modalImg = document.getElementById('modalImage');
    var modalCap = document.getElementById('modalCaption');

    if (modalImg) modalImg.src = src;
    if (modalCap) modalCap.textContent = caption || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close modal on overlay click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        window.closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeModal();
    }
  });

  /* ---------- CONTACT FORM HANDLER ---------- */
  window.handleFormSubmit = function (e) {
    e.preventDefault();

    var form = e.target;
    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Mohon lengkapi semua field.');
      return;
    }

    // Construct mailto link as fallback
    var subject = encodeURIComponent('Pesan dari ' + name + ' via Website');
    var body = encodeURIComponent(
      'Nama: ' + name + '\nEmail: ' + email + '\n\nPesan:\n' + message
    );
    var mailtoLink = 'mailto:ghrasammara@gmail.com?subject=' + subject + '&body=' + body;

    window.location.href = mailtoLink;

    // Show confirmation
    alert('Terima kasih, ' + name + '! Pesan Anda akan dikirim melalui email client Anda.');
    form.reset();
  };

  /* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();
