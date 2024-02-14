import { AdminType } from "../pages/Admin";
import { EmployeeType } from "../pages/Employee";
import { Form } from "react-bootstrap";

interface GenderProp {
  handleGenderChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  entity: AdminType | EmployeeType;
}
const Genders = ({ handleGenderChange, entity }: GenderProp) => {
  return (
    <>
      <Form.Label>Gender</Form.Label>
      <Form.Select onChange={handleGenderChange} aria-label="Gender Select">
        <option>Select Gender</option>
        <option selected={entity.gender === "MALE"} value="MALE">
          Male
        </option>
        <option selected={entity.gender === "FEMALE"} value="FEMALE">
          Female
        </option>
        <option selected={entity.gender === "OTHERS"} value="OTHERS">
          Others
        </option>
      </Form.Select>
    </>
  );
};

export default Genders;
