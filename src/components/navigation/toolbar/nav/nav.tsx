import React from 'react';
import styled from 'styled-components';
import NavLink from './nav_link';
const Wrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    @media (min-width: 500px){
        height: 100%;
        flex-direction: row;
        align-items: center;
    }
`;
const Nav:React.FunctionComponent = (props)=>(
    <nav style={{height:"100%"}}>
        <Wrapper>
            <NavLink to="/" selected>Link1</NavLink>
            <NavLink to="/">Link2</NavLink>
            <NavLink to="/">Link3</NavLink>
        </Wrapper>
    </nav>
);

export default Nav;