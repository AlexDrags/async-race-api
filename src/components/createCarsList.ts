import { create } from '../utils/utils';
import { createCarItem } from './createItemCarsList';
import { responseProps } from '../types/types';
import { showWiner } from '../utils/utils';
export function createList(state: responseProps[]) {
  const viewList = create('ul', 'view-list');

  if (state) {
    state.forEach((objCar: responseProps) => {
      const { name, color, id } = objCar;
      const carItem = createCarItem({ name, color, id });
      carItem.addEventListener('animationend', () => {
        const time = `${carItem.dataset.velocity}`;
        const carName = name;
        showWiner(carName, time);
      });
      viewList.appendChild(carItem);
    });
    return viewList;
  }
}
