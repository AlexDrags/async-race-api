import './style.scss';
import { getGarageCars } from './modules/garage';
import { locationResolver, title } from './modules/locationResolver';
import { createList } from './components/viewList';
import { garageState } from './modules/state';
import { responseProps } from './types/types';
import { tabsWrapper } from './components/tabsLocation';
import { panel } from './components/garageView';
export const body = document.body;

window.addEventListener('hashchange', () => {
  if (location) locationResolver();
});

window.addEventListener('load', async () => {
  const garageCarsRespone: responseProps[] = await getGarageCars();
  garageState.push(...garageCarsRespone);
  const listCars = createList(garageCarsRespone);
  if (listCars) {
    title.textContent = `Garage: ${garageState.length}`;
    body.append(tabsWrapper, panel, title, listCars);
  }
});

getGarageCars();
