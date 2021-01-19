import styled from 'styled-components';

export const PinIconContainer = styled.div`
    .icon {
       color: ${props => props.theme.primary};
       width: 2.4rem;
       height: 2.4rem;
       filter: drop-shadow(0px 0px 2px black) drop-shadow(0px 0px 2px black);
    }
`;