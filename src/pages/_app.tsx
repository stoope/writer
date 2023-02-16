import "@/styles/globals.css";
import { Fira_Code } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";

const font = Fira_Code({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Writer</title>
        <meta name="description" content="Distraction free writer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
