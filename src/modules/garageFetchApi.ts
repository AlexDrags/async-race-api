import { CarProps } from '../types/types';
import { garageState } from './garageState';

enum Paths {
  CarInGarage = '/garage/',
  CarLimit = '?_limit=',
}

async function getGarageCars() {
  try {
    garageState.splice(0, garageState.length + 1);
    const response = await fetch(`http://127.0.0.1:3000${Paths.CarInGarage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Status get operation: ', response.status);
      const data = await response.json();
      console.log('Content operation: ', data);
      garageState.push(...data);
      return data;
    } else {
      throw new Error(`response resolve with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createCar({ name, color }: CarProps) {
  try {
    const response = await fetch(`http://127.0.0.1:3000${Paths.CarInGarage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });
    if (response.status === 201) {
      console.log('Status create operation: ', response.status);
      await getGarageCars();
    } else {
      throw new Error(`response resolve with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateCar(carObject: CarProps, id: number) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000${Paths.CarInGarage}${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carObject),
      },
    );
    if (response.status === 200) {
      console.log('Status update operation: ', response.status);
    } else {
      throw new Error(`response resolve with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteCar(id: number) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000${Paths.CarInGarage}${id}`,
      {
        method: 'DELETE',
      },
    );
    if (response.status === 200) {
      console.log('Status delete operation: ', response.status);
    } else {
      throw new Error(`response resolve with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export { getGarageCars, createCar, updateCar, deleteCar };
