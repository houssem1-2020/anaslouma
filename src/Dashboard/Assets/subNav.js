import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf'
function SubNav(props) {
        const DropDowdnCard = (props) =>{
            return(<>
                <Dropdown  text={props.data.text} className="ps-2 pt-2 nav-link text-white fw-bold">
                            <Dropdown.Menu style={{ right: 0, left: 'auto'}}>
                                {
                                    props.data.dropDD.map((dDD) => (<React.Fragment key={dDD.id}>
                                        <Dropdown.Item key={dDD.idI}><NavLink to={dDD.link} exact="true"><span className={`bi bi-${dDD.icon}`}></span> {dDD.text} </NavLink></Dropdown.Item>
                                    </React.Fragment>))
                                }
                    </Dropdown.Menu>
                </Dropdown>
            </>)
        }
        const ItemCard = (props)=>{
            return(<>
                <NavLink  className="nav-link text-white fw-bold"  exact="true" to={props.data.link}><span className='rounded-circle icon-nav-div ' > <span className={`bi bi-${props.data.icon}`}></span> </span> {props.data.text}</NavLink>
            </>)
        }
        // return (<>
        //         <div className="nav p-2 rounded-pill " style={{backgroundColor:GConf.themeColor, color:'white'}}>
        //             {props.dataForNav.map((data) => (
        //             <span key={data.id}> 
        //                 {!data.dropD ?  <ItemCard data={data}/> : <DropDowdnCard  data={data} /> } 
        //                 { data.id == props.dataForNav.length    ? <></> : <div className="vr text-white"></div> }
                         
        //             </span>
        //             ))}
        //         </div>
        //       </>);

        return (<>
            <div className="d-flex p-2 rounded-pill responsive-bar" style={{backgroundColor:GConf.themeColor, color:'white'}}>
                {props.dataForNav.map((data) => (
                    <span className="d-flex" key={data.id}> 
                        {!data.dropD ?  <ItemCard data={data}/> : <DropDowdnCard  data={data} /> } 
                        { data.id == props.dataForNav.length    ? <></> : <div className="vr text-white"></div> }
                        
                    </span >
                ))}
            </div>
          </>);
    }

 
export default SubNav;