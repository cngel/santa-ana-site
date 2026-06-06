
    // Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Hamburger
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }));

    // Scroll reveal
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Form submit simulado
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome     = document.getElementById('nome').value.trim();
      const email    = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      if (!nome || !email || !mensagem) {
        // highlight campos vazios
        [document.getElementById('nome'), document.getElementById('email'), document.getElementById('mensagem')].forEach(input => {
          if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }
      form.style.display = 'none';
      success.classList.add('show');
    });

    // Assunto radio visual
    document.querySelectorAll('.assunto-option input').forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.assunto-option').forEach(opt => opt.style.borderColor = '');
        if (radio.checked) radio.closest('.assunto-option').style.borderColor = 'var(--primary)';
      });
    });
  