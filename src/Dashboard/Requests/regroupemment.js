import React from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';
function RegrouperCommandes() {
    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.RequestInfo} />
        <br />
        Regrouper Commandes
    </> );
}

export default RegrouperCommandes;