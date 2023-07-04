import { z } from "zod"
import { productOutputSchema } from "./product.schema"

export const orderItemSchema = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  price: z.number(),
  productId: z.string(),
  orderId: z.string(),
  product: productOutputSchema,
})

export const orderInputSchema = z.object({
  id: z.string().optional(),
  status: z.string(),
  total: z.number(),
  orderItem: orderItemSchema.array(),
  customerId: z.string(),
  trackingNumber: z.string().optional(),
  trackingCompany: z.string().optional(),
  shippingAddressId: z.string(),
  paymentMethod: z.string(),
})

export const fullOrderSchema = orderInputSchema.merge(
  z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
    customer: z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string(),
    }),
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
)

export type OrderItem = z.infer<typeof orderItemSchema>

export type OrderInput = z.infer<typeof orderInputSchema>

export type FullOrder = z.infer<typeof fullOrderSchema>
