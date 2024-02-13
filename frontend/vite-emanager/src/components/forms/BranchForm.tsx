import { Button, Form } from "react-bootstrap";
import { BranchType } from "../pages/Branch";

interface FormProps {
  branch?: BranchType;
  handleClose: () => void;
}

const BranchForm = ({ branch, handleClose }: FormProps) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Branch Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter branch name"
          value={branch?.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Branch City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter branch city"
          value={branch?.city}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit Branch
      </Button>
    </Form>
  );
};

export default BranchForm;
