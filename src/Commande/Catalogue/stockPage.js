import React from 'react';
import LinkCard from '../Assets/linksCard'
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'
import LandingList from '../Assets/landingList';


function Stock() {
    return ( <>
        <BackCard data={InputLinks.backCard.cg}/>
        <br />
        <LandingList list={InputLinks.stock} />
        </> );
}

export default Stock;