import React, { useEffect, useState } from 'react';
import LinkCard from '../Assets/linksCard'
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'
import GConf from '../../AssetsM/generalConf';
import TableGrid from '../../Dashboard/Assets/tableGrid';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Button,  Icon } from 'semantic-ui-react';

function MesFactures() {
    //const
    let [factureList, setFactureList] = useState([]);
    let camId = localStorage.getItem("InputCamion"); 
    
    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiCamionLink}/mf`, {
          tag: GConf.SystemTag,
          camId: camId,
        })
        .then(function (response) {
            let testTable = []
            response.data.map( (getData) => testTable.push([       
            _(<img className='rounded-circle' width="40px" src="https://system.anaslouma.tn/Assets/images/facture.jpg" alt="user-img" />),
            getData.F_ID,
            getData.C_Name,
            new Date(getData.Cre_Date).toLocaleDateString('en-US'),
            getData.Tota,
            _(<h6><a href={`mf/info/${getData.F_ID}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
            ],))
            setFactureList(testTable)
        })
        }, [])

    return ( <>
        <BackCard data={InputLinks.backCard.mf}/>
        <br />
        <div className='container-fluid'>
            <TableGrid tableData={factureList} columns={GConf.TableHead.facture} />
        </div>
        </> );
}

export default MesFactures;