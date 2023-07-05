/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: Deal with eslint errors, they do not infer Address from Prisma and the
//downstream effects are the above errors
import { fullOrderSchema } from "~/schemas/order.schema"
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"
import { notFound } from "~/utils"

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

  create: privateProcedure
    .input(fullOrderSchema)
    .mutation(async ({ ctx, input }) => {
      console.log({ input })
      const orderInput = input
      const orderAddress = orderInput.address
      const orderCustomer = orderInput.customer
      delete orderInput.address
      delete orderInput.customer

      const order = await ctx.prisma.order.create({
        data: {
          ...orderInput,
          orderItems: undefined,
          customer: {
            connectOrCreate: {
              where: { email: orderCustomer?.email },
              create: {
                //@ts-ignore
                email: orderCustomer?.email,
              },
            },
          },
          address: {
            create: orderAddress,
          },
        },
      })

      if (!order) throw notFound()
      return order
    }),

  edit: privateProcedure
    .input(fullOrderSchema)
    .mutation(async ({ ctx, input }) => {
      //Update function to batch update
      const orderInput = input
      const orderAddress = orderInput.address
      const orderItems = orderInput.orderItems
      delete orderInput.address
      delete orderInput.customer

      const order = await ctx.prisma.order.update({
        where: { id: input.id },
        //@ts-ignore
        data: { ...orderInput, orderItems: undefined },
      })
      if (!order) throw notFound()

      if (!orderAddress) throw notFound()

      const address = await ctx.prisma.address.update({
        where: { id: orderAddress.id },
        data: orderAddress,
      })
      if (!address) throw notFound()

      const newOrderItems = orderItems?.filter((item) => !item.id)
      const oldOrderItems = orderItems?.filter((item) => item.id)

      for (const newItem of newOrderItems!) {
        newItem.orderId = order.id
        if (!newItem.orderId || !newItem.price) return
        await ctx.prisma.orderItem.create({
          //@ts-ignore
          data: { ...newItem, product: undefined, id: undefined },
        })
      }

      for (const oldItem of oldOrderItems!) {
        await ctx.prisma.orderItem.update({
          where: { id: oldItem.id },
          data: {
            ...oldItem,
            product: undefined,
            productId: oldItem.product.id,
          },
        })
      }

      return order
    }),
})
