document.addEventListener('DOMContentLoaded', () => {});

/*
  В 'load' добавляются скрипты,
  не участвующие в работе первого экрана
*/
window.addEventListener('load', () => {
    // eslint-disable-next-line no-console
    console.log('---from `load` event');
});
