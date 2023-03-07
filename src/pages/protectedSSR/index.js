import { getSession, useSession } from "next-auth/react";
import React from "react";

const ProtectedSSR = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <h1>Loading...</h1>;

  return <div>{session.user.name}, welcome to the protected ssr page!</div>;
};

export default ProtectedSSR;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination:
          "/api/auth/signin?callbackUrl=http://localhost:3000/protectedSSR",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
