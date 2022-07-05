import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import { Button, Divider, Header, Icon, Input, Statistic } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Tab } from 'semantic-ui-react';
import CountUp from 'react-countup';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { _ } from "gridjs-react";
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';

const EditClientCard = ({clientD, setClientD, EditClient}) =>{
    return(<>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'>Matricule Fiscale:</h5>
                <Input icon='key' iconPosition='left' placeholder='Matricule Fiscale' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Code_Fiscale}  onChange={(e) => setClientD({...clientD, Code_Fiscale: e.target.value })}/>
                </div>
                <div className='p-1  mb-2'>
                <h5 className='mb-1'>Nom Et Prenon :</h5>
                <Input icon='user' iconPosition='left' placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Name} onChange={(e) => setClientD({...clientD, Name: e.target.value })} />
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'>Telephone :</h5>
                <Input icon='phone' iconPosition='left' placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Phone} onChange={(e) => setClientD({...clientD, Phone: e.target.value })} />
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'> Nom Sociale:</h5>
                <Input icon='home' iconPosition='left' placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Code_Fiscale} onChange={(e) => setClientD({...clientD, Name: e.target.value })}/>
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'> Map:</h5>
                
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'> Adresse:</h5>
                
            </div>
            <div className='text-end mb-5'>
                <Button  onClick={EditClient}  className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer </Button>
            </div>
    </>)
}

