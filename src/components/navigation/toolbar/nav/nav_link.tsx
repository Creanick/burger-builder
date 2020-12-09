import React from 'react';
import styled from 'styled-components';
import {NavLink as RealNavLink} from 'react-router-dom';
const Wrapper = styled.li`
    padding: 10px;
    a{
        text-decoration: none;
        color: black;
    }
    a:hover,a:active,a.active{
        color: #40a4c8;
        border-bottom: 4px solid #40a4c8;
    }
    @media (min-width: 500px){
        padding: 0;
        margin: 0;
        height: 100%;
        display: flex;
        align-items: center;
        a{
            text-decoration: none;
            color: white;
            border-bottom: 4px solid transparent;
            height:100%;
            display: flex;
            align-items: center;
            padding: 0px 12px;
        }
        a:hover,a:active,a.active{
            background-color: #8f5c2c;
            border-bottom: 4px solid #40a4c8;
            color: white;
        }
    }
`;
interface Props{
    to: string;
    selected? : boolean;
}
const NavLink:React.FunctionComponent<Props> = ({children,to,selected=false})=>(
    <Wrapper><RealNavLink to={to} exact>{children}</RealNavLink></Wrapper>
);
export default NavLink;