import styled from 'styled-components';

export const MarkerContent = styled.div`
    position: relative;
`;

export const AvatarContainer = styled.div`
    position: absolute;
    border: 1px solid ${props => props.theme.primary};
    border-radius: 100%;
`;

export const PinIconContainer = styled.div`
    position: absolute;
    z-index: -1;
    top: 1.8rem;

    .icon {
       color: ${props => props.theme.primary};
       width: 2.4rem;
       height: 2.4rem;
       filter: drop-shadow(0px 0px 2px black) drop-shadow(0px 0px 2px black);
    }
`;