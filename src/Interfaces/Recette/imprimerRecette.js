import React from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
function ImprimerRecette() {
    return ( <>
        <BackCard data={InputLinks.backCard.rtImpr}/>
        <br />
        RechercheVnete
    </> );
}

export default ImprimerRecette;