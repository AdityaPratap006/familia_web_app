import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const HomeScreenContent = styled.div`
    padding: 1rem;
    width: 100%;
    min-height: 70vh;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        padding: 1rem 0.5rem;
    }
`;

export const PostFeed = styled.div`
    grid-column: 1 / 4;
    grid-row: 1 / 6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 5rem;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-column: 1 / 6;
    }
`;

export const AddPostButtonSection = styled.div`
    position: sticky;
    top: 6rem;
    grid-column: 4 / 6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        position: fixed;
        top: calc(100vh - 11rem);
        right: 1rem;
    }
`;

export const MemberList = styled.div`
    position: sticky;
    top: 12rem;
    height: calc(100vh - 15rem);
    grid-column: 4 / 6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;