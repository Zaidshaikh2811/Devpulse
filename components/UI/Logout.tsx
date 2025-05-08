"use client";
import { useAuth } from "@clerk/nextjs";
import { Button, Link } from "@heroui/react";


const Logout = () => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <>
      {
        isSignedIn ? (
          <Button onClick={() => signOut()} variant="ghost" color="primary">Logout</Button>
        ) : (
          <Link color="primary" href="/sign-in">Sign-In</Link>
        )
      }
    </>
  )
}

export default Logout
