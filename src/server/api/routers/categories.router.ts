import { z } from "zod"
import { categoryInputSchema, idSchema } from "~/schemas"
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"

export const categoriesRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: {
        archivedAt: null,
      },
    })
  }),

  edit: privateProcedure
    .input(
      idSchema.extend({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.update({
        where: { id: input.id },
        data: input,
      })
    }),
  create: privateProcedure
    .input(categoryInputSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: input,
      })
    }),

  archive: privateProcedure.input(idSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.category.update({
      where: { id: input.id },
      data: { archivedAt: new Date() },
    })
  }),
})
