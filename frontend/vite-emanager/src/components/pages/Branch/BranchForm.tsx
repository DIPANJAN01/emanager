import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  branchFormSchema,
  branchFormType,
  BranchFormProps,
} from "../../forms/schemas/BranchFormSchema";
import { useState } from "react";
import { useSnackbar } from "notistack";

const BranchForm = ({ branch, handleClose, handleDelete }: BranchFormProps) => {
  // const [branch, setBranch] = useState<BranchType>(propBranch);
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultValues = branch
    ? {
        name: branch.name,
        city: branch.city,
      }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<branchFormType>({
    resolver: zodResolver(branchFormSchema),
    defaultValues,
  });

  const submitHandler = async (formData: branchFormType) => {
    // console.log("branch=" + getValues("branch"));
    const bId = branch ? branch.id : null;
    try {
      let nameCheckUrl;
      if (bId)
        nameCheckUrl = `http://localhost:8082/branches/exists?id=${bId}&name=${formData.name}`;
      else
        nameCheckUrl = `http://localhost:8082/branches/exists?name=${formData.name}`;

      const response = await axios.get<boolean>(nameCheckUrl);
      const nameExists = response.data;

      if (nameExists) {
        setError("name", {
          type: "manual",
          message: "This branch name is already taken!",
        });
        return;
      }

      //check branch exists:

      if (bId) {
        //update existing branch
        const updatedBranch = {
          name: getValues("name"),
          city: getValues("city"),
        };

        axios
          .put(`http://localhost:8082/branches/${bId}`, updatedBranch)
          .then((response) => {
            reset();
            handleClose(response.data);
            enqueueSnackbar("Branch updated successfully", {
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
        //add new branch
        const newBranch = {
          name: getValues("name"),
          city: getValues("city"),
        };
        axios
          .post(`http://localhost:8082/branches/`, newBranch)
          .then((response) => {
            reset();
            handleClose(response.data);
            enqueueSnackbar("Branch added successfully", {
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
      .delete(`http://localhost:8082/branches/${branch?.id}`)
      .then((response) => {
        if (response.status === 204) {
          enqueueSnackbar("Branch deleted successfully!");
        }
        reset();
        branch && handleDelete(branch.id);

        setIsDeleting(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong! Please try again!", {
          variant: "error",
        });
        // console.log(error);
      });
  };

  // console.log(branch);
  return (
    <form noValidate onSubmit={handleSubmit(submitHandler)}>
      {/* NAME */}

      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Branch name
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

      {/* CITY */}

      <div className="mb-3">
        <label htmlFor="exampleInputCity" className="form-label">
          Branch city
        </label>
        <input
          {...register("city")}
          type="text"
          className="form-control"
          id="exampleInputCity"
          aria-describedby="cityHelp"
        />
        {errors.city && (
          <div id="cityHelp" className="form-text text-danger">
            {errors.city.message}
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
        {branch && (
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

export default BranchForm;
