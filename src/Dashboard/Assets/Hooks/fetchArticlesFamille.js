import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../../../AssetsM/generalConf";

const useGetFamilleArticle = () => {
  const [data, setData] = useState([]);
  const [pureData, setPureData] = useState([]);

  useEffect(() => {
    axios.post(`${GConf.ApiLink}/stock/familles`, {
        tag: GConf.SystemTag,
      })
      .then(function (response) {
         let genresedit = []
         response.data.map( (thisData) => genresedit.push(
             {key: thisData.PK , value: thisData.Genre , text: thisData.Genre }
             ))
        setData(genresedit)
        setPureData(response.data)
      })
    }, [])

  return [data , pureData];
};

export default useGetFamilleArticle;