import React from 'react';
const FrameForPrint = (props) =>{
    return <iframe id={props.frameId}  className='d-none' src={props.src}></iframe>
}
export default FrameForPrint;