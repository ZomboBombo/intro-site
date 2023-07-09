/* eslint-disable arrow-parens */
/* eslint-disable no-new */
/* eslint-disable curly */

export default function initCardTilt() {
  const $cardTiltElems = document.querySelectorAll('[data-card]');
  if (!$cardTiltElems.length) return;

  class CardTilt {
    static CNST_TILT_MAX_ANCLE = 25;

    constructor(card) {
      this._card = card;

      this._onCardTilt = this._onCardTilt.bind(this);
      this._card.addEventListener('mousemove', this._onCardTilt);
    }

    _rotateCard(evt, card) {
      const x = evt.clientX - card.getBoundingClientRect().x;
      const y = evt.clientY - card.getBoundingClientRect().y;

      const middleX = card.getBoundingClientRect().width / 2;
      const middleY = card.getBoundingClientRect().height / 2;

      const offsetX = ((x - middleX) / middleX) * CardTilt.CNST_TILT_MAX_ANCLE;
      const offsetY = ((y - middleY) / middleY) * CardTilt.CNST_TILT_MAX_ANCLE;

      card.style.setProperty('--card-tilt-ancle-X', `${-offsetY}deg`);
      card.style.setProperty('--card-tilt-ancle-Y', `${offsetX}deg`);
    }

    _onCardTilt(evt) {
      evt.preventDefault();
      this._rotateCard(evt, evt.currentTarget);

      const onStopTilting = () => {
        this._card.style.setProperty('--card-tilt-ancle-X', '0deg');
        this._card.style.setProperty('--card-tilt-ancle-Y', '0deg');
        this._card.removeEventListener('mouseleave', onStopTilting);
      };

      this._card.addEventListener('mouseleave', onStopTilting);
    }
  }


  /*
    Init of Main Class Logic
  */
  $cardTiltElems.forEach(card => new CardTilt(card));
}
