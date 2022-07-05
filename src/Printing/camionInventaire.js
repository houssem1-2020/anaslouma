import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/Conf';

function CamionInventaire() {
    let {fid} = useParams()
    let [articleL, setArticleL] = useState([])
    let [factureData, setFactData] = useState([])

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/facture/select`, {
            tag: GConf.SystemTag,
            fid: fid
          })
          .then(function (response) {
                setArticleL(JSON.parse(response.data[0].Articles))
                setFactData(response.data[0])
    
          })
    }, [])



    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>Bon De Livraison </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-danger'><b>STE ANASLOUMA DISTRUBUTION</b></div>
                        <div className='text-secondary'><b>VILLE: </b> SIDI BOUROUIS</div>
                        <div className='text-secondary'><b>MATRICULE F : </b> 1670146/D</div>
                        <div className='text-secondary'><b>TEL : </b> 97913068</div>
                        <div className='text-secondary'><b>FAX : </b> 78898081</div>
                    </div>
                    <div className='col-6'>
                        <div className='text-secondary'><b>CODE FACTURE : </b> {fid}</div>
                        <div className='text-secondary'><b>CLIENT: </b> {factureData.C_Name}</div>
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
                        </tr>
                    </thead>
                    <tbody>
                         {articleL.map( (artData) => 
                            <tr key={artData.id}>
                                <th scope="row">{artData.id}</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Qte}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
            <div className='card card-body mb-2'>
                <h5>Facture</h5>
                <div>Totale hors tax: </div>
                <div>TVA: </div>
                <div>Timbre: </div>
                <div className='text-danger'><b>Net A Payee TTC: {factureData.Tota}</b></div>
            </div>
           
    </> );
}

export default CamionInventaire;