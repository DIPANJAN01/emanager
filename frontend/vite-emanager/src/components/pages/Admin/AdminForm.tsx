import "react-datepicker/dist/react-datepicker.css";
import { ymdToDmyString, dmyToYmdString } from "../../../utils/Dateformatter";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  adminFormSchema,
  adminFormType,
  AdminFormProps,
} from "../../forms/AdminFormSchema";
import { useState } from "react";
import { useSnackbar } from "notistack";

const AdminForm = ({ admin, handleClose, handleDelete }: AdminFormProps) => {
  // const [admin, setAdmin] = useState<AdminType>(propAdmin);
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultValues = admin
    ? {
        name: admin.name,
        email: admin.email,
        dob: dmyToYmdString(admin.dob),
        gender: admin.gender,
      }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<adminFormType>({
    resolver: zodResolver(adminFormSchema),
    defaultValues,
  });

  const submitHandler = async (formData: adminFormType) => {
    const aId = admin ? admin.id : null;
    try {
      // console.log(
      //   `http://localhost:8082/admins/exists?email=${formData.email}`
      // );
      let checkUrl;
      if (aId)
        checkUrl = `http://localhost:8082/admins/exists?id=${aId}&email=${formData.email}`;
      else
        checkUrl = `http://localhost:8082/admins/exists?email=${formData.email}`;

      const response = await axios.get<boolean>(checkUrl);
      const emailExists = response.data;

      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "This email is already taken!",
        });
        return;
      }
      // console.log("submitting", createDMY(getValues("dob")));
      if (aId) {
        //update existing admin
        const updatedAdmin = {
          name: getValues("name"),
          email: getValues("email"),
          dob: ymdToDmyString(getValues("dob")),
          gender: getValues("gender"),
        };

        axios
          .put(`http://localhost:8082/admins/${aId}`, updatedAdmin)
          .then((response) => {
            reset();
            handleClose(response.data);
            enqueueSnackbar("Admin updated successfully", {
              variant: "success",
            });
          })
          .catch(() => {
            enqueueSnackbar("Something went wrong! Please try again!", {
              variant: "error",
            });
            // console.log(error);
          });
      } else {
        //add new admin
        const newAdmin = {
          name: getValues("name"),
          email: getValues("email"),
          dob: ymdToDmyString(getValues("dob")),
          gender: getValues("gender"),
        };
        axios
          .post(`http://localhost:8082/admins/`, newAdmin)
          .then((response) => {
            reset();
            handleClose(response.data);
            enqueueSnackbar("Admin added successfully", { variant: "success" });
          })
          .catch(() => {
            enqueueSnackbar("Something went wrong! Please try again!", {
              variant: "error",
            });
            // console.log(error);
          });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong! Please try again!", {
        variant: "error",
      });
      // console.log(error);
    }
  };

  const deleteHandler = () => {
    setIsDeleting(true);
    axios
      .delete(`http://localhost:8082/admins/${admin?.id}`)
      .then((response) => {
        if (response.status === 204) {
          // console.log("Deleted successfully");
        }
        reset();
        admin && handleDelete(admin.id);
        enqueueSnackbar("Admin deleted successfully!");
        setIsDeleting(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong! Please try again!", {
          variant: "error",
        });
        // console.log(error);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(submitHandler)}>
      {/* NAME */}

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

      {/* EMAIL: */}

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
          className="form-control"
          id="InputDateOfBirth"
        />
        {errors.dob && (
          <div id="dobHelp" className="form-text text-danger">
            {errors.dob.message}
          </div>
        )}
      </div>

      {/* GENDER: */}

      <div className="mb-3">
        <label htmlFor="InputGender" className="form-label">
          Gender
        </label>
        <select
          {...register("gender")}
          id="InputGender"
          className="form-select"
          aria-label="Gender select"
          defaultValue={admin?.gender}
        >
          <option>Select a gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.gender && (
          <div id="genderHelp" className="form-text text-danger">
            {errors.gender.message}
          </div>
        )}
      </div>

      {/* BUTTONS */}

      <div className="d-flex">
        <div
          className={
            isDeleting || isSubmitting ? "isDisabled me-auto" : "me-auto"
          }
        >
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-success px-5 "
          >
            Submit
          </button>
        </div>
        {admin && (
          <div
            className={
              isDeleting || isSubmitting ? "isDisabled ms-auto" : "ms-auto"
            }
          >
            <button
              onClick={deleteHandler}
              disabled={isDeleting || isSubmitting}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default AdminForm;
