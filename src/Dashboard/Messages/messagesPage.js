import React, { useEffect, useRef, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Form, Segment, TextArea } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/usedSlk';

const SendBox = ({SendMessage, setMesgC,msgContent}) =>{
    return(<>
             <div className='row '>
                <div className='col-10 align-self-center'>
                <Form>
                    <TextArea placeholder='Ajouter Notes ici' value={msgContent} className="mb-2 rounded-pill" rows='1' onChange={ (e) => setMesgC(e.target.value)}></TextArea>
                </Form>
                </div>
                <div className='col-2 align-self-center text-end'><Button  icon='send'  className='rounded-circle mb-2' onClick={SendMessage}></Button></div>
            </div>
        </>)
}

function MessagesPages() {
    const messagesEndRef = useRef(20)
    const [messagesList, setMessageList] = useState([])
    const [msgContent, setMesgC] = useState('')
    const [updateS, setUpdateS] = useState()
    const [loading , setLoading] = useState(false)
    const convDetail = [
        {id: 1, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'CAMION', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'CAMION', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'CAMION', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'CAMION', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'CAMION', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'CAMION', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'SYSTEM', message:'Bonjour houssem', time:'10:12'},
    ]

    //use Effect
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/message`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            setMessageList(response.data)
            console.log('time : '+ new Date().toLocaleTimeString())
            setLoading(true)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        })
        
    }, [updateS])
    
    //Function
    const SendMessage = () =>{
        if (!msgContent) {toast.error("Message Vide !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiLink}/message/ajouter`, {
                tag: GConf.SystemTag,
                msgC: msgContent,
            })
            .then(function (response) {
                if(response.data.affectedRows) {
                    setUpdateS(Math.random() * 10);
                    setMesgC('')
                    toast.success("Envoyer", GConf.TostSuucessGonf)
                   
                    console.log(response.data)
                }
                else{
                    toast.error('Erreur', GConf.TostSuucessGonf)
                    console.log(response.data)
                }
            })

        }
    }
    const SentMessage = (props) => {
        return(<>
                <div className="row">
                    <div className='col-2 align-self-center text-end text-secondary'><small>{props.content.Sent_Time}</small></div>
                    <div className='col-10'>
                        <div className="d-flex ">
                            <div className="flex-grow-1 me-1">
                               <div className='text-end'><small className='text-secondary'>{new Date(props.content.Sent_Date).toLocaleDateString('en-US')}</small></div>
                                <div className='card p-2 rounded-message-s mb-3 ps-4 pe-2' style={{backgroundColor:'#f0d584'}}  >{props.content.Content}</div>
                            </div>
                            <div className="flex-shrink-0 ">
                                <i className="bi bi-circle-half bi-md text-warning"></i>
                            </div>
                        </div>
                    </div>
                </div>     
            </>)
    }
    const RecivedMessage = (props) => {
        return(<>
                <div className="row">
                    <div className='col-10'>
                        <div className="d-flex ">
                                <div className="flex-shrink-0 ">
                                    <i className="bi bi-truck bi-md text-success"></i>
                                </div>
                                <div className="flex-grow-1 ms-1">
                                    <small className='text-secondary'>{props.content.Sender} ( {new Date(props.content.Sent_Date).toLocaleDateString('en-US')} )</small>
                                    <div className='card p-2 rounded-message-r  mb-3 ps-2 pe-4' style={{backgroundColor:'#8affc9'}}>{props.content.Content}</div>
                                </div>
                        </div>
                        
                    </div>
                    <div className='col-2 align-self-center text-start text-secondary'><small>{props.content.Sent_Time}</small></div>
                </div> 
                
            </>)
    }
    const MessagesDetails = () =>{

         return(
                 messagesList.map( (convMsg) => convMsg.Sender == 'SYSTEM' ? <SentMessage content={convMsg} /> : <RecivedMessage content={convMsg} />)
                 )

    }

    
    return (<>
        
            <h5><span className="bi bi-chat-left-text-fill"></span> Messages</h5>
            <br />
            <div className="row p-0">
                <div className="col-12 col-lg-2 d-none d-lg-block">     
                </div>
                <div className="col-12 col-lg-8">
                    <Segment style={{height:'450px', overflowX:'auto', overflowX:'hidden', }}>
                    {loading ?  
                    <MessagesDetails />
                    : SKLT.CardList }
                    <div ref={messagesEndRef} />
                    </Segment>   
                    <SendBox SendMessage={SendMessage} setMesgC={setMesgC} msgContent={msgContent}/> 
                </div>
            </div>
    </>);
}

export default MessagesPages;