import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { deleteCar, getCarById, updateCar } from "../utils/httpRequest";
import ErrorModal from "./ErrorModal";
import FormModal from "./FormModal";
import Loading from "./Loading";
import SuccessModal from "./SucessModal";

export default function TableCar({ data, isLoading, requestAt }) {
  const [errorFetch, setErrorFetch] = useState();
  const [successFetch, setSuccessFetch] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState();
  const [carData, setCarData] = useState();

  async function handleClickDelete(id) {
    setErrorFetch(null);
    setSuccessFetch("Loading ...");

    try {
      const response = await getCarById(id);
      if (response.data.id === id) {
        const deletedCar = await deleteCar(id);
        setSuccessFetch(deletedCar.message);
      }
    } catch (err) {
      console.log(err);
      setSuccessFetch(null);
      setErrorFetch(err.message);
    }
  }

  function handleInputEdit(e) {
    const { name, value } = e.target;

    setInputEdit({
      ...inputEdit,
      [name]: value,
    });
  }

  async function handleClickEdit(e, id) {
    setModalEdit(true);
    setErrorFetch(null);

    try {
      const response = await getCarById(id);

      setCarData(response.data);
      setInputEdit({
        id: response.data.id,
        name: response.data.name,
        rentPerDay: response.data.rentPerDay,
        capacity: response.data.capacity,
      });
    } catch (err) {
      setErrorFetch(err.message);
    }
  }

  async function handleClickUpdate() {
    console.log(inputEdit);
    const { id, name, rentPerDay, capacity } = inputEdit;
    try {
      const updateField = {
        name,
        rentPerDay,
        capacity,
      };

      const response = await updateCar(id, updateField);

      setSuccessFetch(response.message);
    } catch (err) {
      setErrorFetch(err.message);
    }
  }

  return (
    <>
      {errorFetch && <ErrorModal message={errorFetch} open={errorFetch} />}

      {successFetch && (
        <SuccessModal message={successFetch} open={successFetch} />
      )}

      <FormModal title={"Edit Car Data"} open={modalEdit}>
        <Form>
          <Form.Group className="mb-3" controlId="formCarName">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              onChange={handleInputEdit}
              type="text"
              name="name"
              value={inputEdit ? inputEdit.name : ""}
              placeholder="Enter Car Name"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRentPerDay">
            <Form.Label>Rent Per Day</Form.Label>
            <Form.Control
              onChange={handleInputEdit}
              type="number"
              name="rentPerDay"
              value={inputEdit ? inputEdit.rentPerDay : ""}
              placeholder="Enter Rent Per Day"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              onChange={handleInputEdit}
              type="number"
              name="capacity"
              value={inputEdit ? inputEdit.capacity : ""}
              placeholder="Enter Capacity"
              required
            />
          </Form.Group>

          <Button onClick={() => setModalEdit(false)} variant="secondary">
            Cancel
          </Button>
          <Button
            className="mx-1"
            onClick={() => handleClickUpdate(inputEdit ? inputEdit.id : "")}
            variant="success"
          >
            Update Data
          </Button>
        </Form>
      </FormModal>

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
              <td>
                {" "}
                Rp. {new Intl.NumberFormat("en-US").format(car.rentPerDay)}{" "}
              </td>
              <td> {car.capacity} </td>
              <td>
                {car.capacity < 3
                  ? "Small"
                  : car.capacity < 7
                  ? "Medium"
                  : "Large"}
              </td>
              <td>
                {new Date(car.updatedAt).toLocaleString("en-us", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: false,
                })}
              </td>
              <td className="text-center">
                <Button
                  onClick={(e) => handleClickEdit(e, car.id)}
                  className="mx-1"
                  size="sm"
                  variant="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    window.confirm(`Delete car with id ${car.id}?`)
                      ? handleClickDelete(car.id)
                      : false
                  }
                  className="mx-1"
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

      <p>
        <a href="https://github.com/akbarrahmatm/f-fsw24001086-km6-akb-carmanagementdashboard-ch4">
          REST API
        </a>
      </p>
    </>
  );
}
