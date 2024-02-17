import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import LoadingSkeleton from "../../LoadingSkeleton";
import BranchModal from "./BranchModal";

export interface BranchType {
  id: string;
  name: string;
  city: string;
}

const Branch = () => {
  const [branches, setBranches] = useState<BranchType[]>([]);
  const [showNewForm, setShowNewForm] = useState(false); //will be used to open another modal for new branch
  const [isLoading, setIsLoading] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState<BranchType | null>(null);

  const handleRowClick = (branch: BranchType) => {
    setSelectedBranch(branch);
  };

  const handleClose = (formBranch: BranchType | null) => {
    // console.log("In handleClose", formBranch);
    if (!formBranch) {
      setShowNewForm(false);
      setSelectedBranch(null);
      return;
    }

    const indexToUpdate = branches.findIndex(
      (branch) => branch.id === formBranch.id
    );
    if (indexToUpdate !== -1) {
      // Create a copy of the array of branch
      const updatedBranch = [...branches];

      // Replace the branch at the found index with the new branch
      updatedBranch[indexToUpdate] = formBranch;

      // Update the state with the modified array
      setBranches(updatedBranch);
    } else {
      setBranches([...branches, formBranch]);
    }
    setShowNewForm(false);
    setSelectedBranch(null);
  };

  const showAddHandler = () => {
    setShowNewForm(true);
  };

  const DeleteBranchHandler = (branchIdToDelete: string) => {
    setBranches(branches.filter((branch) => branch.id !== branchIdToDelete));
    setSelectedBranch(null);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<BranchType[]>("http://localhost:8082/branches/")
      .then((response) => {
        setBranches(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching branch:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Branches</h1>
        <Button onClick={showAddHandler} className="d-block btn-dark mb-3">
          Add Branch
        </Button>
      </div>

      <div className="card">
        <div className="card-body">
          {isLoading && <LoadingSkeleton rows={5} />}
          {!isLoading && (
            <Table className="text-center" striped hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th className="minWidthTh">Branch Name</th>

                  {/* <th className="d-md-none maxWidthTh">Branch Email</th> */}
                  <th className="d-none d-md-table-cell">City</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, index) => (
                  <tr
                    className={
                      selectedBranch
                        ? selectedBranch.id === branch.id
                          ? "table-active"
                          : ""
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(branch)}
                    key={index}
                  >
                    <td>{branch.id}</td>
                    <td>{branch.name}</td>
                    <td className="d-none d-md-table-cell">{branch.city}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <BranchModal
        branch={selectedBranch}
        setBranch={setSelectedBranch}
        handleDelete={DeleteBranchHandler}
        show={selectedBranch ? true : showNewForm}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Branch;
