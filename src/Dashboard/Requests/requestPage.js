import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import SubNav from '../Assets/subNav';
import GoBtn from '../Assets/goBtn';
import TableImage from '../Assets/tableImg';
import { toast } from 'react-toastify';



function RequestPage() {
    /*#########################[Const]##################################*/
    let [commandeList, setCommandeList] = useState([SKLT.TableSlt]); 

   /*#########################[UseEfeect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/commande`, {
           tag: GConf.SystemTag,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
            let commandeContainer = []
            response.data.map( (commandeDate) => commandeContainer.push([          
                _(<TableImage image='facture.jpg' />),
                commandeDate.C_ID,
                commandeDate.Client,
                new Date(commandeDate.Date_Passe).toLocaleDateString('en-US'),
                new Date(commandeDate.Date_Volu).toLocaleDateString('en-US'),
                commandeDate.Totale.toFixed(3),
                _(<StateCard status={commandeDate.State} />),
                _(<GoBtn link={`rq/info/${commandeDate.C_ID}`} />)
            ],))
            setCommandeList(commandeContainer)
          }
        })
    }, [])
    
    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': return <StateCard color='warning' text='En Attent' />;  
            case 'A': return <StateCard color='success' text='Acepteé' /> ;
            case 'R': return <StateCard color='danger' text='Refuseé' />;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
  
    return (<>
        <SubNav dataForNav={GConf.SubNavs.Commande} />
        <br />
        <Fade>
          <TableGrid tableData={commandeList} columns={GConf.TableHead.request} />
        </Fade>
    </>);
}

export default RequestPage;