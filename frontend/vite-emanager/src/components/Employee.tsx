import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

interface EmployeeType {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
}

const Employe = () => {
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
            <th>Employee Email</th>
            <th>Gender</th>
            <th>Date of birth</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employe;
