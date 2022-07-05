import React from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';
function ComptesCommandes() {
    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.RequestCompte} />
        <br />
        Comptes Commandes
    </> );
}

export default ComptesCommandes;