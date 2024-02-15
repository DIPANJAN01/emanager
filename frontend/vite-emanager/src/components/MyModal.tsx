import Modal from "react-bootstrap/Modal";
import BranchForm from "./forms/BranchForm";
import Employee, { EmployeeType } from "./pages/Employee";
import Branch, { BranchType } from "./pages/Branch";
import { AdminType } from "./pages/Admin";
import EmployeeForm from "./forms/EmployeeForm";
import AdminForm from "./forms/AdminForm";

interface ModalProps {
  show: boolean;
  handleClose: (admin?: AdminType) => void;
  branch?: BranchType;
  employee?: EmployeeType;
  admin?: AdminType;
  setAdmin?: (admin: AdminType) => void;
}

const MyModal = ({
  show,
  handleClose,
  branch,
  employee,
  admin,
}: ModalProps) => {
  console.log("In mymodal", branch?.name);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {branch && <BranchForm branch={branch} handleClose={handleClose} />}
          {employee && (
            <EmployeeForm employee={employee} handleClose={handleClose} />
          )}
          {admin && <AdminForm admin={admin} handleClose={handleClose} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;
