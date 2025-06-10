"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SigninBtn = () => {
  const { status, data: session } = useSession();
  return (
    <div className=" flex flex-col items-center justify-center text-white">
      <div className="shadow-lg shadow-slate-900 rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Image
            alt="Logo"
            src={
              "https://res.cloudinary.com/deliugmys/image/upload/v1749327189/trendlogo_uhmimg.png"
            }
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
        <p>Sign in to access your account and start your journey.</p>
        <button
          onClick={() => signIn("google")}
          className="flex bg-white items-center gap-4 shadow-xl rounded-md mt-3 mx-auto cursor-pointer"
        >
          <Image
            alt="google logo"
            src={"/googleLogo.png"}
            width={30}
            height={30}
          />
          <span className="bg-blue-500 text-white px-4 py-3 rounded-tr-md rounded-br-md">
            Sign in with Google
          </span>
        </button>
        <div className="mt-6 text-sm text-gray-400">
          By Ssigning in, you agree to our
          <Link href={"/tos"} className="text-blue-500 hover:underline">
            Terms of Service
          </Link>
          and
          <Link href={"/privacy"} className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          {status === "authenticated" && session?.user?.name && (
            <p className="mt-2 text-white">Signed in as: {session.user.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninBtn;

// session.user.mongoId = token.mongoId;
//         session.user.role = token.role;

// token.mongoId = user.mongoId;
//         token.role = user.role;
