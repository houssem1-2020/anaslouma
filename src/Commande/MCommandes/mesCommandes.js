import React from 'react';
import LinkCard from '../Assets/linksCard'
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'
import LandingList from '../Assets/landingList';

function MesCommandes() {
    return ( <>
        <BackCard data={InputLinks.backCard.mf}/>
        <br />
        <LandingList list={InputLinks.facture} />
        </> );
}

export default MesCommandes;