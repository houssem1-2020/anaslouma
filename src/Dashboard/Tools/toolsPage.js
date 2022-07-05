import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-reveal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button, Divider, Form, Icon, Input, Select, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import useGetFamilleArticle from '../Assets/Hooks/fetchArticlesFamille';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import FrameForPrint from '../Assets/frameForPrint';
import usePrintFunction from '../Assets/Hooks/printFunction';

const Notes = ({noteD, setNoteD,noteList, AddNotes, DeleteNotes,NotesEndRef}) => {
    return(<>
    <div className="card card-body shadow-sm mb-4">
            <h5 className='mb-1'>Liste des Notes: </h5>
            <div style={{height:'200px', overflowX:'auto'}} className='m-2'>
                {
                    noteList.map((note) =>
                        <div className='card border-div mb-2 p-1 m-2' key={note.PK}>
                            <div className='row'>
                                <div className='col-10'>
                                    <div className='mb-0'><b>{note.Description}</b> </div>
                                    <small className='small'>{new Date(note.N_Date).toLocaleDateString('en-US')} - {note.N_Time}</small>
                                </div>
                                <div className='col-2 align-self-center'>
                                <Button icon="times" size='mini' className='rounded-pill text-white bg-danger'  onClick={() => DeleteNotes(note.PK)}></Button>
                                </div>
                            </div>
                            
                        </div>
                                  
                        
                    )
                }
                <div ref={NotesEndRef} />
            </div>
            
            <Form>
                <TextArea placeholder='Ajouter Notes ici' value={noteD} className="mb-2 rounded" rows='2' onChange={(e) => setNoteD(e.target.value)}/>
            </Form>
            <Button  className='rounded-pill'  fluid onClick={AddNotes}><Icon name='write' /> Ajouter </Button>
    </div>
    </>)
}
const Recette = ({recetteDate, setRecetteDate, PrintFunction, recette}) => {
    return(<>
            <div className="card card-body shadow-sm mb-4">
               <h2 className='text-danger'>Recette: <CountUp end={recette} decimals={3} decimal="," duration={2} /></h2> 
                <div className=''>
                        <h5 className='mb-1'>Imprimer La rectte d'un jour </h5>
                        <Input size='mini' fluid  type='date' className='mb-2' defaultValue={recetteDate.start} onChange={(e) => setRecetteDate({...recetteDate, start: e.target.value })} />
                        <Input size='mini' fluid  type='date'  className='mb-2' defaultValue={recetteDate.end} onChange={(e) => setRecetteDate({...recetteDate, end: e.target.value })}/>
                        <Button  className='rounded-pill' onClick={ (e) => PrintFunction('printrecette')} >  <Icon name='print' /> Imprimer</Button>
                    
                </div>
            </div>
    </>)
}

