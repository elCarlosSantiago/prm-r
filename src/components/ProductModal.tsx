import { GenericModal, Input } from "~/components"
import { type ProductInput, type ProductOutput } from "~/schemas"
import { useForm } from "react-hook-form"

export const ProductModal = ({
  selectedProduct,
  setSelectedProduct,
  close,
  edit,
  submit,
}: {
  selectedProduct?: ProductOutput
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<ProductOutput | undefined>
  >
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (product: ProductInput, edit: boolean) => void
}) => {
  const {
    register,
    formState: { errors, isValid },
    trigger,
    getValues,
  } = useForm<ProductOutput>({})

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    trigger()
      .then((isValid) => {
        if (isValid) {
          const product: ProductOutput = getValues()
          const payload: ProductInput = {
            description: product.description,
            name: product.name,
            stock: Number(product.stock),
            price: Number(product.price),
            image: product.image,
            categoryId: product.categoryId,
          }
          console.log({ product, payload })
          submit(payload, edit)
        } else {
          console.log({ errors })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <GenericModal
      title={edit ? `Edit ${selectedProduct?.name ?? ""}` : "Add Product"}
      close={close}
    >
      <form className="m-auto w-full justify-start px-8">
        <Input
          label="Name"
          placeholder="Product Name"
          value={selectedProduct?.name ?? ""}
          {...register("name", { required: true })}
        />
        <div className="flex justify-between">
          <Input
            label="Price"
            placeholder="Product Price"
            type="number"
            step={0.01}
            value={String(selectedProduct?.price ?? 0)}
            {...register("price", {
              required: true,
            })}
          />
          <Input
            label="Stock"
            placeholder="Product Stock"
            type="number"
            value={String(selectedProduct?.stock ?? 0)}
            step={1}
            {...register("stock", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
          />
        </div>
        <Input
          label="Description"
          size="lg"
          placeholder="Product Description"
          value={selectedProduct?.description ?? ""}
          {...register("description")}
        />
        <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onSubmit}
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