function ClientInfo() {
     /* ############################### Const ################################*/
    const {CLID} = useParams()
    const [clientD, setClientD] = useState([])
    const [position, setPosition] = useState([36.17720,9.12337])
    const [commande, setCommande] = useState([])
    const [factures, setFactures] = useState([])
    const [factureCamion, setFactureCamion] = useState([])
    const [factureCamionStat, setFactureCamionStat] = useState({})
    const [loading , setLoading] = useState(false)
    const [dataBarFactureDepo, setDataBarFC]= useState([])
    const [dataBarFacture, setDataBarFD]= useState([])
    const [dataBarCommandes, setDataBarFCMD]= useState([])
    const panes = [
        {
            menuItem: { key: 'suivie', icon: 'chart pie', content: 'Resumer' }, 
            render: () =><><Tab.Pane attached={false}><ResumerCard /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'commande', icon: 'calendar alternate', content: 'Commandes' }, 
            render: () =><Tab.Pane attached={false}><Commandes /></Tab.Pane>,
        },
        {
            menuItem: { key: 'home', icon: 'home', content: 'F. Depo' }, 
            render: () => <><Tab.Pane attached={false}><Factures /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'truck', icon: 'truck', content: 'F. Camion' }, 
            render: () => <><Tab.Pane attached={false}><FactureCamion /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditClientCard clientD={clientD} setClientD={setClientD} EditClient={EditClient}/></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteClient /></Tab.Pane><br /></>,
        },
    ]
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );

     /* ############################### UseEffect ################################*/
    useEffect(() => {
        //client Info
        axios.post(`${GConf.ApiLink}/client/info`, {
            tag: GConf.SystemTag,
            clientId : CLID
        })
        .then(function (response) {
            setClientD(response.data[0])
            setPosition([response.data[0].Lat,response.data[0].Lng])
            setLoading(true)
            //commandes
            let commandeTable = []
            response.data[0].Commandes.map( (getDataC) => commandeTable.push([ getDataC.C_ID, new Date(getDataC.Date_Passe).toLocaleDateString('en-US') , new Date(getDataC.Date_Volu).toLocaleDateString('en-US') , getDataC.Totale.toFixed(3), getDataC.State,
                _(<h6><a href={`/S/rq/info/${getDataC.C_ID}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
            ],))
            setCommande(commandeTable)
            //
            let commandeChart = []
            response.data[0].Commandes.map((data) => commandeChart.push({ name: data.Date_Passe, value: data.Totale.toFixed(3) }))
            setDataBarFCMD(commandeChart)

            //factures
            let factureTable = []
            response.data[0].Facture.map( (getDataF) => factureTable.push([ getDataF.F_ID, getDataF.C_Name, new Date(getDataF.Cre_Date).toLocaleDateString('en-US'), getDataF.Tota,
            _(<h6><a href={`/S/ft/info/${getDataF.F_ID}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
            ],))
            setFactures(factureTable)
            //
            let factureDepoChart = []
            response.data[0].Facture.map((data) => factureDepoChart.push({ name: data.Cre_Date, value: data.Tota }))
            setDataBarFD(factureDepoChart)
            

            //factureCamion
            let factureCamionTable = []
            response.data[0].FactureCamion.map( (getDataFC) => factureCamionTable.push([ getDataFC.F_ID, getDataFC.C_Name, new Date(getDataFC.Cre_Date).toLocaleDateString('en-US'), getDataFC.Tota,
            _(<h6><a href={`/S/cm/info/facture/${getDataFC.Camion}/${getDataFC.F_ID}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
            ],))
            setFactureCamion(factureCamionTable)
            //
            let factureCamionChart = []
            response.data[0].FactureCamion.map((data) => factureCamionChart.push({ name: data.Cre_Date, value: data.Tota }))
            setDataBarFC(factureCamionChart)

            //start H & L
            const highestFactureCamion = factureCamionTable.sort((a, b) => b[3] - a[3])[0][3]
            const LowestFactureCamion = factureCamionTable.sort((a, b) => b[3] - a[3])[factureCamionTable.length -1][3]
            setFactureCamionStat({H:highestFactureCamion,L:LowestFactureCamion})

        })

    }, [])


     /* ############################### Functions ################################*/
    const EditClient = () =>{
        console.log(clientD)
    }


    /* ############################### Card ################################*/
    const ResumerCard = () =>{
        

        const StatCard = (props) =>{
            return(<Statistic>
                <Statistic.Value><CountUp end={props.value} /></Statistic.Value>
                <Statistic.Label>{props.text}</Statistic.Label>
            </Statistic>)
        }
        return(<>
                <div className='row'>
                    <div className='col-4 align-self-center text-center'>
                        <StatCard text='Commandes' value={commande.length}/>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        <StatCard text='F.Depo' value={factures.length}/>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        <StatCard text='F.Camion' value={factureCamion.length}/>
                    </div>
                </div>
                <Divider horizontal className='mt-5 mb-4'>
                        <Header as='h6'>
                            Factures Camion
                        </Header>
                    </Divider>
                <div className='row mb-4'>
                   <div className='col-6'><BarCht dataBar={dataBarFactureDepo}/></div> 
                   <div className='col-6'><BarCht dataBar={dataBarFacture}/></div> 
                </div>
                <div className='row'>
                   <div className='col-6'><BarCht dataBar={dataBarCommandes}/></div> 
                   <div className='col-6'><BarCht dataBar={dataBarFacture}/></div>                    
                </div>

                </>)
    }
    const ArticleCard = () =>{
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container">
                            <img src="https://system.anaslouma.tn/Assets/images/fourniss.png" className="rounded-circle" width="80" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? clientD.Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-geo-alt-fill"></span> { clientD.Adress } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-geo-fill"></span> { clientD.Gouv } </>: SKLT.BarreSkl } </h6>
                            <Divider horizontal className='text-secondary mt-4'>Matricule.F</Divider>
                            <div className='row text-center'>
                                <div className='col-12'>    
                                    {loading ?  
                                        <Statistic color='red' size='tiny'>
                                            <Statistic.Value>
                                                {clientD.Code_Fiscale} 
                                            </Statistic.Value>
                                        </Statistic>
                                    : SKLT.BarreSkl }  
                                    
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Telephone</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'> 
                                    {loading ?  
                                        <Statistic color='green' size='tiny'>
                                            <Statistic.Value>
                                                {clientD.Phone} 
                                            </Statistic.Value>
                                        </Statistic>
                                    : SKLT.BarreSkl }   
                                </div>
                                
                        </div>
                    </div>
                </div>
                <div className='card card-body shadow-sm  border-div mb-4'>
                        <h5>Location</h5>
                        <MapContainer center={position} zoom={9} scrollWheelZoom={false} className="map-height">
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    
                                </Popup>
                            </Marker>
                        </MapContainer> 
                </div>
            </div>
        </>);
    }
    const Commandes = () =>{
        return(<>
                 <TableGrid tableData={commande} columns={GConf.TableHead.clientCommande} />
        </>)
    }
    const Factures = () =>{
        return(<>
            <TableGrid tableData={factures} columns={GConf.TableHead.clientFacture} />
        </>)
    }
    const FactureCamion = () =>{
        return(<>
                <TableGrid tableData={factureCamion} columns={GConf.TableHead.clientFactureC} />
        </>)
    }
    const DeleteClient= () =>{
        return(<><h3 class="text-secondary">Voulez-Vous Vraimment Supprimer Ce Camion ?</h3> 
        <h5 class="text-danger text-left"><b>Lorsque Vous Supprimer Le Camion : </b></h5>
        <ul class="text-info text-left">
        <li>L'article ne sera pas visible dans la branche 'Stock'</li>
        <li>Tous les article avec son code a barre se suppriment </li>
        <li>L'article Soit visible seulemment dans les facture  </li>
        </ul>
        <div className='text-end'>
            <button type="submit" name="add" class="btn btn-danger rounded-pill" ><span class="bi bi-check"></span> Oui, Supprimer</button>
        </div></>)
    }
    const BarCht = (props) => {

        return (<>
        <ResponsiveContainer  height={150} >
            <BarChart width={600} height={40}  data={props.dataBar} >
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value"  fill={GConf.themeColor}  barSize={15}  radius={[10, 10, 0, 0]} />
                <XAxis  hide />
                <YAxis domain={[0, (Math.max(...props.dataBar.map(o => o.value)) + 10)]} hide   />
            </BarChart>
        </ResponsiveContainer>
        </>)
    }
    return ( <> 
         <BreadCrumb links={GConf.BreadCrumb.ClientInfo} />
         <br />
        <div className="row">
                <div className="col-12 col-lg-4">
                    <ArticleCard /> 
                </div>
                <div className="col-12 col-lg-8">
                     <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                </div>
        </div>
     </> );
}

export default ClientInfo;