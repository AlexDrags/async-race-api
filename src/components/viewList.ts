import { create } from '../utils/utils';
import { createCarItem } from './createCarItem';
import { responseProps } from '../types/types';

export function createList(state: responseProps[]) {
  const viewList = create('ul', 'view-list');

  if (state) {
    state.forEach((objCar: responseProps) => {
      const { name, color, id } = objCar;
      const carItem = createCarItem({ name, color, id });
      viewList.appendChild(carItem);
    });
    return viewList;
  }
}
