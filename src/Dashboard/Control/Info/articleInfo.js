import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../../../AssetsM/generalConf';
import BreadCrumb from '../../Assets/breadCrumb';
import {  _ } from "gridjs-react";
import TableGrid from '../../Assets/tableGrid';

function CamionArticleInfo() {
    /* ############################### Const ################################*/
    const {CID} = useParams()
    const {Article} = useParams()
    const [fondListCamion, setFonfListCamion] = useState([]);
    const [factureCamion, setFactureCamion] = useState([]); 
    const [suivieArticle, setArticleSuivie] = useState([]); 

    /* ############################### UseEffect ################################*/ 
     useEffect(() => {
        //camion Info
        axios.post(`${GConf.ApiLink}/camions/info/article`, {
            tag: GConf.SystemTag,
            article: Article,
            camId : CID
        })
        .then(function (response) {
            let fondTable = []
            response.data[0].InFond.map( (getData) => fondTable.push([new Date(getData.Jour).toLocaleDateString('en-US'), getData.Bon_id, GetTargetArticleQteFromFond(getData.Articles)],))
            setFonfListCamion(fondTable)

            let factureTable = []
            response.data[0].InFact.map( (getData) => factureTable.push([new Date(getData.Cre_Date).toLocaleDateString('en-US'), getData.C_Name, GetTargetArticleQteFromFacture(getData.Articles)],))
            setFactureCamion(factureTable)
            
            let suivieTable = []
            response.data[0].FromSuivie.map( (getData) => suivieTable.push([new Date(getData.ModiDate).toLocaleDateString('en-US'), getData.LastModi, getData.Modification, getData.NewStock],))
            setArticleSuivie(suivieTable)
        })

    }, [])

    /* ############################### Function ################################*/
    const GetTargetArticleQteFromFacture = (value) =>{
        const JsValue = JSON.parse(value)
        const searchObject= JsValue.find((article) => article.A_Code == Article);
        return searchObject.Qte
    }
    const GetTargetArticleQteFromFond = (value) =>{
        const JsValue = JSON.parse(value)
        const searchObject= JsValue.find((article) => article.A_Code == Article);
        return searchObject.QteAjoute
    }

    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.CamionArticleInfo} />
        <br />

        <div className="row">
                <div className="col-12 col-lg-4">
                   <h5>Fond:</h5> 
                   <TableGrid tableData={fondListCamion} columns= {['Jour', 'Qte','Genre']} />    
                </div>
                <div className="col-12 col-lg-4">
                    <h5>Factures:</h5>
                    <TableGrid tableData={factureCamion} columns= {['Jour', 'Client','Qte']} />
                </div>
                <div className="col-12 col-lg-4">
                    <h5>Suivie:</h5>
                    <TableGrid tableData={suivieArticle} columns= {['Jour', 'Stock','Vente','Reste']} />
                </div>
        </div>
    </> );
}

export default CamionArticleInfo;