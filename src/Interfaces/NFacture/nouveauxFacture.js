import React, { useEffect, useState } from 'react';
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'
import { Fade } from 'react-reveal';
import { Button,  Dropdown, Icon, Input, Label, Loader, Tab } from 'semantic-ui-react';
import useGetArticles from '../../Dashboard/Assets/Hooks/fetchArticles';
import useGetClients from '../../Dashboard/Assets/Hooks/fetchClient';
import { toast } from 'react-toastify';
import GConf from '../../AssetsM/generalConf';
import axios from 'axios';
const MainDataCard = ({factureD, setFactureD,clientList}) =>{
    return (<>
            <div className='ccard-body mb-2'>
                <h5>Date & Client  </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={factureD.jour} onChange={(e) => setFactureD({...factureD, jour: e.target.value })}/>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={clientList}
                    placeholder='Selectionnez Client'
                    className='mb-1'
                    onChange={(e, { value }) => setFactureD({...factureD, client: value })}
                    value={factureD.client}
                />
                
            </div>
    </>)
}

function NouveauxFacture() {
        //const
    //Variables 
    const Cam_ID = localStorage.getItem("InputCamion"); 
    const Today = new Date()
    const [factureD, setFactureD] = useState({client:'PASSAGER', Camion : Cam_ID , jour: Today.toISOString().split('T')[0], totale: 0 , articles:[]})
    const [articleNow, setArticleNow] = useState([])
    const [articleList, setArticleList] = useState([])
    const [dropDownArticles, setDropDownArticles] = useState([])
    const [gettedFID, setFID] = useState('')
    const [clientList] = useGetClients()
    const [commandeLink, setCommandeLink] = useState('*')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [autofocusState, setAutoFocus] = useState(false)

    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () => <Tab.Pane attached={false}> <AddArticles /> </Tab.Pane>,
        },
        {
            menuItem: { key: 'articles', icon: 'star', content:  <>Articles <Label className='bg-danger' size='tiny'>{factureD.articles.length}</Label></> }, 
            render: () => 
                        <Tab.Pane attached={false}>
                            <TotaleCard />
                            <h5>Listes des Articles</h5>    
                            {factureD.articles.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                            <br />
                        </Tab.Pane>,
        },
        {
            menuItem: { key: 'client', icon: 'check circle', content: 'Terminer' }, 
            render: () =><><Tab.Pane attached={false}>
                            <MainDataCard factureD={factureD} setFactureD={setFactureD} clientList={clientList}/>
                            <br />
                        </Tab.Pane>
                        <Tab.Pane attached={false}><ButtonsCard /></Tab.Pane></>,
        },
        // {
        //     menuItem: { key: 'save', icon: 'check circle', content: '(4) Enregistrer' }, 
        //     render: () =><Tab.Pane attached={false}><ButtonsCard /></Tab.Pane>,
        // },
        
    ]

    //UseEffect
    useEffect(() => {
        axios.post(`${GConf.ApiCamionLink}/nv/stock`, {
            tag: GConf.SystemTag,
            camId: Cam_ID,
          })
          .then(function (response) {
            console.log(response.data)
            setArticleList(response.data)
          })
    }, [])

    //Functions
    const AddArticleToList = ()=>{
        if (!articleNow.A_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Name || articleNow.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Qte || articleNow.Qte == '') {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
            const searchObject = factureD.articles.find((article) => article.A_Code == articleNow.A_Code);
            if (searchObject) {
                let IndexOfArticle = factureD.articles.findIndex((article) => article.A_Code == articleNow.A_Code)
                factureD.articles[IndexOfArticle].Qte = factureD.articles[IndexOfArticle].Qte + parseInt(articleNow.Qte)
                setArticleNow([{}])
                setAutoFocus(false)
                console.log(factureD.articles)
                
            } else {
                let prix_u = (articleNow.Qte * articleNow.Prix_piece).toFixed(3)
                let arrayToAdd = {id: factureD.articles.length+1 , A_Code: articleNow.A_Code, Name: articleNow.Name, Prix: articleNow.Prix_piece, Qte: parseInt(articleNow.Qte), PU: prix_u}
                factureD.articles.push(arrayToAdd)
                setArticleNow([])
                let tot = MakeSum()
                setFactureD({...factureD, totale: tot })
                setAutoFocus(false)   
                console.log(factureD.articles)  
            }
        }        
    }
    const GetArticleData = (value) =>{
        const searchObject= articleList.find((article) => article.A_Code == value);
        let Prix_piece = (searchObject.Prix_vente / searchObject.Groupage)
        searchObject.Prix_piece = Prix_piece.toFixed(3)
        setArticleNow(searchObject);
        setAutoFocus(true)
        
    }
    const MakeSum = () => {
        let tot = 0
        factureD.articles.map( (art) => { 
            tot = tot +  parseInt(art.PU)
        })
        return (tot.toFixed(3))
    }
    const SaveFacture = () =>{
            if (!factureD.client) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.jour ) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.totale) {toast.error("totale est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.articles || factureD.articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiCamionLink}/nv/ajouter`, {
                    tag: GConf.SystemTag,
                    factureD: factureD,
                })
                .then(function (response) {
                    console.log(response)
                    if(response.status = 200) {
                        setSaveBtnState(true)
                        toast.success("Done !", GConf.TostSuucessGonf)
                        setLS(false)
                        setFID(response.data.FID)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                })

                console.log(factureD)
            }       
    }
    const handlePrint = () =>{
        document.getElementById('frame').contentWindow.window.print();
    }

    //Component 
    const ArticleListCard = (props) =>{
        return(<>
                <Fade>
                    <div className='card shadow-sm p-2 mb-1 rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-6 text-start align-self-center'>
                                {props.dataA.Name}
                            </div>
                            <div className='col-5 align-self-center'><b>{props.dataA.Qte}</b> * {props.dataA.Prix} = {props.dataA.PU}</div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger'></Button></div>
                        </div>
                    </div>
                </Fade>
                </>)
    }
    const AddArticles = () =>{
        return (<>
                <div className='mb-2'>
                    <h5>Ajouter article</h5> 
                    <datalist id="articlesList">
                            {articleList.map((test) =>
                            <option key={test.PK} value={test.A_Code}>{test.Name}</option>
                            )}
                    </datalist>
                    <Input icon='barcode' list="articlesList" value={articleNow.A_Code} onBlur={ (e) => GetArticleData(e.target.value)} size="small" iconPosition='left' placeholder='Desg'  fluid className='mb-1' />
                    <Input icon='star' value={articleNow.Name} size="small" iconPosition='left' placeholder='Nom'  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-8'>
                            <Input icon='dollar sign' value={articleNow.Prix_piece} size="small" iconPosition='left' placeholder='Prix'  fluid className='mb-1' />
                        </div>
                        <div className='col-4'>
                        <Button size="small" className='rounded-pill bg-warning' onClick={ () => setArticleNow({...articleNow, Prix_piece : 0})} fluid> Gratuit</Button>
                        </div>
                    </div>
                    <Input icon='dropbox' autoFocus={autofocusState} onChange={ (e) => {articleNow.Qte = e.target.value}} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' />
                    <br />
                    <Button fluid className='rounded-pill bg-system-btn' onClick={AddArticleToList}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const ButtonsCard = () =>{
        return (<>
                <div className=''>
                    <h5>Buttons</h5>
                    <div className='row mb-2'>
                        <div className='col-12 mb-3'>
                            <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' fluid onClick={SaveFacture}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                        <div className='col-12'>
                            <Button disabled={!saveBtnState} className='rounded-pill btn-imprimer'  fluid><Icon name='print' /> Imprimer</Button>
                        </div>
                    </div>
                </div>
        </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 sticky-top rounded-pill' style={{top:'70px'}}>
                    <div className='row'>
                        <div className='col-9 align-self-center text-start'><h1>Totale : {factureD.totale}</h1></div>
                        <div className='col-3 align-self-center text-center'><h5 className='mb-0'>{factureD.articles.length}</h5> articles</div>
                    </div>
                    
                   
                </div>
            </>)
    }


    return (  <>
        <BackCard data={InputLinks.backCard.nv}/>
        <br />
        <div className='container-fluid'>
            <Tab menu={{  pointing: true  }} panes={panes} />
        </div>
        <iframe id="frame"  className='d-none' src={commandeLink}></iframe>
    </>);
}


export default NouveauxFacture;