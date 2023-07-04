import { GenericModal } from "./GenericModal"
import { type ProductExport } from "~/schemas"

export const ProductModal = ({
  product,
  close,
}: {
  product?: ProductExport
  close: React.Dispatch<React.SetStateAction<boolean>>
  submit: () => void
}) => {
  return (
    <GenericModal
      title={product ? `Edit ${product.name}` : "Add Product"}
      submitText={product ? "Update" : "Add"}
      submit={() => {
        console.log("submit")
      }}
      cancel={close}
    >
      <div>Here we are</div>
    </GenericModal>
  )
}
