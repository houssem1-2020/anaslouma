import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { NavLink, useParams } from 'react-router-dom';
import { Button,  Icon} from 'semantic-ui-react';
import SKLT from '../../AssetsM/usedSlk';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import { toast } from 'react-toastify';
import FrameForPrint from '../Assets/frameForPrint';
import usePrintFunction from '../Assets/Hooks/printFunction';

function FactureInfo() {
    /*#########################[Const]##################################*/
    const {FID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])
    const [loading , setLoading] = useState(false)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])
    

    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/facture/select`, {
            tag: GConf.SystemTag,
            fid: FID
          })
          .then(function (response) {
                if(!response.data[0]) {
                    toast.error('Facture Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/ft"; }, 2000)
                    
                } else {
                    setArticleL(JSON.parse(response.data[0].Articles))
                    let UsedTableNow = []
                    JSON.parse(response.data[0].Articles).map( (article) => {UsedTableNow.push([article.A_Code, article.Qte ])} )
                    setTUpList(UsedTableNow)
                    setFactData(response.data[0])
                    setLoading(true)
                    if(response.data[0].SDF == 'true'){setStockState(true)}
                }
                

                
          })
    }, [])

    /*#########################[Function]##################################*/
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    const UpdateStock = () =>{
        axios.post(`${GConf.ApiLink}/stock/bs`, {
            tag: GConf.SystemTag,
            artList: toUpdatedList,
          })
          .then(function (response) {      
            if(response.data.affectedRows) {
                axios.post(`${GConf.ApiLink}/facture/us`, { tag: GConf.SystemTag,  fid: FID })
                toast.success("Stock Modifier !", GConf.TostSuucessGonf)
                setStockState(true)
                setFactData({ ...factureData, SDF: 'true'})
            }
            else{
                toast.error('Erreur Indéfine ', GConf.TostSuucessGonf)
            }
          })

    }
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseInt(value) * facteur_p).toFixed(3) 
    }

    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'false': return <StateCard color='danger' text='Stock Non Regleé' />;  
            case 'true': return <StateCard color='success' text='Stock Regleé' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    }
    const FactureHeader = () =>{
        return(<>
                <h2 className='text-center'>Facture Client </h2> 
                <br />
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-danger'><b>STE ANASLOUMA DISTRUBUTION</b></div>
                        <div className='text-secondary'><b>VILLE: </b> SIDI BOUROUIS</div>
                        <div className='text-secondary'><b>MATRICULE F : </b> 1670146/D</div>
                        <div className='text-secondary'><b>TEL : </b> 97913068</div>
                        <div className='text-secondary'><b>FAX : </b> 78898081</div>
                    </div>
                    <div className='col-6'>
                        <div className='text-secondary'><b>CODE FACTURE : </b> {FID}</div>
                        <div className='text-secondary'><b>CLIENT: </b> {loading ? <NavLink  exact='true' to={`/S/cl/info/${factureData.C_Name}`}> {factureData.C_Name } </NavLink>  : SKLT.BarreSkl }</div>
                    </div>
                </div>
        </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Nette & Totale </h5>
                    <div>Totale hors tax: {loading ? CalculateTVA(factureData.Tota) : SKLT.BarreSkl }</div>
                    <div>TVA: {loading ? (factureData.Tota - CalculateTVA(factureData.Tota)).toFixed(3) : SKLT.BarreSkl }</div>
                    <div>Timbre: 0.600 DT</div>
                    <div className='text-danger'><b>Net A Payee TTC: {loading ? (parseInt(factureData.Tota) + 0.600).toFixed(3) : SKLT.BarreSkl } </b></div>
                </div>
        </>)
    }
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Controle</h5>
                    <div className='row mb-2'>
                    <div className='col-6'>
                        <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printFacture')}><Icon name='edit outline' /> Imprimer</Button>
                    </div>
                    <div className='col-6'>
                            <Button as='a' href={`/S/ft/modifier/${FID}`} animated disabled={stockState} className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                    </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <Button  className='rounded-pill btn-danger'  fluid><Icon name='edit outline' /> Supprimer</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-regler'  fluid disabled={stockState} onClick={UpdateStock}><Icon name='edit outline' /> R. Stock</Button>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-imprimer'  fluid onClick={(e) => PrintFunction('printBl')} ><Icon name='edit outline' /> BL</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-imprimer'  fluid onClick={(e) => PrintFunction('printBs')}><Icon name='edit outline' /> BS</Button>
                        </div>
                    </div>
                </div>
        </>)
    }

    return ( <> 
        <BreadCrumb links={GConf.BreadCrumb.factureInfo} />
        <br />
        <div className="row">
            <div className="col-12 col-lg-8">
                <h2 className='text-end'><StateCard status={factureData.SDF} /></h2>
                <FactureHeader />
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
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
                                <td>{CalculateTVA(artData.Prix)}</td>
                                <td>{GConf.DefaultTva} %</td>
                                <td>{artData.Prix.toFixed(3)}</td>
                                <td>{artData.PU}</td>
                            </tr>
                        )}
                        
                        </>
                        : SKLT.FactureList }                        
                        
                    </tbody>
                </table>
            </div>
            <div className="col-12 col-lg-4">
            <Bounce bottom>
                <div className="sticky-top" style={{top:'70px'}}>
                    <TotaleCard />
                    <BtnsCard />
                </div>
            </Bounce>
            </div>
        </div>
        <FrameForPrint frameId='printFacture' src={`/Pr/facture/${FID}`} />
        <FrameForPrint frameId='printBl' src={`/Pr/bonL/${FID}`} />
        <FrameForPrint frameId='printBs' src={`/Pr/bonS/${FID}`} />
    </> );
}

export default FactureInfo;