import { create } from '../utils/utils';

const panel = create('div', 'panel');
const buttonsWrapper = create('div', 'buttons-wrapper');

const labelForCreate = create('label', 'label-create');
const labelForUpdate = create('label', 'label-update');

const createCarElement = create('input', 'create-car');
createCarElement.setAttribute('type', 'text');

const updateCarElement = create('input', 'update-car');
updateCarElement.setAttribute('type', 'text');

const colorCreateCar = create('input', 'color-create');
colorCreateCar.setAttribute('type', 'color');

const colorUpdateCar = create('input', 'color-update');
colorUpdateCar.setAttribute('type', 'color');

const createCarButton = create('button', 'create-button');
createCarButton.textContent = 'Create'.toLocaleUpperCase();
createCarButton.setAttribute('type', 'button');

const updateCarButton = create('button', 'update-button');
updateCarButton.textContent = 'Update'.toLocaleUpperCase();
updateCarButton.setAttribute('type', 'button');

const raceCarButton = create('button', 'race-button');
raceCarButton.textContent = 'Race'.toLocaleUpperCase();
raceCarButton.setAttribute('type', 'button');

const resetCarButton = create('button', 'reset-button');
resetCarButton.textContent = 'Reset'.toLocaleUpperCase();
resetCarButton.setAttribute('type', 'button');

const generateCarButton = create('button', 'generate-button');
generateCarButton.textContent = 'Generate'.toLocaleUpperCase();
generateCarButton.setAttribute('type', 'button');

buttonsWrapper.append(raceCarButton, resetCarButton, generateCarButton);

labelForCreate.append(createCarElement, colorCreateCar, createCarButton);
labelForUpdate.append(updateCarElement, colorUpdateCar, updateCarButton);

panel.append(labelForCreate, labelForUpdate, buttonsWrapper);
export { panel };
