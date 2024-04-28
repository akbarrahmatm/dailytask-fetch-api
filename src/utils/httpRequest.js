export async function getAllCars(page = 1, limit = 10) {
  const response = await fetch(
    `http://localhost:3000/api/v1/cars?limit=${limit}&page=${page}`,
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
