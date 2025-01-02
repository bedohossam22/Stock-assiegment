const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndpoint){
    const [alldata , setAlldata] = useState([]);
    const [loading , setLoading] = useState(true);
    const [initialLoad , setInitialLoad] = useState(true);

useEffect(() => {
    if(initialLoad){
        // prevent api calls on renders
    setInitialLoad(false);
    setLoading(false);
    return;    
    }

    setLoading(true);

    const fetchAllData = async () => {
        try {
            const res = await axios.get(apiEndpoint);
            const alldata = res.data;
            setAlldata(alldata)
            setLoading(false);
        } catch (error){
            console.error("error fetching stock data" , error);
            setLoading(false);
        }
    };

    if(apiEndpoint){
        fetchAllData();
    }

} , [initialLoad , apiEndpoint]);

    return {alldata , loading};

}

export default useFetchData;