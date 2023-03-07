import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) return res.status(404).json({ message: "not authorized!" });

  if (session) {
    const { user } = session;
    return res.status(200).json({ message: "logged in ", user });
  }
}
