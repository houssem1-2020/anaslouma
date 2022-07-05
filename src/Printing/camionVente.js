import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/Conf';

function CamionVente() {
    let {d,cid} = useParams()
    let [articleL, setArticleL] = useState([])

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion/info/printing/venteFacture`, {
            tag: GConf.SystemTag,
            camId : cid,
            date : d
          })
          .then(function (response) {
            console.log(response.data)
            setArticleL(response.data)
            
    
          })
    }, [])


    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>Facture Camion Pour {d} </h2> 
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
                         {articleL.map( (artData, i) => 
                            <tr key={i+1} >
                                <th scope="row">{i+1}</th>
                                <td>{new Date(artData.Cre_Date).toISOString().split('T')[0]}</td>
                                <td>{artData.C_Name}</td>
                                <td>{artData.Tota}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
           
    </> );
}

export default CamionVente;