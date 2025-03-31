import { createCarItem } from '../components/createItemCarsList';
import {
  createCar,
  deleteCar,
  getGarageCars,
  updateCar,
} from '../modules/garageFetchApi';
import { title } from '../modules/locationResolver';
import { garageState } from '../modules/garageState';

export function create(tag: string, id: string) {
  const createEl = document.createElement(`${tag}`);
  createEl.classList.add(`${id}`);
  return createEl;
}

export async function initUpdate(e: Event, id: number) {
  const target = e.target;
  const currentTarget = e.currentTarget;
  console.log('current:', currentTarget, 'target:', target);
  if (target !== null && currentTarget !== null) {
    const updateNameCarInput = document.querySelector('.update-car');
    const updateColorCarInput = document.querySelector('.update-color');

    if (
      updateNameCarInput instanceof HTMLInputElement &&
      updateColorCarInput instanceof HTMLInputElement
    ) {
      const nameValue = updateNameCarInput.value;
      const colorValue = updateColorCarInput.value;
      console.log('name: ', nameValue, 'color: ', colorValue, 'id: ', id);
      const response = await updateCar(
        { name: nameValue, color: colorValue },
        id,
      );
      console.log(response);
    }
  }
}

export async function universeFunctionCarElement(e: Event) {
  if (
    e.currentTarget !== null &&
    e.currentTarget instanceof HTMLElement &&
    e.target instanceof HTMLElement
  ) {
    if (e.target !== null && e.target.classList.contains('remove-item')) {
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

    if (e.target.classList.contains('race')) {
      const carImg = e.currentTarget.querySelector('svg');
      if (carImg !== null) {
        if (carImg.classList.contains('car-race')) {
          console.log('remove class');
          carImg.classList.remove('car-race');
        }
        setTimeout(() => {
          carImg.classList.add('car-race');
        }, 500);
      }
    }

    if (e.target.classList.contains('stop')) {
      const carImg = e.currentTarget.querySelector('svg');
      if (carImg !== null) {
        carImg.classList.remove('car-race');
      }
    }

    if (e.target.classList.contains('select-item')) {
      const updateCarLabel = document.querySelector('.label-update');
      const updateNameCarInput = document.querySelector('.update-car');
      const updateColorCarInput = document.querySelector('.update-color');
      const updateCarButton = document.querySelector('.update-button');

      const id = Number(e.currentTarget.dataset.id);

      if (
        updateCarLabel !== null &&
        updateCarButton instanceof HTMLButtonElement &&
        updateNameCarInput instanceof HTMLInputElement &&
        updateColorCarInput instanceof HTMLInputElement
      ) {
        updateCarButton.disabled = false;
        updateNameCarInput.disabled = false;
        updateColorCarInput.disabled = false;
        updateCarLabel.addEventListener('click', (e) => {
          initUpdate(e, id);
        });
      }
    }
  }
}

export async function createCarNode(
  createCarElement: HTMLInputElement,
  colorCreateCar: HTMLInputElement,
) {
  if (
    createCarElement instanceof HTMLInputElement &&
    colorCreateCar instanceof HTMLInputElement
  ) {
    if (createCarElement.value && colorCreateCar.value) {
      {
        const name = createCarElement.value;
        const color = colorCreateCar.value;
        const createResponse = await createCar({ name, color });
      }
      const { name, color, id } = garageState[garageState.length - 1];
      const newCarElement = createCarItem({ name, color, id });
      console.log(document.querySelector('view-list'));
      document.querySelector('.view-list')?.append(newCarElement);
      title.textContent = `Garage: ${garageState.length}`;
    }
  }
}
