import Head from "next/head";
import { LayoutProps } from "../@types";

function Layout({ title, children }: LayoutProps) {
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <Head>
        <title>
          {title} {title ? " | " : ""} SiteName
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="title text" />
        <meta name="description" content="description text" />
      </Head>
      <header className="flex justify-center mt-4">Header</header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="flex justify-center mb-4">
        © {new Date().getFullYear()} Laurids Kern
      </footer>
    </div>
  );
}
export default Layout;
