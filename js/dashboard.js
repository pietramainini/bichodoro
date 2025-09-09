// Sistema de Modo Escuro
const themeSwitch = document.getElementById("theme-switch");
let darkmode = localStorage.getItem("darkmode");

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    if (themeSwitch) themeSwitch.textContent = "☀️";
};

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
    if (themeSwitch) themeSwitch.textContent = "🌓";
};

// Verificar preferência salva ou do sistema
const initTheme = () => {
    if (darkmode === "active") {
    enableDarkMode();
} else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
){ enableDarkMode(); 
}
};

// Alternar modo claro/escuro
const setupThemeSwitch = () => {
    if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
        darkmode = localStorage.getItem("darkmode");
        darkmode !== "active" ? enableDarkMode() : disableDarkMode();
    });
}
};

// Verificar autenticação
const checkAuth = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
    window.location.href = "login.html";
    return;
}

  // Atualizar nome de usuário no dashboard
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
    usernameElement.textContent = currentUser;
}

  // Atualizar avatar com iniciais
    const userAvatar = document.querySelector(".user-avatar");
    if (userAvatar && currentUser) {
    userAvatar.textContent = currentUser.charAt(0).toUpperCase();
}
};

// Animação das barras de progresso
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll(".progress-fill");

    progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
        bar.style.width = width;
    }, 500);
  });

  // Animar gráfico de barras
    const chartBars = document.querySelectorAll(".chart-fill");
    chartBars.forEach((bar) => {
    const height = bar.style.height;
    bar.style.height = "0";

    setTimeout(() => {
        bar.style.height = height;
    }, 800);
});
};

// Simular notificações de lembrete
const setupReminders = () => {
    const reminders = document.querySelectorAll(".reminder-item");
    reminders.forEach((reminder, index) => {
    // Adicionar animação sequencial
    reminder.style.opacity = "0";
    reminder.style.transform = "translateX(-20px)";

    setTimeout(() => {
        reminder.style.transition = "all 0.5s ease";
        reminder.style.opacity = "1";
        reminder.style.transform = "translateX(0)";
    }, 300 * index);
});
};

// Interatividade com o pet
const setupPetInteractions = () => {
    const careBtn = document.querySelector(".pet-actions .btn-primary");
    const playBtn = document.querySelector(".pet-actions .btn-secondary");
    if (careBtn) {
    careBtn.addEventListener("click", () => {
        increasePetStat("health", 10);
        showNotification("Pet cuidado! Saúde +10");
    });
} if (playBtn) {
    playBtn.addEventListener("click", () => {
        increasePetStat("happiness", 15);
        showNotification("Você brincou com seu pet! Felicidade +15");
    });
}
};

// Aumentar estatística do pet
const increasePetStat = (stat, value) => {
    const statElement = document.querySelector(`.${stat}-fill`);
    if (!statElement) return;
    const currentWidth = parseInt(statElement.style.width);
    const newWidth = Math.min(currentWidth + value, 100);
    
    statElement.style.width = `${newWidth}%`;

  // Atualizar texto
    const statLabel = statElement
    .closest(".stat-bar")
    .querySelector(".stat-label span:last-child");
    if (statLabel) {
    statLabel.textContent = `${newWidth}%`;
}
};

// Mostrar notificação
const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    background: var(--primary);
    color: white;
    padding: 12px 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 300)
}, 3000);
};

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    setupThemeSwitch();
    checkAuth();
    animateProgressBars();
    setupReminders();
    setupPetInteractions();

  // Adicionar estilos para animações de notificação
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }`;
    document.head.appendChild(style);
});
