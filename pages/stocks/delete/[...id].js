import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [stockInfo, setStockInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/getstocks?id=" + id).then((response) => {
        setStockInfo(response.data);
      });
    }
  }, [id]);

  // go back function
  function goback() {
    router.push("/");
  }

  async function deleteStock() {
    await axios.delete("/api/getstocks?id=" + id);
    goback();
  }

  return (
    <>
      <Head>
        <title>Delete Stock</title>
      </Head>
      <div className="blogpage container">
        <div className="titledashboard  flex flex-sb">
          <div className="mb-2">
            <h2>
              Delete Stock : <span>{stockInfo?.stockname}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <svg viewBox="0 0 24 24" fill="red" height="6em" width="6em">
              <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
            </svg>
            <p className="cookieHeading">Are you sure?</p>
            <p className="cookieDescription">If you delete this stock all content will be lost and permenantly deleted.</p>
            <div className="buttonContainer">
                <button onClick={deleteStock} className="acceptButton">Delete</button>
                <button onClick={goback} className="declineButton">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}