// Sistema de Modo Escuro
const themeSwitch = document.getElementById('theme-switch');
let darkmode = localStorage.getItem('darkmode');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
  if (themeSwitch) themeSwitch.textContent = '☀️';
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
  if (themeSwitch) themeSwitch.textContent = '🌙';
};

// Verificar preferência salva ou do sistema
const initTheme = () => {
  if (darkmode === 'active') {
    enableDarkMode();
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode();
  }
};

// Alternar modo claro/escuro
const setupThemeSwitch = () => {
  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      darkmode = localStorage.getItem('darkmode');
      darkmode !== 'active' ? enableDarkMode() : disableDarkMode();
    });
  }
};

// Animação simples das barras de progresso
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  if (progressBars.length > 0) {
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 500);
    });
  }
};

// Navegação
const navigateTo = (page) => {
  window.location.href = page;
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  setupThemeSwitch();
  animateProgressBars();
});