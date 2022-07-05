import React from 'react';
function TableImage(props) {
     
    return (<> <img className='rounded-circle' 
                    width="40px" 
                    src={props.forStock ? `https://anaslouma.tn/Assets/images/Articles_Images/alimentaire/${props.image}` : `https://system.anaslouma.tn/Assets/images/${props.image}`} alt="user-img" 
                /> </>);
}

export default TableImage