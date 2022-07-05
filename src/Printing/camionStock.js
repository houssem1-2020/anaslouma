import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/Conf';

function CamionStock(props) {
    let {cid} = useParams()
    let [articleL, setArticleL] = useState([])

    useEffect(() => {
        
        axios.post(`${GConf.ApiLink}/camion/info/printing/stock`, {
            tag: GConf.SystemTag,
            camId: cid,
            genre : props.zero ? '=':'!='
          })
          .then(function (response) {
                setArticleL(response.data)
                console.log(response.data)
    
          })
    }, [])



    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>Stock Du Camion {props.zero ? 'à Zero ' : ''} </h2> 
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Artifcle</th>
                        <th scope="col">Designiation</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Qté</th>
                        <th scope="col">Qté K</th>
                        <th scope="col">P</th>
                        </tr>
                    </thead>
                    <tbody>
                         {articleL.map( (artData) => 
                            <tr key={artData.PK}>
                                <th scope="row">{artData.A_Code}</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Genre}</td>
                                <td>{artData.Qte}</td>
                                <td>{artData.Qte / artData.Groupage}</td>
                                <td></td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
           
    </> );
}

export default CamionStock;