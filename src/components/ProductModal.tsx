import { GenericModal, Input, Select } from "~/components"
import { type Category, type ProductInput, type ProductOutput } from "~/schemas"
import { useForm } from "react-hook-form"
import { dollarsToCents } from "~/utils"
import { useState } from "react"
import { toast } from "react-hot-toast"

type ProductModalProps = {
  selectedProduct?: ProductOutput
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (product: ProductInput, edit: boolean) => void
  categories?: Category[]
  deleteProduct: ({ id }: { id: string }) => void
}

export const ProductModal: React.FC<ProductModalProps> = ({
  selectedProduct,
  close,
  edit,
  submit,
  categories,
  deleteProduct,
}) => {
  //state
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<ProductOutput>({
    defaultValues: {
      name: selectedProduct?.name ?? "",
      description: selectedProduct?.description ?? "",
      stock: selectedProduct?.stock ?? 0,
      price: selectedProduct?.price ? selectedProduct?.price / 100 : 0,
      image: selectedProduct?.image ?? "",
      categoryId: selectedProduct?.categoryId ?? "",
    },
  })

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
            price: Number(dollarsToCents(product.price)),
            image: product.image,
            categoryId: product.categoryId,
            id: selectedProduct?.id,
          }
          submit(payload, edit)
          close(false)
        } else {
          const firstValue = Object.entries(errors)[0]
          if (firstValue) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            toast.error(`${firstValue?.[0]}-${firstValue?.[1]?.type}`)
          }
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
          {...register("name", { required: true })}
        />
        <div className="flex justify-between">
          <Input
            label="Price"
            placeholder="Product Price"
            type="number"
            step={0.01}
            {...register("price", {
              required: true,
            })}
          />
          <Input
            label="Stock"
            placeholder="Product Stock"
            type="number"
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
          {...register("description")}
        />
        {categories && (
          <Select
            options={categories}
            {...register("categoryId", { required: true })}
          />
        )}
        <div className="mt-6 flex items-center justify-between space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
          <div className="flex gap-4">
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
          {!confirmDelete && edit && (
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="rounded-lg border border-gray-200 bg-red-300 px-5 py-2.5 text-sm font-medium text-gray-100 hover:bg-red-500 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          )}
          {confirmDelete && edit && (
            <div className="flex gap-4">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="rounded-lg border border-gray-200 bg-red-300 px-5 py-2.5 text-sm font-medium text-gray-100 hover:bg-red-500 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                onClick={() => {
                  deleteProduct({ id: selectedProduct?.id ?? "" })
                  close(false)
                }}
              >
                Confirm
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                onClick={() => setConfirmDelete(false)}
              >
                Undo
              </button>
            </div>
          )}
        </div>
      </form>
    </GenericModal>
  )
}
