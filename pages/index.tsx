import Head from 'next/head';
import Header from "../components/Header";
import Middle from "../components/Middle";
import Login from "../components/Login";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (!session) return <Login />;

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Arial:wght@100;300;400&display=swap" rel="stylesheet"></link>
      </Head>

      <Header />

      <Middle />

    </div>
  )
}