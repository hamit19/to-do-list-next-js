import Layout from "@/containers/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { mutate } = useSWRConfig();

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} mutate={mutate} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}
