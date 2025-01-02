
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";


export default function Stock(
    {
        _id,
        stockname: existingstockname ,
        ticker: existingticker ,
        quantity: existingquantity ,
        buyprice: existingbuyprice
}
) {

    const [redirect , setRedirect] = useState(false)
    const router = useRouter()
   
    const [stockname , setStockname] = useState(existingstockname || '')
    const [ticker , setTicker] = useState(existingticker || '')
    const [quantity , setQuantity] = useState(existingquantity || 0)
    const [buyprice , setBuyprice] = useState(existingbuyprice || 0)

    // function to create Stock
    async function createStock(ev) {
        ev.preventDefault();

    const data = {stockname , ticker ,  quantity ,   buyprice}

    if (_id) {
        await axios.put('/api/getstocks' , {...data , _id})
    } else {
        await axios.post('/api/getstocks' , data);
    }

        setRedirect(true);
    }
    if (redirect) {
        router.push('/')
        return null;
    }

    return <>
        <Head>
            <title>Add Stock page</title>
        </Head>
    <form className= "addstockform " onSubmit={createStock}>
    <div className="formdata w-[80%] flex flex-col mb-2 flex-left h-screen">
        <label htmlFor="stockname">Stock Name</label>
        <input type="text" id="stockname" placeholder="Stock Name" value={stockname} onChange={ev=> setStockname(ev.target.value)} required></input> 
        <label htmlFor="ticker" >Ticker</label>
        <input type="text" id="ticker" placeholder="Ticker" value={ticker} onChange={ev=> setTicker(ev.target.value)} required></input> 
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" placeholder="Quantity" value={quantity} onChange={ev=> setQuantity(ev.target.value)} required></input> 
        <label htmlFor="buyprice">Buy Price</label>
        <input type="number" id="buyprice" placeholder="Buy Price" value={buyprice} onChange={ev=> setBuyprice(ev.target.value)} required></input> 
            <div className="w-100 flex-center mt-7">
          
        <button type="submit" className="w-100 flex-center custome2">
            SAVE DATA
        </button>
        </div>
    </div>
   
    </form>


    </>
}

