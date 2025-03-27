import { body } from '..';
import { panel } from '../components/garageView';
import { create } from '../utils/utils';
import { garageState } from './state';

export const title = create('p', 'title');

export async function locationResolver() {
  const location = window.location.hash;

  switch (location) {
    case '#/winners':
      panel.remove();
      title.textContent = `Winners: `;
      break;
    default:
      if (!garageState) title.textContent = `Garage: 0`;
      if (garageState) {
        body.insertBefore(panel, title);
        title.textContent = `Garage: ${garageState.length}`;
      }
      break;
  }
}
