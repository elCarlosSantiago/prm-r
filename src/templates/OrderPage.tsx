import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { LoadingPage, OrderModal, OrderTable } from "~/components"
import { type FullOrder } from "~/schemas"
import { api } from "~/utils"

export const OrderPage: React.FC = () => {
  /**
   * STATE & CONTEXT
   */
  const [openOrdersModal, setOpenOrdersModal] = useState<boolean>(false)
  const [selectedOrder, setSelectedOrder] = useState<FullOrder | undefined>(
    undefined
  )
  const ctx = api.useContext()

  /**
   * QUERIES & MUTATIONS
   */

  const { data: orders, isLoading } = api.orders.getAll.useQuery()
  const { data: products } = api.products.getAll.useQuery()

  const { mutate: editOrder } = api.orders.edit.useMutation({
    onSuccess: async () => {
      await ctx.orders.getAll.invalidate()
      setSelectedOrder(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to edit! Please try again later.")
      }
    },
  })
  const { mutate: createOrder } = api.orders.create.useMutation({
    onSuccess: async () => {
      await ctx.orders.getAll.invalidate()
      setSelectedOrder(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to create! Please try again later.")
      }
    },
  })

  const { mutate: archiveOrder } = api.orders.archive.useMutation({
    onSuccess: async () => {
      await ctx.orders.getAll.invalidate()
      setSelectedOrder(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to archive! Please try again later.")
      }
    },
  })

  const handleSubmit = (order: FullOrder, edit: boolean) => {
    if (edit) editOrder(order)
    else createOrder(order)
  }

  if (isLoading) return <LoadingPage />

  return (
    <React.Fragment>
      {openOrdersModal && (
        <OrderModal
          {...{
            selectedOrder,
            close,
            archiveOrder,
            products,
          }}
          close={() => setOpenOrdersModal(false)}
          submit={handleSubmit}
          edit={!!selectedOrder}
        />
      )}
      <div className="flex-col gap-12 p-12">
        <span className="mb-8 flex justify-center gap-8">
          <h1 className="text-3xl font-bold">Orders</h1>
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            onClick={() => {
              setSelectedOrder(undefined)
              setOpenOrdersModal(true)
            }}
          >
            Add Order
          </button>
        </span>
        <OrderTable
          {...{
            orders,
            setOpenOrdersModal,
            setSelectedOrder,
          }}
        />
      </div>
    </React.Fragment>
  )
}
