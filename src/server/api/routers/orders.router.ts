import { fullOrderSchema } from "~/schemas/order.schema"
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"

export const ordersRouter = createTRPCRouter({
  //TODO: Paginate orders
  getAll: privateProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      where: {
        archivedAt: null,
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
        total: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
          },
        },
        trackingCompany: true,
        paymentMethod: true,
        trackingNumber: true,
        address: {
          select: {
            id: true,
            line1: true,
            line2: true,
            city: true,
            state: true,
            zip: true,
            country: true,
          },
        },
      },
    })
    return orders.map((order) => fullOrderSchema.parse(order))
  }),
})
