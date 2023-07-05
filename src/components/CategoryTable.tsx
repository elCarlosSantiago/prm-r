import { type RouterOutputs } from "~/utils/api"

type Categories = RouterOutputs["categories"]["getAll"]

type CategoryTableProps = {
  categories: Categories
  setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Categories[number] | undefined>
  >
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  setOpenCategoryModal,
  setSelectedCategory,
}) => {
  if (!categories) return null
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400"
                    >
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {categories?.map((category) => (
                    <tr
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category)
                        setOpenCategoryModal(true)
                      }}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
