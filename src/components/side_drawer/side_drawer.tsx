import React from 'react';
import styled from 'styled-components';
import Logo from '../logo/logo';
import Nav from '../navigation/toolbar/nav/nav';

interface SideDrawerProps{
    show?: boolean;
}
const Wrapper = styled.div<SideDrawerProps>`
    position: fixed;
    left: 0;
    top:0;
    width: 280px;
    max-width: 70%;
    height: 100%;
    background-color: white;
    z-index: 200;
    padding: 16px;

    @media (min-width: 500px){
        display: none;
    }
`;
const SideDrawer:React.FunctionComponent = (props)=>(
    <Wrapper>
        <div style={{height: "6%"}}>
        <Logo/>
        </div>
        <br/>
        <Nav/>
    </Wrapper>
);

export default SideDrawer;