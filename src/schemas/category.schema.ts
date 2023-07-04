import { z } from "zod"
import { productExportSchema } from "./product.schema"

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  products: productExportSchema.array(),
})

export type Category = z.infer<typeof categorySchema>
