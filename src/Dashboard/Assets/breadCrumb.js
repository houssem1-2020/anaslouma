import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

function BreadCrumb(props) {
 
        return (<>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        props.links.map((data) => (<React.Fragment key={data.id}>
                            {data.linkable ? 
                                <li  className="breadcrumb-item" ><NavLink exact="true" to={data.link}>{data.name}</NavLink></li>
                            : 
                                <li className="breadcrumb-item active"  aria-current="page">{data.name}</li>
                            }
                        </React.Fragment>))
                    }
                    
                    
                </ol>
            </nav>
        </>);
    }

 
export default BreadCrumb;