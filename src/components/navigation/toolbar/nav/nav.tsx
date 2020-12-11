import React from 'react';
import styled from 'styled-components';
import NavLink from "./nav_link";
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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/orders">Orders</NavLink>
        </Wrapper>
    </nav>
);

export default Nav;