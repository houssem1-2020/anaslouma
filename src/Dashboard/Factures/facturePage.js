import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import TableImage from '../Assets/tableImg';
import GoBtn from '../Assets/goBtn';

function FacturePage() {
    /*#########################[Const]##################################*/
    const [facturesList, setFactureList] = useState([SKLT.TableSlt]); 

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/facture`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='facture.jpg' />),
            getData.F_ID,
            getData.C_Name,
            new Date(getData.Cre_Date).toLocaleDateString('en-US'),
            getData.Tota,
            _(<SDF state={getData.SDF} />),
            _(<GoBtn link={`ft/info/${getData.F_ID}`} />)
            ],))
            setFactureList(factureListContainer)
        })
    }, [])
    
    /*#########################[Card]##################################*/
    const SDF = (props)=>{
      return(<>
         <div className='text-center'><span className={`bi bi-${props.state == "true" ? 'check-circle-fill text-success': 'x-circle-fill text-danger'}`}></span> </div>
      </>)
    }

    return (<>
        <Fade>
            <SubNav dataForNav={GConf.SubNavs.facture}/>
            <br />
            <TableGrid tableData={facturesList} columns={GConf.TableHead.facture} />
        </Fade>
    </>);
}

export default FacturePage;