import { create } from '../utils/utils';

export const tabsWrapper = create('div', 'tabs-wrapper');

const toGarageButton = create('a', 'garage-button');
toGarageButton.textContent = 'To garage'.toLocaleUpperCase();
toGarageButton.setAttribute('href', '#/');

const toWinnersButton = create('a', 'winners-button');
toWinnersButton.textContent = 'To winners'.toLocaleUpperCase();
toWinnersButton.setAttribute('href', '#/winners');

tabsWrapper.append(toGarageButton, toWinnersButton);
