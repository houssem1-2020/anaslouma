import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/generalConf';

function PrintStock() {
    let {g} = useParams()
    let [articleL, setArticleL] = useState([])
    let [factureData, setFactData] = useState([])

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/tools/recette`, {
            tag: GConf.SystemTag,
            start: g
          })
          .then(function (response) {
                setArticleL(JSON.parse(response.data[0].Articles))
                setFactData(response.data[0])
    
          })
    }, [])



    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>RESUMER DES RECETTE  </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-danger'><b>STE ANASLOUMA DISTRUBUTION</b></div>
                        <div className='text-secondary'><b>VILLE: </b> SIDI BOUROUIS</div>
                        <div className='text-secondary'><b>MATRICULE F : </b> 1670146/D</div>
                        <div className='text-secondary'><b>TEL : </b> 97913068</div>
                        <div className='text-secondary'><b>FAX : </b> 78898081</div>
                    </div>
                    <div className='col-6'>
                        <div className='text-secondary'><b>1 er Date  : {g}</b> </div>
                        <div className='text-secondary'><b>2 éme Date :  {g}</b></div>
                    </div>
                </div>
                <br />   
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Client</th>
                        <th scope="col">Totale</th>
                        </tr>
                    </thead>
                    <tbody>
                         {articleL.map( (artData) => 
                            <tr key={artData.id}>
                                <th scope="row">{artData.id}</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Qte}</td>
                                <td>{artData.Qte}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>

           
    </> );
}

export default PrintStock;