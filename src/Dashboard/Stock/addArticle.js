import React, {useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Select, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import  useGetFamilleArticle from '../Assets/Hooks/fetchArticlesFamille'
import { toast } from 'react-toastify';
import useGetArticles from '../Assets/Hooks/fetchArticles';
import axios from 'axios';

function AddArticleStock() {
    /*#########################[Const]##################################*/
    const [familles] = useGetFamilleArticle() 
    const [articles] = useGetArticles()  
    const [articleD, setArticleD] = useState({});
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)


    /*#########################[Functions ]##################################*/
    const SaveArticle = (event) => {
            if (!articleD.A_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Name || articleD.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Groupage) {toast.error("Groupage Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Socite) {toast.error("Socite Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.PrixA) {toast.error("Prix Achat Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.PrixV) {toast.error("Prix Vente Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.PrixP) {toast.error("Prix Promo Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Qte) {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Repture) {toast.error("Repture Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.TVA) {toast.error("TVA Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Desc) {toast.error("Description Invalide !", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/stock/ajouter`, {
                    articleD : articleD,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        setSaveBtnState('disabled')
                        toast.success("Done !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                })
                
            }
            
    }  
    const checkArticleExistance = () =>{
        if(articleD.A_Code){
            if(articles.includes(parseInt(articleD.A_Code))) {
                toast.error("Article Exist Deja", GConf.TostErrorGonf)
                setArticleD({...articleD, A_Code: '' })
            } 
        }
    }
    const checkPrixCompatiblite = () =>{
        if(articleD.PrixA && articleD.PrixV){
            if(articleD.PrixA > articleD.PrixV) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setArticleD({...articleD, PrixV: '', PrixA: '' })
            } 
        }
        
    }

    return ( <>

            <BreadCrumb links={GConf.BreadCrumb.stockAddArticle} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <h5 className='mb-1'>Code à barre:</h5>
                        <Input icon='barcode' iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' onBlur={checkArticleExistance} value={articleD.A_Code} onChange={(e) => setArticleD({...articleD, A_Code: e.target.value })} />
                        <div className='row'>
                                <div className='col-12 col-lg-10'>
                                    <h5 className='mb-1'>Nom: </h5>
                                    <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3'  onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-2'>
                                    <h5 className='mb-1'>Groupage:</h5>
                                    <Input icon='box' iconPosition='left' type='number' placeholder='gpge' defaultValue='1' className='w-100 border-0 shadow-sm rounded mb-3'  onChange={(e) => setArticleD({...articleD, Groupage: e.target.value })}/>
                                </div>
                    </div> 
                    <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Genre: </h5>
                                   <Select placeholder='Select your country' options={familles} className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setArticleD({...articleD, Genre: data.value })} />  
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Fabriquée par: </h5>
                                    <Input icon='home' iconPosition='left' placeholder='Socité' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Socite: e.target.value })}/>
                                </div>
                    </div>
                    <div className='row'>
                                <div className='col-12 col-lg-4'>
                                    <h5 className='mb-1'>Prix Acaht: </h5>
                                    <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' value={articleD.PrixA} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, PrixA: e.target.value })}/> 
                                </div>
                                <div className='col-12 col-lg-4'>
                                    <h5 className='mb-1'>Prix Vente: </h5>
                                    <Input icon='dollar' iconPosition='left' type='number' placeholder='vente' value={articleD.PrixV} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, PrixV: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-4'>
                                    <h5 className='mb-1'>Prix Promo: </h5>
                                    <Input icon='dollar' iconPosition='left' type='number' placeholder='promo' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, PrixP: e.target.value })}/>
                                </div>
                    </div> 
                    <div className='row'>
                                <div className='col-12 col-lg-5'>
                                    <h5 className='mb-1'>Quantité: </h5>
                                    <Input icon='dropbox' iconPosition='left' type='number' placeholder='quantité' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Qte: e.target.value })}/> 
                                </div>
                                <div className='col-12 col-lg-5'>
                                    <h5 className='mb-1'>Repture du stock: </h5>
                                    <Input icon='angle double down' iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Repture: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-2'>
                                    <h5 className='mb-1'>TVA: </h5>
                                    <Input icon='retweet' iconPosition='left' placeholder='TVA' type='number' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, TVA: e.target.value })}/>
                                </div>
                    </div>
                    <div className='row'>
                        <h5 className='mb-1'>Description</h5>
                            <Form>
                                <TextArea  rows="3" placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Desc: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='text-end mb-5'>
                            <Button onClick={SaveArticle}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`}  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AddArticleStock;