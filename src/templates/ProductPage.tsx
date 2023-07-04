import { api } from "~/utils"
import { LoadingPage, ProductModal, ProductTable } from "~/components"
import React, { useState } from "react"
import { type ProductExport } from "~/schemas"

export const ProductPage: React.FC = () => {
  //State & Context
  const [openProductModal, setOpenProductModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<
    ProductExport | undefined
  >(undefined)
  const ctx = api.useContext()
  //Query
  const { data: products, isLoading } = api.products.getAll.useQuery()
  const { mutate: editProduct } = api.products.edit.useMutation({
    onSuccess: () => {
      void ctx.products.getAll.invalidate()
      setSelectedProduct(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        alert(errorMessage[0])
      } else {
        alert("Failed to edit! Please try again later.")
      }
    },
  })

  const handleSubmit = (product?: ProductExport) => {
    if (product) editProduct(product)
  }
  if (isLoading) return <LoadingPage />
  return (
    <React.Fragment>
      {openProductModal && (
        <ProductModal
          product={selectedProduct}
          close={() => setOpenProductModal(false)}
          submit={handleSubmit}
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
