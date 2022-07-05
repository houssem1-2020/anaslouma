import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../AssetsM/generalConf';

function FactureTemp() {
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

    //function
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseInt(value) * facteur_p).toFixed(3) 
    }
    //card
    const FactureHeader = () =>{
        return(<>
                <h2 className='text-center'>Facture N: {factureData.PK} </h2> 
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
                        <div className='text-secondary'><b>M.F: </b> {factureData.C_Name}</div>
                    </div>
                </div>
        </>)
    }
    const TotaleCard = () =>{
        return(<>
            <div className='row'>
                <div className='col-6'>
                </div>
                <div className='col-6'>
                    <table className="table">

                        <tbody>
                            <tr>
                                <th scope="col">Totale hors tax:</th>
                                <th scope="col">{CalculateTVA(factureData.Tota)}</th>
                            </tr>
                            <tr>
                                <th scope="col">TVA: </th>
                                <th scope="col">{(factureData.Tota - CalculateTVA(factureData.Tota)).toFixed(3)}</th>
                            </tr>
                            <tr>
                                <th scope="col">Timbre:</th>
                                <th scope="col">0.600 DT</th>
                            </tr>
                            <tr>
                                <th scope="col">Net A Payee TTC:</th>
                                <th scope="col">{(parseInt(factureData.Tota) + 0.600).toFixed(3)}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
    }

    return ( <>
           <div className="container mb-4">
                <FactureHeader />
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
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
                                <td>{CalculateTVA(artData.Prix)}</td>
                                <td>{GConf.DefaultTva} %</td>
                                <td>{artData.Prix.toFixed(3)}</td>
                                <td>{artData.PU}</td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>
            <TotaleCard />
           
    </> );
}

export default FactureTemp;