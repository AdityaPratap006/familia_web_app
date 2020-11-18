import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface StyledCardProps {
    addcss?: FlattenSimpleInterpolation;
}

const Card = styled.div<StyledCardProps>`
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${props => props.theme.defaultBorderColor};
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    /* &:hover {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    } */
    transition: box-shadow 0.2s ease;
    background-color: ${props => props.theme.paper};
    ${props => props.addcss}
`;

export default Card;
