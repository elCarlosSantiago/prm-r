import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.string(),
})

export type Product = z.infer<typeof productSchema>
