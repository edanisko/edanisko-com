import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <>
      <Layout>
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() =>
            console.log(`script loaded, window.FB has been popoulated.`)
          }
        ></Script>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
        <p>
          Blog post content goes here. This will be the first blog post on the.
        </p>
      </Layout>
    </>
  );
}
