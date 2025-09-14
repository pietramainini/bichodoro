// Alternador de tema claro/escuro
const themeSwitch = document.getElementById('theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Verificar preferência do sistema
if (prefersDarkScheme.matches) {
    document.body.classList.add('darkmode');
    themeSwitch.textContent = '🌞';
}

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    themeSwitch.textContent = document.body.classList.contains('darkmode') ? '🌞' : '🌙';

    // Salvar preferência no localStorage
    localStorage.setItem('theme', document.body.classList.contains('darkmode') ? 'dark' : 'light');
});

// Verificar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('darkmode');
    themeSwitch.textContent = '🌞';
} else if (savedTheme === 'light') {
    document.body.classList.remove('darkmode');
    themeSwitch.textContent = '🌙';
}

// Navegação suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});