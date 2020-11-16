import styled from 'styled-components';

export const NavLinkList = styled.ul`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const NavLinkItem = styled.li`
    margin: 0.5rem 0;
    padding: 0;
    width: 100%;
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
            padding: 0.5rem 1rem;
            height: 100%;
            border-radius: 200px;
            transition: 0.2s ease;

            .nav-icon {
                width: 2rem;
                height: 2rem;
                /* transform: translateY(-2px); */
            }

            p {
                padding: 10px 0 0 0;
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
`;