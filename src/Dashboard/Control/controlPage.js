import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import GoBtn from '../Assets/goBtn';
import TableImage from '../Assets/tableImg';


function ControlPage() {
  /*#########################[Const]##################################*/
  let [camionList, setCamionList] = useState([ SKLT.TableSlt ]); 

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/camions`, {
        tag: GConf.SystemTag,
      })
      .then(function (response) {
         let testTable = []
        response.data.map( (getData) => testTable.push([
         _(<TableImage image='camion.jpg' />),
         getData.Cam_Name,
         getData.Matricule,
         getData.Chauffeur,
         getData.Fond,
         getData.Recette,
         _(<GoBtn link={`cm/info/${getData.Cam_ID}`} />)
        ],))
        setCamionList(testTable)
      })
    }, [])
    

    return ( <>
          <Fade>
            <SubNav dataForNav={GConf.SubNavs.camion} />
              <br />
              <TableGrid tableData={camionList} columns={GConf.TableHead.camion} />
          </Fade>
    </> );
}

export default ControlPage;