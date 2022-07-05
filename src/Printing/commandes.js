import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/generalConf';

function CommandeTemp(props) {
    let {cid} = useParams()
    let [articleL, setArticleL] = useState([])
    let [commandeData, setCommandeD] = useState([])

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/commande/info`, {
            tag: GConf.SystemTag,
            cid: cid
          })
          .then(function (response) {
                setArticleL(JSON.parse(response.data[0].Articles))
                setCommandeD(response.data[0])
    
          })
    }, [])



    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>Commande </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>CODE FACTURE : </b> {cid}</div>
                        <div className='text-secondary'><b>CLIENT: </b> {commandeData.Client } </div>
                    </div>
                    <div className='col-6'>
                        <div className='text-secondary'><b>Passé Le  : </b> {new Date(commandeData.Date_Passe).toLocaleDateString('en-US')} </div>
                        <div className='text-secondary'><b>Voulu Le : </b> {new Date(commandeData.Date_Volu).toLocaleDateString('en-US')}  </div>
                    </div>
                </div>
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Artifcle</th>
                        <th scope="col">Designiation</th>
                        <th scope="col">Qté</th>
                        <th scope="col">PUHT</th>
                        <th scope="col">TVA</th>
                        <th scope="col">PUTTC</th>
                        <th scope="col">Prix Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articleL.map( (artData) => 
                            <tr key={artData.id}>
                                <th scope="row">{artData.id}</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Qte}</td>
                                <td>{artData.Prix}</td>
                                <td>0%</td>
                                <td>{artData.Prix}</td>
                                <td>{artData.PU}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            <div className='row'>
                <div className='col-6'>
                </div>
                <div className='col-6'>
                    <table className="table">

                        <tbody>
                            <tr>
                                <th scope="col">Totale hors tax:</th>
                                <th scope="col"></th>
                            </tr>
                            <tr>
                                <th scope="col">TVA: </th>
                                <th scope="col"></th>
                            </tr>
                            <tr>
                                <th scope="col">Timbre:</th>
                                <th scope="col">0.600 DT</th>
                            </tr>
                            <tr>
                                <th scope="col">Net A Payee TTC:</th>
                                <th scope="col">{commandeData.Totale}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           
    </> );
}

export default CommandeTemp;