import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { BranchType } from "./Branch";

interface EmployeeType {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  branch: BranchType;
}

const Employee = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  useEffect(() => {
    axios
      .get<EmployeeType[]>("http://localhost:8082/employees/")
      .then((response) => {
        console.log("Employees:", response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee Name</th>
            <th className="d-none d-md-table-cell">Employee Email</th>
            <th className="d-none d-md-table-cell">Gender</th>
            <th className="d-none d-md-table-cell">Date of birth</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td className="d-none d-md-table-cell">{employee.email}</td>
              <td className="d-none d-md-table-cell">{employee.gender}</td>
              <td className="d-none d-md-table-cell">{employee.dob}</td>
              <td>
                {/* {employee.branch.name} */}
                {/* Conditionally render branch.city for medium and larger screens */}
                <span className="d-none d-md-inline">
                  {employee.branch.name}, {employee.branch.city}
                </span>
                {/* Conditionally render branch.name for smaller screens */}
                <span className="d-md-none">{employee.branch.city}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employee;
