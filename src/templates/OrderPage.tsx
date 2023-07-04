import React, { useEffect, useState } from "react"
import { api } from "~/utils"

export const OrderPage: React.FC = () => {
  /**
   * STATE & CONTEXT
   */
  const [openOrdersModal, setOpenOrdersModal] = useState<boolean>(false)
  const [selectedOrder, setSelectedOrder] = useState(undefined)

  /**
   * QUERIES & MUTATIONS
   */

  const { data: orders, isLoading } = api.orders.getAll.useQuery()

  console.log({ orders })
  return (
    <React.Fragment>
      <div className="flex-col gap-12 p-12">
        <span className="mb-8 flex justify-center">
          <h1 className="text-3xl font-bold">Orders</h1>
        </span>
      </div>
    </React.Fragment>
  )
}
