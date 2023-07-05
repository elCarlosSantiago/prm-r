import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"
import { notFound } from "~/utils"
import { idSchema, productInputSchema } from "~/schemas"

export const productsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    //TODO: Paginate products
    const products = await ctx.prisma.product.findMany({
      where: {
        archivedAt: null,
      },
      include: {
        category: {
          select: { name: true },
        },
      },
    })
    return products
  }),

  getById: privateProcedure.input(idSchema).query(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findFirst({
      where: { id: input.id, archivedAt: null },
    })
    if (!product) throw notFound()
    return product
  }),

  create: privateProcedure
    .input(productInputSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: input,
      })
      return product
    }),

  edit: privateProcedure
    .input(productInputSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.update({
        where: { id: input.id },
        data: input,
      })
      if (!product) throw notFound()
      return product
    }),

  delete: privateProcedure.input(idSchema).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.update({
      where: { id: input.id },
      data: { archivedAt: new Date() },
    })
    if (!product) throw notFound()
    return product
  }),
})
