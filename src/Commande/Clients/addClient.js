import React, { useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Icon, Input } from 'semantic-ui-react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function AddClient() {
    const [camionD, setCamionD] = useState([])
    const [saveBtnState, setSaveBtnState] = useState('')

    return ( <>
        <BackCard data={InputLinks.backCard.clAdd}/>
        <br />
        <div className='container'>
        <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                         <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Matricule Fiscale:</h5>
                            <Input icon='key' iconPosition='left' placeholder='Matricule Fiscale' className='w-100 border-0 shadow-sm rounded mb-1'  value={camionD.A_Code} onChange={(e) => setCamionD({...camionD, Matricule: e.target.value })}/>
                         </div>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Cam_Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Telephone :</h5>
                            <Input icon='phone' iconPosition='left' placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Marque: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Nom Sociale:</h5>
                            <Input icon='home' iconPosition='left' placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Chauffeur: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Map:</h5>
                           
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Adresse:</h5>
                           
                        </div>
                        <div className='text-end mb-5'>
                            <Button    className={`text-end rounded-pill bg-system-btn ${saveBtnState}`} positive>  <Icon name='save outline' /> Enregistrer </Button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-4 align-self-center'>
                       {/* <img src='https://i.gifer.com/JOP.gif' width='420px' />  */}
                    </div>
                </div>
            </Bounce>
        </div>
        </> );
}

export default AddClient