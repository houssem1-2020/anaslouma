import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import axios from 'axios';

function CalendarCommandes() {
    /*#########################[Const]##################################*/
    const [articleEvents , setArticleEvents] = useState([])

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/commande`, {
           tag: GConf.SystemTag,
        })
        .then(function (response) {
            let commandeContainer = []
            response.data.map( (commandeDate) => commandeContainer.push( { title: commandeDate.Client, date: new Date(commandeDate.Date_Volu).toISOString().split('T')[0] }))
            setArticleEvents(commandeContainer)
        })
    }, [])

    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.RequestCalendar} />
        <br />
        <FullCalendar 
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            locale='fr' 
            events={articleEvents}
            height='510px'
            //allDaySlot= {false}
        />
        <br />
        <br />
    </> );
}

export default CalendarCommandes;