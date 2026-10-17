// ============================================================
// SISTEMA DE ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const htmlElement = document.documentElement;

    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }

    // Evento de clique para trocar de tema
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            enableLightTheme();
            localStorage.setItem('theme', 'light');
        } else {
            enableDarkTheme();
            localStorage.setItem('theme', 'dark');
        }
    });

    function enableLightTheme() {
        htmlElement.classList.remove('dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun text-orange-400"></i><span id="themeLabel" class="hidden sm:inline">Modo Escuro</span>';
    }

    function enableDarkTheme() {
        htmlElement.classList.add('dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon text-yellow-400"></i><span id="themeLabel" class="hidden sm:inline">Modo Claro</span>';
    }
});