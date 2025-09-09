// Manipulador de formulário de login
const handleLogin = (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (username && password) {
    // Simular autenticação
    localStorage.setItem("currentUser", username);

    // Redirecionar para dashboard após login bem-sucedido
    window.location.href = "dashboard.html";
} else {
    alert("Por favor, preencha todos os campos.");
}
};

// Configurar formulário de login
const setupLoginForm = () => {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
}
};

// Verificar se usuário está logado (para páginas que requerem autenticação)
const checkAuth = () => {
    const currentUser = localStorage.getItem("currentUser");
    
    if (
    !currentUser &&
    (window.location.pathname.includes("dashboard.html") ||
    window.location.pathname.includes("profile.html"))
) {
    window.location.href = "login.html";
}
};

// Logout
const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
};

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
    setupLoginForm();
    checkAuth();
});
