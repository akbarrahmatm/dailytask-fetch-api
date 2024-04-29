import { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { deleteCar, getCarById } from "../utils/httpRequest";
import ErrorModal from "./ErrorModal";
import Loading from "./Loading";
import SuccessModal from "./SucessModal";

export default function TableCar({ data, isLoading, requestAt }) {
  const [errorFetch, setErrorFetch] = useState();
  const [successFetch, setSuccessFetch] = useState();

  async function handleClickDelete(id) {
    setErrorFetch(null);
    setSuccessFetch("Loading ...");

    try {
      const car = await getCarById(id);
      if (car.data.id === id) {
        const deletedCar = await deleteCar(id);
        setSuccessFetch(deletedCar.message);
      }
    } catch (err) {
      console.log(err);
      setSuccessFetch(null);
      setErrorFetch(err.message);
    }
  }

  return (
    <>
      {errorFetch && <ErrorModal message={errorFetch} open={errorFetch} />}

      {successFetch && (
        <SuccessModal message={successFetch} open={successFetch} />
      )}

      <Table className="m" bordered hover>
        <thead>
          <tr className="text-center">
            <th>No.</th>
            <th>Car ID</th>
            <th>Car Name</th>
            <th>Car Image</th>
            <th>Rent Per Day</th>
            <th>Capacity</th>
            <th>Car Type</th>
            <th>Last Update</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((car, index) => (
            <tr key={car.id}>
              <td className="text-center">{index + 1}.</td>
              <td>{car.id}</td>
              <td> {car.name} </td>
              <td className="text-center">
                <img className="car-img" src={car.image} alt={car.name} />
              </td>
              <td> {car.rentPerDay} </td>
              <td> {car.capacity} </td>
              <td>
                {car.capacity < 3
                  ? "Small"
                  : car.capacity < 7
                  ? "Medium"
                  : "Large"}
              </td>
              <td>{car.updatedAt}</td>
              <td className="text-center">
                <Button className="my-1" size="sm" variant="warning">
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    window.confirm(`Delete car with id ${car.id}?`)
                      ? handleClickDelete(car.id)
                      : false
                  }
                  className="my-1"
                  size="sm"
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!isLoading && data.length === 0 && (
        <p className="text-center">No Cars Available.</p>
      )}

      {isLoading && (
        <div className=" text-center">
          <Loading message={"Fetching cars data ..."} />
        </div>
      )}

      <p>Data gathered on : {isLoading ? "Loading..." : requestAt}</p>
    </>
  );
}
