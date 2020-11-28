import React from 'react';
import styled from 'styled-components';
import logoImg from '../../assets/images/burger_logo.png';
const Container = styled.div`
    padding: 6px;
    background-color: white;
    border-radius: 4px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        height: 100%;
        display: block;
    }
`;
const Logo:React.FunctionComponent = (props)=>{
    return (
        <Container>
            <img src={logoImg} alt="Burger Logo"/>
        </Container>
    );
}

export default Logo;