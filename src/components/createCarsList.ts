import { create } from '../utils/utils';
import { createCarItem } from './createItemCarsList';
import { responseProps } from '../types/types';
import { getWinners } from '../modules/garageFetchApi';

export function createList(state: responseProps[]) {
  const viewList = create('ul', 'view-list');

  if (state) {
    state.forEach((objCar: responseProps) => {
      const { name, color, id } = objCar;
      const carItem = createCarItem({ name, color, id });
      carItem.addEventListener('animationend', async () => {
        const responseWinners = await getWinners();
        console.log(responseWinners, 'animationend');
      });
      viewList.appendChild(carItem);
    });
    return viewList;
  }
}
