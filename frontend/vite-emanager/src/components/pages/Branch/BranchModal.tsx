import Modal from "react-bootstrap/Modal";
import { BranchType } from "./Branch";
import BranchForm from "./BranchForm";

interface ModalProps {
  show: boolean;
  handleClose: (branch: BranchType | null) => void;
  branch: BranchType | null;
  setBranch: (branch: BranchType) => void;
  handleDelete: (id: string) => void;
}

const BranchModal = ({
  show,
  handleClose,
  branch,
  handleDelete,
}: ModalProps) => {
  return (
    <>
      <Modal show={show} onHide={() => handleClose(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{branch ? "Edit Branch" : "Add Branch"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BranchForm
            branch={branch}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BranchModal;
