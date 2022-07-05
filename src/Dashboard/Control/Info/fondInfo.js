import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { useParams } from 'react-router-dom';
import { Button, Icon, Input } from 'semantic-ui-react';
import SKLT from '../../../AssetsM/usedSlk';
import GConf from '../../../AssetsM/generalConf';
import BreadCrumb from '../../Assets/breadCrumb'
import usePrintFunction from '../../Assets/Hooks/printFunction';
import FrameForPrint from '../../Assets/frameForPrint';
import { toast } from 'react-toastify';

function CamionFondInfo() {
    /* ############################### Const ################################*/
    const {FondID,CID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [fondData, setFondDat] = useState([])
    const [editBtnState , setEditBtnState] = useState(false)
    const [fixDepoStock ,setFDS]= useState([]);
    const [fixCamionStock, setSCF ]= useState([]); 
    const [btnSDFState, setSDFBtnS] = useState(false); 
    const [btnSCFState, setSCFBtnS] = useState(false); 
    const [loading , setLoading] = useState(false)
   
   
   /* ############################### Use Effect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion/fond`, {
            tag: GConf.SystemTag,
            fondID: FondID
          })
          .then(function (response) {
                setArticleL(JSON.parse(response.data[0].Articles))
                console.log(response.data[0].Articles)
                setFondDat(response.data[0])
                setLoading(true)  
                //update SDF
                JSON.parse(response.data[0].Articles).map( (sdf) => 
                fixDepoStock.push([sdf.A_Code, parseInt(sdf.QteAjoute)]))
            
                //update SCF
                JSON.parse(response.data[0].Articles).map( (scf) =>
                fixCamionStock.push([parseInt(scf.A_Code) + parseInt(CID) ,scf.A_Code, parseInt(scf.QteAjoute * scf.Groupage)]))        

                if(response.data[0].SDF === 'true'){setSDFBtnS(true); setEditBtnState(true)}
                if(response.data[0].SCF === 'true'){setSCFBtnS(true); setEditBtnState(true)}
            })    
    }, [])

   /* ############################### Functions ################################*/
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}   
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseInt(value) * facteur_p).toFixed(3) 
    }
    const UpdateStockDepo = (e, { value }) =>{
        
        axios.post(`${GConf.ApiLink}/stock/bs`, {
            tag: GConf.SystemTag,
            artList: fixDepoStock,
          })
          .then(function (response) {      
            if(response.data.affectedRows) {
                axios.post(`${GConf.ApiLink}/camion/fond/us`, { tag: GConf.SystemTag,  bonId: FondID , state:'SDF'})
                toast.success("Stock Modifier !", GConf.TostSuucessGonf)
                setSDFBtnS(true)
                setEditBtnState(true)
                
            }
            else{
                toast.error('Erreur Indéfine ', GConf.TostSuucessGonf)
            }
          })

    }
    const UpdateStockCamion = (e, { value }) =>{
        
        axios.post(`${GConf.ApiLink}/camion/stock/update`, {
            tag: GConf.SystemTag,
            camion : CID,
            artList: fixCamionStock,
          })
          .then(function (response) {      
            if(response.data) {
                axios.post(`${GConf.ApiLink}/camion/fond/us`, { tag: GConf.SystemTag,  bonId: FondID , state:'SCF'})
                toast.success("Stock Modifier !", GConf.TostSuucessGonf)
                setSCFBtnS(true)
                setEditBtnState(true)
            }
            else{
                toast.error('Erreur Indéfine ', GConf.TostSuucessGonf)
            }
          })

    }

    /* ############################### Card ################################*/
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Nette & Totale </h5>
                    <div>Totale hors tax: {loading ? CalculateTVA(fondData.Totale) : SKLT.BarreSkl }</div>
                    <div>TVA: {loading ? (fondData.Totale - CalculateTVA(fondData.Totale)).toFixed(3) : SKLT.BarreSkl }</div>
                    <div>Timbre: 0.600 DT</div>
                    <div className='text-danger'><b>Net A Payee TTC: {loading ? (parseInt(fondData.Totale) + 0.600).toFixed(3) : SKLT.BarreSkl } </b></div>
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
                            <Button as='a' href={`/S/cm/modifier-f/${FondID}`} animated disabled={editBtnState} className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                    </div>
                    </div>
                    <div className='row mb-2'>
                    <div className='col-6'>
                            <Button  className='rounded-pill  btn-regler'  fluid disabled={btnSDFState} onClick={UpdateStockDepo}><Icon name='edit outline' /> R.S. Depo</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-regler'  fluid disabled={btnSCFState} onClick={UpdateStockCamion}><Icon name='edit outline' /> R.S. Camion</Button>
                        </div>
                    </div>
                    <div className='row mb-2 d-none'>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-imprimer'  fluid onClick={(e) => PrintFunction('printBl')} ><Icon name='edit outline' /> BL</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-imprimer'  fluid onClick={(e) => PrintFunction('printBs')}><Icon name='edit outline' /> BS</Button>
                        </div>
                    </div>
                </div>
                bl & bs ici 
        </>)
    }
    const PrintBSBL = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Bond de sortie </h5>
                    <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={fondData.jour} onChange={(e) => setFondDat({...fondData, jour: e.target.value })}/>
                    <Input icon='user' size="small" iconPosition='left' placeholder='Chauffeur '  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-6'><Input icon='map marker' size="small" iconPosition='left' placeholder='De'  fluid className='mb-1'  value={fondData.de}  onChange={(e) => setFondDat({...fondData, de: e.target.value })}/></div>
                        <div className='col-6'><Input icon='map marker alternate' size="small" iconPosition='left' placeholder='Vers'  fluid className='mb-1' value={fondData.vers}  onChange={(e) => setFondDat({...fondData, vers: e.target.value })}/></div>
                    </div>
                    <div className='row mb-1 mt-3'>
                        <div className='col-6'>
                            <Button  className='rounded-pill' size='small' fluid><Icon name='check' /> Confirmer </Button>
                        </div>
                        <div className='col'>
                            <Button  className='rounded-pill btn-imprimer' size='small' fluid><Icon name='print' /> BL</Button>
                        </div>
                        <div className='col'>
                            <Button  className='rounded-pill btn-imprimer' size='small' fluid> <Icon name='print' />BS</Button>
                        </div>
                    </div>
                </div>
        </>)
    }
    return ( <> 
        <BreadCrumb links={GConf.BreadCrumb.CamionFondInfo} />
        <br />
        <div className="row">
            <div className="col-12 col-lg-8">
                <h2 className='text-center'>Bon de Fond </h2> 
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Designiation</th>
                        <th scope="col">Qté [K]</th>
                        <th scope="col">Qté [P]</th>
                        <th scope="col">PU [K]</th>
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
                                <td>{artData.QteAjoute}</td>
                                <td>{artData.QteAjoute * artData.Groupage } </td>
                                <td>{artData.Prix_vente.toFixed(3)}</td>
                                <td>{(artData.Prix_vente * artData.QteAjoute).toFixed(3)}</td>
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
                    <PrintBSBL />      
                </div>
            </Bounce>
            </div>
        </div>
        <FrameForPrint frameId='printFacture' src={`/Pr/facture/${FondID}`} />
    </> );
}

export default CamionFondInfo;