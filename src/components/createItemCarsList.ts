import { create } from '../utils/utils';
import { templateCarString } from './templateSvgString';
import { responseProps } from '../types/types';
import { removeCarElement } from '../utils/utils';

export function createCarItem(carObj: responseProps) {
  const selectCarButton = create('button', 'select-item');
  selectCarButton.textContent = 'Select'.toUpperCase();

  const removeCarButton = create('button', 'remove-item');
  removeCarButton.textContent = 'Remove'.toUpperCase();

  const carTitle = create('p', 'car-title');
  carTitle.textContent = `${carObj.name}`;

  const carItem = create('li', 'view-item');
  carItem.setAttribute('data-id', `${carObj.id}`);
  carItem.addEventListener('click', removeCarElement);
  carItem.append(selectCarButton, removeCarButton, carTitle);
  const changeStr = templateCarString.replace(
    'style="fill: red"',
    `style="fill: ${carObj.color}"`,
  );
  carItem.insertAdjacentHTML('beforeend', changeStr);
  return carItem;
}
