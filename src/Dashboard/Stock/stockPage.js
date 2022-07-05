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
import { toast } from 'react-toastify';
function StockPage() {

    /*#########################[Const]##################################*/
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/stock`, {
          tag: GConf.SystemTag,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
            let articleListContainer = []
              response.data.map( (getData) => articleListContainer.push([
                _(<TableImage image={getData.Photo_Path} forStock/>),
                getData.A_Code,
                getData.Name,
                getData.Genre,
                getData.Quantite,
                getData.Prix_achat.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _(<GoBtn link={`sk/info/${getData.A_Code}`} />)
              ],))
              setArticleList(articleListContainer) 
          }
        })
    }, [])

    return (<>
              <SubNav dataForNav={GConf.SubNavs.Stock} />
              <br />
              {/* Lazem tet7at linna beach ma tehlekch el dropdowm menu  */}
              <Fade> 
                <TableGrid tableData={articleList} columns={GConf.TableHead.stock} />
              </Fade>    
        </>);
}

export default StockPage;