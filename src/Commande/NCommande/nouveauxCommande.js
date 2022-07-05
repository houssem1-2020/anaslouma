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
const MainDataCard = ({commandeD, setCommandeD,clientList}) =>{
    return (<>
            <div className='ccard-body mb-2'>
                <h5>Date & Client  </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={commandeD.jour} onChange={(e) => setCommandeD({...commandeD, jour: e.target.value })}/>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={clientList}
                    placeholder='Selectionnez Client'
                    className='mb-1'
                    onChange={(e, { value }) => setCommandeD({...commandeD, client: value })}
                    value={commandeD.client}
                />
                
            </div>
    </>)
}

function NouveauxCommande() {
    //const
    //Variables 
    let UID = localStorage.getItem("InputCommande"); 
    const Today = new Date()
    const [commandeD, setCommandeD] = useState({client:'PASSAGER', UID : UID , jour: Today.toISOString().split('T')[0], totale: 0 , articles:[]})
    const [articleNow, setArticleNow] = useState([])
    const [dropDownArticles, setDropDownArticles] = useState([])
    const [articleACode, articleList] = useGetArticles()
    const [clientList] = useGetClients()
    const [commandeLink, setCommandeLink] = useState('*')
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
    
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () => <Tab.Pane attached={false}> <AddArticles /> </Tab.Pane>,
        },
        {
            menuItem: { key: 'articles', icon: 'star', content:  <>Articles <Label className='bg-danger' size='tiny'>{commandeD.articles.length}</Label></> }, 
            render: () => 
                        <Tab.Pane attached={false}>
                            <TotaleCard />
                            <h5>Listes des Articles</h5>    
                            {commandeD.articles.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                            <br />
                        </Tab.Pane>,
        },
        {
            menuItem: { key: 'client', icon: 'check circle', content: 'Terminer' }, 
            render: () =><><Tab.Pane attached={false}>
                            <MainDataCard commandeD={commandeD} setCommandeD={setCommandeD} clientList={clientList}/>
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
        if(articleList){
            let TableNow = []
            articleList.map( (dta) => {TableNow.push({value : dta.A_Code, text : dta.Name, key: dta.PK})})
            setDropDownArticles(TableNow)
        }
    }, [articleList])

    //Functions
    const AddArticleToList = ()=>{
        let prix_u = (articleNow.Prix_vente * articleNow.Qte).toFixed(3)
        let arrayToAdd = {id: commandeD.articles.length+1 , A_Code: articleNow.A_Code, Name: articleNow.Name, Prix: articleNow.Prix_vente, Qte: articleNow.Qte, PU: prix_u}
        commandeD.articles.push(arrayToAdd)
        setArticleNow([])
        let tot = MakeSum()
        setCommandeD({...commandeD, totale: tot })
        
    }
    const GetArticleData = (e, { value }) =>{
        const searchObject= articleList.find((article) => article.A_Code == value);
        setArticleNow(searchObject);
        
    }
    const MakeSum = () => {
        let tot = 0
        commandeD.articles.map( (art) => { 
            tot = tot +  parseInt(art.PU)
        })
        return (tot.toFixed(3))
    }
    const SaveFacture = () =>{
            if (!commandeD.client) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
            else if (!commandeD.jour ) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!commandeD.totale) {toast.error("totale est Invalide !", GConf.TostErrorGonf)}
            else if (!commandeD.articles || commandeD.articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiCommandeLink}/ajouter`, {
                    tag: GConf.SystemTag,
                    commandD: commandeD,
                })
                .then(function (response) {
                    console.log(response)
                    if(response.status = 200) {
                        setSaveBtnState('disabled')
                        toast.success("Done !", GConf.TostSuucessGonf)
                        // setFactureLink(response.data);
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                })

                console.log(commandeD)
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
                <div className=' card-body  mb-2'>
                    <h5>Ajouter article</h5> 
                    <Dropdown
                        fluid
                        search
                        selection
                        wrapSelection={false}
                        options={dropDownArticles}
                        placeholder='Selectionnez Article'
                        className='mb-1'
                        onChange={GetArticleData}
                        value={articleNow.A_Code}
                    />
                    <Input icon='star' value={articleNow.Name} size="small" iconPosition='left' placeholder='Nom'  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-9'>
                            <Input icon='dollar sign' value={articleNow.Prix_vente} size="small" iconPosition='left' placeholder='Prix'  fluid className='mb-1' />
                        </div>
                        <div className='col-3'>
                        <Button  className='rounded-pill bg-system-btn' onClick={ () => { articleNow.Prix_vente = 0}} icon="edit outline" fluid></Button>
                        </div>
                    </div>
                    <Input icon='dropbox' onChange={ (e) => {articleNow.Qte = e.target.value}} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' />
                    <br />
                    <Button fluid className='rounded-pill bg-system-btn' onClick={AddArticleToList}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const ButtonsCard = () =>{
        return (<>
                <div className='card-body mb-2'>
                    <h5>Buttons</h5>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <Button  className='rounded-pill'  fluid><Icon name='checkmark box' /> Vérifier</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className={`rounded-pill ${saveBtnState} bg-system-btn`}  fluid onClick={SaveFacture}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                </div>
        </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 sticky-top rounded-pill' style={{top:'70px'}}>
                    <div className='row'>
                        <div className='col-9 align-self-center text-start'><h1>Totale : {commandeD.totale}</h1></div>
                        <div className='col-3 align-self-center text-center'><h5 className='mb-0'>{commandeD.articles.length}</h5> articles</div>
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

export default NouveauxCommande;