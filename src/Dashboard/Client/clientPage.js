import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk'
import TableGrid from '../Assets/tableGrid';
import TableImage from '../Assets/tableImg';
import GoBtn from '../Assets/goBtn';

function ClientPage() {
    /*################[Variable]###############*/
    const  [clientList, setClientList] = useState([SKLT.TableSlt]); 

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.get(`${GConf.ApiLink}/client`)
        .then(function (response) {
            let testTable = []
            response.data.map( (getData) => testTable.push([
            _(<TableImage image='fourniss.png' />),
            getData.Name,
            getData.Code_Fiscale,
            getData.Phone,
            getData.Gouv,
            getData.Adress,
            _(<GoBtn link={`cl/info/${getData.C_ID}`} />)
            ],))
            setClientList(testTable)
        })
    }, [])
    
    /*################[Function]###############*/

    /*################[Card]###############*/

    return (<>
        <Fade>
            <SubNav dataForNav={GConf.SubNavs.client}/>
            <br />
            <TableGrid tableData={clientList} columns={GConf.TableHead.client} />
        </Fade>
    </>);
}

export default ClientPage;