import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Input,  Header, Grid, Segment} from 'semantic-ui-react'
import GConf from '../AssetsM/generalConf';
import Bounce from 'react-reveal/Bounce';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

function LogIn() {
    /*#########################[Const]##################################*/
    const [loginD, setLoginD] = useState([])

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        const pidIsSet = localStorage.getItem(`${GConf.SystemTag}_Secure_key`);
        if (pidIsSet) {window.location.href = "/S/ma";}      
    });

    /*#########################[Functions]##################################*/
    const logIn = () =>{
        if (!loginD.Log) {toast.error("Entrer Un identifiant !", GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error("Entrer Le mot DP  !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiLink}/LogIn`, {
                LoginData : loginD,
            }).then(function (response) {
                if(response.data[0] == 'true') {
                    toast.success("Connecteé !", GConf.TostSuucessGonf)
                    localStorage.setItem(`${GConf.SystemTag}_Secure_key`, response.data[1]);
                    window.location.href = "/";
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    
                }
            })
        }   
    }

    /*#########################[Card]##################################*/
    const LeftCard = (props) =>{
        return(
            <>
            <div className='col-12 col-lg-4  text-center d-none d-lg-block fixed-top' style={{backgroundColor:props.color, height:'100vh' }}>
                
            </div>
            </>
        )
    }
    const SubSystemLink = (props) => {

        return (<>
    
            <Segment className='p-3 sub-sys-round w-login-input'>
                <NavLink exact='true' to={props.link}>
                    <Grid>
                        <Grid.Column className="align-self-center" mobile={12} tablet={12} computer={13}>
                            <div className="d-flex align-self-center ">
                                <div className="flex-shrink-0 ps-3 align-self-center">
                                <i className={`bi bi-${props.icon} bi-md`}></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5 className="mb-2"> {props.title}</h5>
                                    <small> {props.text} </small>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="p-4 text-center align-self-center pe-4" mobile={4} tablet={4} computer={3}>
                            <i className="bi bi-arrow-right-short bi-md"></i>
                        </Grid.Column>
                    </Grid> 
                </NavLink>
            </Segment>
        </>);
    }

    return (<> 
        <LeftCard color={GConf.themeColor}/>
        <div className='row'>
            <div className='col-12 col-lg-5'></div>
            <div className='col-12 col-lg-7 '>
                <div className='card-body' >
                <Bounce left>
                            <br />
                            <br />
                            <br />
                            <h2 className='text-cente'><Icon name='linkify' /> Connexion :</h2>
                            <br />
                            <div className='mb-3'>
                                <Input   icon='user' iconPosition='left' placeholder='Identification' className='shadow-sm w-login-input'  onChange={(e) => setLoginD({...loginD, Log: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <Input  icon='key' iconPosition='left' placeholder='Mot DP' type='password' className='shadow-sm w-login-input'  onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Button onClick={logIn}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm w-login-input'>Connextion</Button>
                            </div>
                            <br />
                            <Divider horizontal className='w-login-input'>
                                <Header as='h4'>
                                    <Icon circular inverted name='thumbtack' color="yellow" />
                                </Header>
                            </Divider>
                            
                            <SubSystemLink title="Commandes" text="Interface Pour Enregistrer Des Commandes" icon="file-spreadsheet-fill" link="/C"/>
                            <br />
                            <SubSystemLink title="Camions" text="Interface Pour Les Camions" icon="truck" link="/I"/>
                    </Bounce>
                </div>
            </div>
        </div> 
    </>);
}

export default LogIn;