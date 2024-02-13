import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import MyModal from "../MyModal";

export interface BranchType {
  id: number;
  name: string;
  city: string;
}

const Branch = () => {
  const [branches, setBranches] = useState<BranchType[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchType | null>(null);

  const handleRowClick = (branch: BranchType) => {
    setSelectedBranch(branch);
  };

  const handleClose = () => {
    setSelectedBranch(null);
  };

  useEffect(() => {
    axios
      .get<BranchType[]>("http://localhost:8082/branches/")
      .then((response) => {
        // console.log("Branches:", response.data);
        setBranches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  }, []);

  return (
    <div>
      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th>Branch Id</th>
            <th>Branch Name</th>
            <th>Branch City</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(branch)}
              key={index}
            >
              <td>{branch.id}</td>
              <td>{branch.name}</td>
              <td>{branch.city}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedBranch && (
        <MyModal
          branch={selectedBranch}
          show={selectedBranch ? true : false}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Branch;
