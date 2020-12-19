import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const MemoriesScreenContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Section = styled.section`
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const SectionTitle = styled.h3`
    padding: 0;
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.primary};
`;

export const MembersGrid = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media (min-width: ${ScreenSize.SM_MIN}) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;