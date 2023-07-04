import { z } from "zod"

export const productInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  categoryId: z.string(),
})

export const productOutputSchema = productInputSchema.extend({
  category: z.object({
    name: z.string(),
  }),
})

export type ProductInput = z.infer<typeof productInputSchema>

export type ProductOutput = z.infer<typeof productOutputSchema>
