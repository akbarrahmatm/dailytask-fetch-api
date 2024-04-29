import { useEffect, forwardRef } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function FormModal({ title, children, open }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [open]);
  return (
    <>
      <Modal centered size="lg" show={show}>
        <Modal.Header
          className="bg-success text-white"
          closeVariant="white"
          closeButton={false}
        >
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
