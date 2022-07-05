import React from 'react';
import LinkCard from '../Assets/linksCard'
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'
import LandingList from '../Assets/landingList';

function ClientsPage() {
    return ( <>
            <BackCard data={InputLinks.backCard.cl} />
            <br />
            <LandingList list={InputLinks.client} /> 
            </> );
}

export default ClientsPage;