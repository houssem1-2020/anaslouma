import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useGetFamilleArticle from '../Assets/Hooks/fetchArticlesFamille';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/usedSlk';
import usePrintFunction from '../Assets/Hooks/printFunction';
import FrameForPrint from '../Assets/frameForPrint';



const EditArticle = ({articleD, setArticleD, checkPrixCompatiblite, familles, EditArticleFunction,loaderState,updateQte}) =>{
    return(<>

                <h5 className='mb-1'>Code à barre:</h5>
                <Input icon='barcode' disabled iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.A_Code} onChange={(e) => setArticleD({...articleD, A_Code: e.target.value })} />
                <div className='row'>
                        <div className='col-12 col-lg-10'>
                            <h5 className='mb-1'>Nom: </h5>
                            <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Name} onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                        </div>
                        <div className='col-12 col-lg-2'>
                            <h5 className='mb-1'>Groupage:</h5>
                            <Input icon='box' iconPosition='left' type='number' placeholder='gpge'  className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Groupage} onChange={(e) => setArticleD({...articleD, Groupage: e.target.value })}/>
                        </div>
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Genre: </h5>
                               <Select placeholder='Selectionez une Categorie' options={familles} className='w-100 shadow-sm rounded mb-3' defaultValue={articleD.Genre} onChange={(e, data) => setArticleD({...articleD, Genre: data.value })} />  
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Fabriquée par: </h5>
                                <Input icon='home' iconPosition='left' placeholder='Socité' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Socite} onChange={(e) => setArticleD({...articleD, Socite: e.target.value })}/>
                            </div>
                </div>
                <div className='row'>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Acaht: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' defaultValue={articleD.Prix_achat} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_achat: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Vente: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='vente' defaultValue={articleD.Prix_vente} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_vente: e.target.value })}/>
                            </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Promo: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='promo' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Prix_gros}  onChange={(e) => setArticleD({...articleD, Prix_gros: e.target.value })}/>
                            </div>
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-5'>
                                <h5 className='mb-1'>Quantité: </h5>
                                <Input icon='dropbox' iconPosition='left' type='number' disabled={updateQte} placeholder='quantité' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Quantite} onChange={(e) => setArticleD({...articleD, Quantite: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-5'>
                                <h5 className='mb-1'>Repture du stock: </h5>
                                <Input icon='angle double down' iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Repture} onChange={(e) => setArticleD({...articleD, Repture: e.target.value })}/>
                            </div>
                            <div className='col-12 col-lg-2'>
                                <h5 className='mb-1'>TVA: </h5>
                                <Input icon='retweet' iconPosition='left' placeholder='TVA' type='number' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.TVA} onChange={(e) => setArticleD({...articleD, TVA: e.target.value })}/>
                            </div>
                </div>
                <div className='row'>
                    <h5 className='mb-1'>Description</h5>
                    <Form>
                        <TextArea  rows="3" defaultValue={articleD.Details} className='w-100 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Details: e.target.value })}/>
                    </Form> 
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditArticleFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function ArticleInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {code} = useParams();
    const[familles] = useGetFamilleArticle()
    const [loading , setLoading] = useState(false)
    const [articleD, setArticleD] = useState({});
    const [loaderState, setLS] = useState(false)
    const [updateQte, setUpdateQte] = useState(true)
    const [resDay , setResDay] = useState({start:Today, end:Today})
    const [articleEvents , setArticleEvents] = useState([])

    const panes = [
        {
            menuItem: { key: 'suivie', icon: 'calendar alternate', content: 'Suivie' }, 
            render: () =><><Tab.Pane attached={false}><Calendar /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'resumer', icon: 'file excel', content: 'Resumeé' }, 
            render: () => <><Tab.Pane attached={false}><ResumerArticle /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle articleD={articleD}  setArticleD={setArticleD} checkPrixCompatiblite={checkPrixCompatiblite} familles={familles} EditArticleFunction={EditArticleFunction} loaderState={loaderState} updateQte={updateQte} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteArticleCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock/article`, {
            tag: GConf.SystemTag,
            code: code, 
          })
          .then(function (response) {
            if(!response.data[0]) {
                toast.error('Article Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sk"; }, 2000)
                
            } else {
                setArticleD(response.data[0])
                setLoading(true)
            }
                
          })

        //calendar
        axios.post(`${GConf.ApiLink}/stock/article/calendar`, {
            tag: GConf.SystemTag,
            code: code, 
          })
        .then(function (response) {
            console.log(response.data[0])
            let inFactureList = []
            response.data[0].InFacture.map( (factureList) => inFactureList.push( { title: GetTargetArticleQte(factureList.Articles,'Qte'), date: new Date(factureList.Cre_Date).toISOString().split('T')[0], className:'border-0 w-25 text-center' }))
            
            let forCamionList = []
            response.data[0].ForCamion.map( (camionData) => forCamionList.push( { title: GetTargetArticleQte(camionData.Articles,'QteAjoute') , date: new Date(camionData.Jour).toISOString().split('T')[0], className:'bg-danger border-0 w-25 text-center' }))
            
            let fromBonBE = []
            response.data[0].bonE.map( (bonBe) => fromBonBE.push( { title: GetTargetArticleQte(bonBe.Articles,'NewQte'), date: new Date(bonBe.BE_Date).toISOString().split('T')[0] , className:'bg-success border-0 w-25 text-center'}))

            setArticleEvents(inFactureList.concat(forCamionList,fromBonBE))
                
        })

        //check Permission
        axios.post(`${GConf.ApiLink}/Permission`, {
            tag: GConf.SystemTag,
          })
          .then(function (response) {
            if(response.data[0].Edit_Stock === 'true'){setUpdateQte(false)}
          })
    }, [])


    /*#########################[Function]##################################*/
    const EditArticleFunction = (event) => {
        console.log(articleD)
        setLS(true)
        axios.post(`${GConf.ApiLink}/stock/modifier`, {
            tag :GConf.SystemTag,
            articleND :articleD,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Article Modifier !", GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        })
    }
    const DeleteArticle = () =>{
        axios.post(`${GConf.ApiLink}/stock/supprimer`, {
            articleD :articleD,
        }).then(function (response) {
            console.log(response.data)
            
        })
    }
    const checkPrixCompatiblite = () =>{
        if(articleD.PrixA && articleD.PrixV){
            if(articleD.PrixA > articleD.PrixV) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setArticleD({...articleD, PrixV: '', PrixA: '' })
            } 
        }  
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId) }
    const GetTargetArticleQte = (value,column) =>{
        const JsValue = JSON.parse(value)
        const searchObject= JsValue.find((article) => article.A_Code == code);
        return searchObject[column];
    }

   /*#########################[Card]##################################*/
    const ArticleCard = (props) =>{
        const ReptureState = () =>{
            return (
            props.data.Repture >= props.data.Quantite ? <span className='bi bi-exclamation-triangle-fill bi-sm text-danger'></span> : <span className='bi bi-box2-heart-fill bi-sm text-success'></span>
            )
        }
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container">
                            <img src={`https://anaslouma.tn/Assets/images/Articles_Images/alimentaire/${props.data.Photo_Path}`} className="rounded-circle" width="80" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.Genre } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-house-heart-fill"></span> { props.data.Socite } </>: SKLT.BarreSkl } </h6>
                            <Divider horizontal className='text-secondary mt-4'>Prix</Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {props.data.Prix_achat.toFixed(3)} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Achat</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Prix_vente.toFixed(3)} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Vente</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Quantite</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Quantite} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                    </Statistic>
                                </div>
                                <div className='col-6  align-self-center border-end'>
                                    <ReptureState />
                                </div>
                                <div className='col-6 align-self-center'>
                                <h6 className='mb-1'> Repture En: {props.data.Repture}</h6> 
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
    const Calendar = () =>{
        return(<>
        <FullCalendar 
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            locale='fr' 
            events={articleEvents}
            height='420px'
            //allDaySlot= {false}
        />
        <div className='row mt-2'>
            <div className='col'><span className='bi bi-circle-fill text-success '></span> Par Bon entre</div>
            <div className='col'><span className='bi bi-circle-fill text-primary '></span> Dans Factures</div>
            <div className='col'><span className='bi bi-circle-fill text-danger '></span> Vers Camion</div>
        </div>
        </>)
    }
    const DeleteArticleCard = () =>{
        return(<>
            <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Cett Article ?</h3> 
            <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer L'Article : </b></h5>
            <ul className="text-info text-left">
            <li>L'article ne sera pas visible dans la branche 'Stock'</li>
            <li>Tous les article avec son code a barre se suppriment </li>
            <li>L'article Soit visible seulemment dans les facture  </li>
            </ul>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill" onClick={DeleteArticle}><span className="bi bi-check"></span> Oui, Supprimer</button>
            </div>
        </>)
    }
    const ResumerArticle = () =>{
        return(<>
                <h5>Reumer entre deux periodes</h5>
                <div className='mb-2 row'>
                    <div className='col-4'><Input size='small' fluid  type='date'  value={resDay.start}  onChange={(e) => setResDay({...resDay, start: e.target.value })}/></div>
                    <div className='col-4'><Input size='small' fluid  type='date'  value={resDay.end} onChange={(e) => setResDay({...resDay, end: e.target.value })}/></div>
                    <div className='col-4 self-align-center'><Button size='small' className='rounded-pill btn-imprimer' fluid onClick={(e) => PrintFunction('printResumer')} icon >  <Icon name='print' /> Imprimer </Button></div>
                </div> 
        </>)
    }

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.stockInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <ArticleCard data={articleD}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
                <FrameForPrint frameId='printResumer' src={`/Pr/Stock/resumer/${code}/${resDay.start}/${resDay.end}`} />
     </> );
}

export default ArticleInfo;