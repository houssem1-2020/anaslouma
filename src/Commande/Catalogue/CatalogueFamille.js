import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import SKLT from '../../AssetsM/usedSlk';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function CatalogueFamille() {
    //variables
    let [familleList, setFamillesList] = useState([]);
    const [loading , setLoading] = useState(false)

    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock/familles`, {
            tag: GConf.SystemTag,
          })
          .then(function (response) {
            setFamillesList(response.data)
            setLoading(true)
          })
    }, [])

    //card
    const FamilleCard = (props) =>{
        return(<>
                <NavLink exact="true" to={`/C/L/cg/List`}>
                    <div className='card p-2 shadow-sm mb-2'>
                        <div className='row'>
                            <div className='col-2'>
                            <img className='rounded-circle' width="35px" src="https://system.anaslouma.tn/Assets/images/old-profile.jpg" alt="user-img" />
                            </div>
                            <div className='col-3 align-self-center text-start'>
                            <h6 className='mb-1'>{props.data.Genre}</h6>
                            </div>

                            <div className='col-5 align-self-center text-start'>
                            <small> {props.data.Description} </small>
                            </div>
                        </div>
                    </div>
                </NavLink>
        </>)
    }

    return ( <>
        <BackCard data={InputLinks.backCard.cgFamille}/>
        <br />
        <div className='container-fluid'>
                {loading ?  
                    <>
                        {familleList.map( (data) => <FamilleCard key={data.PK}  data={data} />)}
                    </>
                : SKLT.CardList }

        </div>
        </> );
}

export default CatalogueFamille