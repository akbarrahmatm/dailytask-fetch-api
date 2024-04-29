import { Button, Spinner } from "react-bootstrap";

export default function Loading({ message }) {
  return (
    <>
      <Button variant="success" className="d-block m-auto">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
      <p className="fw-bold mt-1">{message}</p>
    </>
  );
}
