import React from 'react';

interface Props{
    price?: number
}
const PriceViewer:React.FunctionComponent<Props> = (props)=>{
    return (
        <p style={{textAlign:"center"}}>
        Total Price:<strong> ${props.price ? props.price.toFixed(2) : 0} </strong>
        </p>
    );
}

export default PriceViewer;