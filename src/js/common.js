import initThemeSwitcher from './modules/theme-switcher';
import initCardTilt from './modules/card-tilt';

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
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
