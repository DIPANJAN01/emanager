import Modal from "react-bootstrap/Modal";
import { AdminType } from "./Admin";
import AdminForm from "./AdminForm";

interface ModalProps {
  show: boolean;
  handleClose: (admin: AdminType | null) => void;
  admin: AdminType | null;
  setAdmin: (admin: AdminType) => void;
  handleDelete: (id: string) => void;
}

const AdminModal = ({ show, handleClose, admin, handleDelete }: ModalProps) => {
  return (
    <>
      <Modal show={show} onHide={() => handleClose(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{admin ? "Edit Admin" : "Add Admin"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminForm
            admin={admin}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminModal;
