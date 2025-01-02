import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChartSimple } from 'react-icons/fa6';

const StockPage = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const api_key = 'ctq4m61r01qmn6h3g4cgctq4m61r01qmn6h3g4d0';
  const symbol = 'AAPL';

  useEffect(() => {
    async function getStockData() {
      try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${api_key}`);
        const data = await response.json();
        setStockData(data);
      } catch (err) {
        setError('Error fetching stock data');
        console.error(err);
      }
    }

    getStockData();
  }, [symbol]);

  // Calculate the total profit value by summing up stockData values
  const calculateProfitValue = (quantity = 1) => {
    if (stockData) {
      const { pc, o, h, c, l } = stockData;
  
      // Multiply each price by the quantity and sum them
      const totalProfit = (pc * quantity) + (o * quantity) + (h * quantity) + (c * quantity) + (l * quantity);
  
      return totalProfit.toFixed(2); // Return the profit value as a fixed decimal
    }
    return null;
  }; 

  // Find highest and lowest stock price
  const findHighestPrice = (high) => {
    return high ? high : null;
  };

  const findLowestPrice = (low) => {
    return low ? low : null;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container pt-cx">
      <div className="fourcards flex flex-sb">
        <div className="fcard">
          <div className="flex flex-sb mobo-2">
            <div className="fcardsvg">
              <FaChartSimple />
            </div>
            <h3>Total Stocks</h3>
            <BsThreeDotsVertical />
          </div>
          <div className="flex flex-col wh-100">
            <img src="/img/chartone.svg" alt="chart" />
            <h4>5</h4>
          </div>
        </div>
        <div className="fcard">
          <div className="flex flex-sb mobo-2">
            <div className="fcardsvg">
              <FaChartSimple />
            </div>
            <h3>Profit Value</h3>
            <BsThreeDotsVertical />
          </div>
          <div className="flex flex-col wh-100">
            <img src="/img/charttwo.svg" alt="chart" />
            <h4>{stockData ? calculateProfitValue() : 'N/A'}</h4>
          </div>
        </div>
        <div className="fcard">
          <div className="flex flex-sb mobo-2">
            <div className="fcardsvg">
              <FaChartSimple />
            </div>
            <h3>Highest Stock Price</h3>
            <BsThreeDotsVertical />
          </div>
          <div className="flex flex-col wh-100 ">
            <img src="/img/chartthree.svg" alt="chart" />
            <h4>{stockData ? findHighestPrice(stockData.h) : 'N/A'}</h4>
          </div>
        </div>
        <div className="fcard">
          <div className="flex flex-sb mobo-2">
            <div className="fcardsvg">
              <FaChartSimple />
            </div>
            <h3>Lowest Stock Price</h3>
            <BsThreeDotsVertical />
          </div>
          <div className="flex flex-col wh-100 ">
            <img src="/img/chartfour.svg" alt="chart" />
            <h4>{stockData ? findLowestPrice(stockData.l) : 'N/A'}</h4>
          </div>
        </div>
      </div>

      {stockData ? (
        <div>
          <div className="w-100 font-size mt-1">
            <table className="w-100">
              <thead>
                <tr>
                  <th className="blue">Stock </th>
                  <th className="blue">Price</th>
                  <th className="blue">Quantity</th>
                  <th className="blue">Ticker</th>
                </tr>
              </thead>
              <tbody>
                {/* Mock data + apidata*/}
                <tr>
                  <td className="text-center">Apple</td>
                  <td className="text-center"> {stockData.c}</td>
                  <td className="text-center">1</td>
                  <td className="text-center">AAPL</td>
                </tr>
                <tr>
                  <td className="text-center">Microsoft</td>
                  <td className="text-center"> {stockData.h}</td>
                  <td className="text-center">1</td>
                  <td className="text-center">MSFT</td>
                </tr>
                <tr>
                  <td className="text-center">Google</td>
                  <td className="text-center">{stockData.l}</td>
                  <td className="text-center">1</td>
                  <td className="text-center">GOOGL</td>
                </tr>
                <tr>
                  <td className="text-center">Amazon</td>
                  <td className="text-center">{stockData.pc}</td>
                  <td className="text-center">1</td>
                  <td className="text-center">AMZN</td>
                </tr>
                <tr>
                  <td className="text-center">Tesla</td>
                  <td className="text-center">{stockData.o}</td>
                  <td className="text-center">1</td>
                  <td className="text-center">TSLA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockPage;
