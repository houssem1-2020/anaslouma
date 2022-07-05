import axios from 'axios';
import React, { useState } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';
import FrameForPrint from '../Assets/frameForPrint';
import usePrintFunction from '../Assets/Hooks/printFunction';

const InputDatCard = ({targetDate, setTargetDate, FetchTargetFactures,PrintFunction}) => {
    return(<>
        <div className='card card-body shadow-sm mb-2'>
            <h5>Entrer Une Periode   </h5>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.start}  onChange={(e) => setTargetDate({...targetDate, start: e.target.value })}/>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.end}  onChange={(e) => setTargetDate({...targetDate, end: e.target.value })}/>
            <div className='mt-3'>
                <Button  className='rounded-pill bg-system-btn' onClick={FetchTargetFactures} fluid><Icon name='search' /> Rechercher </Button>
            </div>
            <div className='mt-3'>
                <Button  className='rounded-pill btn-imprimer' onClick={(e) => PrintFunction('printResumer')} fluid><Icon name='print' /> Imprimer </Button>
            </div>
            
            
        </div>
    </>)
}

function ResumerFactures() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [factureList, setFactureList] = useState([])
    const [targetDate, setTargetDate] = useState({start: Today.toISOString().split('T')[0], end: Today.toISOString().split('T')[0]})


    /*#########################[Function ]##################################*/
    const FetchTargetFactures = () =>{
        axios.post(`${GConf.ApiLink}/facture/resumer`, {
            tag: GConf.SystemTag,
            targetDate: targetDate,
        })
        .then(function (response) {
            setFactureList(response.data)
            console.log(response.data)
        })
    }
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseInt(value) * facteur_p).toFixed(3) 
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId) }
    
    /*#########################[Card]##################################*/
    const FactureListCard = (props) =>{
        return(<>
                <div className='card shadow-sm p-2 mb-1 rounded-pill ps-4'>
                    <div className='row'>
                        <div className='col-1 align-self-center'>{props.dataF.PK}</div>
                        <div className='col-4 text-start align-self-center'> {props.dataF.C_Name }</div>
                        {/* <div className='col-2 align-self-center'>{props.dataF.F_ID}</div> */}
                        <div className='col align-self-center'>{new Date(props.dataF.Cre_Date).toLocaleDateString('en-US')}</div>
                        <div className='col align-self-center'>{CalculateTVA(props.dataF.Tota)}</div>
                        <div className='col align-self-center'>{(props.dataF.Tota - CalculateTVA(props.dataF.Tota)).toFixed(3)}</div>
                        <div className='col align-self-center'>{props.dataF.Tota}</div>
                    </div>
                </div>
        </>)
    }

    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.factureResumer} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-4'>
                <div className="mb-4 sticky-top" style={{top:'70px'}}>
                    <InputDatCard PrintFunction={PrintFunction} targetDate={targetDate} setTargetDate={setTargetDate} FetchTargetFactures={FetchTargetFactures} />
                </div>
            </div>
            <div className='col-12 col-lg-8'>
                <h5>Listes des Factures</h5>    
                    {factureList.map( (val) => <FactureListCard key={val.F_ID} dataF={val}/>)}
                <br />
                    
            </div>
        </div>
        <FrameForPrint frameId='printResumer' src={`/Pr/Stock/resumer/123456/${targetDate.start}/${targetDate.end}`} />
    </> );
}

export default ResumerFactures;