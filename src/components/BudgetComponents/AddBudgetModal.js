import { Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
import { Button } from "react-bootstrap";
export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} style={{ color: "#01a314" }}>
      <Form onSubmit={handleSubmit} style={{ color: "#01a314" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#364958" }}>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#01a314" }}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label style={{ color: "#01a314" }}>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label style={{ color: "#01a314" }}>
              Maximum Spending
            </Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button color="success" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
