import { create } from '../utils/utils';
import { createCarNode } from '../utils/utils';

const panel = create('div', 'panel');
const buttonsWrapper = create('div', 'buttons-wrapper');

const labelForCreate = create('label', 'label-create');
const labelForUpdate = create('label', 'label-update');

const createCarNameInput = document.createElement('input');
createCarNameInput.classList.add('create-car');
createCarNameInput.setAttribute('type', 'text');

const updateCarElement = create('input', 'update-car');
updateCarElement.setAttribute('type', 'text');
updateCarElement.setAttribute('disabled', '');

const colorCreateCarInput = document.createElement('input');
createCarNameInput.classList.add('color-create');
colorCreateCarInput.setAttribute('type', 'color');

const colorUpdateCar = create('input', 'color-update');
colorUpdateCar.setAttribute('type', 'color');
colorUpdateCar.setAttribute('disabled', '');

const createCarButton = create('button', 'create-button');
createCarButton.textContent = 'Create'.toLocaleUpperCase();
createCarButton.setAttribute('type', 'button');

createCarButton.addEventListener('click', async () => {
  createCarNode(createCarNameInput, colorCreateCarInput);
});

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

labelForCreate.append(createCarNameInput, colorCreateCarInput, createCarButton);
labelForUpdate.append(updateCarElement, colorUpdateCar, updateCarButton);

panel.append(labelForCreate, labelForUpdate, buttonsWrapper);
export { panel };
