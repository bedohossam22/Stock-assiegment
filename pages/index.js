import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChartSimple } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "@/components/Spinner";



export default function Home() {

const { alldata , loading} = useFetchData('/api/getstocks')

  // Calculate total Profit value
  const totalProfitValue = alldata?.reduce((value, stock) => {
    return value + stock.quantity * stock.buyprice;
  }, 0);

const router = useRouter();

// name of top performing stock
const topPerformingStock = alldata?.reduce((highest, stock) => {
  const stockValue = stock.quantity * stock.buyprice;
  if (!highest || stockValue > highest.value) {
    return { stock, value: stockValue };
  }
  return highest;
}, null);

// Access the top-performing stock
const bestStockName = topPerformingStock?.stock?.stockname || 'N/A';
/* const bestStockValue = topPerformingStock?.value || 0; */


// name of lowest performing stock
const loweststock = alldata?.reduce((lowest , stock) => {
  const stockValue = stock.quantity * stock.buyprice
  if(!lowest || stockValue < lowest.value){
    return {stock , value: stockValue}
  }
  return lowest;
}
, null);

const worststock = loweststock?.stock.stockname || "N/A";



  return (
    <>
      <Head>
        <title>Stocks App | Sicko Design</title>
        <meta name="description" content="Movie website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {loading ? <Loading/> : <div className="container pt-cx">
         
          <div className="topheadertitle flex flex-sb ">
            <div>
            <h1 className="mb-1">
            Explore all  Stocks here
            </h1>
            <p className="mb-2 w-66">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
            <Link href='/' ><button>Exclusive On <span>Sicko</span></button></Link>
          </div>
          <img src="/img/rocket.png" alt="rocket" />
          </div>
          <div className="fourcards flex flex-sb ">
            <div className="fcard">
              <div className="flex flex-sb mobo-2">
                <div className="fcardsvg">
                <FaChartSimple />
                </div>
                <h3>Total Stocks</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100 mobo">
                <img src="/img/chartone.svg" alt="chart" />
                <h4>{alldata.length}</h4>
              </div>
            </div>
            <div className="fcard">
              <div className="flex flex-sb mobo-2" >
                <div className="fcardsvg">
                <FaChartSimple />
                </div>
                <h3>Profit Value</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100 mobo">
                <img src="/img/charttwo.svg" alt="chart" />
                <h4>${totalProfitValue}</h4>
              </div>
            </div>
            <div className="fcard relative">
             {/*  <h2 className="absolute-top-right">Best Seller</h2> */}
              <div className="flex flex-sb mobo-2">
                <div className="fcardsvg ">
                <FaChartSimple />
                </div>
                <h3>{bestStockName} stock</h3>

                <BsThreeDotsVertical />
                
              </div>
           
              <div className="flex flex-sb wh-100 mobo">
                <img src="/img/chartthree.svg" alt="chart" />
                <h4>#1</h4>
              </div>
            </div>
            <div className="fcard">
              <div className="flex flex-sb mobo-2">
                <div className="fcardsvg">
                <FaChartSimple />
                </div>
                <h3>{worststock}</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100 mobo">
                <img src="/img/chartfour.svg" alt="chart" />
                <h4>#5</h4>
              </div>
            </div>
          </div>


          <div className="stockscards flex flex-col flex-left gap-2 w-100">
            <div className="flex flex-sb w-100 stocktitle">
              <h2>List Of All Stocks</h2>
              <Link href='/addstock'><button>Add Stock</button></Link>
            </div>
            {loading ? <div><Spinner /></div> : (
            <div className="w-100 font-size">
              <table className="w-100">
                <thead>
                  <tr>
                    <th className="blue">Stock</th>
                    <th className="blue">Price</th>
                    <th className="blue">Quantity</th>
                    <th className="blue">Ticker</th>
                  </tr>
                </thead>
                <tbody>
                  {alldata?.map((stock) => (
                    <tr key={stock.id}>
                      <td className="text-center">{stock.stockname}</td>
                      <td className="text-center">${stock.buyprice}</td>
                      <td className="text-center">{stock.quantity}</td>
                      <td className="text-center">{stock.ticker}</td>
                      {/* Edit and Delete buttons */}
                      <div className="mobo-4">
                       
                  <Link href={`/stocks/edit/${stock._id}`}> <button>Edit</button></Link>   
                  <Link href={`/stocks/delete/${stock._id}`}> <button>Delete</button> </Link>  
                  </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
          </div>
          }
    </>
    
  );
}
