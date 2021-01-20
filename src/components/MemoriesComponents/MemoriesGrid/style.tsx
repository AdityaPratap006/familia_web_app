import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const StyledMemoriesGrid = styled.div`
    width: 100%;
    display: grid;
    padding-bottom: 5rem;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 450px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;