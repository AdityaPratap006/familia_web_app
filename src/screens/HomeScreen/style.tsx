import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const HomeScreenContent = styled.div`
    width: 100%;
    min-height: 70vh;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
`;

export const PostFeed = styled.div`
    grid-column: 1 / 4;
    grid-row: 1 / 6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: orange;
    height: 450vh;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-column: 1 / 6;
    }
`;

export const MemberList = styled.div`
    grid-column: 4 / 6;
    height: 150vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: skyblue;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;

export const QuotesSection = styled.div`
    position: sticky;
    top: 6rem;
    grid-column: 4 / 6;
    height: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: purple;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;