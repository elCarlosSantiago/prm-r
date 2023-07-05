import { NavBar } from "~/components"
import { CategoriesPage } from "~/templates"

const Categories = () => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-200 ">
        <NavBar />
        <CategoriesPage />
      </div>
    </main>
  )
}

export default Categories
