import './style.scss';
import { getGarageCars } from './modules/garageFetchApi';
import { locationResolver, title } from './modules/locationResolver';
import { createList } from './components/createCarsList';
import { garageState } from './modules/garageState';
import { responseProps } from './types/types';
import { tabsWrapper } from './components/createTabsElements';
import { panel } from './components/createGarageElements';
export const body = document.body;

window.addEventListener('hashchange', () => {
  if (location) locationResolver();
});

window.addEventListener('load', async () => {
  const garageCarsRespone: responseProps[] = await getGarageCars();
  console.log('Garage state: ', garageState.length, garageState);
  const listCars = createList(garageState);
  if (listCars) {
    title.textContent = `Garage: ${garageState.length}`;
    body.append(tabsWrapper, panel, title, listCars);
  }
});
