import React, { useState } from "react"
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

  /**
   * QUERIES & MUTATIONS
   */

  const { data: orders, isLoading } = api.orders.getAll.useQuery()
  const { data: products } = api.products.getAll.useQuery()

  const handleSubmit = () => {
    console.log("handleSubmit 😃")
  }

  const archiveOrder = () => {
    console.log("archiveOrder 😃")
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
        <span className="mb-8 flex justify-center">
          <h1 className="text-3xl font-bold">Orders</h1>
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
