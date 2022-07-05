import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/Conf';

function CamionFond() {
    let {s,e,cid} = useParams()
    let [articleL, setArticleL] = useState([])

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion/info/printing/fondResumer`, {
            tag: GConf.SystemTag,
            camId : cid,
            start: s,
            end: e
          })
          .then(function (response) {
                setArticleL(response.data)
                console.log(response.data)
    
          })
    }, [])


    return ( <>
           <div className="container mb-4">
           <h2 className='text-center'>Resumer des Fond entre {s} & {e}</h2>
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Fond</th>
                        <th scope="col">Nbre Factures</th>
                        <th scope="col">Depenses</th>
                        </tr>
                    </thead>
                    <tbody>
                         {articleL.map( (artData, i) => 
                            <tr key={i+1}>
                                <th scope="row">{i+1}</th>
                                <th>{new Date(artData.Jour).toISOString().split('T')[0]}</th>
                                <td>{artData.Totale.toFixed(3)}</td>
                                <td>{artData.Totale.toFixed(3)}</td>
                                <td>{artData.Totale.toFixed(3)}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
           
    </> );
}

export default CamionFond;