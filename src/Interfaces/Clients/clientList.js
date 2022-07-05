import React from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function ClientList() {
    return ( <>
        <BackCard data={InputLinks.backCard.clList}/>
        <br />
        <div className='container'>
            List
        </div>
        </> );
}

export default ClientList