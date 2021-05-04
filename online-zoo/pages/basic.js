const toggler = document.querySelector("#theme-toggler");
function toggleTheme() {
    if (toggler.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('toggler', 'dark');
      } else {
        document.body.removeAttribute('data-theme')
        localStorage.removeItem('toggler');
      }
}
function initTheme(){
    const darkThemeSelected = (localStorage.getItem('toggler')) !== null
      && localStorage.getItem('toggler') === 'dark';
    toggler.checked = darkThemeSelected;
    darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') :
      document.body.removeAttribute('data-theme');
  }
  if (toggler) {
    initTheme();
    toggler.addEventListener('change', toggleTheme);
  }
  