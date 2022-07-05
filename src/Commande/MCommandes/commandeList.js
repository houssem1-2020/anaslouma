import React, { useEffect, useState } from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import TableGrid from '../../Dashboard/Assets/tableGrid';
import { _ } from "gridjs-react";
import GConf from '../../AssetsM/generalConf';
import axios from 'axios';
import { Button,  Icon } from 'semantic-ui-react';

function CommandeRecentList() {
    //const
    let [tableData, setTableData] = useState([]);
    let UID = localStorage.getItem("InputCommande"); 
    
    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiCommandeLink}/mescommandes`, {
          tag: GConf.SystemTag,
          UID: UID,
        })
        .then(function (response) {
            let testTable = []
            response.data.map( (getData) => testTable.push([
                    
            _(<img className='rounded-circle' width="40px" src="https://system.anaslouma.tn/Assets/images/facture.jpg" alt="user-img" />),
            getData.C_ID,
            getData.Client,
            new Date(getData.Date_Passe).toLocaleDateString('en-US'),
            new Date(getData.Date_Volu).toLocaleDateString('en-US'),
            getData.Totale.toFixed(3),
            _(<StateCard status={getData.State} />),
            _(<h6><a href={`mc/info/${getData.C_ID}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
            ],))
            setTableData(testTable)
        })
        }, [])
        
    //card
    const StateCard = ({ status }) => {
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': 
              return <span className="badge bg-warning "> En Attent </span>;
            
            case 'A': 
              return <span className="badge bg-success"> Acepteé </span>;
            
            case 'R': 
              return <span className="badge bg-danger"> Refuseé </span>;

            default: 
              return <span className="badge bg-secondary">Indefinie</span>;
            
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
      };

    return ( <>
        <BackCard data={InputLinks.backCard.mc}/>
        <br />
        <div className='container-fluid'>
            <TableGrid tableData={tableData} columns={GConf.TableHead.request} />
        </div>
        </> );
}

export default CommandeRecentList