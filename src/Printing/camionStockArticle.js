import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/Conf';

function CamionStockArticle() {
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
                <h2 className='text-center'>Facture Client </h2> 
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
            <div className='card card-body mb-2'>
                <h5>Facture</h5>
                <div>Totale hors tax: </div>
                <div>TVA: </div>
                <div>Timbre: </div>
                <div className='text-danger'><b>Net A Payee TTC: {factureData.Tota}</b></div>
            </div>
           
    </> );
}

export default CamionStockArticle;