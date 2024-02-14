import axios from "axios";
import { EmployeeType } from "../pages/Employee";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BranchType } from "../pages/Branch";

interface BranchesProp {
  handleBranchChange: (id: number) => void;
  entity: EmployeeType;
}

const Branches = ({ handleBranchChange, entity }: BranchesProp) => {
  const [branches, setBranches] = useState<BranchType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/branches/")
      .then((response) => {
        setBranches(response.data);
      })
      .catch(console.error);
  }, []);
  const selectBranch = (id: number) => {
    // console.log(id);
    return branches.find((branch) => branch.id === id);
  };
  return (
    <>
      <Form.Label>Branch</Form.Label>
      <Form.Select
        onChange={(e) =>
          handleBranchChange(selectBranch(parseInt(e.target.value)))
        }
        aria-label="Branches Select"
      >
        <option>Select Branches</option>
        {branches.map((branch) => (
          <option
            selected={entity.branch.id === branch.id}
            key={branch.id}
            value={branch.id}
          >
            {branch.name}, {branch.city}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default Branches;
