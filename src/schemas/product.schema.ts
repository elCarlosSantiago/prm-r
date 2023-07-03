import { z } from "zod"
import { categorySchema } from "./category.schema"

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.number(),
})

export type Product = z.infer<typeof productSchema>
