import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../Assets/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input, Tab } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import axios from 'axios';
import { toast } from 'react-toastify';

const SelectCamion = ({CamionSelected, camionList, camionSelectState, selectedCam}) =>{
    return (<>
                <h5>Camion  </h5>
                <Dropdown
                    disabled={camionSelectState}
                    search
                    selection
                    wrapSelection={false}
                    options={camionList}
                    placeholder='Selectionnez Client'
                    className='mb-1'
                    onChange={CamionSelected}
                    value={selectedCam}
                />   
    </>)
}

function InventaireCamion() {
    /* ############################### Const ################################*/
    const Today = new Date()
    const [inventaireD, setInventaireD] = useState([])
    const  [tabeleToSend,setTableToSend] = useState([]);
    const [camionList, setCamionList] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const [fullarticleList, setFullArticleList] = useState([]);
    const [selectedCam, setSelectedCam] = useState()
    const [articleNow, setArticleNow] = useState([])
    const [camionSelectState, setCamionSS] = useState(false)
    const [saveBtnState, setSaveBtnState] = useState(false)
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () =><AddArticles />,
        },
        {
            menuItem: { key: 'save', icon: 'box', content:  'Modifier' }, 
            render: () =><ButtonsCard />,
        }
        
    ]

    /* ############################### UseEffect ################################*/
    useEffect(() => {
          //camionList
          axios.post(`${GConf.ApiLink}/camions`,{tag:GConf.SystemTag})
          .then(function (response) {
              let ClientLN = []
              response.data.map( (dta) => {ClientLN.push({value : dta.Cam_ID, text : dta.Cam_Name, key: dta.PK})})
              setCamionList(ClientLN)
          })
    }, [])


    /* ############################### Function ################################*/
    const CamionSelected = (e, { value }) =>{
        axios.post(`${GConf.ApiLink}/camion/inventaire/stock`, {
            tag: GConf.SystemTag,
            camId : value
        })
        .then(function (response) {
            console.log(response.data)
               let TableNow = []
               response.data.map( (dta) => {TableNow.push({value : dta.A_Code, text : dta.Name, key: dta.PK})})
               setArticleList(TableNow)
               setFullArticleList(response.data)
               setCamionSS(true)
               setSelectedCam(value)
        })

    }
    const AddArticleToList = ()=>{
        if (!articleNow.A_Code) {toast.error("Entrer Un article 1!", GConf.TostErrorGonf)}
        else if (!articleNow.Name ) {toast.error("Entrer Un article 2!", GConf.TostErrorGonf)}
        else if (!articleNow.Prix_vente ) {toast.error("Entrer Un article 3!", GConf.TostErrorGonf)}
        else if (!articleNow.Groupage ) {toast.error("Entrer Un article 4!", GConf.TostErrorGonf)}
        else if (!articleNow.Qte && articleNow.Qte != 0) {toast.error("Entrer Un article 6!", GConf.TostErrorGonf)}
        else if (!articleNow.QteAjoute ) {toast.error("Entrer Un article 7!", GConf.TostErrorGonf)}
        else{

            const searchObject = inventaireD.find((article) => article.A_Code == articleNow.A_Code);
            let IndexOfArticle = inventaireD.findIndex((article) => article.A_Code == articleNow.A_Code)
            
            if (searchObject) {
                let IndexOfArticle = inventaireD.findIndex((article) => article.A_Code == articleNow.A_Code)
                searchObject.QteAjoute =  parseInt(articleNow.QteAjoute)
                tabeleToSend[IndexOfArticle][1] = parseInt(articleNow.QteAjoute)
                
            } else {
                let resteEnDepo = articleNow.Quantite - articleNow.QteAjoute
                let soitEnCamion = articleNow.Qte + (articleNow.QteAjoute * articleNow.Groupage)
                let arrayToAdd = {A_Code: articleNow.A_Code, Name: articleNow.Name, Prix_vente: articleNow.Prix_vente, Quantite: resteEnDepo , Qte: soitEnCamion , QteAjoute: articleNow.QteAjoute}
                inventaireD.push(arrayToAdd)
                tabeleToSend.push([articleNow.A_Code, parseInt(articleNow.QteAjoute)])
            }
            setArticleNow([])
        }
    }
    const GetArticleData = (e, { value }) =>{
        const searchObject= fullarticleList.find((article) => article.A_Code == value);
        if(!searchObject.Qte) {searchObject.Qte = 0}
        setArticleNow(searchObject);
    }
    const MakeSum = () => {
        let tot = 0
        inventaireD.map( (art) => { 
           tot = tot +  parseInt(art.QteAjoute * art.Prix_vente)
        })
        return (tot.toFixed(3))
    }
    const FaireInventaire = () =>{
            if (!tabeleToSend || tabeleToSend.length == 0) {toast.error("La Liste est Vide !", GConf.TostErrorGonf)}
            else {
                axios.post(`${GConf.ApiLink}/camion/inventaire`, {
                    tag: GConf.SystemTag,
                    artList: tabeleToSend,
                    camion : selectedCam
                })
                .then(function (response) {
                    console.log(response)
                    if(response.status = 200) {
                        setSaveBtnState(false)
                        toast.success("Done !", GConf.TostSuucessGonf)
                        //setFactureLink(response.data);
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    }
                })
            }       
    }
    const handlePrint = () =>{
        document.getElementById('frame').contentWindow.window.print();
    }
    const DeleteArticleFromList = (id) =>{
        const targetArticle =  inventaireD.findIndex((article) => article.A_C == id);
        inventaireD.splice(targetArticle,1);
        let tot = MakeSum()
        setInventaireD({...inventaireD, totale: tot })
        console.log(inventaireD)
    }

    /* ############################### Card ################################*/
    const ArticleListCard = (props) =>{
        return(<>
                {/* <Fade> */}
                    <div className='card shadow-sm p-2 mb-1 rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-5 text-start align-self-center'>
                            {props.dataA.Name}
                            </div>
                            <div className='col-4 align-self-center'><b>{props.dataA.QteAjoute}</b> * {(props.dataA.Prix_vente).toFixed(3)} = {(props.dataA.Prix_vente * props.dataA.QteAjoute).toFixed(3)}</div>
                            <div className='col-2 align-self-center'><b>{props.dataA.Quantite}   <span className='bi bi-arrow-left-right text-success'></span> {props.dataA.Qte} </b></div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' onClick={() => DeleteArticleFromList(props.dataA.id)}></Button></div>
                        </div>
                    </div>
                {/* </Fade> */}
                </>)
    }
    const AddArticles = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2'>
                <SelectCamion CamionSelected={CamionSelected} camionList={camionList} camionSelectState={camionSelectState} selectedCam={selectedCam} />
                    <h5>Ajouter article</h5> 
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={articleList}
                        placeholder='Selectionnez Article'
                        className='mb-1'
                        onChange={GetArticleData}
                        value={articleNow.A_Code}
                    />
                    <Input icon='star' value={articleNow.Name} disabled size="small" iconPosition='left' placeholder='Nom'  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-7'>
                            <Input icon='dollar sign' value={articleNow.Prix_vente} disabled size="small" iconPosition='left' placeholder='Prix'  fluid className='mb-1' />
                        </div>
                        <div className='col-5'>
                            <Input icon='box' value={articleNow.Groupage} disabled size="small" iconPosition='left' placeholder='Groupage'  fluid className='mb-1' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-7'>
                            <Input icon='home' value={articleNow.Quantite} disabled size="small" iconPosition='left' placeholder='Qte Depo'  fluid className='mb-1' />
                        </div>
                        <div className='col-5'>
                            <Input icon='truck' value={articleNow.Qte} disabled size="small" iconPosition='left' placeholder='Qte Camion'  fluid className='mb-1' />
                        </div>
                    </div>
                    <Input icon='dropbox' onChange={ (e) => {articleNow.QteAjoute = e.target.value}} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' />
                    <br />
                    <Button  className='rounded-pill bg-system-btn' onClick={AddArticleToList}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const ButtonsCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Buttons</h5>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <Button disabled={saveBtnState} className='rounded-pill  bg-system-btn'  fluid onClick={FaireInventaire}><Icon name='save' /> Enregistrer</Button>
                        </div>
                        
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState}  fluid onClick={handlePrint}><Icon name='print' /> Imprimer</Button>
                        </div>
                    </div>
                </div>
        </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 sticky-top rounded-pill' style={{top:'70px'}}>
                    <div className='row'>
                        <div className='col-9 align-self-center text-start'><h1>Totale : {inventaireD.totale}</h1></div>
                        <div className='col-3 align-self-center text-center'><h5 className='mb-0'>{inventaireD.length}</h5> articles</div>
                    </div>
                    
                   
                </div>
            </>)
    }
    const PrintBSBL = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Bond de sortie </h5>
                    <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={inventaireD.jour} onChange={(e) => setInventaireD({...inventaireD, jour: e.target.value })}/>
                    <Input icon='user' size="small" iconPosition='left' placeholder='Chauffeur '  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-6'><Input icon='map marker' size="small" iconPosition='left' placeholder='De'  fluid className='mb-1'  value={inventaireD.de}  onChange={(e) => setInventaireD({...inventaireD, de: e.target.value })}/></div>
                        <div className='col-6'><Input icon='map marker alternate' size="small" iconPosition='left' placeholder='Vers'  fluid className='mb-1' value={inventaireD.vers}  onChange={(e) => setInventaireD({...inventaireD, vers: e.target.value })}/></div>
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
            <BreadCrumb links={GConf.BreadCrumb.CamionInv} />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                        <Tab menu={{  pointing: true  }} panes={panes} />
                    </div>
                </div>
                <div className='col-12 col-lg-7'>
                    <h5>Listes des Articles</h5>    
                    {inventaireD.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                    <br />
                    
                </div>
            </div>
        </> );
    }

export default InventaireCamion;