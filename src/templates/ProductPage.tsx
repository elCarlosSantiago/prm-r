import { api } from "~/utils"
import { LoadingPage, ProductModal, ProductTable } from "~/components"
import React, { useState } from "react"
import { type ProductOutput, type ProductInput } from "~/schemas"

export const ProductPage: React.FC = () => {
  /**
   * STATE & CONTEXT
   */
  const [openProductModal, setOpenProductModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<
    ProductOutput | undefined
  >(undefined)
  const ctx = api.useContext()

  /**
   * QUERIES & MUTATIONS
   */
  const { data: products, isLoading } = api.products.getAll.useQuery()
  const { data: categories } = api.categories.getAll.useQuery()
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

  const { mutate: deleteProduct } = api.products.delete.useMutation({
    onSuccess: async () => {
      await ctx.products.getAll.invalidate()
      setSelectedProduct(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        alert(errorMessage[0])
      } else {
        alert("Failed to delete! Please try again later.")
      }
    },
  })

  /**
   * HANDLERS
   */

  const handleSubmit = (product: ProductInput, edit: boolean) => {
    if (edit) editProduct(product)
    else createProduct(product)
  }
  if (isLoading) return <LoadingPage />

  return (
    <React.Fragment>
      {openProductModal && (
        <ProductModal
          {...{
            selectedProduct,
            setSelectedProduct,
            categories,
            deleteProduct,
          }}
          close={() => setOpenProductModal(false)}
          submit={handleSubmit}
          edit={!!selectedProduct}
        />
      )}
      <div className="flex-col gap-12 p-12">
        <span className="mb-8 flex justify-center">
          <h1 className="text-3xl font-bold">Products</h1>
        </span>
        <ProductTable
          {...{ products, setOpenProductModal, setSelectedProduct }}
        />
      </div>
    </React.Fragment>
  )
}
