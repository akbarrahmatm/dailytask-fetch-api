import { Pagination } from "react-bootstrap";

export default function Paginate({ totalData, totalPages, pageNum, pageSize }) {
  let items = [];

  for (let number = 1; number <= totalPages; number++) {
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
        active={pageNum === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>
        <Pagination.Prev
          onClick={() =>
            window.location.replace(
              window.location.protocol +
                "//" +
                window.location.hostname +
                ":" +
                window.location.port +
                "?page=" +
                (pageNum - 1)
            )
          }
          disabled={pageNum === 1 ? true : false}
        />
        {items}
        <Pagination.Next
          onClick={() =>
            window.location.replace(
              window.location.protocol +
                "//" +
                window.location.hostname +
                ":" +
                window.location.port +
                "?page=" +
                (pageNum + 1)
            )
          }
          disabled={pageNum === totalPages ? true : false}
        />
      </Pagination>
    </>
  );
}
