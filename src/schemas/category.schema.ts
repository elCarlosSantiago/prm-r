import { z } from "zod"
import { productInputSchema } from "./product.schema"

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  products: productInputSchema.array().optional(),
})

export const categoryInputSchema = categorySchema.omit({
  id: true,
  products: true,
})

export type Category = z.infer<typeof categorySchema>

export type CategoryInput = z.infer<typeof categoryInputSchema>
