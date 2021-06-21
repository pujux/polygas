import { useEffect, useRef, useState } from "react";
import { setInterval, setTimeout } from "timers";
import Layout from "../components/layout";
import { Line } from "react-chartjs-2";

let blocks = [];
let gasInterval, priceInterval;

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
    if (priceInterval || gasInterval)
      return console.log("already defined intervals");
    fetchGasstation();
    fetchMaticPrice();

    gasInterval = setInterval(fetchGasstation, 15e2);
    backgroundAnimateXRef.current.classList.add("refreshingX");
    backgroundAnimateYRef.current.classList.add("refreshingY");
    priceInterval = setInterval(fetchMaticPrice, 12e4);
    return () => {
      clearInterval(gasInterval);
      clearInterval(priceInterval);
    };
  }, []);

  const fetchGasstation = async () => {
    const data = await fetch("https://gasstation-mainnet.matic.network")
      .then((res) => res.json())
      .catch((err) => console.error("(╯°□°)╯︵ ┻━┻", err));
    if (data && !blocks.find((b) => b.blockNumber === data.blockNumber)) {
      blocks = [...blocks.slice(-24), data];
      console.log(blocks);
      setLastBlocks(blocks);
      setGasData(data);
    }
  };

  const fetchMaticPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    )
      .then((res) => res.json())
      .catch((err) => console.error("(╯°□°)╯︵ ┻━┻", err));
    if (response["matic-network"]?.usd) setPrice(response["matic-network"].usd);
  };

  return (
    <div className="bg-primaryBackgroundLight dark:bg-primaryBackgroundDark">
      <Layout
        title={
          !gasData.fastest ||
          !gasData.fast ||
          isNaN(gasData.fastest) ||
          isNaN(gasData.fast)
            ? undefined
            : `${gasData.fastest.toFixed(0)}-${gasData.fast.toFixed(0)} Gwei`
        }
      >
        <div className="mx-4 md:mx-0 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="md:text-center text-3xl mb-4 text-primaryTextLight dark:text-primaryTextDark">
                Gas Price (Gwei)
              </h1>
              <h2 className="md:text-center text-md text-secondaryTextLight dark:text-secondaryTextDark">
                Recommended Gas Price after analyzing the last 500 Transactions
              </h2>
            </div>
            <div className="grid mb-4 gap-6 md:gap-12 grid-cols-1 md:grid-cols-4">
              <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-tertiaryBackgroundLight dark:border-tertiaryBackgroundDark bg-secondaryTextDark dark:bg-secondaryTextLight overflow-hidden">
                <h2 className="font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                  Rapid
                </h2>
                <h2 className="font-bold text-2xl md:text-5xl text-green-500 md:my-4">
                  {gasData.fastest?.toFixed(0)}
                </h2>
                <h2 className="font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                  ${((gasData.fastest * price) / 1e9).toFixed(10)}
                </h2>
              </div>
              <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-accentText relative bg-secondaryTextDark dark:bg-secondaryTextLight overflow-hidden">
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
                  {gasData.fast?.toFixed(0)}
                </h2>
                <h2 className="z-10 font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                  ${((gasData.fast * price) / 1e9).toFixed(10)}
                </h2>
              </div>
              <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-secondaryTextLight dark:border-secondaryTextDark bg-secondaryTextDark dark:bg-secondaryTextLight overflow-hidden">
                <h2 className="font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                  Standard
                </h2>
                <h2 className="font-bold text-2xl md:text-5xl text-blue-600 md:my-4">
                  {gasData.standard?.toFixed(0)}
                </h2>
                <h2 className="font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                  ${((gasData.standard * price) / 1e9).toFixed(10)}
                </h2>
              </div>
              <div className="flex md:flex-col justify-between items-center p-4 rounded-xl border-solid border border-secondaryTextLight dark:border-secondaryTextDark bg-secondaryTextDark dark:bg-secondaryTextLight overflow-hidden">
                <h2 className="font-bold text-lg md:text-xl w-10 md:w-auto text-primaryTextLight dark:text-primaryTextDark">
                  Slow
                </h2>
                <h2 className="font-bold text-2xl md:text-5xl text-purple-500 md:my-4">
                  {gasData.safeLow?.toFixed(0)}
                </h2>
                <h2 className="font-bold text-sm md:text-md text-secondaryTextLight dark:text-secondaryTextDark">
                  ${((gasData.safeLow * price) / 1e9).toFixed(10)}
                </h2>
              </div>
            </div>
            <h1 className="text-md text-secondaryTextLight dark:text-secondaryTextDark">
              MATIC: ${price}
            </h1>
            <h1 className="text-md text-secondaryTextLight dark:text-secondaryTextDark">
              Block: #{gasData.blockNumber}
            </h1>
          </div>
        </div>
        <div className="mx-4 md:mx-0 mb-8">
          <h1 className="md:text-center text-3xl mb-4 text-primaryTextLight dark:text-primaryTextDark">Last 25 Blocks received</h1>
          <div className="max-w-4xl mx-auto">
            <Line
              type="line"
              data={{
                labels: lastBlocks.map((b) => b.blockNumber),
                datasets: [
                  {
                    label: "Rapid",
                    data: lastBlocks.map((b) => b.fastest?.toFixed(0)),
                    fill: false,
                    backgroundColor: "#10b981",
                    borderColor: "#10b981",
                    pointRadius: 1,
                    cubicInterpolationMode: "monotone",
                  },
                  {
                    label: "Fast",
                    data: lastBlocks.map((b) => b.fast?.toFixed(0)),
                    fill: false,
                    backgroundColor: "#ffa600",
                    borderColor: "#ffa600",
                    pointRadius: 1,
                    cubicInterpolationMode: "monotone",
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {},
                },
                animation: {
                  duration: 0,
                },
                yAxes: [
                  {
                    scaleLabel: {
                      labelString: "Gwei",
                    },
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      labelString: "Block #",
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Home;
