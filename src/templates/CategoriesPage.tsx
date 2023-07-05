import React, { useState } from "react"
import { CategoryTable, LoadingPage } from "~/components"
import { api } from "~/utils"
import { type RouterOutputs } from "~/utils/api"

type Categories = RouterOutputs["categories"]["getAll"]
type Category = Categories[number]
export const CategoriesPage: React.FC = () => {
  /**
   * STATE & CONTEXT
   */
  const [openCategoriesModal, setOpenCategoriesModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)

  /**
   * QUERIES & MUTATIONS
   */

  const { data: categories, isLoading } = api.categories.getAll.useQuery()

  if (isLoading) return <LoadingPage />
  return (
    <React.Fragment>
      {/* {openCategoriesModal && (

      )} */}
      <div className="flex-col gap-12 p-12">
        <span className="mb-8 flex justify-center gap-8">
          <h1 className="text-3xl font-bold">Orders</h1>
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            onClick={() => {
              setSelectedCategory(undefined)
              setOpenCategoriesModal(true)
            }}
          >
            Add Category
          </button>
        </span>
        {categories && (
          <CategoryTable
            {...{
              categories,
              setOpenCategoriesModal,
              setSelectedCategory,
            }}
          />
        )}
      </div>
    </React.Fragment>
  )
}
