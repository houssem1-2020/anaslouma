import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../Assets/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input, Tab } from 'semantic-ui-react';
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

function AjouterFond() {
   /* ############################### Const ################################*/
    let Today = new Date()
    let [fondD, setFondD] = useState({camion:'PASSAGER',  jour: Today.toISOString().split('T')[0], totale: 0 , articles:[]})
    let [camionList, setCamionList] = useState([]); 
    let [articleList, setArticleList] = useState([]); 
    let [fullarticleList, setFullArticleList] = useState([]); 
    let [selectedCam, setSelectedCam] = useState(); 
    let [articleNow, setArticleNow] = useState([]) ; 
    let [camionSelectState, setCamionSS] = useState(false); 
    let [saveBtnState, setSaveBtnState] = useState(false) ; 
    let [gettedBonID, setBonID] = useState('');
    //sdf and scf 
    let [fixDepoStock, setSDF] = useState([]); 
    let [fixCamionStock, setSCF] = useState([]); 
    let [btnSDFState, setSDFBtnS] = useState(true); 
    let [btnSCFState, setSCFBtnS] = useState(true); 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () =><AddArticles />,
        },
        {
            menuItem: { key: 'save', icon: 'save outline', content:  'Enregistrer' }, 
            render: () =><ButtonsCard />,
        },
        {
            menuItem: { key: 'blbs', icon: 'file pdf outline', content:  'Extraire' }, 
            render: () => <PrintBSBL />,
        }
        
    ]

   /* ############################### UseEffect ########################*/
    useEffect(() => {
          //camionList
          axios.post(`${GConf.ApiLink}/camions`,{tag:GConf.SystemTag})
          .then(function (response) {
              let ClientLN = []
              response.data.map( (dta) => {ClientLN.push({value : dta.Cam_ID, text : dta.Cam_Name, key: dta.PK})})
              setCamionList(ClientLN)
          })
    }, [])


    /* ########################## Functions ############################*/
    const CamionSelected = (e, { value }) =>{
        axios.post(`${GConf.ApiLink}/camion/ajouterf/stock`, {
            tag: GConf.SystemTag,
            camId : value
        })
        .then(function (response) {
               let TableNow = []
               response.data.map( (dta) => {TableNow.push({value : dta.A_Code, text : dta.Name, key: dta.PK})})
               setArticleList(TableNow)
               setFullArticleList(response.data)
               setCamionSS(true)
               setSelectedCam(value)
               setFondD({...fondD, camion: value })
        })

    }
    const AddArticleToList = ()=>{
        if (!articleNow.A_Code) {toast.error("Entrer Un article 1!", GConf.TostErrorGonf)}
        else if (!articleNow.Name ) {toast.error("Entrer Un article 2!", GConf.TostErrorGonf)}
        else if (!articleNow.Prix_vente ) {toast.error("Entrer Un article 3!", GConf.TostErrorGonf)}
        else if (!articleNow.Groupage ) {toast.error("Entrer Un article 4!", GConf.TostErrorGonf)}
        else if (!articleNow.Quantite ) {toast.error("Entrer Un article 5!", GConf.TostErrorGonf)}
        else if (!articleNow.Qte && articleNow.Qte != 0) {toast.error("Entrer Un article 6!", GConf.TostErrorGonf)}
        else if (!articleNow.QteAjoute ) {toast.error("Entrer Un article 7!", GConf.TostErrorGonf)}
        else{
            const searchObject = fondD.articles.find((article) => article.A_Code == articleNow.A_Code);
            if (searchObject) {
                let IndexOfArticle = fondD.articles.findIndex((article) => article.A_Code == articleNow.A_Code)
                
                fondD.articles[IndexOfArticle].QteAjoute = parseInt(fondD.articles[IndexOfArticle].QteAjoute) + parseInt(articleNow.QteAjoute)
                fixDepoStock[IndexOfArticle][1] = parseInt(fixDepoStock[IndexOfArticle][1]) + parseInt(articleNow.QteAjoute)
                fixCamionStock[IndexOfArticle][2] = parseInt(fixCamionStock[IndexOfArticle][2]) + parseInt(articleNow.QteAjoute * articleNow.Groupage)
                //
                fondD.articles[IndexOfArticle].Quantite = parseInt(fondD.articles[IndexOfArticle].Quantite) - parseInt(articleNow.QteAjoute)
                fondD.articles[IndexOfArticle].Qte = parseInt(fondD.articles[IndexOfArticle].Qte) + parseInt(articleNow.QteAjoute * articleNow.Groupage)
            } else {
                
           
            let resteEnDepo = articleNow.Quantite - articleNow.QteAjoute //nouveaux stock du depo
            let soitEnCamion = articleNow.Qte + (articleNow.QteAjoute * articleNow.Groupage) // nouveaux stock du camion
            
            //update save fond table 
            let arrayToAdd = {id:fondD.articles.length + 1 ,A_Code: articleNow.A_Code, Name: articleNow.Name, Prix_vente: articleNow.Prix_vente, Groupage : articleNow.Groupage, Quantite: resteEnDepo , Qte: soitEnCamion , QteAjoute: articleNow.QteAjoute}
            fondD.articles.push(arrayToAdd)
            
            //update SDF
            fixDepoStock.push([articleNow.A_Code, parseInt(articleNow.QteAjoute)])
            
            //update SCF
            fixCamionStock.push([articleNow.A_Code + selectedCam ,articleNow.A_Code, parseInt(articleNow.QteAjoute * articleNow.Groupage)])
        }
            setArticleNow([])
            let tot = MakeSum()
            setFondD({...fondD, totale: tot })

        }
    }
    const GetArticleData = (e, { value }) =>{
        const searchObject= fullarticleList.find((article) => article.A_Code == value);
        if(!searchObject.Qte) {searchObject.Qte = 0}
        setArticleNow(searchObject);
    }
    const MakeSum = () => {
        let tot = 0
        fondD.articles.map( (art) => { 
           tot = tot +  parseInt(art.QteAjoute * art.Prix_vente)
        })
        return (tot.toFixed(3))
    }
    const SaveFond = () =>{
            if (!fondD.camion) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
            else if (!fondD.jour ) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!fondD.totale) {toast.error("totale est Invalide !", GConf.TostErrorGonf)}
            else if (!fondD.articles || fondD.articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
            else {
                axios.post(`${GConf.ApiLink}/camion/ajouterf`, {
                    tag: GConf.SystemTag,
                    fondD: fondD,
                })
                .then(function (response) {
                    if(response.status = 200) {
                        setSaveBtnState(true)
                        toast.success("Done !", GConf.TostSuucessGonf)
                        setBonID(response.data.BonID)
                        setSaveBtnState(true)
                        setSDFBtnS(false)
                        setSCFBtnS(false)
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
        const targetArticle =  fondD.articles.findIndex((article) => article.A_C == id);
        fondD.articles.splice(targetArticle,1);
        let tot = MakeSum()
        setFondD({...fondD, totale: tot })
        console.log(fondD.articles)
    }
    const UpdateStockDepo = (e, { value }) =>{
        
        axios.post(`${GConf.ApiLink}/stock/bs`, {
            tag: GConf.SystemTag,
            artList: fixDepoStock,
          })
          .then(function (response) {      
            if(response.data.affectedRows) {
                axios.post(`${GConf.ApiLink}/camion/fond/us`, { tag: GConf.SystemTag,  bonId: gettedBonID , state:'SDF'})
                toast.success("Stock Modifier !", GConf.TostSuucessGonf)
                setSDFBtnS(true)
                
            }
            else{
                toast.error('Erreur Indéfine ', GConf.TostSuucessGonf)
            }
          })

    }
    const UpdateStockCamion = (e, { value }) =>{
        
        axios.post(`${GConf.ApiLink}/camion/stock/update`, {
            tag: GConf.SystemTag,
            camion : selectedCam,
            artList: fixCamionStock,
          })
          .then(function (response) {      
            if(response.data) {
                axios.post(`${GConf.ApiLink}/camion/fond/us`, { tag: GConf.SystemTag,  bonId: gettedBonID , state:'SCF'})
                toast.success("Stock Modifier !", GConf.TostSuucessGonf)
                setSCFBtnS(true)
            }
            else{
                toast.error('Erreur Indéfine ', GConf.TostSuucessGonf)
            }
          })

    }

    /* ############################### card ################################*/
    const ArticleListCard = (props) =>{
        return(<>
                    <div className='card shadow-sm p-2 mb-1 rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-5 text-start align-self-center'>
                            {props.dataA.Name}
                            </div>
                            <div className='col-4 align-self-center'><b>{props.dataA.QteAjoute}</b> * {(props.dataA.Prix_vente).toFixed(3)} = {(props.dataA.Prix_vente * props.dataA.QteAjoute).toFixed(3)}</div>
                            <div className='col-2 align-self-center'><b><span className='bi bi-house-door text-danger'></span> {props.dataA.Quantite}   <span className='bi bi-truck text-success'></span> {props.dataA.Qte} </b></div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' onClick={() => DeleteArticleFromList(props.dataA.id)}></Button></div>
                        </div>
                    </div>
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
                    <Input icon='star' value={articleNow.Name} readOnly size="small" iconPosition='left' placeholder='Nom'  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-7'>
                            <Input icon='dollar sign' value={articleNow.Prix_vente} readOnly size="small" iconPosition='left' placeholder='Prix'  fluid className='mb-1' />
                        </div>
                        <div className='col-5'>
                            <Input icon='box' value={articleNow.Groupage} readOnly size="small" iconPosition='left' placeholder='Groupage'  fluid className='mb-1' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-7'>
                            <Input icon='home' value={articleNow.Quantite} readOnly size="small" iconPosition='left' placeholder='Qte Depo'  fluid className='mb-1' />
                        </div>
                        <div className='col-5'>
                            <Input icon='truck' value={articleNow.Qte} readOnly size="small" iconPosition='left' placeholder='Qte Camion'  fluid className='mb-1' />
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
                        <div className='col-6'>
                            <Button disabled={saveBtnState} className='rounded-pill  bg-system-btn'  fluid onClick={SaveFond}><Icon name='save' /> Enregistrer</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState}  fluid onClick={handlePrint}><Icon name='print' /> Imprimer</Button>
                        </div>
                        
                    </div>
                    <div className='row mb-2'>
                         <div className='col-6'>
                            <Button disabled={btnSDFState} className='rounded-pill btn-regler'  fluid onClick={UpdateStockDepo}><Icon name='flag checkered' /> R.S Depo</Button>
                        </div>
                        <div className='col-6'>
                            <Button disabled={btnSCFState} className='rounded-pill btn-regler'  fluid onClick={UpdateStockCamion}><Icon name='flag checkered' /> R.S Camion</Button>
                        </div>
                    </div>
                </div>
        </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 sticky-top rounded-pill' style={{top:'70px'}}>
                    <div className='row'>
                        <div className='col-9 align-self-center text-start'><h1>Totale : {fondD.totale}</h1></div>
                        <div className='col-3 align-self-center text-center'><h5 className='mb-0'>{fondD.articles.length}</h5> articles</div>
                    </div>
                    
                   
                </div>
            </>)
    }
    const PrintBSBL = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Bond de sortie </h5>
                    <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={fondD.jour} onChange={(e) => setFondD({...fondD, jour: e.target.value })}/>
                    <Input icon='user' size="small" iconPosition='left' placeholder='Chauffeur '  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-6'><Input icon='map marker' size="small" iconPosition='left' placeholder='De'  fluid className='mb-1'  value={fondD.de}  onChange={(e) => setFondD({...fondD, de: e.target.value })}/></div>
                        <div className='col-6'><Input icon='map marker alternate' size="small" iconPosition='left' placeholder='Vers'  fluid className='mb-1' value={fondD.vers}  onChange={(e) => setFondD({...fondD, vers: e.target.value })}/></div>
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
            <BreadCrumb links={GConf.BreadCrumb.CamionAddFond} />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                        <Tab menu={{  pointing: true  }} panes={panes} />
                    </div>
                </div>
                <div className='col-12 col-lg-7'>
                    <TotaleCard />
                    <h5>Listes des Articles</h5>    
                    {fondD.articles.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                    <br /> 
                </div>
            </div>
        </> );
    }

export default AjouterFond;