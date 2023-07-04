import { GenericModal, Input, Select } from "~/components"
import { type Category, type ProductInput, type ProductOutput } from "~/schemas"
import { useForm } from "react-hook-form"
import { dollarsToCents } from "~/utils"

type ProductModalProps = {
  selectedProduct?: ProductOutput
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (product: ProductInput, edit: boolean) => void
  categories?: Category[]
}

export const ProductModal: React.FC<ProductModalProps> = ({
  selectedProduct,
  close,
  edit,
  submit,
  categories,
}) => {
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
