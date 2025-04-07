import { body } from '..';
import { panel } from '../components/createGarageElements';
import { create } from '../utils/utils';
import { garageState } from './garageState';
import { winnersState } from './garageState';

export const title = create('p', 'title');

export async function locationResolver() {
  const location = window.location.hash;

  const carsList = document.querySelectorAll<HTMLElement>('ul');
  switch (location) {
    case '#/winners':
      console.log(carsList[0]);
      carsList[0].classList.add('list-hide-js');
      carsList[1].classList.remove('list-hide-js');
      if (!winnersState) title.textContent = `Winners: 0`;
      if (winnersState) title.textContent = `Winners: ${winnersState.length}`;
      panel.remove();
      break;
    default:
      console.log(carsList[1]);
      carsList[0].classList.remove('list-hide-js');
      carsList[1].classList.add('list-hide-js');
      if (!garageState) title.textContent = `Garage: 0`;
      if (garageState) {
        panel.remove();
        body.insertBefore(panel, title);
        title.textContent = `Garage: ${garageState.length}`;
      }
      break;
  }
}
