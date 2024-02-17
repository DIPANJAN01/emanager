import { z } from "zod";
import { ymdStrToDmyDate, isAdult } from "../../../utils/Dateformatter";
import { AdminType } from "../../pages/Admin/Admin";

export interface AdminFormProps {
  admin: AdminType | null;
  handleClose: (admin: AdminType) => void;
  handleDelete: (id: string) => void;
}

export const adminFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    gender: z.string(),
    dob: z.string().min(1, "Please select a date of birth!"),
  })
  .refine(
    (data) => {
      return ["MALE", "FEMALE", "OTHER"].includes(data.gender);
    },
    {
      message: "Please select a valid gender",
      path: ["gender"],
    }
  )
  .refine(
    (data) => {
      //   console.log("past");
      return new Date() > ymdStrToDmyDate(data.dob);
    },
    {
      message: "Date must be in the past!",
      path: ["dob"],
    }
  )
  .refine(
    (data) => {
      //   console.log("above 18");
      return isAdult(ymdStrToDmyDate(data.dob));
    },
    {
      message: "Admin must be above 18!",
      path: ["dob"],
    }
  );

export type adminFormType = z.infer<typeof adminFormSchema>;
