import React, { useEffect, useState } from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import { Button, Icon } from 'semantic-ui-react';
import TableGrid from '../../Dashboard/Assets/tableGrid';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import {Grid, _ } from "gridjs-react";


function ArticleList() {
    let [tableData, setTableData] = useState([]); 

  useEffect(() => {
    axios.post(`${GConf.ApiCommandeLink}/stock`, {
        tag: GConf.SystemTag,
        genre : '1'
      })
      .then(function (response) {
         let testTable = []
        response.data.map( (getData) => testTable.push([
                 
        //  _(<TableRow code={getData.A_Code} name={getData.Name}/>),
        _(<img className='rounded-circle' width="40px" src={`https://anaslouma.tn/Assets/images/Articles_Images/alimentaire/${getData.Photo_Path}`} alt="user-img" />),
        getData.A_Code,
        getData.Name,
         getData.Genre,
         getData.Prix_vente,
         getData.Quantite,
         _(<h6><a href={`info/${getData.A_Code}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
        ],))
        setTableData(testTable)
      })
    }, [])

    return ( <>
        <BackCard data={InputLinks.backCard.cgList}/>
       
        <br />
        <div className='container-fluid'>
            <TableGrid tableData={tableData} columns={GConf.TableHead.stock} />
        </div>
        </> );
}

export default ArticleList