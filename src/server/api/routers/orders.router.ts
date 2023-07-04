import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"
import { notFound } from "~/utils"
import { idSchema, orderInputSchema } from "~/schemas"

export const ordersRouter = createTRPCRouter({
  //TODO: Paginate orders
  getAll: privateProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      select: {
        id: true,
        createdAt: true,
        status: true,
        total: true,
        orderItem: {
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
      },
    })
    return orders
  }),
})
