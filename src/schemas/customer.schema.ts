import { z } from "zod"
import { orderInputSchema } from "./order.schema"

export const customerSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  orders: orderInputSchema.array(),
})

export type Customer = z.infer<typeof customerSchema>
