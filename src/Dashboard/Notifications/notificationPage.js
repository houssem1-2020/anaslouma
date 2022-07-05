import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Segment } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import SKLT from '../../AssetsM/usedSlk';
import NG from './notifGenre';


function NotificationPage() {
    //variables
    const [notificationList, setNotifList] = useState([])
    const [loading , setLoading] = useState(false)

    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/notifications`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            setNotifList(response.data)
            setLoading(true)
        })
    }, [])

    //functions


    //card
    const NotifCard = (props) => {
        return ( <>
                    <div className='card shadow-sm mb-2 p-3'>
                        <div className='row '>
                            <div className='col-1 align-self-center text-center d-none d-lg-block'>
                                <span  className={`bi ${props.icon} bi-md me-2`}></span>  
                            </div>
                            <div className='col-12 col-lg-9 text-left'>
                                <h4><span  className={`bi ${props.titleIcon} me-1`}></span>  {props.title}</h4>
                                <small>{props.descr} </small>
                            </div>
                            <div className='col-12 col-lg-2 d-none d-lg-block align-self-center text-center text-secondary'>    
                                <h6><b><span  className='bi bi-alarm'></span>  {props.time}</b></h6>
                                <h6>{props.date}</h6>
                            </div>
                        </div> 
                    </div>
                </> )
    }
    return (<>
        <Bounce bottom>
            <h5><span className="bi bi-bell-fill"></span> Notification</h5>
            <br />
            {loading ?  
                    <>
                        {
                notificationList.map( (nData) => <>
                        <NotifCard key={nData.id} icon={NG[nData.Genre].icon}  title={NG[nData.Genre].title} titleIcon={NG[nData.Genre].titleIcon} descr={nData.Description} date={new Date(nData.N_Date).toLocaleDateString('en-US')} time={nData.N_Time}  />
                    </>)
            }
                    </>
                    : SKLT.CardList }

            
            <br />
        </Bounce>
    </>);
}

export default NotificationPage;