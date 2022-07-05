import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
function GoBtn(props) {
    return (<h6><a href={props.link} ><Button className='rounded-pill bg-system-btn' size='mini'><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button></a></h6> );
}

export default GoBtn;