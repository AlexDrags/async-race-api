import { create } from '../utils/utils';
import { createCarItem } from './createCarItem';
import { responseProps } from '../types/types';

export function createList(state: responseProps[]) {
  const viewList = create('ul', 'view-list');

  if (state) {
    state.forEach((objCar) => {
      const carItem = createCarItem(objCar);
      viewList.appendChild(carItem);
    });
    return viewList;
  }
}
