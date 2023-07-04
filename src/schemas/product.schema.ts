import { z } from "zod"

export const productInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.string(),
})

export const productExportSchema = productInputSchema.extend({
  category: z.object({
    name: z.string(),
  }),
})

export type ProductInput = z.infer<typeof productInputSchema>

export type ProductExport = z.infer<typeof productExportSchema>
