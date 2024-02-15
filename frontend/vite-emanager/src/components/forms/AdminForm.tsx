import "react-datepicker/dist/react-datepicker.css";
import { ymdToDmyString, dmyToYmdString } from "../../utils/Dateformatter";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  adminFormSchema,
  adminFormType,
  AdminFormProps,
} from "./AdminFormSchema";

const AdminForm = ({ admin, handleClose }: AdminFormProps) => {
  // const [admin, setAdmin] = useState<AdminType>(propAdmin);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<adminFormType>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
      dob: dmyToYmdString(admin.dob),
      gender: admin.gender,
    },
  });

  const submitHandler = async (formData: adminFormType) => {
    try {
      const response = await axios.get<boolean>(
        `http://localhost:8082/admins/exists?&id=${admin.id}&email=${formData.email}`
      );
      const emailExists = response.data;

      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "This email is already taken!",
        });
        return;
      }
      // console.log("submitting", createDMY(getValues("dob")));
      const updatedAdmin = {
        name: getValues("name"),
        email: getValues("email"),
        dob: ymdToDmyString(getValues("dob")),
        gender: getValues("gender"),
      };
      axios
        .put(`http://localhost:8082/admins/${admin.id}`, updatedAdmin)
        .then(() => {
          reset();
          handleClose({ ...updatedAdmin, id: admin.id });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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

      {/* SUBMIT BUTTON */}

      <button disabled={isSubmitting} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AdminForm;
