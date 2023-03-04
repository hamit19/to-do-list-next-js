import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  const { mutate } = useSWRConfig();

  return (
    <>
      <Component {...pageProps} mutate={mutate} />
      <ToastContainer />
    </>
  );
}
