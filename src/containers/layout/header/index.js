import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <nav className='w-full p-8 flex justify-between  bg-white shadow-md shadow-slate-300'>
      <h1>Todo-List</h1>
      <ul
        className={`flex flex-row gap-8 pr-14  custom-transition ${
          status === "loading" ? "opacity-0" : "opacity-100"
        } `}
      >
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/profile"}>
          <li>Profile</li>
        </Link>
        <Link href={"/protectedSSR"}>
          <li>protected ssr</li>
        </Link>

        {status !== "loading" && status === "unauthenticated" && (
          <button onClick={() => signIn("github")}> Sing in </button>
        )}

        {status !== "loading" && status === "authenticated" && (
          <button onClick={() => signOut("github")}>Sign out</button>
        )}
      </ul>
    </nav>
  );
};

export default Header;
