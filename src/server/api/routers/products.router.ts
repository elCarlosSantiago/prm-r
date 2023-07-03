import { z } from 'zod'

import { publicProcedure, createTRPCRouter } from '~/server/api/trpc'

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany()
  }),
})
