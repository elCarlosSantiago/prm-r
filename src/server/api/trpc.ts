/*
 * Modifiy Context
 * Add new middlewares or procedure types
 */

/*
 * 1. CONTEXT
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"

import { prisma } from "~/server/db"
import { type inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import {
  getAuth,
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/nextjs/server"
import { ZodError } from "zod"

/**
 * This will process every request that goes through the endpoint.
 * @see https://trpc.io/docs/context
 */

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject
}

const createInnerTRPCContext = ({ auth }: AuthContext) => {
  return {
    auth,
    prisma,
  }
}

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({ auth: getAuth(opts.req) })
}
export type Context = inferAsyncReturnType<typeof createTRPCContext>

/**
 * 2. INITIALIZATION
 */

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * 3. ROUTER & PROCEDURE
 */

/**
 * How to create new routers & sub routers
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const userIsAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    })
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

export const privateProcedure = t.procedure.use(userIsAuthenticated)
