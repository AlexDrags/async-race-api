import { create } from '../utils/utils';

export const tabsWrapper = create('div', 'tabs-wrapper');

const toGarageButton = create('button', 'garage-button');
toGarageButton.textContent = 'To garage'.toLocaleUpperCase();
toGarageButton.setAttribute('type', 'button');

const toWinnersButton = create('button', 'winners-button');
toWinnersButton.textContent = 'To winners'.toLocaleUpperCase();
toWinnersButton.setAttribute('type', 'button');

tabsWrapper.append(toGarageButton, toWinnersButton);
