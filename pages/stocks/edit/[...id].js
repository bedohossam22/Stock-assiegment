
import Stock from "@/components/Stock";
import axios from "axios";
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function EditProduct() {

    const router = useRouter();
    const { id } = router.query;
    const [stockInfo , setStockInfo] = useState(null);
    useEffect(() => {
        if (!id){
            return;
        } else {
            axios.get('/api/getstocks?id=' + id).then(response => {
                setStockInfo(response.data)
            })
        }

    } , [id])

    return <>

        <Head>
            <title>Update Stock</title>
        </Head>
    <div className="blogpage">
        <div className="titledashboard container flex flex-sb">
            <div className="mb-2">
                <h2>Edit Stock : <span>{stockInfo?.stockname}</span></h2>
                <h3>ADMIN PANEL</h3>
            </div>
        </div>
        <div className="mt-3 container">
            {
                stockInfo && (
                    <Stock {...stockInfo}/>
                )
            }
        </div>
    </div>
    </>
}
