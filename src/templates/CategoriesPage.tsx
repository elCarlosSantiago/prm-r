import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { CategoryModal, CategoryTable, LoadingPage } from "~/components"
import { type Category } from "~/schemas"
import { api } from "~/utils"

export const CategoriesPage: React.FC = () => {
  /**
   * STATE & CONTEXT
   */
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)

  const ctx = api.useContext()

  /**
   * QUERIES & MUTATIONS
   */

  const { data: categories, isLoading } = api.categories.getAll.useQuery()

  const { mutate: editCategory } = api.categories.edit.useMutation({
    onSuccess: async () => {
      await ctx.categories.getAll.invalidate()
      setSelectedCategory(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to edit! Please try again later.")
      }
    },
  })

  const { mutate: createCategory } = api.categories.create.useMutation({
    onSuccess: async () => {
      await ctx.categories.getAll.invalidate()
      setSelectedCategory(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to add! Please try again later.")
      }
    },
  })

  const { mutate: archiveCategory } = api.categories.archive.useMutation({
    onSuccess: async () => {
      await ctx.categories.getAll.invalidate()
      setSelectedCategory(undefined)
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to delete! Please try again later.")
      }
    },
  })

  const handleSubmit = (category: Category, edit: boolean) => {
    if (edit && category.id) {
      editCategory({ id: category?.id, name: category?.name })
    } else createCategory(category)
  }

  if (isLoading) return <LoadingPage />
  return (
    <React.Fragment>
      {openCategoryModal && (
        <CategoryModal
          {...{ selectedCategory, archiveCategory }}
          close={() => setOpenCategoryModal(false)}
          edit={!!selectedCategory}
          submit={handleSubmit}
        />
      )}
      <div className="flex-col gap-12 p-12">
        <span className="mb-8 flex justify-center gap-8">
          <h1 className="text-3xl font-bold">Categories</h1>
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            onClick={() => {
              setSelectedCategory(undefined)
              setOpenCategoryModal(true)
            }}
          >
            Add Category
          </button>
        </span>
        {categories && (
          <CategoryTable
            {...{
              categories,
              setOpenCategoryModal,
              setSelectedCategory,
            }}
          />
        )}
      </div>
    </React.Fragment>
  )
}
