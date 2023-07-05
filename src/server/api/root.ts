import { createTRPCRouter } from "~/server/api/trpc"
import { productsRouter } from "./routers/products.router"
import { categoriesRouter } from "./routers/categories.router"
import { ordersRouter } from "./routers/orders.router"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  orders: ordersRouter,
})

export type AppRouter = typeof appRouter
