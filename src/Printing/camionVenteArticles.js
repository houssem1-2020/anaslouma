import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/Conf';

function CamionVenteArticles() {
    let {d,cid} = useParams()
    let [articleL, setArticleL] = useState([])

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion/info/printing/venteArticle`, {
            tag: GConf.SystemTag,
            camId : cid,
            date : d
          })
          .then(function (response) {
            setArticleL(response.data)
            
    
          })
    }, [])


    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>Article Vendu Pour {d} </h2>
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Code</th>
                        <th scope="col">Artifcle</th>
                        <th scope="col">Qte</th>
                        </tr>
                    </thead>
                    <tbody>
                         {articleL.map( (artData, i) => 
                            <tr key={i+1}>
                                <th scope="row">{i+1}</th>
                                <th scope="row">{artData.A_Code}</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Qte}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
           
    </> );
}

export default CamionVenteArticles;