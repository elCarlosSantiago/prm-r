import { NavBar } from "~/components"
import { ProductPage } from "~/templates"

const Products = () => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-200 ">
        <NavBar />
        <ProductPage />
      </div>
    </main>
  )
}

export default Products
