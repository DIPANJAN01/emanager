import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

interface AdminType {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
}

const Admin = () => {
  const [admins, setAdmins] = useState<AdminType[]>([]);
  useEffect(() => {
    axios
      .get<AdminType[]>("http://localhost:8082/admins/")
      .then((response) => {
        console.log("Admins:", response.data);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      });
  }, []);

  return (
    <div>
      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Gender</th>
            <th>Date of birth</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.gender}</td>
              <td>{admin.dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
