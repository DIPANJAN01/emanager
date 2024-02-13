import { Button, Form } from "react-bootstrap";
import { AdminType } from "../pages/Admin";
import { useState } from "react";
import Gender from "./Gender";
import Calendar from "react-calendar";

interface FormProps {
  admin: AdminType;
  handleClose: () => void;
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AdminForm = ({ admin: propAdmin, handleClose }: FormProps) => {
  const [admin, setAdmin] = useState<AdminType>(propAdmin);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdmin({ ...admin, gender: event.target.value });
  };

  const [value, onChange] = useState<Value>(new Date());

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Admin Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter admin name"
          value={admin?.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Admin Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter admin email"
          value={admin?.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Gender entity={admin} handleGenderChange={handleGenderChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Calendar onChange={onChange} value={value} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit Admin
      </Button>
    </Form>
  );
};

export default AdminForm;
