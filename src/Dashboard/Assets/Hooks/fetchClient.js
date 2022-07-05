import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../../../AssetsM/generalConf";

const useGetClients = () => {
    //const
    const [data, setData] = useState(null);
    const [pureData, setPureData] = useState(null);

    //Use Effects 
    useEffect(() => {
        axios.get(`${GConf.ApiLink}/client`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            let TableNow = []
            response.data.map( (dta) => {TableNow.push({value : dta.Name, text : dta.Name, key: dta.PK})})
            setData(TableNow)
            setPureData(response.data)
        })
    }, [])

  return [data, pureData];
};

export default useGetClients;