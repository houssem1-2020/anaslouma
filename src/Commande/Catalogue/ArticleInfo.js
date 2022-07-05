import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Statistic } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import SKLT from '../../AssetsM/usedSlk';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function ArticleInfo() {
    let {AID} = useParams()
    const [articleD, setArticleD] = useState({});
    const [loading , setLoading] = useState(false)

    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock/article`, {
            tag: GConf.SystemTag,
            code: AID, 
          })
          .then(function (response) {
                setArticleD(response.data[0])
                setLoading(true)
          })
    }, [])

    //card
    const ArticleCard = (props) =>{
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container">
                            <img src={`https://anaslouma.tn/Assets/images/Articles_Images/alimentaire/${props.data.Photo_Path}`} className="rounded-circle" width="80" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.Genre } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-house-heart-fill"></span> { props.data.Socite } </>: SKLT.BarreSkl } </h6>
                            <div className='text-start'>
                                <small>{loading ? props.data.Details : SKLT.BarreSkl } </small> 
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Prix</Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {props.data.Prix_achat} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Achat</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Prix_vente} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Vente</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Quantite</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Quantite} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                    </Statistic>
                                </div>
                                <div className='col-6  align-self-center border-end'>
                                    <span className='bi bi-exclamation-triangle-fill bi-sm text-danger'></span>
                                </div>
                                <div className='col-6 align-self-center'>
                                <h6 className='mb-1'> Repture En: {props.data.Repture}</h6> 
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }

    return ( <>
        <BackCard data={InputLinks.backCard.cgInfo}/>
        <br />
         <div className='container-fluid'>
            <ArticleCard data={articleD}/> 
         </div>
        </> );
}

export default ArticleInfo