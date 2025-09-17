document.addEventListener("DOMContentLoaded", function() {
    const switcherBtn = document.querySelector(".resumo_fn_switcher_btn");
    const body = document.body;

    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light');
        } else {
            body.classList.remove('light');
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Event listener for the button
    if (switcherBtn) {
        switcherBtn.addEventListener("click", () => {
            let newTheme;
            if (body.classList.contains('light')) {
                body.classList.remove('light');
                newTheme = 'dark';
            } else {
                body.classList.add('light');
                newTheme = 'light';
            }
            // Save the new theme to localStorage
            localStorage.setItem('theme', newTheme);
        });
    }
});