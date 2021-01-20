import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const MembersGrid = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
 
    @media (min-width: ${ScreenSize.SM_MIN}) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;