import React, { useEffect, useState } from 'react';
import BreadCrumb from '../Assets/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Bounce } from 'react-reveal';
import { Button, Icon, Input, Loader } from 'semantic-ui-react';
import useGetCamion from '../Assets/Hooks/fetchCamion';
import { toast } from 'react-toastify';
import axios from 'axios';

function AjouterCamion() {
    /*#########################[Const]##################################*/
    const [camionD, setCamionD] = useState([])
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)

    /*#########################[Function]##################################*/
    const SaveCamion = () => {
        if (!camionD.Matricule) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!camionD.Cam_Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!camionD.Marque) {toast.error("Marque Invalide !", GConf.TostErrorGonf)}
        else if (!camionD.Chauffeur) {toast.error("Chauffeur Invalide !", GConf.TostErrorGonf)}
        else if (!camionD.Identifiant) {toast.error("Identifiant Invalide !", GConf.TostErrorGonf)}
        else if (!camionD.Password) {toast.error("Mot De Passe Invalide !", GConf.TostErrorGonf)}
        else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/camions/ajouter`, {
                    tag : GConf.SystemTag,
                    camionD : camionD,
                }).then(function (response) {
                    console.log(response.data)
                    if(response.data.affectedRows) {
                        setSaveBtnState('disabled')
                        toast.success("Done !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else {
                            toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                            setLS(false)
                        }
                })
                    
            }        
    }
    const GenrateKey = () =>{
        let ID = Math.random().toString(36).slice(2, 8);
        let PWD =  Math.floor(Math.random() * 1000000);
        setCamionD({...camionD, Identifiant: ID , Password:PWD})
    }


    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionAdd} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                         <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Matricule:</h5>
                            <Input icon='key' iconPosition='left' placeholder='Matricule' className='w-100 border-0 shadow-sm rounded mb-1'  onChange={(e) => setCamionD({...camionD, Matricule: e.target.value })}/>
                         </div>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom:</h5>
                            <Input icon='truck' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Cam_Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Marque:</h5>
                            <Input icon='star' iconPosition='left' placeholder='Marque' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Marque: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Chauffeur:</h5>
                            <Input icon='user' iconPosition='left' placeholder='Chauffeur' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Chauffeur: e.target.value })}/>
                        </div>
                        <div className='row mb-3'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Identifiant:</h5>
                                    <Input icon='linkify' iconPosition='left' placeholder='identifiant'  className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Identifiant} onChange={(e) => setCamionD({...camionD, Identifiant: e.target.value })} />
                                </div>
                                <div className='col-9 col-lg-5'>
                                    <h5 className='mb-1'>Mot De Pass: </h5>
                                    <Input icon='eye' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Password} onChange={(e) => setCamionD({...camionD, Password: e.target.value })}/>
                                </div>
                                <div className='col-3 col-lg-1 align-self-center'>
                                   <Button onClick={GenrateKey} className="rounded-pill " icon='random'></Button>
                                </div>
                        </div> 
                        <div className='text-end mb-5'>
                            <Button  onClick={SaveCamion}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`} positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterCamion;