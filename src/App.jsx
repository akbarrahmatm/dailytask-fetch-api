import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import ErrorModal from "./components/ErrorModal";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Paginate from "./components/Paginate";
import TableCar from "./components/TableCar";
import { getAllCars } from "./utils/httpRequest";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [cars, setCars] = useState([]);
  const [requestAt, setRequestAt] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [errorFetch, setErrorFetch] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      let params;
      let page;
      try {
        params = new URL(document.location).searchParams;
        page = params.get("page");

        const response = await getAllCars(page, 3);

        setCurrentPage(response.pagination.pageNum);
        setTotalPage(response.pagination.totalPages);

        setCars(response.data.cars);
        setRequestAt(response.requestAt);
      } catch (err) {
        setErrorFetch(err.message);
      }
      setIsFetching(false);
    }

    fetchData();
  }, []);

  function handleClickAdd() {
    // handleClickAdd Add
  }

  return (
    <>
      {errorFetch && (
        <ErrorModal title={"Error"} message={errorFetch} open={errorFetch} />
      )}
      <Menu />
      <Container>
        <Header title={"Cars Data"} />
        <Button onClick={handleClickAdd} className="my-3 ">
          + Tambah Data
        </Button>
        <TableCar data={cars} isLoading={isFetching} requestAt={requestAt} />
        <Paginate totalPage={totalPage} active={currentPage} />
      </Container>
    </>
  );
}

export default App;
