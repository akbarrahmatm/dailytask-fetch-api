import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import ErrorModal from "./components/ErrorModal";
import FormModal from "./components/FormModal";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Paginate from "./components/Paginate";
import SuccessModal from "./components/SucessModal";
import TableCar from "./components/TableCar";
import { createCar, getAllCars } from "./utils/httpRequest";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [cars, setCars] = useState([]);
  const [requestAt, setRequestAt] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [inputAdd, setInputAdd] = useState();

  // Pagination
  const [totalData, setTotalData] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  // Success State
  const [successFetch, setSuccessFetch] = useState();

  // Error State
  const [errorFetch, setErrorFetch] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setErrorFetch(null);
      let params;
      let page;
      try {
        params = new URL(document.location).searchParams;
        page = params.get("page");

        const response = await getAllCars(page, 2);

        setCars(response.data.cars);
        setRequestAt(response.requestAt);

        // Pagination
        setTotalData(response.pagination.totalData);
        setTotalPages(response.pagination.totalPages);
        setPageNum(response.pagination.pageNum);
        setPageSize(response.pagination.pageSize);
      } catch (err) {
        setErrorFetch(err.message);
      }
      setIsFetching(false);
    }

    async function resetAddForm() {
      const data = {
        name: "",
        rentPerDay: "",
        capacity: "",
      };

      setInputAdd(data);
    }

    fetchData();
    resetAddForm();
  }, []);

  function handleClickAdd() {
    setModalAdd(true);
  }

  function handleInputAdd(e) {
    const { name, value } = e.target;

    setInputAdd({
      ...inputAdd,
      [name]: value,
    });
  }

  async function handleSubmit() {
    if (inputAdd.name && inputAdd.rentPerDay && inputAdd.capacity) {
      setModalAdd(false);
      setErrorFetch(null);

      setSuccessFetch("Loading ...");

      try {
        const response = await createCar(inputAdd);

        if (response) {
          setSuccessFetch(response.message);
        }
      } catch (err) {
        setSuccessFetch(null);
        setErrorFetch(err.message);
      }
    } else {
      let emptyField = [];

      if (inputAdd.name === "") {
        emptyField.push("Car Name");
      }

      if (inputAdd.rentPerDay === "") {
        emptyField.push("Rent Per Day");
      }

      if (inputAdd.capacity === "") {
        emptyField.push("Capacity");
      }

      setErrorFetch(`Field ${emptyField.join(", ")} is required`);
    }
  }

  return (
    <>
      {errorFetch && <ErrorModal message={errorFetch} open={errorFetch} />}

      {successFetch && (
        <SuccessModal message={successFetch} open={successFetch} />
      )}
      <FormModal title={"Add Car Data"} open={modalAdd}>
        <Form method="POST">
          <Form.Group className="mb-3" controlId="formCarName">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              onChange={handleInputAdd}
              type="text"
              name="name"
              placeholder="Enter Car Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRentPerDay">
            <Form.Label>Rent Per Day</Form.Label>
            <Form.Control
              onChange={handleInputAdd}
              type="number"
              name="rentPerDay"
              placeholder="Enter Rent Per Day"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              onChange={handleInputAdd}
              type="number"
              name="capacity"
              placeholder="Enter Capacity"
              required
            />
          </Form.Group>

          <Button onClick={() => setModalAdd(false)} variant="secondary">
            Cancel
          </Button>
          <Button className="mx-1" onClick={handleSubmit} variant="success">
            Save Data
          </Button>
        </Form>
      </FormModal>

      <Menu />
      <Container>
        <Header title={"Cars Data"} />
        <Button onClick={handleClickAdd} className="my-3">
          + Add Car Data
        </Button>
        <TableCar data={cars} isLoading={isFetching} requestAt={requestAt} />
        <Paginate
          totalData={totalData}
          totalPages={totalPages}
          pageNum={pageNum}
          pageSize={pageSize}
        />
      </Container>
    </>
  );
}

export default App;
