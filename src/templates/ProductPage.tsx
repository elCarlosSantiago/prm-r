import { api } from "~/utils"
import { LoadingPage, ProductModal, ProductTable } from "~/components"
import React, { useState } from "react"
import { type RouterOutputs } from "~/utils/api"

type Product = RouterOutputs["products"]["getAll"][number]

export const ProductPage: React.FC = () => {
  const { data: products, isLoading } = api.products.getAll.useQuery()
  const [openProductModal, setOpenProductModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  )
  console.log({ openProductModal, selectedProduct })
  if (isLoading) return <LoadingPage />
  return (
    <React.Fragment>
      {openProductModal && (
        <ProductModal
          product={selectedProduct}
          close={() => setOpenProductModal(false)}
        />
      )}
      <div className="gap-12 p-12">
        <ProductTable
          {...{ products, setOpenProductModal, setSelectedProduct }}
        />
      </div>
    </React.Fragment>
  )
}
