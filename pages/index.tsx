import { useEffect, useRef, useState } from "react";
import { setInterval, setTimeout } from "timers";
import Layout from "../components/layout";

const Home = () => {
  const [gasData, setGasData] = useState({
    safeLow: NaN,
    standard: NaN,
    fast: NaN,
    fastest: NaN,
    blockTime: NaN,
    blockNumber: NaN,
  });
  const [price, setPrice] = useState(NaN);
  const [lastBlocks, setLastBlocks] = useState([]);
  const backgroundAnimateXRef = useRef<HTMLDivElement>();
  const backgroundAnimateYRef = useRef<HTMLDivElement>();

  useEffect(() => {
    fetchGasstation();
    fetchMaticPrice();
    const gasInterval = setInterval(fetchGasstation, 5e3);
    backgroundAnimateXRef.current.classList.add("refreshingX");
    backgroundAnimateYRef.current.classList.add("refreshingY");
    const priceInterval = setInterval(fetchMaticPrice, 12e4);
    return () => {
      clearInterval(gasInterval);
      clearInterval(priceInterval);
    };
  }, []);

  const updateLastBlocks = (block) => {
    const blocks = [...lastBlocks]
    if(blocks.length === 10) {
      blocks.pop();
    }
    blocks.push(block);
    setLastBlocks(blocks);
  };

  const fetchGasstation = async () => {
    const data = await fetch("https://gasstation-mainnet.matic.network")
      .then((res) => res.json())
      .catch((err) => console.error("(╯°□°)╯︵ ┻━┻", err));
    if (data) {
      setGasData(data);
      updateLastBlocks(data);
    }
  };

  const fetchMaticPrice = async () => {
    const {
      "matic-network": { usd: price },
    } = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    )
      .then((res) => res.json())
      .catch((err) => console.error("(╯°□°)╯︵ ┻━┻", err));
    if (price) setPrice(price);
  };

  return (
    <div className="bg-primaryBackgroundLight dark:bg-primaryBackgroundDark">
      <Layout
        title={
          isNaN(gasData.fastest) || isNaN(gasData.fast)
            ? undefined
            : `${gasData.fastest.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}-${gasData.fast.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })} Gwei`
        }
      >
        <div className="mx-4 md:mx-0 mb-8">
          <div className="mb-12">
            <h1 className="md:text-center text-3xl mb-4 text-primaryTextLight dark:text-primaryTextDark">
              Gas Price (Gwei)
            </h1>
            <h2 className="md:text-center text-md text-secondaryTextLight dark:text-secondaryTextDark">
              Recommended Gas Price after analyzing the last 500 Transactions
            </h2>
          </div>
          <div className="grid mb-4 gap-6 md:gap-12 grid-cols-1 md:grid-cols-4">
            <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-secondaryTextLight dark:border-secondaryTextDark overflow-hidden">
              <h2 className="font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                Rapid
              </h2>
              <h2 className="font-bold text-2xl md:text-5xl text-green-500 md:my-4">
                {gasData.fastest.toFixed(0)}
              </h2>
              <h2 className="font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                ${((gasData.fastest * price) / 1e9).toFixed(10)}
              </h2>
            </div>
            <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-accentText relative overflow-hidden">
              <div
                ref={backgroundAnimateXRef}
                className="z-0 absolute h-full md:hidden bottom-0 left-0 opacity-20 bg-accentText"
              ></div>
              <div
                ref={backgroundAnimateYRef}
                className="z-0 absolute hidden w-full md:block bottom-0 left-0 opacity-20 bg-accentText"
              ></div>
              <h2 className="z-10 font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                Fast
              </h2>
              <h2 className="z-10 font-bold text-2xl md:text-5xl text-accentText md:my-4">
                {gasData.fast.toFixed(0)}
              </h2>
              <h2 className="z-10 font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                ${((gasData.fast * price) / 1e9).toFixed(10)}
              </h2>
            </div>
            <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-secondaryTextLight dark:border-secondaryTextDark overflow-hidden">
              <h2 className="font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                Standard
              </h2>
              <h2 className="font-bold text-2xl md:text-5xl text-blue-600 md:my-4">
                {gasData.standard.toFixed(0)}
              </h2>
              <h2 className="font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                ${((gasData.standard * price) / 1e9).toFixed(10)}
              </h2>
            </div>
            <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-secondaryTextLight dark:border-secondaryTextDark overflow-hidden">
              <h2 className="font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                Slow
              </h2>
              <h2 className="font-bold text-2xl md:text-5xl text-purple-500 md:my-4">
                {gasData.safeLow.toFixed(0)}
              </h2>
              <h2 className="font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                ${((gasData.safeLow * price) / 1e9).toFixed(10)}
              </h2>
            </div>
          </div>
          <h1 className="text-md text-secondaryTextLight dark:text-secondaryTextDark">
            MATIC: ${price}
          </h1>
        </div>
        <div className="mx-4 md:mx-0 mb-8"></div>
      </Layout>
    </div>
  );
};
export default Home;
