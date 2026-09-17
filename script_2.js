/* ============================================
   CareerTech — Clean, Professional Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMobileMenu();
    initScrollReveal();
    initCounters();
});

/* — Navbar — */
function initNav() {
    const nav = document.getElementById('nav');
    let ticking = false;
    const update = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    });
    update();
}

/* — Mobile Menu — */
function initMobileMenu() {
    const btn = document.getElementById('nav-hamburger');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btn.classList.remove('active');
            menu.classList.remove('open');
        });
    });
}

/* — Scroll Reveal — */
function initScrollReveal() {
    const items = document.querySelectorAll('[data-anim]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
}

/* — Animated Counters — */
function initCounters() {
    const items = document.querySelectorAll('.stats__item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target.querySelector('.stats__number');
                const target = parseInt(e.target.dataset.count, 10);
                animate(el, target);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    items.forEach(item => observer.observe(item));
}

function animate(el, target) {
    const duration = target <= 10 ? 1200 : 2000;
    const start = performance.now();
    const tick = now => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    };
    requestAnimationFrame(tick);
}