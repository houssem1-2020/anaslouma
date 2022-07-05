import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import SKLT from '../../AssetsM/usedSlk';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function CommandeInfo() {
    let {CID} = useParams()
    let [articleL, setArticleL] = useState([])
    let [commandeData, setCommandeD] = useState([])
    let [facturerData, setFacturerD] = useState([])
    const [loading , setLoading] = useState(false)
    const [btnState, setBtnState] = useState('')

    //Use Effects 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/commande/info`, {
            tag: GConf.SystemTag,
            cid: CID
          })
          .then(function (response) {
                setArticleL(JSON.parse(response.data[0].Articles))
                setCommandeD(response.data[0])
                setLoading(true)  
                setFacturerD({client: response.data[0].Client, de:'Sidi Bourouis', vers: response.data[0].Adress, jour: response.data[0].Date_Volu, totale: response.data[0].Totale , articles:JSON.parse(response.data[0].Articles)})    
                if(response.data[0].State != 'W'){setBtnState('disabled')}    
          })
    }, [])

    
    //function
    const handlePrint = () =>{
        document.getElementById('framed').contentWindow.window.print();
        console.log(CID)
    }
    const UpdateState = (stateBtn) =>{
        axios.post(`${GConf.ApiLink}/commande/controle`, {
            tag: GConf.SystemTag,
            cid: CID,
            state: stateBtn
          })
          .then(function (response) {
            setCommandeD({ ...commandeData, State: stateBtn}) 
            setBtnState('disabled')            
          })
    }

    //card
    const StateCard = ({ status }) => {
        const statusCard = React.useCallback(() => {
            switch(status) {
            case 'W': 
                return <div className="badge badge-pill bg-warning "> En Attent </div>;
                
            case 'A': 
                return <div className="badge badge-pill bg-success"> Acepteé </div>;
                
            case 'R': 
                return <div className="badge badge-pill bg-danger"> Refuseé </div>;

            default: 
                return <div className="badge badge-pill bg-secondary">Indefinie</div>;
            
            }
        }, [status]);
        
        return (
            <div className="container">
            {statusCard()}
            </div>
        );
    };

    return ( <>
        <BackCard data={InputLinks.backCard.mcInfo}/>
        <br />
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className='text-end'><StateCard status={commandeData.State} /></h2>
                    <h2 className='text-center'>Commande </h2> 
                    <div className='row'>
                        <div className='col-6'>
                            <div className='text-secondary'><b>CODE FACTURE : </b> {CID}</div>
                            <div className='text-secondary'><b>CLIENT: </b> {loading ? <NavLink  exact='true' to={`/S/cl/info/${commandeData.C_ID}`}> {commandeData.Client } </NavLink> : SKLT.BarreSkl } </div>
                        </div>
                        <div className='col-6'>
                            <div className='text-secondary'><b>Passé Le  : </b> {loading ?  new Date(commandeData.Date_Passe).toLocaleDateString('en-US') : SKLT.BarreSkl } </div>
                            <div className='text-secondary'><b>Voulu Le : </b> {loading ? new Date(commandeData.Date_Volu).toLocaleDateString('en-US')  : SKLT.BarreSkl } </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Artifcle</th>
                            <th scope="col">Designiation</th>
                            <th scope="col">Qté</th>
                            <th scope="col">PUHT</th>
                            <th scope="col">TVA</th>
                            <th scope="col">PUTTC</th>
                            <th scope="col">Prix Net</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ?  
                            <>
                            {articleL.map( (artData) => 
                                <tr key={artData.id}>
                                    <th scope="row">{artData.id}</th>
                                    <td>{artData.Name}</td>
                                    <td>{artData.Qte}</td>
                                    <td>{artData.Prix}</td>
                                    <td>0%</td>
                                    <td>{artData.Prix}</td>
                                    <td>{artData.PU}</td>
                                </tr>
                            )}
                            </>
                            : SKLT.FactureList }
                            
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <div className='row'>
                        <div className='col-lg-6'>
                        </div>
                        <div className='col-lg-6'>
                            <table className="table">

                                <tbody>
                                    <tr>
                                        <th scope="col">Totale hors tax:</th>
                                        <th scope="col"></th>
                                    </tr>
                                    <tr>
                                        <th scope="col">TVA: </th>
                                        <th scope="col"></th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Timbre:</th>
                                        <th scope="col">0.600 DT</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Net A Payee TTC:</th>
                                        <th scope="col">{commandeData.Totale}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card card-body shadow-sm mb-2'>
                        <h5>Controle</h5>
                        <div className='row mb-2'>
                            <div className='col-6'>
                                <Button  className={`rounded-pill ${btnState}`}  fluid onClick={ () => UpdateState('R')}><Icon name='edit outline' /> Anuulée</Button>
                            </div>
                            <div className='col-6'>
                                <Button  className={`rounded-pill ${btnState}`} fluid ><Icon name='edit outline' /> Modifier </Button>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <Button  className='rounded-pill'  fluid onClick={handlePrint}><Icon name='edit outline' /> Imprimer</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </> );
}

export default CommandeInfo;