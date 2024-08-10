import React, { useEffect, useState } from'react';
import axios from 'axios';

const useFetch = (endpoint, query) =>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          // 'x-rapidapi-key': '5a17c42e37msh5534cdface1dc8cp11c913jsn37d289605e19',
          'x-rapidapi-key':'08c5c29d62mshd8345dd88f87e1dp1d1891jsn8a7ca9ac3c15',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      };
      
  
    const fetchData = async() =>{
        setLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setLoading(false)
        } catch (error) {
            setError(error.message);
        }finally {
          setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData()
    },[]);

    const refetch = () => {
        setLoading(true);
        fetchData();
      };

      return {data, loading , error, refetch}

}

export default useFetch;