import { z } from "zod"
import { productSchema } from "./product.schema"

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  products: productSchema.array(),
})

export type Category = z.infer<typeof categorySchema>
