import './style.scss';

const body = document.body;
type CarProps = {
  name: string;
  color: string;
};

enum Paths {
  CarInGarage = '/garage/',
  CarLimit = '?_limit=',
  CarById = '',
}

async function getGarageCars() {
  const response = await fetch(`http://127.0.0.1:3000${Paths.CarInGarage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  console.log(json);
}

async function createCar(carObject: CarProps) {
  const response = await fetch(`http://127.0.0.1:3000${Paths.CarInGarage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carObject),
  });
}
async function updateCar(carObject: CarProps, id: number) {
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
}

async function deleteCar(id: number) {
  const response = await fetch(
    `http://127.0.0.1:3000${Paths.CarInGarage}${id}`,
    {
      method: 'DELETE',
    },
  );
}
getGarageCars();
// createCar({ name: 'ferarri', color: 'red' });
// deleteCar(20);
// updateCar({ name: 'bmw', color: 'black' }, 8);
