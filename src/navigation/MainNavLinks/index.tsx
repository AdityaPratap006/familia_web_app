import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
    RiHomeHeartFill,
    RiHomeHeartLine,
    RiChat1Fill,
    RiChat1Line,
    RiSettings2Fill,
    RiSettings2Line,
    RiUserLine,
    RiUserFill,
    RiMapPinLine,
    RiMapPinFill,
    RiHeartsFill,
    RiHeartsLine,
    RiMailAddFill,
    RiMailAddLine,
} from 'react-icons/ri';
import { NavLinkList, NavLinkItem } from './style';
import { NavigationRoutes } from '../navRoutes';
import LogoutButton from '../../components/LogoutButton';
interface NavLinkData {
    route: string;
    inactiveIcon: JSX.Element;
    activeIcon: JSX.Element;
    label: string;
    id: number;
}

const navlinksList: NavLinkData[] = [
    {
        id: 1,
        route: `${NavigationRoutes.HOME}`,
        label: `home`,
        inactiveIcon: <RiHomeHeartLine className='nav-icon' />,
        activeIcon: <RiHomeHeartFill className='nav-icon' />,
    },
    {
        id: 2,
        route: `${NavigationRoutes.CHATS}`,
        label: `chats`,
        inactiveIcon: <RiChat1Line className='nav-icon' />,
        activeIcon: <RiChat1Fill className='nav-icon' />,
    },
    {
        id: 3,
        route: `${NavigationRoutes.LOCATE}`,
        label: `locate`,
        inactiveIcon: <RiMapPinLine className='nav-icon' />,
        activeIcon: <RiMapPinFill className='nav-icon' />,
    },
    {
        id: 4,
        route: `${NavigationRoutes.MEMORIES}`,
        label: `memories`,
        inactiveIcon: <RiHeartsLine className='nav-icon' />,
        activeIcon: <RiHeartsFill className='nav-icon' />,
    },
    {
        id: 5,
        route: `${NavigationRoutes.INVITES}`,
        label: `invites`,
        inactiveIcon: <RiMailAddLine className='nav-icon' />,
        activeIcon: <RiMailAddFill className='nav-icon' />,
    },
    {
        id: 6,
        route: `${NavigationRoutes.PROFILE}`,
        label: `profile`,
        inactiveIcon: <RiUserLine className='nav-icon' />,
        activeIcon: <RiUserFill className='nav-icon' />,
    },
    {
        id: 7,
        route: `${NavigationRoutes.SETTINGS}`,
        label: `settings`,
        inactiveIcon: <RiSettings2Line className='nav-icon' />,
        activeIcon: <RiSettings2Fill className='nav-icon' />,
    },
];

const MainNavLinks: React.FC = () => {
    const history = useHistory();
    const [currentRoute, setCurrentRoute] = useState(`${history.location.pathname}`);

    useEffect(() => {
        const unregister = history.listen((location, action) => {
            setCurrentRoute(location.pathname);
        });
        return () => {
            unregister();
        }
    }, [history]);

    const renderedLinks = navlinksList.map(navLink => {
        const { id, route, label, inactiveIcon, activeIcon } = navLink;

        return (
            <NavLinkItem key={id}>
                <NavLink to={route} activeClassName={`active`} exact>
                    <div className={`link-container`}>
                        {currentRoute === route ? activeIcon : inactiveIcon}
                        <p>{label}</p>
                    </div>
                </NavLink>
            </NavLinkItem>
        );
    });
    return (
        <NavLinkList>
            {renderedLinks}
            <LogoutButton />
        </NavLinkList>
    );
};

export default MainNavLinks;
