import { createTRPCRouter, privateProcedure } from "~/server/api/trpc"

export const categoriesRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany()
  }),
})
