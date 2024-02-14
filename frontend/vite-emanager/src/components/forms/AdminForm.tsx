import { Button, Form } from "react-bootstrap";
import { AdminType } from "../pages/Admin";
import { useState } from "react";
import Genders from "./Genders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createDateFromFormat,
  formatDateToString,
} from "../../utils/Dateformatter";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const adminFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  gender: z.string(),
  dob: z.string(),
});

interface FormProps {
  admin: AdminType;
  handleClose: () => void;
}
// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

const AdminForm = ({ admin: propAdmin, handleClose }: FormProps) => {
  const [admin, setAdmin] = useState<AdminType>(propAdmin);
  const [startDate, setStartDate] = useState<Date>(
    createDateFromFormat(admin.dob)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(adminFormSchema),
  });

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdmin({ ...admin, gender: event.target.value });
  };

  const [value, onChange] = useState<Date>(new Date());

  const submitHandler = () => {
    console.log("submitting");
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Admin Name</Form.Label>
        <Form.Control
          {...register("name")}
          type="text"
          placeholder="Enter admin name"
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Admin Email</Form.Label>
        <Form.Control
          {...register("email")}
          type="email"
          placeholder="Enter admin email"
          value={admin?.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Genders entity={admin} handleGenderChange={handleGenderChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <div>Date of Birth</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setAdmin({ ...admin, dob: formatDateToString(date) });
          }}
          dateFormat={"dd/MM/yyyy"}
          showYearDropdown
          scrollableYearDropdown
          isClearable
          yearDropdownItemNumber={75}
          yearItemNumber={40}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit Admin
      </Button>
    </Form>
  );
};

export default AdminForm;
