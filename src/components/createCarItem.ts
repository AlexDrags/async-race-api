import { create } from '../utils/utils';
import { templateCarString } from './templateSvgString';
import { responseProps } from '../types/types';

export function createCarItem({ name, color, id }: responseProps) {
  const selectCarButton = create('button', 'select-item');
  selectCarButton.textContent = 'Select'.toUpperCase();

  const removeCarButton = create('button', 'remove-item');
  removeCarButton.textContent = 'Remove'.toUpperCase();

  const carTitle = create('p', 'car-title');
  carTitle.textContent = `${name}`;

  const carItem = create('li', 'view-item');
  carItem.setAttribute('data-id', `${id}`);
  carItem.append(selectCarButton, removeCarButton, carTitle);
  const svgCar = document.createElement('svg');
  const changeStr = templateCarString.replace(
    'style="fill: red"',
    `style="fill: ${color}"`,
  );
  carItem.insertAdjacentHTML('beforeend', changeStr);
  return carItem;
}
