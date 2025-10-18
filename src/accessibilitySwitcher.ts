document.addEventListener('DOMContentLoaded', function () {
  const switcherBtn = document.querySelector<HTMLElement>(
    '.resumo_fn_switcher_btn'
  );
  const body = document.body;

  // Function to apply theme
  const applyTheme = (theme: string): void => {
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  };

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Event listener for the button
  if (switcherBtn) {
    switcherBtn.addEventListener('click', () => {
      let newTheme: string;
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        newTheme = 'light';
      } else {
        body.classList.add('dark');
        newTheme = 'dark';
      }
      // Save the new theme to localStorage
      localStorage.setItem('theme', newTheme);
    });
  }
});
