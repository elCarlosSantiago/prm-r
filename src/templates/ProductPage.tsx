import { api } from "~/utils"
import { LoadingPage, ProductModal, ProductTable } from "~/components"
import React, { useState } from "react"
import { type ProductOutput, type ProductInput } from "~/schemas"

export const ProductPage: React.FC = () => {
  //State & Context
  const [openProductModal, setOpenProductModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<
    ProductOutput | undefined
  >(undefined)
  const ctx = api.useContext()
  //Query
  const { data: products, isLoading } = api.products.getAll.useQuery()
  const { mutate: editProduct } = api.products.edit.useMutation({
    onSuccess: async () => {
      await ctx.products.getAll.invalidate()
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

  const { mutate: createProduct } = api.products.create.useMutation({
    onSuccess: async () => {
      await ctx.products.getAll.invalidate()
      setSelectedProduct(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        alert(errorMessage[0])
      } else {
        alert("Failed to add! Please try again later.")
      }
    },
  })

  const handleSubmit = (product: ProductInput, edit: boolean) => {
    if (edit) editProduct(product)
    else createProduct(product)
  }
  if (isLoading) return <LoadingPage />
  return (
    <React.Fragment>
      {openProductModal && (
        <ProductModal
          {...{ selectedProduct, setSelectedProduct }}
          close={() => setOpenProductModal(false)}
          submit={handleSubmit}
          edit={!!selectedProduct}
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
