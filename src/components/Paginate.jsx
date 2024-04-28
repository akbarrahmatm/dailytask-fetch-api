import { Pagination } from "react-bootstrap";

export default function Paginate({ totalPage = 1, active }) {
  let items = [];

  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() =>
          window.location.replace(
            window.location.protocol +
              "//" +
              window.location.hostname +
              ":" +
              window.location.port +
              "?page=" +
              number
          )
        }
        active={active === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>{items}</Pagination>
    </>
  );
}
