document.addEventListener('DOMContentLoaded', () => {
    // Tema
    const THEME_KEY = 'darkmode';
    const themeBtn = document.getElementById('theme-switch');
    const isActive = () => localStorage.getItem(THEME_KEY) === 'active';
    const applyTheme = (active) => {
        document.body.classList.toggle('darkmode', active);
        themeBtn?.setAttribute('aria-pressed', String(active));
    };
    const enable = () => { localStorage.setItem(THEME_KEY, 'active'); applyTheme(true); };
    const disable = () => { localStorage.removeItem(THEME_KEY); applyTheme(false); };

    if (themeBtn) {
        applyTheme(isActive());
        themeBtn.addEventListener('click', () => (isActive() ? disable() : enable()));
    }

    // Sidebar: sincroniza layout (body padding) e aria
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open_btn');
    if (sidebar && openBtn) {
        const syncAria = () =>
            openBtn.setAttribute('aria-expanded', String(sidebar.classList.contains('open-sidebar')));
        openBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open-sidebar');
            document.body.classList.toggle('sidebar-open'); // compensa padding-left
            syncAria();
        });
        syncAria();
    }

    // Estado ativo do menu lateral
    document.querySelectorAll('#side_items .side-item').forEach((li) => {
        li.addEventListener('click', () => {
            document.querySelector('#side_items .side-item.active')?.classList.remove('active');
            li.classList.add('active');
        });
    });

    // Smooth-scroll apenas para âncoras internas válidas
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const el = targetId ? document.querySelector(targetId) : null;
            if (!el) return;
            e.preventDefault();
            window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // Placeholder
    window.emBreve = window.emBreve || function(){ alert('Disponível em breve!'); };
});