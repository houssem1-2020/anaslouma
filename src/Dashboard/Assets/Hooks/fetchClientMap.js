import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../../../AssetsM/generalConf";

const useGetClientMap = () => {
  const [data, setData] = useState([]);
  const [pureData, setPureData] = useState(null);

  useEffect(() => {
    axios.post(`${GConf.ApiLink}/client/map`, {
        tag: GConf.SystemTag,
      })
      .then(function (response) {
         let genresedit = []
         response.data.map( (thisData) => genresedit.push(
             {key: thisData.PK , value: thisData.Localisation , text: thisData.Localisation }
             ))
        setData(genresedit)
        setPureData(response.data)
      })
    }, [])

  return [data , pureData];
};

export default useGetClientMap;