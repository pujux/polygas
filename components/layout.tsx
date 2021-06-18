import Head from "next/head";
import { useEffect, useState } from "react";
import { LayoutProps } from "../@types";
import MoonIcon from "../public/moon.svg";
import SunIcon from "../public/sun.svg";

function Layout({ title, children }: LayoutProps) {
  const [isDarkmode, setIsDarkmode] = useState(false);

  const toggleDarkmode = (darkmode) => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkmode ? "dark" : "light");
    setIsDarkmode(darkmode);
  };

  useEffect(() => {
    toggleDarkmode(localStorage.getItem("theme") === "dark")
  }, [])

  return (
    <div>
      <Head>
        <title>
          {title} {title ? " | " : ""} PolyGas
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="title text" />
        <meta name="description" content="description text" />
      </Head>
      <header className="flex justify-between py-4 px-8 mb-6 bg-secondaryBackgroundLight dark:bg-secondaryBackgroundDark shadow-md">
        <div className="flex items-center">
          <h1 className="font-bold text-3xl text-primaryTextLight dark:text-primaryTextDark">
            PolyGas
          </h1>
          <h2 className="font-bold text-sm md:text-xl ml-4 mt-1 text-secondaryTextLight dark:text-secondaryTextDark">
            Polygon Gas Price forecast system
          </h2>
        </div>
        <div className="flex items-center">
          {isDarkmode ? (
            <SunIcon className="fill-current text-primaryTextDark" onClick={() => toggleDarkmode(!isDarkmode)} />
          ) : (
            <MoonIcon className="fill-current text-primaryTextLight" onClick={() => toggleDarkmode(!isDarkmode)} />
          )}
        </div>
      </header>
      <div className="container mx-auto min-h-screen flex flex-col overflow-hidden">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
      <footer className="flex justify-center pb-8 text-primaryTextLight dark:text-primaryTextDark">
        © {new Date().getFullYear()} Julian Pufler
      </footer>
    </div>
  );
}
export default Layout;
