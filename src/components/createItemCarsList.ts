import { create } from '../utils/utils';
import { templateCarString, templateFlagString } from './templateSvgString';
import { responseProps } from '../types/types';
import { universeFunctionCarElement } from '../utils/utils';

export function createCarItem(carObj: responseProps) {
  const selectCarButton = create('button', 'select-item');
  selectCarButton.textContent = 'Select'.toUpperCase();

  const raceButton = create('button', 'race');
  raceButton.textContent = 'R';
  const stopButton = create('button', 'stop');
  stopButton.textContent = 'S';
  stopButton.setAttribute('disabled', ``);

  const removeCarButton = create('button', 'remove-item');
  removeCarButton.textContent = 'Remove'.toUpperCase();

  const carTitle = create('p', 'car-title');
  carTitle.textContent = `${carObj.name}`.toLocaleUpperCase();

  const carItem = create('li', 'view-item');
  carItem.setAttribute('data-id', `${carObj.id}`);
  carItem.addEventListener('click', universeFunctionCarElement);

  const controlCarWrapper = create('div', 'control-car-wrapper');
  controlCarWrapper.append(
    selectCarButton,
    removeCarButton,
    raceButton,
    stopButton,
  );
  carItem.append(controlCarWrapper, carTitle);
  const changeStr = templateCarString.replace(
    'style="fill: red"',
    `style="fill: ${carObj.color}"`,
  );
  carItem.insertAdjacentHTML('beforeend', changeStr);
  carItem.insertAdjacentHTML('beforeend', templateFlagString);
  return carItem;
}
