import { Table } from "react-bootstrap";
import Loading from "./Loading";

export default function TableCar({ data, isLoading, requestAt }) {
  return (
    <>
      <Table className="m" bordered hover>
        <thead>
          <tr>
            <th>Car ID</th>
            <th>Car Name</th>
            <th>Car Image</th>
            <th>Rent Per Day</th>
            <th>Capacity</th>
            <th>Car Type</th>
            <th>Last Update</th>
          </tr>
        </thead>

        <tbody>
          {data.map((car, index) => (
            <tr key={car.id}>
              <td className="text-center">{index + 1}.</td>
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
            </tr>
          ))}
        </tbody>
      </Table>

      {isLoading && (
        <div className=" text-center">
          <Loading message={"Fetching cars data ..."} />
        </div>
      )}

      <p>Data gathered on : {isLoading ? "Loading..." : requestAt}</p>
    </>
  );
}
