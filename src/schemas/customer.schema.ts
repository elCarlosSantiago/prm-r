import { z } from "zod"
import { orderItemSchema } from "~/schemas"
export const customerSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  orders: z
    .object({
      id: z.string(),
      createdAt: z.date(),
      status: z.string(),
      total: z.number(),
      orderItem: orderItemSchema,
      trackingCompany: z.string(),
      address: z.object({
        id: z.string(),
        line1: z.string(),
        line2: z.string().optional(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
        country: z.string(),
      }),
    })
    .array(),
})

export type Customer = z.infer<typeof customerSchema>
