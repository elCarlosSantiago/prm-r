import { api } from "~/utils"
import { LoadingPage } from "~/components"
import { ProductTable } from "~/components/ProductTable"

export const ProductPage: React.FC = () => {
  const { data: products, isLoading } = api.products.getAll.useQuery()
  if (isLoading) return <LoadingPage />
  return (
    <div className="gap-12 p-12">
      <ProductTable products={products} />
    </div>
  )
}
