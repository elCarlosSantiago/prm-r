import { GenericModal, Input } from "~/components"
import { type ProductExport } from "~/schemas"
import { useForm } from "react-hook-form"

export const ProductModal = ({
  selectedProduct,
  setSelectedProduct,
  close,
  edit,
  submit,
}: {
  selectedProduct?: ProductExport
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<ProductExport | undefined>
  >
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (product: ProductExport, edit: boolean) => void
}) => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<ProductExport>({})

  const onSubmit = () => (data: ProductExport, e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log({ data })
    return
  }
  return (
    <GenericModal
      title={edit ? `Edit ${selectedProduct?.name ?? ""}` : "Add Product"}
      close={close}
    >
      <form className="m-auto w-full justify-start px-8">
        <Input label="Name" placeholder="Product Name" />
        <div className="flex justify-between">
          <Input label="Price" placeholder="Product Price" type="number" />
          <Input
            label="Stock"
            placeholder="Product Stock"
            type="number"
            step={1}
          />
        </div>
        <Input
          label="Description"
          size="lg"
          placeholder="Product Description"
        />
        <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSubmit()
            }}
          >
            Submit
          </button>
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              close(false)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </GenericModal>
  )
}
