import React, { useEffect} from 'react';
import { Bounce } from 'react-reveal';
import { Button } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';
import LinkCard from './Assets/linksCard'
import InputLinks from './Assets/linksData'

function InputLandingPage() {
    //const 
    let camData = JSON.parse(localStorage.getItem("InputCamionData"));

    //UseEffect
    useEffect(() => {
        const inputIsLogged = localStorage.getItem('InputCamion');
        if (!inputIsLogged) {window.location.href = "/I/logIn";}
        
    })

    //functions
    const logOutInput = () =>{    
        localStorage.clear();
        window.location.href = "/I";
    }

    const MainTopCard = () =>{
        return(<>
            <div className='card p-3 fixed-top border-0 shadow-sm rounded-0'>
                <div className='row'>
                    <div className='col-10 align-self-center'><h2> <span className="badge bg-info"> <span className='bi bi-truck '></span>  {camData.Matricule} </span></h2></div>
                    <div className='col-2 align-self-center' ><Button onClick={logOutInput} style={{backgroundColor:GConf.themeColor}} className='rounded-circle text-white' icon='log out' /></div>
                </div>
            </div>
        </>)
    }
    return ( <>
            <MainTopCard />
            <br />                
            <br />                
            <br />                
            <br />   
            <Bounce bottom>            
                {/* <div className='row m-1'>
                    {InputLinks.main.map( (links) => <div  key={links.id}  className='col-6 mb-3'><LinkCard data={links} /></div>)}
                </div> */}
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[0]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[1]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[2]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[3]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[4]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[5]} /> </div>
                    </div>
                </div>
            </Bounce> 
              
            </> );
}

export default InputLandingPage;