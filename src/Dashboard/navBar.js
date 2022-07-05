import React from 'react';
import { NavLink } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button, Icon, Modal, List } from 'semantic-ui-react'
import GConf from '../AssetsM/generalConf';

function NavBar(props) {
    const MainLink = (props) => {
        return (<>
            <NavLink exact="true" className={({ isActive  }) => isActive ? "p-2 abyedh-list-a" : "p-2 abyedh-list"} to={props.link}><i className={`icons-a bi bi-${props.icon}`}></i> {props.name}  <span className="d-none d-lg-inline"></span></NavLink>
        </>)
    }
    const ResponsiveLink = (props) => {
        return (<>
            <NavLink exact="true" className={({ isActive  }) => isActive ? "p-2 abyedh-list-a" : "p-2 abyedh-list"} to={props.link}><i className={`icons-a bi bi-${props.icon}`}></i> {props.name}  <span className="d-none d-lg-inline"></span></NavLink>
        </>)
    }
    const LogOut = () =>{
        localStorage.clear();
        window.location.href = "/login";
    }
    return (<>
        <div className="fixed-top">
            <Segment className="rounded-0">
                <div className="row">
                    <div className="col-4 col-lg-2 align-self-center text-left">
                        <img src="https://system.anaslouma.tn/alimentaire/main-lago.gif" alt="." className="p-0" width="80px" height="30px"/>
                    </div>
                    <div className="col-5 col-lg-8 align-self-center text-left navsha">
                       <div className="text-left d-none d-md-block"> 
                            {GConf.NavsData.map((links) => 
                                <MainLink key={links.id} name={links.name} link={links.link} icon={links.icon} />
                            )}
                        </div>
                        
                        <Modal
                            size='mini'
                            closeIcon
                            dimmer='blurring'
                            trigger={<Button className="d-md-none rounded-pill bg-system-btn"> <Icon name='list alternate outline' /> Menu</Button>}
                            >
                            <Modal.Content className='d-block'>
                                <div className='p-2 text-start'>
                                    {GConf.NavsData.map((links) => 
                                        <div className="mb-2" key={links.id}><MainLink name={links.name} link={links.link} icon={links.icon} /></div>
                                    )}   
                                </div>
                            </Modal.Content>
                        </Modal>
                       
                    </div>
                    <div className="col-3 col-lg-2 align-self-center text-end">
                        <div className="dropdown">
                            <NavLink to='nt' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-bell fa-lg "></i></NavLink>
                            <NavLink to='msg' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-envelope fa-lg"></i></NavLink>
                            <NavLink onClick={LogOut} to='#' exact="true" className='ps-1 pe-1'><span className="bi bi-box-arrow-left fa-lg"></span></NavLink>
                        </div>
                    </div>
                </div>
            </Segment>
        </div>
    </>);
}

export default NavBar;
