import { z } from "zod"
import { productOutputSchema } from "./product.schema"

export const orderItemSchema = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  price: z.number().optional(),
  productId: z.string().optional(),
  orderId: z.string().optional(),
  product: productOutputSchema.partial(),
})

export const orderInputSchema = z.object({
  id: z.string().optional(),
  status: z.string(),
  total: z.number(),
  orderItems: orderItemSchema.array(),
  customerId: z.string().optional(),
  trackingNumber: z.string().optional(),
  trackingCompany: z.string().optional(),
  shippingAddressId: z.string(),
  paymentMethod: z.string(),
})

//Decouple input from output
export const fullOrderSchema = orderInputSchema
  .partial({
    paymentMethod: true,
    trackingNumber: true,
    trackingCompany: true,
    shippingAddressId: true,
    orderItems: true,
  })
  .merge(
    z.object({
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      customer: z
        .object({
          id: z.string().optional(),
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string(),
          phone: z.string().optional(),
        })
        .optional(),
      address: z
        .object({
          id: z.string().optional(),
          line1: z.string(),
          line2: z.string().optional().nullable(),
          city: z.string(),
          state: z.string(),
          zip: z.string(),
          country: z.string(),
        })
        .optional(),
      orderItemsIdsToDelete: z.string().array().optional(),
    })
  )

export type OrderItem = z.infer<typeof orderItemSchema>

export type OrderInput = z.infer<typeof orderInputSchema>

export type FullOrder = z.infer<typeof fullOrderSchema>
