import { CarProps } from '../types/types';
import { garageState } from './garageState';

enum Paths {
  IsEngine = '/engine/',
  CarInGarage = '/garage/',
  CarLimit = '?_limit=',
}

export async function engineDriveFetch(id: number) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000${Paths.IsEngine}?id=${id}&status=drive`,
      {
        method: 'PATCH',
      },
    );
    if (response.status === 200) {
      console.log('Status drive car operation: ', response.status);
      const data = await response.json();
      console.log('Velocity obj: ', data);
      return data;
    }
    if (response.status === 400) {
      throw new Error(
        `Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive": ${response.status}`,
      );
    }
    if (response.status === 404) {
      throw new Error(
        `Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?: ${response.status}`,
      );
    }
    if (response.status === 429) {
      throw new Error(
        `Drive already in progress. You can't run drive for the same car twice while it's not stopped.: ${response.status}`,
      );
    }
    if (response.status === 500) {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function engineVelocityFetch(id: number) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000${Paths.IsEngine}?id=${id}&status=started`,
      {
        method: 'PATCH',
      },
    );
    if (response.status === 200) {
      console.log('Status start eng operation: ', response.status);
      const data = await response.json();
      console.log('Velocity obj: ', data);
      return data;
    }
    if (response.status === 400) {
      throw new Error(
        `response resolve with status BAD REQUEST: ${response.status}`,
      );
    }
    if (response.status === 404) {
      throw new Error(
        `response resolve with status NOT FOUND: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export async function engineStopFetch(id: number) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000${Paths.IsEngine}?id=${id}&status=stopped`,
      {
        method: 'PATCH',
      },
    );
    if (response.status === 200) {
      console.log('Status stop eng operation: ', response.status);
      const data = await response.json();
      console.log(data);
      return data;
    }
    if (response.status === 400) {
      throw new Error(
        `response resolve with status BAD REQUEST: ${response.status}`,
      );
    }
    if (response.status === 404) {
      throw new Error(
        `response resolve with status NOT FOUND: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(error);
  }
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
