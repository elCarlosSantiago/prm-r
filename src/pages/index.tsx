import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import Head from "next/head"
import Image from "next/image"
import React from "react"
import { LoadingPage } from "~/components/Loading"
import { type RouterOutputs, api } from "~/utils/api"

export const NavBar: React.FC = () => {
  const { user, isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return <LoadingPage />
  return (
    <div className="flex justify-between gap-8 border-b border-slate-400 px-8 py-4">
      {!!user && (
        <div className="flex items-center gap-8">
          <Image
            src={user?.profileImageUrl}
            width={32}
            height={32}
            quality={100}
            alt="user-image"
            className="h-24 w-24 rounded-full"
          />
          <div className="">
            Welcome back, <span className="font-bold">{user.fullName}</span>
          </div>
        </div>
      )}
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
    </div>
  )
}
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
