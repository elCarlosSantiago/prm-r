import Image from "next/image"
import { SignInButton, SignOutButton } from "@clerk/nextjs"

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
