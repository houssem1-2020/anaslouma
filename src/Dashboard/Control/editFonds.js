import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../Assets/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input, Tab } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

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

function EditFond() {
    //const
    let {FondID} = useParams()
    let Today = new Date()
    let [fondD, setFondD] = useState({camion:'PASSAGER',  jour: Today.toISOString().split('T')[0], totale: 0 , articles:[]})
    let [camionList, setCamionList] = useState([]);
    let [articleList, setArticleList] = useState([]);
    let [fullarticleList, setFullArticleList] = useState([]);
    let [selectedCam, setSelectedCam] = useState()
    let [articleNow, setArticleNow] = useState([])
    let [camionSelectState, setCamionSS] = useState(false)
    let [saveBtnState, setSaveBtnState] = useState(false)
    
    //sdf and scf 
    let [fixDepoStock, setSDF] = useState([])
    let [fixCamionStock, setSCF] = useState([])
    let [btnSDFState, setSDFBtnS] = useState('')
    let [btnSCFState, setSCFBtnS] = useState('')
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () =><AddArticles />,
        },
        {
            menuItem: { key: 'save', icon: 'save outline', content:  'Modifier' }, 
            render: () =><ButtonsCard />,
        },
        // {
        //     menuItem: { key: 'blbs', icon: 'file pdf outline', content:  'Extraire' }, 
        //     render: () => <PrintBSBL />,
        // }
        
    ]

    //Use Effects 
    useEffect(() => {
          //camionList
          axios.post(`${GConf.ApiLink}/camions`,{tag:GConf.SystemTag})
          .then(function (response) {
              let ClientLN = []
              response.data.map( (dta) => {ClientLN.push({value : dta.Cam_ID, text : dta.Cam_Name, key: dta.PK})})
              setCamionList(ClientLN)
          })
    }, [])
    //Use Effects 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion/fond`, {
            tag: GConf.SystemTag,
            fondID: FondID
          })
          .then(function (response) {
                //setArticleL(JSON.parse(response.data[0].Articles))
                setFondD({ camion: response.data[0].Camion ,jour: response.data[0].Jour , totale: response.data[0].Totale , articles:JSON.parse(response.data[0].Articles)})
                //setFondD(response.data[0])
                //setLoading(true) 
                //CamionSelected(response.data[0].Camion)   
                axios.post(`${GConf.ApiLink}/camion/ajouterf/stock`, {
                    tag: GConf.SystemTag,
                    camId : response.data[0].Camion
                })
                .then(function (response) {
                       let TableNow = []
                       response.data.map( (dta) => {TableNow.push({value : dta.A_Code, text : dta.Name, key: dta.PK})})
                       setArticleList(TableNow)
                       setFullArticleList(response.data)
                       setCamionSS(true)
                       setSelectedCam(response.data[0].Camion)
                       //setFondD({...fondD, camion: value })
                })            
          })
    }, [])

    //Functions
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

            //update save fond table 
            //update SDF
            //update SCF

            let resteEnDepo = articleNow.Quantite - articleNow.QteAjoute
            let soitEnCamion = articleNow.Qte + (articleNow.QteAjoute * articleNow.Groupage)
            let arrayToAdd = {id:fondD.articles.length + 1 ,A_Code: articleNow.A_Code, Name: articleNow.Name, Prix_vente: articleNow.Prix_vente, Groupage : articleNow.Groupage, Quantite: resteEnDepo , Qte: soitEnCamion , QteAjoute: articleNow.QteAjoute}
            fondD.articles.push(arrayToAdd)
            fixDepoStock.push([articleNow.A_Code, articleNow.QteAjoute])
            fixCamionStock.push([articleNow.A_Code, (articleNow.QteAjoute * articleNow.Groupage)])
            setArticleNow([])
            let tot = MakeSum()
            setFondD({...fondD, totale: tot })
            console.log(fondD)
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
    const SaveFacture = () =>{
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
                    console.log(response)
                    if(response.status = 200) {
                        setSaveBtnState('disabled')
                        toast.success("Done !", GConf.TostSuucessGonf)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    }
                })

                console.log(fondD)
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

    //card
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
                    <Input icon='star' value={articleNow.Name} readonly size="small" iconPosition='left' placeholder='Nom'  fluid className='mb-1' />
                    <div className='row'>
                        <div className='col-7'>
                            <Input icon='dollar sign' value={articleNow.Prix_vente} readonly size="small" iconPosition='left' placeholder='Prix'  fluid className='mb-1' />
                        </div>
                        <div className='col-5'>
                            <Input icon='box' value={articleNow.Groupage} readonly size="small" iconPosition='left' placeholder='Groupage'  fluid className='mb-1' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-7'>
                            <Input icon='home' value={articleNow.Quantite} readonly size="small" iconPosition='left' placeholder='Qte Depo'  fluid className='mb-1' />
                        </div>
                        <div className='col-5'>
                            <Input icon='truck' value={articleNow.Qte} readonly size="small" iconPosition='left' placeholder='Qte Camion'  fluid className='mb-1' />
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
                            <Button disabled={saveBtnState} className='rounded-pill  bg-system-btn'  fluid onClick={SaveFacture}><Icon name='save' /> Enregistrer</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState}  fluid onClick={handlePrint}><Icon name='print' /> Imprimer</Button>
                        </div>
                        
                    </div>
                    <div className='row mb-2 d-none'>
                         <div className='col-6'>
                            <Button disabled={!saveBtnState} className='rounded-pill btn-regler'  fluid><Icon name='flag checkered' /> R.S Depo</Button>
                        </div>
                        <div className='col-6'>
                            <Button disabled={!saveBtnState} className='rounded-pill btn-regler'  fluid><Icon name='flag checkered' /> R.S Camion</Button>
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

 
    
    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionEditFond} />
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

export default EditFond;