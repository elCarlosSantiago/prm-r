import { useUser } from "@clerk/nextjs"
import Head from "next/head"
import React from "react"
import { NavBar, LoadingPage } from "~/components"
import { type RouterOutputs, api } from "~/utils/api"

type Product = RouterOutputs["products"]["getAll"][number]

const Product: React.FC<{ product: Product }> = ({ product }) => {
  return <div className="border-b border-slate-400 p-8">{product.name}</div>
}

export default function Home() {
  const { data, isLoading } = api.products.getAll.useQuery()
  const { isSignedIn } = useUser()
  return (
    <React.Fragment>
      <Head>
        <title>Product Resource Manager</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-200 md:max-w-4xl">
          <NavBar />
          {!isSignedIn ? (
            <div className="flex h-full items-center justify-center">
              Please sign in to view your products.
            </div>
          ) : isLoading ? (
            <LoadingPage />
          ) : (
            <div>
              {data?.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </React.Fragment>
  )
}
