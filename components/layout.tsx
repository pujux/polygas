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
      <header className="px-4 py-4 mb-6 shadow-md md:px-8 bg-secondaryBackgroundLight dark:bg-secondaryBackgroundDark">
        <div className="flex justify-between mx-auto md:container">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-accentText">
              PolyGas
            </h1>
            <h2 className="mx-4 mt-1 text-sm font-bold md:text-xl text-secondaryTextLight dark:text-secondaryTextDark">
              Polygon Gas Price forecast system
            </h2>
          </div>
          <div className="flex items-center">
            <HeartIcon className="cursor-pointer fill-current text-primaryTextLight dark:text-primaryTextDark" onClick={() => window.open("https://discord.gg/VEa8xXw6CK")} />
            <div className="w-5"></div>
            {isDarkmode ? (
              <SunIcon className="cursor-pointer fill-current text-primaryTextDark" onClick={() => toggleDarkmode(!isDarkmode)} />
            ) : (
              <MoonIcon className="cursor-pointer fill-current text-primaryTextLight" onClick={() => toggleDarkmode(!isDarkmode)} />
            )}
          </div>
        </div>
      </header>
      <div className="container flex flex-col min-h-screen mx-auto overflow-hidden">
        <main className="flex flex-col flex-1">{children}</main>
      </div>
      <footer className="flex flex-col justify-center px-16 pb-8 text-center align-middle text-primaryTextLight dark:text-primaryTextDark">
        <br />
        <p>This was built by <a className="underline text-accentText" href="https://pufler.dev">Julian Pufler</a></p>
        <p>and sponsored by <a className="underline text-accentText" href="https://gravityfinance.io">Gravity Finance</a></p>
        <br />
        <p>Check out <a className="underline text-accentText" href="https://polyfee.wtf">PolyFee.wtf</a></p>
        <p>© {new Date().getFullYear()} Julian Pufler</p>
      </footer>
    </div>
  );
}
export default Layout;
