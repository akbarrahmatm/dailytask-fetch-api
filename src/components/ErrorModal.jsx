import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ErrorModal({ title, message, open }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [open]);

  function handleOnClose() {
    setShow(false);
  }

  return (
    <>
      <Modal centered show={show} onHide={handleOnClose}>
        <Modal.Header
          className="bg-danger text-white"
          closeVariant="white"
          closeButton
        ></Modal.Header>
        <Modal.Body className="text-center fs-4">
          {message}
          <div>
            <Button className="mt-3" variant="danger" onClick={handleOnClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
