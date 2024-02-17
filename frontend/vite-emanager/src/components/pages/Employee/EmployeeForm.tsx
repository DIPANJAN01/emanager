import "react-datepicker/dist/react-datepicker.css";
import { ymdToDmyString, dmyToYmdString } from "../../../utils/Dateformatter";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  employeeFormSchema,
  employeeFormType,
  EmployeeFormProps,
} from "../../forms/schemas/EmployeeFormSchema";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { BranchType } from "../Branch";

const EmployeeForm = ({
  employee,
  handleClose,
  handleDelete,
}: EmployeeFormProps) => {
  // const [employee, setEmployee] = useState<EmployeeType>(propEmployee);
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false);
  const [branches, setBranches] = useState<BranchType[]>([]);

  const defaultValues = employee
    ? {
        name: employee.name,
        email: employee.email,
        dob: dmyToYmdString(employee.dob),
        gender: employee.gender,
        branch: String(employee.branch.id),
      }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<employeeFormType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
  });

  const submitHandler = async (formData: employeeFormType) => {
    console.log("branch=" + getValues("branch"));
    const aId = employee ? employee.id : null;
    try {
      let emailCheckUrl;
      if (aId)
        emailCheckUrl = `http://localhost:8082/employees/exists?id=${aId}&email=${formData.email}`;
      else
        emailCheckUrl = `http://localhost:8082/employees/exists?email=${formData.email}`;

      const response = await axios.get<boolean>(emailCheckUrl);
      const emailExists = response.data;

      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "This email is already taken!",
        });
        return;
      }

      //check branch exists:

      if (aId) {
        //update existing employee
        const updatedEmployee = {
          name: getValues("name"),
          email: getValues("email"),
          dob: ymdToDmyString(getValues("dob")),
          branch: branches.find(
            (branch) => branch.id === parseInt(getValues("branch"))
          ),
          gender: getValues("gender"),
        };

        axios
          .put(`http://localhost:8082/employees/${aId}`, updatedEmployee)
          .then((response) => {
            reset();
            handleClose(response.data);
            enqueueSnackbar("Employee updated successfully", {
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
        //add new employee
        const newEmployee = {
          name: getValues("name"),
          email: getValues("email"),
          dob: ymdToDmyString(getValues("dob")),
          gender: getValues("gender"),
          branch: branches.find(
            (branch) => branch.id === parseInt(getValues("branch"))
          ),
        };
        axios
          .post(`http://localhost:8082/employees/`, newEmployee)
          .then((response) => {
            reset();
            handleClose(response.data);
            enqueueSnackbar("Employee added successfully", {
              variant: "success",
            });
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
      .delete(`http://localhost:8082/employees/${employee?.id}`)
      .then((response) => {
        if (response.status === 204) {
          // console.log("Deleted successfully");
        }
        reset();
        employee && handleDelete(employee.id);
        enqueueSnackbar("Employee deleted successfully!");
        setIsDeleting(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong! Please try again!", {
          variant: "error",
        });
        // console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get<BranchType[]>("http://localhost:8082/branches/")
      .then((response) => {
        setBranches(response.data);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong! Please try again!", {
          variant: "error",
        });
      });
  }, []);

  // console.log(employee);
  return (
    <form noValidate onSubmit={handleSubmit(submitHandler)}>
      {/* NAME */}

      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Employee name
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
          defaultValue={employee?.gender}
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

      {/* BRANCH: */}

      <div className="mb-3">
        <label htmlFor="InputBranch" className="form-label">
          Branch
        </label>
        <select
          {...register("branch")}
          id="InputBranch"
          className="form-select"
          aria-label="Branch select"
        >
          <option value="">Select a branch</option>
          {branches.map((branch, index) => (
            <option
              selected={branch.id === employee?.branch.id}
              value={String(branch.id)}
              key={index}
            >
              {branch.name}, {branch.city}
            </option>
          ))}
        </select>
        {errors.branch && (
          <div id="branchHelp" className="form-text text-danger">
            {errors.branch.message}
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
        {employee && (
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

export default EmployeeForm;
