import { GenericModal } from "./GenericModal"
import { type RouterOutputs } from "~/utils/api"

type Product = RouterOutputs["products"]["getAll"][number]

export const ProductModal = ({
  product,
  close,
}: {
  product?: Product
  close: React.Dispatch<React.SetStateAction<boolean>>
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
