const BASE_URL = "http://localhost:3000";

export async function getAllCars(page = 1, limit = 10) {
  const response = await fetch(
    `${BASE_URL}/api/v1/cars?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const resData = await response.json();

  if (!response.ok) {
    const message = `${response.status} | ${resData.message}`;
    throw new Error(message);
  }

  return resData;
}

export async function createCar(car) {
  const response = await fetch(`${BASE_URL}/api/v1/cars`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(car),
  });

  const resData = await response.json();

  if (!response.ok) {
    const message = `${response.status} | ${resData.message}`;
    throw new Error(message);
  }

  return resData;
}

export async function deleteCar(id) {
  const response = await fetch(`${BASE_URL}/api/v1/cars/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    const message = `${response.status} | ${resData.message}`;
    throw new Error(message);
  }

  return resData;
}

export async function getCarById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/cars/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    const message = `${response.status} | ${resData.message}`;
    throw new Error(message);
  }

  return resData;
}
