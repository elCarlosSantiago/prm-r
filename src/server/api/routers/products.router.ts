import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"
import { productSchema } from "~/schemas/product.schema"
import { notFound } from "~/utils/errors"
import { idSchema } from "~/schemas/id.schema"

export const productsRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany()
  }),

  getById: privateProcedure.input(idSchema).query(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findUnique({
      where: { id: input.id },
    })
    if (!product) throw notFound()
    return product
  }),

  create: privateProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: input,
      })
      return product
    }),

  edit: privateProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.update({
        where: { id: input.id },
        data: input,
      })
      if (!product) throw notFound()
      return product
    }),

  delete: privateProcedure.input(idSchema).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.delete({
      where: { id: input.id },
    })
    if (!product) throw notFound()
    return product
  }),
})
