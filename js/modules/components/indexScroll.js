export function initIndexScroll() {
  const logo = document.querySelector('.index-logo');
  if (!logo) return;

  history.scrollRestoration = 'auto';
  logo.style.height = '40px';
}
