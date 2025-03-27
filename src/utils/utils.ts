import { createCarItem } from '../components/createCarItem';
import { createCar, deleteCar, getGarageCars } from '../modules/garage';
import { title } from '../modules/locationResolver';
import { garageState } from '../modules/state';

export function create(tag: string, id: string) {
  const createEl = document.createElement(`${tag}`);
  createEl.classList.add(`${id}`);
  return createEl;
}

export async function removeCarElement(e: Event) {
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
