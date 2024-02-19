import { z } from "zod";
import { BranchType } from "../../pages/Branch/Branch";

export interface BranchFormProps {
  branch: BranchType | null;
  handleClose: (branch: BranchType) => void;
  handleDelete: (id: string) => void;
}

export const branchFormSchema = z.object({
  name: z.string().min(1, "Please enter a branch name"),
  city: z
    .string()
    .min(1, "Please enter a city name")
    .min(2, "City name must be at least 2 characters"),
});
export type branchFormType = z.infer<typeof branchFormSchema>;
