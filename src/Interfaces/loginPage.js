import React ,{useEffect, useState} from 'react';
import { Button, Icon, Input, Segment } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';
import { toast } from 'react-toastify';
import axios from 'axios';

function InputLoginPage() {
    //const 
    const [loginD, setLoginD] = useState([])
    
    //useEffect
    useEffect(() => {
        const inputIsLogged = localStorage.getItem('InputCamion');
        if (inputIsLogged) {window.location.href = "/I/L/ma";}
        
    });

    const logInSystem = () =>{
        if (!loginD.Log) {toast.error("Entrer Un identifiant !", GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error("Entrer Le mot DP  !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiCamionLink}/LogIn`, {
                tag : GConf.SystemTag,
                LoginData : loginD,
            }).then(function (response) {
                console.log(response.data)
                if(response.data[0] == 'true') {
                    toast.success("Done !", GConf.TostSuucessGonf)
                        localStorage.setItem('InputCamion', response.data[1]);
                        localStorage.setItem('InputCamionData', response.data[2]);
                        window.location.href = "/I";
                }
                else{
                    toast.error('Ce Camion n\'existe pas ! ', GConf.TostSuucessGonf)
                    
                }
            })
        } 
    }

    return ( <>
             <div className='container d-flex align-items-center justify-content-center' style={{paddingTop:'100px'}}>
                <div className='col-12 col-lg-5'>
                <Segment padded className='sub-sys-round' style={{borderBottom:`3px solid ${GConf.themeColor}`}}>
                            <h2 className='text-cente'><Icon name='linkify' /> Connexion :</h2>
                            <br />
                            <div className='mb-3'>
                                <Input   icon='user' iconPosition='left' placeholder='Identification' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Log: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Input  icon='key' iconPosition='left' placeholder='Mot DP' type='password' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Button onClick={logInSystem}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm w-100'>Connextion</Button>
                            </div>
                </Segment>
                </div>
            </div>
            
    </> );
}

export default InputLoginPage;