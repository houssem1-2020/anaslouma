import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../../../AssetsM/generalConf";

const useGetArticles = () => {
    //const
    const [data, setData] = useState([]);
    const [pureData, setPureData] = useState([]);
    const [selectedData, setSelectData] = useState([]);

    //Use Effects 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            let TableNow = []
            let SelectTableNow = []
            response.data.map( (dta) => {TableNow.push(dta.A_Code)})
            response.data.map( (dta) => {SelectTableNow .push({value : dta.A_Code, text : dta.Name, key: dta.PK})})
            setData(TableNow)
            setSelectData(SelectTableNow)
            setPureData(response.data)
        })
    }, [])

  return [data, pureData, selectedData];
};

export default useGetArticles;