import { signIn, useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") return <h1>Loading...</h1>;

  return <div> {session.user.name}, welcome to your profile page!</div>;
};

export default Profile;
