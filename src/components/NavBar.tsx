import Image from "next/image"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { LoadingPage } from "./Loading"
import Link from "next/link"

export const NavBar: React.FC = () => {
  const { user, isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return <LoadingPage />
  return (
    <div className="flex justify-between gap-8 border-b border-slate-400 px-8 py-4">
      {!!user && (
        <div className="flex items-center gap-8 ">
          <Image
            src={user?.profileImageUrl}
            width={32}
            height={32}
            quality={100}
            alt="user-image"
            className="h-24 w-24 rounded-full"
          />
          <div className="flex-col gap-16">
            <span>
              Welcome back, <span className="font-bold">{user.fullName}</span>
            </span>
            <div className="flex justify-between gap-8">
              {/* TODO: make dynamic */}
              <Link href="products">Products</Link>
              <Link href="orders">Orders</Link>
              <Link href="categories">Categories</Link>
            </div>
          </div>
        </div>
      )}
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
    </div>
  )
}
