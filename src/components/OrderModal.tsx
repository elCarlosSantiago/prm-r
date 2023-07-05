import { GenericModal, Input, Select } from "~/components"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { FullOrder } from "~/schemas"

type OrderModalProps = {
  selectedOrder?: FullOrder
  close: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  submit: (order: FullOrder, edit: boolean) => void
  archiveOrder: ({ id }: { id: string }) => void
}

export const OrderModal: React.FC<OrderModalProps> = ({
  selectedOrder,
  close,
  edit,
  submit,
  archiveOrder,
}) => {
  //state
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({})
  console.log({ selectedOrder })
  return (
    <GenericModal title={edit ? "Edit Order" : "Add Order"} close={close}>
      <form className="m-auto w-full justify-start px-8">
        <Input
          label="Order Product"
          placeholder="Product Name"
          {...register("name", { required: true })}
        />
      </form>
    </GenericModal>
  )
}
