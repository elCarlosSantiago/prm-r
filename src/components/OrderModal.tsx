import { GenericModal, Input, Select } from "~/components"
import { useFieldArray, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { FullOrder, OrderItem, ProductInput } from "~/schemas"
import { centsToDollars } from "~/utils"

type OrderModalProps = {
  selectedOrder?: FullOrder
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (order: FullOrder, edit: boolean) => void
  archiveOrder: ({ id }: { id: string }) => void
  products?: ProductInput[]
}

export const OrderModal: React.FC<OrderModalProps> = ({
  selectedOrder,
  close,
  edit,
  submit,
  archiveOrder,
  products,
}) => {
  //state
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const orderItemsPricified = selectedOrder?.orderItems?.map((item) => ({
    ...item,
    price: (item.price ?? 0) / 100,
  }))
  console.log({ orderItemsPricified })

  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      orderItems: orderItemsPricified,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  })

  const addProduct = () => {
    if (!products?.[0]) return
    append({
      id: "",
      price: products[0].price / 100,
      quantity: 1,
      product: {
        id: products[0].id,
        name: products[0].name,
        image: products[0].image,
      },
    })
  }

  return (
    <GenericModal title={edit ? "Edit Order" : "Add Order"} close={close}>
      <form className="m-auto w-full justify-start px-8">
        <div className="flex-col">
          <div className="flex items-center justify-between py-2 text-base font-medium  text-gray-900 dark:text-white">
            <div>Order Products</div>
            <button
              type="button"
              onClick={addProduct}
              className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Add Product
            </button>
          </div>
          <div className=" font-medium text-gray-900 dark:text-white">
            {products &&
              fields.map((item, index) => {
                return (
                  <div
                    className="flex w-full items-center justify-between gap-8"
                    key={`${item.id}-${index}`}
                  >
                    <Select
                      {...register(`orderItems.${index}.productId`, {
                        required: true,
                      })}
                      options={products?.map((product) => ({
                        name: product.name,
                        id: product.id ?? "",
                      }))}
                    />
                    <Input
                      label="Price"
                      placeholder="Product Price"
                      type="number"
                      step={0.01}
                      {...register(`orderItems.${index}.price`, {
                        required: true,
                      })}
                    />
                    <Input
                      label="Quantity"
                      placeholder="Quantity"
                      {...register(`orderItems.${index}.quantity`, {
                        required: true,
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </form>
    </GenericModal>
  )
}