function ToolsPage() {
     /* ############################### Const ################################*/
    const NotesEndRef = useRef(0)
    const Today = new Date()
    const [noteList, setNoteList] = useState([])
    const [noteD, setNoteD] = useState('')
    const [printGenre, setPrintGenre] = useState('TOOLS')
    const [familles] = useGetFamilleArticle() 
    const [recette, setRecette] = useState()
    const [camPos, setCamPos] = useState([])
    const [recetteDate, setRecetteDate] = useState({start:Today.toISOString().split('T')[0], end:Today.toISOString().split('T')[0]})
    const [statis, setStatis] = useState({MMQte: 0 , ENREPT: 0 , MMF:0, TopClient:'',TopClientNum:'' })
    const [printValues, setPrintVal] = useState({pPrix:'96968', pGateg:'', pRecette:''})
    L.Icon.Default.mergeOptions({
        iconUrl: require('leaflet/dist/images/position.gif'),
        iconSize: [10,10],
        shadowSize: [0,0],
        shadowUrl: '',
         shadowSize:   [0,0],
         iconAnchor:   [0,0],
         shadowAnchor: [0,0],
         popupAnchor:  [0,0]
    });

     /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/tools`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            setRecette(response.data[0].Recette)
            setCamPos(response.data[0].CamionPos)
            setNoteList(response.data[0].Notes)
            setStatis({MMQte: response.data[0].MMQte, ENREPT: response.data[0].ENREPT.ENREPT, MMF:response.data[0].MMF, TopClient:response.data[0].TopClient.C_Name,TopClientNum:response.data[0].TopClientNum.C_Name})
        })
    }, [])
    
     /* ############################### Function ################################*/
    const AddNotes = () =>{
        axios.post(`${GConf.ApiLink}/tools/note/ajouter`, {
            tag: GConf.SystemTag,
            noteD: noteD
        })
        .then(function (response) {
            console.log(response.data)
            setNoteD('')
        })
    }
    const DeleteNotes = (PK) =>{
        axios.post(`${GConf.ApiLink}/tools/note/supprimer`, {
            tag: GConf.SystemTag,
            noteID: PK
        })
        .then(function (response) {
            toast.success("Done !", GConf.TostSuucessGonf)
        })
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}

    /* ############################### Card ################################*/
    const Map = () => {
        return(<>
        <div className="card card-body shadow-sm mb-4">
            <MapContainer center={[36.17720,9.12337]} zoom={8} scrollWheelZoom={false} className="map-height">
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {camPos.map( (cord) => <Marker key={cord.PK} position={[cord.lat, cord.lng]}> <Popup>{cord.Camion_ID}</Popup></Marker> )}
            </MapContainer> 
        </div>
        </>)
    }
    const Imprimer = () => {
        return(<>
            <div className="card card-body shadow-sm mb-4">
                <h5 className='mb-1'>Liste des prix: </h5>
                <Select placeholder='Select your country' options={familles} value={printGenre} onChange={ (e, data) => setPrintGenre(data.value)} className='w-100 shadow-sm rounded mb-3'  />
                <Button  className='rounded-pill'  fluid onClick={ (e) => PrintFunction('printPrix')}><Icon name='print' /> Imprimer </Button>
            </div>
            <div className="card card-body shadow-sm mb-4">
                <h5 className='mb-1'>Imprimer Le Stock: </h5>
                <Select placeholder='Select your country' options={familles} value={printGenre} onChange={ (e, data) => setPrintGenre(data.value)} className='w-100 shadow-sm rounded mb-3'  />
                <Button  className='rounded-pill'  fluid onClick={ (e) => PrintFunction('printStock')}><Icon name='print' /> Imprimer </Button>
            </div>
            <div className="card card-body shadow-sm mb-4">
                <h5 className='mb-1'>Imprimer Le Stock Par Gategorie: </h5>
                <Select placeholder='Select your country' options={familles}  value={printGenre} onChange={ (e, data) => setPrintGenre(data.value)} className='w-100 shadow-sm rounded mb-3'  />
                <Button  className='rounded-pill'  fluid onClick={ (e) => PrintFunction('printStock')}><Icon name='print' /> Imprimer </Button>
            </div>
            
        </>)
    }
    const Charts = () => {
        return(<>
            <div className="mb-4">
                
                <Divider horizontal><small className='text-danger'> <b> Stock </b> </small></Divider>
                <div>Plus Huat Quntité : {statis.MMQte.MAXF}</div>
                <div>Plus bas Quntité : {statis.MMQte.MINF}</div>
                <div>En Reptures : {statis.ENREPT}</div>
                <div>Familles :  {familles.length}</div>
            </div>
            <div className="mb-4">
                <Divider horizontal><small className='text-danger'>  <b> Facture </b> </small></Divider>
                <div>Plus Huat Facture : {statis.MMF.MAXF}</div>
                <div>Plus bas Facture : {statis.MMF.MINF}</div>
            </div>
            <div className="mb-4">
                <Divider  horizontal><small className='text-danger'>  <b> Camions </b></small></Divider>
                <div>Plus Huat Recette : {0.000}</div>
                <div>Plus bas Recette : {0.000}</div>
                <div>Plus Huat Fond : {0.000}</div>
                <div>Plus bas Fond : {0.000}</div>
                <div>Plus Huat Facture : {0.000}</div>
                <div>Plus bas Facture : {0.000}</div>
            </div>
            <div className="mb-4">
                <Divider horizontal><small className='text-danger'>  <b> Client </b></small></Divider>
                <div>Top F. Totale : {statis.TopClient} </div>
                <div>Top F. Number : {statis.TopClientNum}</div>
            </div>
        </>)
    }

    return ( <>
        <Fade>
           <div className='row'>
                <div className='col-12 col-lg-3'>
                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                        <h5>Statistiques </h5>
                        <Charts />
                    </div>
                </div> 
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                            <h5>Recette</h5>
                            <Recette recetteDate={recetteDate} setRecetteDate={setRecetteDate} PrintFunction={PrintFunction} recette={recette} />
                            <h5>notes</h5>
                            <Notes NotesEndRef={NotesEndRef} noteD={noteD} setNoteD={setNoteD} noteList={noteList} AddNotes={AddNotes} DeleteNotes={DeleteNotes} />
                    </div>

                </div> 
                <div className='col-12 col-lg-4'>
                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                            <h5> Imprimer </h5>
                            <Imprimer />

                    </div>
                </div> 
            </div> 
            
        </Fade>
        <FrameForPrint frameId='printrecette' src={`/Pr/recette/${recetteDate.start}/${recetteDate.end}`} />
        <FrameForPrint frameId='printPrix' src={`/Pr/tools/print/prix/${printGenre}`} />
        <FrameForPrint frameId='printStock' src={`/Pr/tools/print/stock/${printGenre}`} />
        </> );
}

export default ToolsPage;