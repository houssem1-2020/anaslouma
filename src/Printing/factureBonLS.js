import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/generalConf';

function BonsLivTemp(props) {
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

    const BonHeader = (props) =>{
        return(<>
            <h2 className='text-center'>Bon De {props.genre} </h2> 
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
        </>)
    }

    return ( <>
           <div className="container mb-4">
                <BonHeader  genre={props.genre} />
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
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
            <div className='mt-4'>
                Valable de jusqu'a 
            </div> 
           
    </> );
}

export default BonsLivTemp;