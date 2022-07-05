import React, { useEffect, useState } from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function ArticleInfo() {


    return ( <>
        <BackCard data={InputLinks.backCard.skInfo}/>
        <br />
         <div className='container-fluid'>
            INfo
         </div>
        </> );
}

export default ArticleInfo