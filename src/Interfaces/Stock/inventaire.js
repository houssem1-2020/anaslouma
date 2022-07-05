import React from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function StockInventaire() {
    return ( <>
            <BackCard data={InputLinks.backCard.skInv}/>
            <br />
            StockInventaire
        </> );

}

export default StockInventaire;