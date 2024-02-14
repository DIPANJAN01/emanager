import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import MyModal from "../MyModal";

export interface AdminType {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
}

const Admin = () => {
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>(null);

  const handleRowClick = (admin: AdminType) => {
    setSelectedAdmin(admin);
  };

  const handleClose = () => {
    setSelectedAdmin(null);
  };

  useEffect(() => {
    axios
      .get<AdminType[]>("http://localhost:8082/admins/")
      .then((response) => {
        // const adminsWithDate = response.data.map((admin) => {
        //   return {
        //     ...admin,
        //     dob: new Date(admin.dob.split("-").reverse().join("-")),
        //   };
        // });
        // console.log("Admin's dob:", adminsWithDate[0].dob);
        // console.log("Admin's dob:", adminsWithDate[0].dob);
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
            <th className="minWidthTh">Admin Name</th>
            <th>Admin Email</th>
            <th className="d-none d-md-table-cell">Gender</th>
            <th className="d-none d-md-table-cell">Date of birth</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(admin)}
              key={index}
            >
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td className="d-none d-md-table-cell">{admin.gender}</td>
              <td className="d-none d-md-table-cell">{admin.dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedAdmin && (
        <MyModal
          admin={selectedAdmin}
          show={selectedAdmin ? true : false}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Admin;
