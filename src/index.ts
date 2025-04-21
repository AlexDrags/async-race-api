import './style.scss';
import { getGarageCars } from './modules/garageFetchApi';
import { locationResolver, title } from './modules/locationResolver';
import { createList } from './components/createCarsList';
import { garageState, winnersState } from './modules/garageState';
import { responseProps, winnerResponse } from './types/types';
import { tabsWrapper } from './components/createTabsElements';
import { getWinners } from './modules/garageFetchApi';
import { panel } from './components/createGarageElements';
import { modal } from './components/modal';
import { createWinnerList } from './components/createWinnersList';
export const body = document.body;

window.addEventListener('hashchange', () => {
  if (location) locationResolver();
});

window.addEventListener('load', async () => {
  const garageCarsRespone: responseProps[] = await getGarageCars();
  const winnerResponse: winnerResponse[] = await getWinners();
  const winnerList = createWinnerList(winnersState);
  const listCars = createList(garageState);
  if (listCars) {
    title.textContent = `Garage: ${garageState.length}`;
    if (winnerList instanceof HTMLElement)
      body.append(tabsWrapper, panel, title, listCars, winnerList, modal);
  }
});
