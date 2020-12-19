import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const NavLinkList = styled.ul`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const NavLinkItem = styled.li`
    margin: 0.1rem 0;
    padding: 0;
    width: 100%;
    height: 3rem;
    display: flex;

    a {
        color: ${props => props.theme.text};
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        -webkit-tap-highlight-color: transparent;

        .link-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 0 1rem;
            height: 100%;
            border-radius: 200px;
            transition: 0.2s ease;

            .nav-icon {
                width: 2rem;
                height: 2rem;
                /* transform: translateY(-2px); */
            }

            p {
                padding: 5px 0 0 0;
                margin: 0 1rem;
                font-size: 1.4rem;
                text-transform: capitalize;
                font-weight: bold;
            }

        }

        &.active {
            color: ${props => props.theme.primary};
        }

        &:hover {
            cursor: pointer;
            .link-container {
                color: ${props => props.theme.primary};
                background-color: ${props => props.theme.primaryShadow};
            }
        }
    }

    
    // tablet
    @media (max-width: ${ScreenSize.SM_MAX}) {
        margin: 1.2rem 0;

        a {
            justify-content: center;
            
            .link-container {
                .nav-icon {
                    width: 3rem;
                    height: 3rem;
                }

                p {
                    display: none;
                }
            }

            &:hover {

            }
        }

        a.active {
            .link-container {
                background-color: ${props => props.theme.background};
            }
        }
    }
`;
