import { useUser } from "@clerk/nextjs"
import Head from "next/head"
import React from "react"
import { NavBar } from "~/components"
import { ProductPage } from "~/templates"

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <React.Fragment>
      <Head>
        <title>Product Resource Manager</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-200 ">
          <NavBar />
          {!isSignedIn ? (
            <div className="flex h-full items-center justify-center">
              Please sign in to view the product management system.
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              Welcome to your product management system.
            </div>
          )}
        </div>
      </main>
    </React.Fragment>
  )
}
