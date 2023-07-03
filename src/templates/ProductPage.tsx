import { api } from "~/utils"
import { LoadingPage } from "~/components"

export const ProductPage: React.FC = () => {
  const { data: products, isLoading } = api.products.getAll.useQuery()
  if (isLoading) return <LoadingPage />
  return (
    <div>
      {products?.map((product) => (
        <div key={product.id} className="border-b border-slate-400 p-8">
          {product.name}
        </div>
      ))}
    </div>
  )
}
