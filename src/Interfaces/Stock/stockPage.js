import React from 'react';
import LinkCard from '../Assets/linksCard'
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'

function Stock() {
    return ( <>
        <BackCard data={InputLinks.backCard.sk}/>
        <br />
        <div className='row m-1'>
            {InputLinks.stock.map( (links) => <div  key={links.id}  className='col-12 mb-3'><LinkCard data={links} /></div>)}
        </div>
        </> );
}

export default Stock;