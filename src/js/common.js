import initThemeSwitcher from './modules/init-theme-switcher';
import initBurgerMenu from './modules/init-burger-menu';
import initCardTilt from './modules/init-card-tilt';

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initBurgerMenu();
  initCardTilt();
});


/*
  В "load" добавляются скрипты,
  не участвующие в работе первого экрана
*/
window.addEventListener('load', () => {
  // eslint-disable-next-line no-console
  console.log('-- from «load» event ---');
});
