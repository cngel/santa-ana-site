
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Hamburger menu
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      header.classList.add("scrolled");
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Scroll reveal
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Counter animation
    function animateCount(el, target, duration = 1800) {
      let start = 0;
      const step = Math.ceil(target / (duration / 16));
      const suffix = el.querySelector('.suffix') ? el.querySelector('.suffix').outerHTML : '';
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.innerHTML = start.toLocaleString('pt-AO') + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
    }

    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCount(el, parseInt(el.dataset.target));
          statsObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObs.observe(el));

    // Active nav link on scroll
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const active = link.getAttribute('href') === '#' + id;
            link.style.color     = active ? '#ffffff' : 'rgba(255,255,255,.72)';
            link.style.background = active ? 'rgba(255,255,255,.1)' : 'transparent';
          });
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('section[id], footer[id]').forEach(s => navObs.observe(s));
  