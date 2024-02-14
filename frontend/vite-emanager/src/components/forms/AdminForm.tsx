import { Button, Form } from "react-bootstrap";
import { AdminType } from "../pages/Admin";
import { useState } from "react";
import Genders from "./Genders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createDateFromFormat,
  formatDateToString,
  isAdult,
  isValidDate,
} from "../../utils/Dateformatter";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const adminFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    gender: z.string(),
    dob: z.date(),
  })
  .refine(
    (data) => {
      console.log("in here", data.dob);
      return ["MALE", "FEMALE", "OTHER"].includes(data.gender);
    },
    {
      message: "Please select a valid gender",
      path: ["gender"],
    }
  )
  .refine(
    (data) => {
      console.log("in here", data.dob);
      return isValidDate(data.dob) && isAdult(data.dob);
    },
    {
      message: "Please select a valid gender",
      path: ["gender"],
    }
  );

interface FormProps {
  admin: AdminType;
  handleClose: () => void;
}

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
    setValue,
  } = useForm({
    resolver: zodResolver(adminFormSchema),
  });

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdmin({ ...admin, gender: event.target.value });
  };
  const handleDateChange = (event) => {
    // Convert the string value to a Date object
    const date = new Date(event.target.value);
    console.log(event.target.value);
    // Format the date to "yyyy-MM-dd" format
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    // Set the value in the form state
    setValue("dob", new Date(formattedDate));
  };
  const submitHandler = () => {
    // if (!isValidDate) {
    //   setDateErr("Please select a valid date");
    //   return;
    // } else if (!isAdult) {
    //   setDateErr("Admin must be 18+!");
    //   return;
    // }
    console.log("submitting");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Admin name
        </label>
        <input
          {...register("name")}
          type="text"
          className="form-control"
          id="exampleInputName"
          aria-describedby="nameHelp"
        />
        {errors.name && (
          <div id="nameHelp" className="form-text text-danger">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          {...register("email")}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        {errors.email && (
          <div id="emailHelp" className="form-text text-danger">
            {errors.email.message}
          </div>
        )}
      </div>

      {/* DATE: */}

      <div className="mb-3">
        <label htmlFor="InputDateOfBirth" className="form-label">
          <span className="me-4">Date of birth</span>
        </label>
        <input
          {...register("dob")}
          type="date"
          onChange={handleDateChange}
          className="form-control"
          id="InputDateOfBirth"
        />
        {errors.dob && (
          <div id="dobHelp" className="form-text text-danger">
            {errors.dob.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="InputGender" className="form-label">
          Gender
        </label>
        <select
          {...register("gender")}
          id="InputGender"
          className="form-select"
          aria-label="Gender select"
        >
          <option>Select a gender</option>
          <option value="MALE" selected={admin.gender == "MALE"}>
            Male
          </option>
          <option value="FEMALE" selected={admin.gender == "FEMALE"}>
            Female
          </option>
          <option value="OTHER" selected={admin.gender == "OTHER"}>
            Other
          </option>
        </select>
        {errors.gender && (
          <div id="genderHelp" className="form-text text-danger">
            {errors.gender.message}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default AdminForm;
