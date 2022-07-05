import React from 'react';
import { Button, Segment } from 'semantic-ui-react'
import { NavLink, useParams } from "react-router-dom";

function MessageDetail(props) {
    const convDetail = [
        {id: 1, genre:'PU', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'UP', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'UP', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'PU', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'UP', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'PU', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'UP', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'PU', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'UP', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'PU', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'PU', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'UP', message:'Bonjour houssem', time:'10:12'},
        {id: 2, genre:'PU', message:'Bonjour houssem', time:'10:12'},
    ]
    
    let { mid }= useParams();
    const NoMessagePage = () => {
        return(<>
                <br />
                <h1 className='text-danger text-center'>Selectioneez Une Conversation</h1>
            </>)
    }
    const PtoU = () => {
        return(<>
                <div className="row">
                    <div className='col-2 align-self-center text-end text-secondary'><small>12:14</small></div>
                    <div className='col-10'>
                        <div className="d-flex ">
                            <div className="flex-grow-1 me-1">
                                <div className='card p-2 rounded-message-s mb-3 ps-4 pe-2' style={{backgroundColor:'#f0d584'}}  >message lifghpisrughpqrguh proghposghqsp luhspodgh posudhp sdhspd spdughsd puhqsdp hspughsq pduhqs puhfp uqhfdspguqhs gpuhspguqsfhqfp guhpsguqhs puhpuhuh iu</div>
                            </div>
                            <div className="flex-shrink-0 ">
                                <i className="bi bi-circle-half bi-md text-warning"></i>
                            </div>
                        </div>
                    </div>
                </div>     
            </>)
    }

    const UtoP = () => {
        return(<>
                <div className="row">
                    <div className='col-10'>
                        <div className="d-flex ">
                                <div className="flex-shrink-0 ">
                                    <i className="bi bi-person-circle bi-md text-success"></i>
                                </div>
                                <div className="flex-grow-1 ms-1">
                                    <div className='card p-2 rounded-message-r  mb-3 ps-2 pe-4' style={{backgroundColor:'#8affc9'}}>gsGS dfmoigh dpfohjdpofihgjdfp oigdfpoigh dfpoihsdpohsd pohjdsfpoi hjsdpo jdspoihjsdpohijp osjdoihsjdpo jpoi</div>
                                </div>
                        </div>
                        
                    </div>
                    <div className='col-2 align-self-center text-start text-secondary'><small>12:14</small></div>
                </div> 
                
            </>)
    }

    const MessagesDetails = () => {
        return(
                convDetail.map( (convMsg) => convMsg.genre == 'PU' ? <PtoU /> : <UtoP />)
            )
    }
    return (<>
        <div className={props.showed}>
            <div className='d-lg-none'><NavLink exact="true" to='/S/msg'>  <Button circular icon='arrow left' /> </NavLink></div>
            <Segment  style={{height:'400px', overflowX:'auto', overflowX:'hidden', paddingRight:'3px'}}>
            
            {mid ? <MessagesDetails /> : <NoMessagePage />}
            </Segment>
        </div>    
    </>);
}

export default MessageDetail;