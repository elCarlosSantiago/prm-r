import { createTRPCRouter } from "~/server/api/trpc"
import { productsRouter } from "./routers/products.router"
import { categoriesRouter } from "./routers/categories.router"
import { ordersRouter } from "./routers/orders.router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  orders: ordersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
