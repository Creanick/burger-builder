import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StoreState } from '../../../../store/store';
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
const Nav:React.FunctionComponent = (props)=>{
    const isAuthenticated = useSelector((state:StoreState)=>!!state.auth.token);
    return (
        <nav style={{height:"100%"}}>
            <Wrapper>
                <NavLink to="/">Home</NavLink>
                {isAuthenticated && 
                <NavLink to="/orders">Orders</NavLink>
                }
                {
                !isAuthenticated ?
                <NavLink to="/login">Login</NavLink>
                :<NavLink to="/logout">LogOut</NavLink>
                }
            </Wrapper>
        </nav>
    );
};

export default Nav;