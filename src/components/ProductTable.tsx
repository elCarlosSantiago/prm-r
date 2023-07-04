import { type RouterOutputs } from "~/utils/api"

type Products = RouterOutputs["products"]["getAll"]

type ProductTableProps = {
  products?: Products
  setOpenProductModal: (open: boolean) => void
  setSelectedProduct: (product: Products[number]) => void
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  setOpenProductModal,
  setSelectedProduct,
}) => {
  if (!products) return null
  return (
    <div className="mx-auto max-w-5xl">
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
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400"
                    >
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {products?.map((product) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product)
                        setOpenProductModal(true)
                      }}
                    >
                      {/* <td className="w-4 p-4">
                        <div className="flex items-center justify-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                          <label htmlFor="checkbox-table-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td> */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-500 dark:text-white">
                        {product.category.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        ${product.price}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {product.stock}
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
