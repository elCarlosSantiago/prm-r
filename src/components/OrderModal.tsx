import { GenericModal, Input, Select } from "~/components"
import { useFieldArray, useForm } from "react-hook-form"
import { useState } from "react"
import { FullOrder, ProductInput } from "~/schemas"
import { api } from "~/utils"

type OrderModalProps = {
  selectedOrder?: FullOrder
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (order: FullOrder, edit: boolean) => void
  archiveOrder: ({ id }: { id: string }) => void
  products?: ProductInput[]
}
//TODO: Extract this to a its type file
const orderStatuses = [
  {
    id: "PENDING",
    name: "Pending",
  },
  {
    id: "SHIPPED",
    name: "Shipped",
  },
  {
    id: "DELIVERED",
    name: "Delivered",
  },
  {
    id: "CANCELED",
    name: "Canceled",
  },
  {
    id: "REFUNDED",
    name: "Refunded",
  },
]

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
  console.log({ selectedOrder })

  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      orderItems: orderItemsPricified,
      status: selectedOrder?.status ?? "PENDING",
      customer: selectedOrder?.customer ?? {},
      id: selectedOrder?.id,
      paymentMethod: selectedOrder?.paymentMethod ?? "card",
      trackingCompany: selectedOrder?.trackingCompany ?? "",
      trackingNumber: selectedOrder?.trackingNumber ?? "",
      address: selectedOrder?.address ?? {},
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  })

  const selectedProductsTotal = getValues("orderItems")?.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

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
          <div className="font-medium text-gray-900 dark:text-white">
            {products &&
              fields.map((item, index) => {
                return (
                  <div
                    className="flex w-full items-end justify-between gap-8"
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
                      size="sm"
                      step={0.01}
                      {...register(`orderItems.${index}.price`, {
                        required: true,
                      })}
                    />
                    <Input
                      label="Quantity"
                      size="sm"
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
          <div className="flex items-center justify-between gap-8 border-b border-gray-400 py-2 text-base font-medium text-gray-900 dark:text-white">
            <Select
              options={orderStatuses}
              {...register("status", { required: true })}
            />
            <Input
              label="Tracking Company"
              placeholder="USPS..."
              {...(register("trackingCompany"), { required: true })}
            />
            <Input
              label="Tracking Number"
              placeholder="#1234567890"
              {...(register("trackingNumber"), { required: true })}
            />
          </div>
          <div className="flex items-center justify-between gap-8 border-b border-gray-400 py-2 text-base font-medium text-gray-900 dark:text-white">
            <div>Customer Information</div>
            {selectedOrder?.customer?.email}
          </div>
        </div>
      </form>
    </GenericModal>
  )
}
