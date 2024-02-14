import { Button, Form } from "react-bootstrap";
import { EmployeeType } from "../pages/Employee";
import { useState } from "react";
import Genders from "./Genders";
import Branches from "./Branches";
import { BranchType } from "../pages/Branch";

interface FormProps {
  employee: EmployeeType;
  handleClose: () => void;
}

const EmployeeForm = ({ employee: propEmployee, handleClose }: FormProps) => {
  const [employee, setEmployee] = useState<EmployeeType>(propEmployee);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setEmployee({ ...employee, gender: event.target.value });
  };
  const handleBranchChange = (branch: BranchType) => {
    branch && setEmployee({ ...employee, branch });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmployeeName">
        <Form.Label>Employee Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter employee name"
          value={employee?.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmployeeEmail">
        <Form.Label>Employee Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter employee email"
          value={employee?.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmpGender">
        <Genders entity={employee} handleGenderChange={handleGenderChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmpBranch">
        <Branches entity={employee} handleBranchChange={handleBranchChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit Employee
      </Button>
    </Form>
  );
};

export default EmployeeForm;
