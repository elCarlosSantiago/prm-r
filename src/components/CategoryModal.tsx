import { useForm } from "react-hook-form"
import { GenericModal } from "./GenericModal"
import { Input } from "./Input"
import { type Category } from "~/schemas"
import { useState } from "react"
import { toast } from "react-hot-toast"

type CategoryModalProps = {
  edit: boolean
  selectedCategory?: Category & Category
  close: React.Dispatch<React.SetStateAction<boolean>>
  submit: (category: Category, edit: boolean) => void
  archiveCategory: ({ id }: { id: string }) => void
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  edit,
  selectedCategory,
  close,
  archiveCategory,
  submit,
}) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<Category>({
    defaultValues: {
      name: selectedCategory?.name ?? "",
      id: selectedCategory?.id ?? "",
    },
  })

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    trigger()
      .then((isValid) => {
        if (!isValid) {
          const firstValue = Object.entries(errors)[0]
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          toast.error(`${firstValue?.[0]}-${firstValue?.[1].type}`)
          return
        }
        const category: Category = getValues()
        submit(category, edit)
        close(false)
      })
      .catch((err) => console.error(err))
  }

  return (
    <GenericModal
      title={
        edit ? `Edit Category ${selectedCategory?.name ?? ""}` : "Add Category"
      }
      close={close}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Category Name"
          {...register("name", { required: true })}
        />
      </div>
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
                archiveCategory({ id: selectedCategory?.id ?? "" })
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
    </GenericModal>
  )
}
