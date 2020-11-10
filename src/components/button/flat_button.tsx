import styled from "styled-components";
import {tint} from 'polished';
const FlatButton = styled.button`
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    color: ${props=>props.color || 'black'};
    transition: all 0.2s linear;
    &:hover{
        background-color: ${props=>tint(0.9,props.color || "lightgrey")};
    }
`;

export default FlatButton;