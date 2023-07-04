import { z } from "zod"
import { productInputSchema } from "./product.schema"

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  products: productInputSchema.array().optional(),
})

export type Category = z.infer<typeof categorySchema>
