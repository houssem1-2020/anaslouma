import React from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
function FactureInfo() {
    return ( <>
        <BackCard data={InputLinks.backCard.mfInfo}/>
        <br />
        FactureInfo
    </> );
}

export default FactureInfo;