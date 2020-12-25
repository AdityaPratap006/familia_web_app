import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const InviteCardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const InviteCardHeaderTitle = styled.p`
    padding: 0;
    margin: 0 1rem;
    color: ${props => props.theme.text};
    font-size: small;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        font-size: medium;
    }
`;

export const HighlightedText = styled.span`
    font-size: inherit;
    color: ${props => props.theme.primary};
    font-weight: bold;
    padding: 0 0.2rem;
`;

export const InviteCardBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const InviteCardFamilyName = styled.h4`
    margin: 1rem 0 0.5rem 0;
    padding: 0;
    font-size: 1.2rem;
    color: ${props => props.theme.primary};
`;

export const InviteCardFamilyDescription = styled.p`
    padding: 0;
    margin: 0;
    color: ${props => props.theme.text};
    font-size: small;
`;

export const InviteCardFamilyMembersList = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0.5rem 0;
    
    span {
        margin: 0.5rem;
        font-size: small;
        color: ${props => props.theme.primary};
    }
`;

export const InviteCardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;