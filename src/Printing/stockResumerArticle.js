import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/generalConf';

function setPageSize() {
    const style = document.createElement('style');
    style.innerHTML = `@page {size: landscape}`;
    style.id = 'page-orientation';
    document.head.appendChild(style);
}

function ResumerArticle(props) {
    let {code, s, e} = useParams()
    let [articleL, setArticleL] = useState([])
    let [venteList, setVenteList] = useState([])

    useEffect(() => {
        setPageSize();
        axios.post(`${GConf.ApiLink}/stock/article/resumer`, {
            tag: GConf.SystemTag,
            code: code
          })
          .then(function (response) {
                setVenteList(response.data)
    
          })
    }, [])

    //function
    const GetTargetArticleQteFromFacture = (value) =>{
        const JsValue = JSON.parse(value)
        const searchObject= JsValue.find((article) => article.A_Code == code);
        return searchObject.Qte
    }

    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>RESUMER ARTICLE  </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>CODE FACTURE : </b> {code}</div>
                        <div className='text-secondary'><b>CLIENT: </b> {s} </div>
                        <div className='text-secondary'><b>CLIENT: </b> {e} </div>
                    </div>
                    <div className='col-6'>
                        <div className='text-secondary'><b>Passé Le  : </b>  </div>
                        <div className='text-secondary'><b>Voulu Le : </b>  </div>
                    </div>
                </div>
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">N0</th>
                            <th scope="col">Facture</th>
                            <th scope="col">Date</th>
                            <th scope="col">Clients</th>
                            <th scope="col">M.F</th>
                            <th scope="col">Quantite</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venteList.map( (factDat) => 
                            <tr key={factDat.PK}>
                                <th scope="row">{factDat.id}</th>
                                <td>{factDat.F_ID}</td>
                                <td>{new Date(factDat.Cre_Date).toLocaleDateString('en-US')}</td>
                                <td>{factDat.C_Name}</td>
                                <td></td>
                                <td>{GetTargetArticleQteFromFacture(factDat.Articles)}</td>
                                <td>{factDat.PU}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
            <br />
            <br />
           
    </> );
}

export default ResumerArticle;