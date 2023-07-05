import { GenericModal, Input, Select } from "~/components"
import { useFieldArray, useForm } from "react-hook-form"
import { useState } from "react"
import { FullOrder, ProductInput } from "~/schemas"
import { api, centsToDollars } from "~/utils"

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
  //STATE & CONSTS
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const orderItemsPricified = selectedOrder?.orderItems?.map((item) => ({
    ...item,
    price: (item.price ?? 0) / 100,
  }))
  const oldProductsSubTotal = orderItemsPricified?.reduce((acc, item) => {
    if (!item?.price) return acc
    return acc + item.price * item.quantity
  }, 0)

  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      orderItems: orderItemsPricified,
      status: selectedOrder?.status,
      customer: selectedOrder?.customer,
      id: selectedOrder?.id,
      paymentMethod: selectedOrder?.paymentMethod,
      trackingCompany: selectedOrder?.trackingCompany,
      trackingNumber: selectedOrder?.trackingNumber,
      address: selectedOrder?.address,
    },
  })

  const {
    fields: orderItemsFields,
    append: orderItemsAppend,
    remove: orderItemsRemove,
  } = useFieldArray({
    control,
    name: "orderItems",
  })

  const addProduct = () => {
    if (!products?.[0]) return
    orderItemsAppend({
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

  const selectedProductsSubTotal = getValues("orderItems")?.reduce(
    (acc, item) => {
      return acc + item.price * item.quantity
    },
    0
  )

  const newTotal = selectedProductsSubTotal //Here we would also add shipping, tax, fees, etc

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    trigger()
      .then((isValid) => {
        if (!isValid) return
        const orderValues = getValues()
        console.log({ orderValues })
      })
      .catch((err) => {
        console.log(err)
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
              orderItemsFields.map((item, index) => {
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
                      onClick={() => orderItemsRemove(index)}
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
              {...register("trackingCompany", { required: true })}
            />
            <Input
              label="Tracking Number"
              placeholder="#1234567890"
              {...register("trackingNumber", { required: true })}
            />
          </div>
          <div className="flex items-center justify-between gap-8 border-b  border-gray-400 py-2 text-base font-medium text-gray-900 dark:text-white">
            <span className="text-lg">Customer Information</span>
            <span>{selectedOrder?.customer?.email}</span>
          </div>
          <div className="flex-col items-center justify-between gap-8 border-b border-gray-400 py-2 text-base font-medium text-gray-900 dark:text-white">
            <span className="text-lg">Shipping Address</span>
            <div className="flex w-full items-center justify-between border-b border-dashed">
              <span>Street</span>
              <Input
                size="sm"
                placeholder="line1"
                {...register(`address.line1`, {
                  required: true,
                })}
              />
            </div>
            <div className="flex w-full items-center justify-between border-b border-dashed">
              <span>Apt/House #</span>
              <Input
                size="sm"
                placeholder="line2"
                {...register(`address.line2`, {
                  required: true,
                })}
              />
            </div>
            <div className="flex w-full items-center justify-between border-b border-dashed">
              <span>City</span>
              <Input
                size="sm"
                placeholder="City"
                {...register(`address.city`, {
                  required: true,
                })}
              />
            </div>
            <div className="flex w-full items-center justify-between border-b border-dashed">
              <span>State</span>
              <Input
                size="sm"
                placeholder="State"
                {...register(`address.state`, {
                  required: true,
                })}
              />
            </div>
            <div className="flex w-full items-center justify-between border-b border-dashed">
              <span>Country</span>
              <Input
                size="sm"
                placeholder="Country"
                {...register(`address.country`, {
                  required: true,
                })}
              />
            </div>
            <div className="flex w-full items-center justify-between border-b border-dashed">
              <span>Zip Code</span>
              <Input
                size="sm"
                placeholder="Zip Code"
                {...register(`address.zip`, {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="flex-col items-center justify-between gap-8 border-b border-gray-400 py-2 text-base font-medium text-gray-900 dark:text-white">
            <span className="text-lg">Payment Information</span>
            <div className="flex gap-2">
              <span>Subtotal:</span>
              <span>${oldProductsSubTotal}</span>
            </div>
            {oldProductsSubTotal !== selectedProductsSubTotal && (
              <div className="flex gap-2 text-red-500">
                <span>New Subtotal:</span>
                <span>${selectedProductsSubTotal}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span>Order Total:</span>
              <span>{centsToDollars(selectedOrder?.total ?? 0)}</span>
            </div>
            {newTotal !== selectedOrder?.total && (
              <div className="flex gap-2 text-red-500">
                <span>New Order Total:</span>
                <span>${selectedProductsSubTotal}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between space-x-2 rounded-b  p-6 dark:border-gray-600">
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
                  // onClick={() => {
                  //   deleteProduct({ id: selectedProduct?.id ?? "" })
                  //   close(false)
                  // }}
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
        </div>
      </form>
    </GenericModal>
  )
}
