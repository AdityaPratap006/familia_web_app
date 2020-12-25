import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const InvitesGrid = styled.div`
    padding-top: 1rem;
    width: 100%;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

