import { z } from "zod"

export const orderItemSchema = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  price: z.number(),
  productId: z.string(),
  orderId: z.string(),
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

export type OrderItem = z.infer<typeof orderItemSchema>

export type OrderInput = z.infer<typeof orderInputSchema>
