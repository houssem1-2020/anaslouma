import React, { useState } from 'react';
import BreadCrumb from '../Assets/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Select, TextArea } from 'semantic-ui-react';
import useGetCamion from '../Assets/Hooks/fetchCamion';
import { toast } from 'react-toastify';
import axios from 'axios';
import useGetClientMap from '../Assets/Hooks/fetchClientMap';

function AjouterClient() {
    /*################[Variable]###############*/
    const [clientD, setClientD] = useState([])
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [clientMap] = useGetClientMap() 


    /*################[Function]###############*/    
    const SaveClient = (event) => {
        if (!clientD.Code_Fiscale) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Social_Name) {toast.error("Nom Sociale  Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiLink}/client/ajouter`, {
                tag : GConf.SystemTag,
                clientD : clientD,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    setSaveBtnState(true)
                    toast.success("Done !", GConf.TostSuucessGonf)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        }
                })
                    
        }
                
    }


    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.ClientAdd} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                         <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Matricule Fiscale:</h5>
                            <Input icon='key' iconPosition='left' placeholder='Matricule Fiscale' className='w-100 border-0 shadow-sm rounded mb-1'  onChange={(e) => setClientD({...clientD, Code_Fiscale: e.target.value })}/>
                         </div>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setClientD({...clientD, Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Telephone :</h5>
                            <Input icon='phone' iconPosition='left' placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setClientD({...clientD, Phone: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Nom Sociale:</h5>
                            <Input icon='home' iconPosition='left' placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setClientD({...clientD, Social_Name: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Map:</h5>
                            <Select placeholder='Choisir Une Region' options={clientMap}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setClientD({...clientD, Gouv: data.value })} />  
                           
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Adresse:</h5>
                            <Form>
                                <TextArea  rows="3" placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' onChange={(e) => setClientD({...clientD, Adress: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={SaveClient} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer </Button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-4 align-self-center'>
                       
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterClient;