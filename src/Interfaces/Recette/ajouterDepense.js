import React from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
function DepenseRecette() {
    return ( <>
        <BackCard data={InputLinks.backCard.rtDeps}/>
        <br />
        Depenserecette
    </> );
}

export default DepenseRecette;