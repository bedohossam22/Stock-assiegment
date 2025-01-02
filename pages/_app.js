import Aside from "@/components/Aside";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
  <Aside />
    <main>
      <Component {...pageProps} />
    </main>

  </>
}
