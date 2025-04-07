import { createCarItem } from '../components/createItemCarsList';
import {
  createCar,
  deleteCar,
  getGarageCars,
  updateCar,
  engineVelocityFetch,
  engineDriveFetch,
  engineStopFetch,
  getWinnerFetch,
} from '../modules/garageFetchApi';
import { title } from '../modules/locationResolver';
import { garageState } from '../modules/garageState';

export function create(tag: string, id: string) {
  const createEl = document.createElement(`${tag}`);
  createEl.classList.add(`${id}`);
  return createEl;
}

export async function universeFunctionCarElement(e: Event) {
  if (
    e.currentTarget !== null &&
    e.currentTarget instanceof HTMLElement &&
    e.target instanceof HTMLElement
  ) {
    /* Удаление авто */
    if (e.target !== null && e.target.classList.contains('remove-item')) {
      e.currentTarget.remove();

      const deleteResponse = await deleteCar(
        Number(e.currentTarget.dataset.id),
      );

      const getResonse = await getGarageCars();
      console.log(
        'length after remove: ',
        getResonse.length,
        garageState.length,
        garageState,
      );

      setTimeout(() => {
        title.textContent = `Garage: ${getResonse.length}`;
      }, 250);
    }
    /* Пуск анимации движения авто по кнопке R */
    if (e.target.classList.contains('race')) {
      const id = Number(e.currentTarget.dataset.id);
      const carImg = e.currentTarget.querySelector('svg');
      const stopButton = e.currentTarget.querySelector('.stop');

      if (
        carImg !== null &&
        e.target instanceof HTMLButtonElement &&
        stopButton instanceof HTMLButtonElement
      ) {
        {
          e.target.disabled = true;
          stopButton.disabled = false;
        }

        if (carImg.classList.contains('car-race')) {
          console.log('remove class');
          carImg.classList.remove('car-race');
        }

        const velocityResponse = await engineVelocityFetch(id);
        const speed = velocityResponse.velocity * 200;

        if (speed) {
          carImg.style.animationDuration = `${speed}ms`;
          carImg.classList.add('car-race');

          const driveResponse = await engineDriveFetch(id);

          setTimeout(() => {
            if (driveResponse.success === false)
              carImg.style.animationPlayState = 'paused';
          }, 0);
        }
      }
    }
    /* Остановка автомобиля по кнопке S */
    if (
      e.target.classList.contains('stop') &&
      e.target instanceof HTMLButtonElement
    ) {
      const id = Number(e.currentTarget.dataset.id);
      const stopButton = e.currentTarget.querySelector('.stop');

      const startButton = e.currentTarget.querySelector('.race');
      const carImg = e.currentTarget.querySelector('svg');
      if (carImg !== null && startButton instanceof HTMLButtonElement) {
        {
          if (carImg.style.animationPlayState === 'paused') {
            carImg.style.animationPlayState = '';
          }
        }
        const stopResponse = await engineStopFetch(id);
        if (stopResponse.velocity === 0) {
          e.target.disabled = true;
          startButton.disabled = false;
          setTimeout(() => {
            carImg.classList.remove('car-race');
          });
        }
      }
    }
    /* Выбор для обновления параметров авто */
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
          if (
            e.target instanceof HTMLButtonElement &&
            e.target.classList.contains('update-button')
          )
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
      const updateElement = document.querySelector(
        `.view-item[data-id="${id}"]`,
      );

      const response = await updateCar(
        { name: nameValue, color: colorValue },
        id,
      ).then(() => {
        if (updateElement !== null) {
          const nameCar = updateElement.querySelector('.car-title');
          const colorCar = updateElement.querySelector('svg');
          if (nameCar instanceof HTMLElement && colorCar !== null) {
            nameCar.textContent = `${nameValue}`;
            colorCar.style.fill = `${colorValue}`;
          }
        }
      });
    }
  }
}

export function raceAllCars() {
  const carsCollection =
    document.querySelectorAll<HTMLElement>('.view-item svg');

  carsCollection.forEach(async (carItem) => {
    if (carItem.parentElement !== null) {
      const raceCar = carItem.parentElement.querySelector('.race');
      const stopCar = carItem.parentElement.querySelector('.stop');
      {
        if (
          raceCar instanceof HTMLButtonElement &&
          stopCar instanceof HTMLButtonElement
        ) {
          raceCar.disabled = true;
          stopCar.disabled = false;
        }
      }
      const id = Number(carItem.parentElement.dataset.id);

      const velocityResponse = await engineVelocityFetch(id);
      const speed = velocityResponse.velocity * 100;

      if (speed) {
        carItem.style.animationDuration = `${speed}ms`;
        carItem.classList.add('car-race');
      }

      const driveResponse = await engineDriveFetch(id);
      if (driveResponse.success === false)
        setTimeout(() => {
          carItem.style.animationPlayState = 'paused';
        }, 0);
      const winnerResponse = await getWinnerFetch(id);
    }
  });
}

export function resetAllCars() {
  const carsCollection =
    document.querySelectorAll<HTMLElement>('.view-item svg');
  const raceButtonCollection = document.querySelectorAll('.view-item .race');
  const stopButtonCollection = document.querySelectorAll('.view-item .stop');
  carsCollection.forEach(async (carItem, index) => {
    if (carItem.style.animationPlayState === 'paused') {
      carItem.style.animationPlayState = '';
    }
    if (carItem.parentElement !== null) {
      const id = Number(carItem.parentElement.dataset.id);
      const stopResponse = await engineStopFetch(id);
      if (stopResponse.velocity === 0)
        setTimeout(() => {
          carItem.classList.remove('car-race');
        }, 0);
      if (stopButtonCollection[index] instanceof HTMLButtonElement)
        stopButtonCollection[index].disabled = true;
      if (raceButtonCollection[index] instanceof HTMLButtonElement)
        raceButtonCollection[index].disabled = false;
    }
  });
}
