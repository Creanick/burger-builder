import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.li`
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
`;
interface Props{
    to: string;
    selected? : boolean;
}
const NavLink:React.FunctionComponent<Props> = ({children,to,selected=false})=>(
    <Wrapper><a href={to} className={selected ? "active":""}>{children}</a></Wrapper>
);
export default NavLink;