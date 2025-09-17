document.addEventListener('DOMContentLoaded', () => {
    // === Tema ===
    const THEME_KEY = 'darkmode';
    const btnTheme = document.getElementById('theme-switch');
    const isActive = () => localStorage.getItem(THEME_KEY) === 'active';
    const apply = (active) => {
        document.body.classList.toggle('darkmode', active);
        btnTheme?.setAttribute('aria-pressed', String(active));
    };
    const enable = () => { localStorage.setItem(THEME_KEY, 'active'); apply(true); };
    const disable = () => { localStorage.removeItem(THEME_KEY); apply(false); };
    apply(isActive());
    btnTheme?.addEventListener('click', () => (isActive() ? disable() : enable()));

    // === Smooth-scroll somente para âncoras válidas ===
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            const el = id ? document.querySelector(id) : null;
            if (!el) return;
            e.preventDefault();
            window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // === Menu hambúrguer acessível ===
    const nav = document.getElementById('primary-nav');
    const navToggle = document.getElementById('nav-toggle');
    const backdrop = document.getElementById('nav-backdrop');

    let lastFocus = null; // por quê: devolver foco ao botão ao fechar

    const closeNav = () => {
        document.body.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded', 'false');
        backdrop?.setAttribute('hidden', '');
        lastFocus?.focus?.();
    };

    const openNav = () => {
        lastFocus = document.activeElement;
        document.body.classList.add('nav-open');
        navToggle?.setAttribute('aria-expanded', 'true');
        backdrop?.removeAttribute('hidden');
        // foca 1º link para acessibilidade
        const firstLink = nav?.querySelector('a, button');
        firstLink?.focus?.();
    };

    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        expanded ? closeNav() : openNav();
    });

    backdrop?.addEventListener('click', closeNav);

    // Fecha ao selecionar um link no painel
    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

    // Esc fecha
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav();
    });

    // Em resize para desktop, garante estado fechado
    const mq = window.matchMedia('(min-width: 641px)');
    mq.addEventListener('change', (ev) => { if (ev.matches) closeNav(); });

    // Fallback global
    window.emBreve = window.emBreve || function(){ alert("Disponível em breve!"); };
});