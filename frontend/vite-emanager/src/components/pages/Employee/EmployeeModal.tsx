import Modal from "react-bootstrap/Modal";
import { EmployeeType } from "./Employee";
import EmployeeForm from "./EmployeeForm";

interface ModalProps {
  show: boolean;
  handleClose: (employee: EmployeeType | null) => void;
  employee: EmployeeType | null;
  setEmployee: (employee: EmployeeType) => void;
  handleDelete: (id: string) => void;
}

const EmployeeModal = ({
  show,
  handleClose,
  employee,
  handleDelete,
}: ModalProps) => {
  return (
    <>
      <Modal show={show} onHide={() => handleClose(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {employee ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm
            employee={employee}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeModal;
