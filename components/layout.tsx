import Head from "next/head";
import { useEffect, useState } from "react";
import { LayoutProps } from "../@types";
import MoonIcon from "../public/moon.svg";
import SunIcon from "../public/sun.svg";
import HeartIcon from "../public/discord.svg";

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
      <header className="py-4 px-4 md:px-8 mb-6 bg-secondaryBackgroundLight dark:bg-secondaryBackgroundDark shadow-md">
        <div className="md:container mx-auto flex justify-between">
          <div className="flex items-center">
            <h1 className="font-bold text-3xl text-accentText">
              PolyGas
            </h1>
            <h2 className="font-bold text-sm md:text-xl mx-4 mt-1 text-secondaryTextLight dark:text-secondaryTextDark">
              Polygon Gas Price forecast system
            </h2>
          </div>
          <div className="flex items-center">
            <HeartIcon className="fill-current text-primaryTextLight dark:text-primaryTextDark cursor-pointer" onClick={() => window.open("https://discord.gg/VEa8xXw6CK")} />
            <div className="w-5"></div>
            {isDarkmode ? (
              <SunIcon className="fill-current text-primaryTextDark cursor-pointer" onClick={() => toggleDarkmode(!isDarkmode)} />
            ) : (
              <MoonIcon className="fill-current text-primaryTextLight cursor-pointer" onClick={() => toggleDarkmode(!isDarkmode)} />
            )}
          </div>
        </div>
      </header>
      <div className="container mx-auto min-h-screen flex flex-col overflow-hidden">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
      <footer className="flex flex-col align-middle justify-center text-center pb-8 px-16 text-primaryTextLight dark:text-primaryTextDark">
        <br />
        <p>This was built by <a className="text-accentText underline" href="https://pufler.dev">Julian Pufler</a></p>
        <p>and sponsored by <a className="text-accentText underline" href="https://gravityfinance.io">Gravity Finance</a></p>
        <br />
        <p>Check out <a className="text-accentText underline" href="https://polyfee.wtf">PolyFee.wtf</a></p>
        <p>© {new Date().getFullYear()} Julian Pufler</p>
      </footer>
    </div>
  );
}
export default Layout;
