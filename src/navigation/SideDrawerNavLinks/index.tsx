import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
    RiUserLine,
    RiUserFill,
    RiSettings2Fill,
    RiSettings2Line,
    RiMailAddFill,
    RiMailAddLine,
} from 'react-icons/ri';
import { NavLinkList, NavLinkItem } from './style';
import { NavigationRoutes } from '../navRoutes';
import { SideDrawerContext } from '../../contexts/sidedrawer.context';
import UserProfileCard from '../UserProfileCard';

interface NavLinkData {
    route: string;
    inactiveIcon: JSX.Element;
    activeIcon: JSX.Element;
    label: string;
    id: string | number;
}

const navlinksList: NavLinkData[] = [
    {
        id: 1,
        route: `${NavigationRoutes.INVITES}`,
        label: `invites`,
        inactiveIcon: <RiMailAddLine className='nav-icon' />,
        activeIcon: <RiMailAddFill className='nav-icon' />,
    },
    {
        id: 2,
        route: `${NavigationRoutes.PROFILE}`,
        label: `profile`,
        inactiveIcon: <RiUserLine className='nav-icon' />,
        activeIcon: <RiUserFill className='nav-icon' />,
    },
    {
        id: 3,
        route: `${NavigationRoutes.SETTINGS}`,
        label: `settings`,
        inactiveIcon: <RiSettings2Line className='nav-icon' />,
        activeIcon: <RiSettings2Fill className='nav-icon' />,
    },
];

const SideDrawerNavLinks: React.FC = () => {
    const history = useHistory();
    const [currentRoute, setCurrentRoute] = useState(`${history.location.pathname}`);
    const sideDrawerCTX = useContext(SideDrawerContext);

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

        let isActiveRoute = currentRoute === route;

        if (currentRoute.startsWith(`${NavigationRoutes.CHATS}`)) {
            isActiveRoute = route.startsWith(`${NavigationRoutes.CHATS}`);
        }

        return (
            <NavLinkItem key={id}>
                <NavLink to={route} className={isActiveRoute ? `active` : ``} exact onClick={sideDrawerCTX.close}>
                    <div className={`link-container`}>
                        {isActiveRoute ? activeIcon : inactiveIcon}
                        <p>{label}</p>
                    </div>
                </NavLink>
            </NavLinkItem>
        );
    });
    return (
        <NavLinkList>
            {renderedLinks}
            <UserProfileCard />
        </NavLinkList>
    );
};

export default SideDrawerNavLinks;
