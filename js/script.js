// 获取系统颜色偏好
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 设置主题
function setTheme(theme) {
    if (theme === 'auto') {
        document.documentElement.setAttribute('data-theme', getSystemTheme());
        localStorage.setItem('theme-preference', 'auto');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme-preference', theme);
    }
}

// 初始化
(function() {
    const saved = localStorage.getItem('theme-preference') || 'auto';
    setTheme(saved);
    
    // 监听系统颜色变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme-preference') === 'auto') {
            setTheme('auto');
        }
    });
})();
