import { z } from "zod"
import { orderInputSchema } from "./order.schema"

export const addressSchema = z.object({
  id: z.string().optional(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  order: orderInputSchema.array(),
})

export type Address = z.infer<typeof addressSchema>
