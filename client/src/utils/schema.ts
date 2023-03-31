import { z } from "zod";
import { Methodology } from "../types";

export const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  productOwnerName: z.string().min(1, { message: "Product owner is required" }),
  Developers: z
    .array(z.string())
    .nonempty({
      message: 'At least 1 developer required. Enter name and click "Add"',
    })
    .max(5, { message: "Up to 5 developers can be assigned" }),
  scrumMasterName: z.string().min(1, { message: "Scrum master is required" }),
  startDate: z.coerce.date(),
  methodology: z.enum([Methodology.AGILE, Methodology.WATERFALL]),
});
