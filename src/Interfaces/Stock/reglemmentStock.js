import React , { useEffect, useState } from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import {Grid, _ } from "gridjs-react";
import { Button, Icon, Loader } from 'semantic-ui-react';
import TableGrid from '../../Dashboard/Assets/tableGrid';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';

function ReglemmentStock() {
    let camId = localStorage.getItem("InputCamion"); 
    let [tableData, setTableData] = useState([]); 
    const [reglerBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)

  useEffect(() => {
    axios.post(`${GConf.ApiCamionLink}/mv/resumer`, {
        tag: GConf.SystemTag,
        camId : camId,
      })
      .then(function (response) {
        console.log(response.data)
         let testTable = []
        response.data.map( (getData) => testTable.push([
        getData.A_Code,
        getData.Name,
         getData.Qte,
        ],))
        setTableData(testTable)
      })
    }, [])

    //function 
    const ReglemmentDeStock = () =>{

    }
    //card
    const ReglerStock = () =>{
        return(<>
            <div className='card p-2 shadow-sm mb-2'>
                <h5 className='text-danger mb-4'>Cliquer Pour Regler Votre stock </h5>
                <Button disabled={reglerBtnState} className='rounded-pill bg-system-btn mb-3' fluid onClick={ReglemmentDeStock}><Icon name='save' /> Régler Le Stock <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
            </div>
        </>)
    }
    return ( <>
        <BackCard data={InputLinks.backCard.skList}/>
        <br />
         
        <div className='container-fluid'>
            <ReglerStock />
            <TableGrid tableData={tableData} columns={GConf.TableHead.stock} />
        </div>
        </> );
}


export default ReglemmentStock;