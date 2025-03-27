import { create } from '../utils/utils';
import { deleteCar } from '../modules/garage';
import { garageState } from '../modules/state';
import { getGarageCars } from '../modules/garage';
import { templateCarString } from './templateSvgString';
import { responseProps } from '../types/types';
import { title } from '../modules/locationResolver';

async function removeCarElement(e: Event) {
  if (e.target !== null && e.target instanceof HTMLElement) {
    if (e.currentTarget !== null && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.remove();

      const deleteResponse = await deleteCar(
        Number(e.currentTarget.dataset.id),
      );

      const getResonse = await getGarageCars();
      console.log('length after remove: ', garageState.length, garageState);

      setTimeout(() => {
        title.textContent = `Garage: ${getResonse.length}`;
      }, 250);
    }
  }
}

export function createCarItem({ name, color, id }: responseProps) {
  const selectCarButton = create('button', 'select-item');
  selectCarButton.textContent = 'Select'.toUpperCase();

  const removeCarButton = create('button', 'remove-item');
  removeCarButton.textContent = 'Remove'.toUpperCase();

  const carTitle = create('p', 'car-title');
  carTitle.textContent = `${name}`;

  const carItem = create('li', 'view-item');
  carItem.setAttribute('data-id', `${id}`);
  carItem.addEventListener('click', removeCarElement);
  carItem.append(selectCarButton, removeCarButton, carTitle);
  const svgCar = document.createElement('svg');
  const changeStr = templateCarString.replace(
    'style="fill: red"',
    `style="fill: ${color}"`,
  );
  carItem.insertAdjacentHTML('beforeend', changeStr);
  return carItem;
}
