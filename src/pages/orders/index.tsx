import { NavBar } from "~/components"
import { OrderPage } from "~/templates"

const Orders = () => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-200 ">
        <NavBar />
        <OrderPage />
      </div>
    </main>
  )
}

export default Orders
