import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import AdminModal from "./AdminModal";

export interface AdminType {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
}

const Admin = () => {
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [showNewForm, setShowNewForm] = useState(false); //will be used to open another modal for new admin

  const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>(null);

  const handleRowClick = (admin: AdminType) => {
    setSelectedAdmin(admin);
  };

  const handleClose = (formAdmin: AdminType | null) => {
    if (!formAdmin) {
      setShowNewForm(false);
      setSelectedAdmin(null);
      return;
    }

    const indexToUpdate = admins.findIndex(
      (admin) => admin.id === formAdmin.id
    );
    if (indexToUpdate !== -1) {
      // Create a copy of the array of admins
      const updatedAdmins = [...admins];

      // Replace the admin at the found index with the new admin
      updatedAdmins[indexToUpdate] = formAdmin;

      // Update the state with the modified array
      setAdmins(updatedAdmins);
    } else {
      setAdmins([...admins, formAdmin]);
    }
    setShowNewForm(false);
    setSelectedAdmin(null);
  };

  const showAddHandler = () => {
    setShowNewForm(true);
  };

  const DeleteAdminHandler = (adminIdToDelete: string) => {
    setAdmins(admins.filter((admin) => admin.id !== adminIdToDelete));
    setSelectedAdmin(null);
  };

  useEffect(() => {
    axios
      .get<AdminType[]>("http://localhost:8082/admins/")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      });
  }, []);

  return (
    <div>
      <Button onClick={showAddHandler} className="d-block ms-auto mb-3">
        Add Admin
      </Button>
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

      <AdminModal
        admin={selectedAdmin}
        setAdmin={setSelectedAdmin}
        handleDelete={DeleteAdminHandler}
        show={selectedAdmin ? true : showNewForm}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Admin;
