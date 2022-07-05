import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider, Segment } from 'semantic-ui-react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


function MessagesList(props) {
    const messagesList = [
        {id:1, convID: 78542368, name:'Khelifi Houssem', lastMsg:'L\'equipe est done', messageState:'', msgDate:'14:33'},
        {id:2, convID: 98568985, name:'Mourad Tounsi', lastMsg:'Je suis çava maitenaint', messageState:'', msgDate:'15-mar'},
        {id:3, convID: 12547835, name:'Esia Sahli', lastMsg:'je sentit pas d\accord ce nuit ', messageState:'', msgDate:'2 sem'},
        {id:4, convID: 58744563, name:'Sfaxi Rym', lastMsg:'je confirme l\'achat de produit', messageState:'', msgDate:'14-jan'},
        {id:5, convID: 66985571, name:'Bizerti Maram', lastMsg:'la commandes est annulé parceque vou n\'avait pas payeé', messageState:'',msgDate:'30-avr' },
        {id:6, convID: 11254785, name:'Gabsi akrem', lastMsg:'la commandes est annulé parceque vou n\'avait pas payeé', messageState:'',msgDate:'mai-2021' },
        {id:7, convID: 78421030, name:'خالد التونسي', lastMsg:'la commandes est annulé parceque vou n\'avait pas payeé', messageState:'',msgDate:'30-juin' },
        {id:8, convID: 33254788, name:'سمير النابلي', lastMsg:'la commandes est annulé parceque vou n\'avait pas payeé', messageState:'',msgDate:'10:12' },
        {id:9, convID: 45875242, name:'KEFI AHMED', lastMsg:'la commandes est annulé parceque vou n\'avait pas payeé', messageState:'',msgDate:'2 ans' },
        {id:10, convID: 87554264, name:'Ma Ri Yem', lastMsg:'la commandes est annulé parceque vou n\'avait pas payeé', messageState:'',msgDate:'1 sem' },
    ]
    const MessageItem = (props) => {
        return (<>
        <div className='card p-2 mb-0 rounded-pill mb-1 '>
            <div class="d-flex align-items-center ">
                <div class="flex-shrink-0">
                    <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" className='rounded-circle' width='40px' alt="..." />
                </div>
                <div class="flex-grow-1 ms-3"> 
                    <div className='row'>
                        <div className='col-9'><NavLink exact="true" to={`/S/mg/${props.id}`}> <b> {props.name}</b> </NavLink></div>
                        <div className='col-3 text-secondary'><small>{props.msgDate}</small></div>
                    </div>
                    <h6><small>{props.lastMsg}</small></h6>
                </div>
            </div>
        </div>
            </>)
    }
    return (<>

         <div style={{height:'500px', overflowX:'auto', paddingRight:'3px'}} className={props.showed}>
             {messagesList.map( (msgData)=> <MessageItem key={msgData.id} id={msgData.convID} name={msgData.name} lastMsg={msgData.lastMsg} msgDate={msgData.msgDate} />)}    
        </div>
        <br />
    </>);
}

export default MessagesList;