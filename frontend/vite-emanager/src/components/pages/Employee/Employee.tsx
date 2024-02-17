import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { BranchType } from "../Branch/Branch";
import LoadingSkeleton from "../../LoadingSkeleton";
import EmployeeModal from "./EmployeeModal";
import { enqueueSnackbar } from "notistack";

export interface EmployeeType {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  branch: BranchType;
}

const Employee = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [showNewForm, setShowNewForm] = useState(false); //will be used to open another modal for new employee
  const [isLoading, setIsLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
    null
  );

  const handleRowClick = (employee: EmployeeType) => {
    setSelectedEmployee(employee);
  };

  const handleClose = (formEmployee: EmployeeType | null) => {
    if (!formEmployee) {
      setShowNewForm(false);
      setSelectedEmployee(null);
      return;
    }

    const indexToUpdate = employees.findIndex(
      (employee) => employee.id === formEmployee.id
    );
    if (indexToUpdate !== -1) {
      // Create a copy of the array of employee
      const updatedEmployee = [...employees];

      // Replace the employee at the found index with the new employee
      updatedEmployee[indexToUpdate] = formEmployee;

      // Update the state with the modified array
      setEmployees(updatedEmployee);
    } else {
      setEmployees([...employees, formEmployee]);
    }
    setShowNewForm(false);
    setSelectedEmployee(null);
  };

  const showAddHandler = () => {
    setShowNewForm(true);
  };

  const DeleteEmployeeHandler = (employeeIdToDelete: string) => {
    setEmployees(
      employees.filter((employee) => employee.id !== employeeIdToDelete)
    );
    setSelectedEmployee(null);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<EmployeeType[]>("http://localhost:8082/employees/")
      .then((response) => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong! Please try again!", {
          variant: "error",
        });
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Employees</h1>
        <Button onClick={showAddHandler} className="d-block btn-dark mb-3">
          Add Employee
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
                  <th className="minWidthTh">Employee Name</th>
                  <th>Employee Email</th>
                  {/* <th className="d-md-none maxWidthTh">Employee Email</th> */}
                  <th className="d-none d-md-table-cell">Gender</th>
                  <th className="d-none d-md-table-cell">Branch</th>
                  {/* <th className="d-none d-md-table-cell">City</th> */}
                  <th className="d-none d-md-table-cell">Date of birth</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    className={
                      selectedEmployee
                        ? selectedEmployee.id === employee.id
                          ? "table-active"
                          : ""
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(employee)}
                    key={index}
                  >
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td className="d-none d-md-table-cell">
                      {employee.gender}
                    </td>
                    <td className="d-none d-md-table-cell">
                      {employee.branch.name}, {employee.branch.city}
                    </td>
                    <td className="d-none d-md-table-cell">{employee.dob}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <EmployeeModal
        employee={selectedEmployee}
        setEmployee={setSelectedEmployee}
        handleDelete={DeleteEmployeeHandler}
        show={selectedEmployee ? true : showNewForm}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Employee;
