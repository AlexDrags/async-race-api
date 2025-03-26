import './style.scss';
import { getGarageCars } from './modules/garage';
import { viewList } from './components/viewList';
import { panel } from './components/garageView';
import { locationResolver } from './modules/locationResolver';
import { tabsWrapper } from './components/tabsLocation';
const body = document.body;

window.addEventListener('hashchange', () => {
  if (location) locationResolver();
});

window.addEventListener('load', () => {
  body.append(tabsWrapper, panel, viewList);
});

getGarageCars();
