import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import SideDrawerNavLinks from '../SideDrawerNavLinks';
import { AsideDrawer } from './style';

interface SideDrawerProps {
    show: boolean;
    onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
    const drawer = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames={{
                enterActive: `slide-in-left__enter-active`,
                enterDone: `slide-in-left__enter-done`,
                exitActive: `slide-in-left__exit-active`,
                exit: `slide-in-left__exit`,
            }}
            mountOnEnter
            unmountOnExit
        >
            <AsideDrawer key="side-drawer">
                <SideDrawerNavLinks />
            </AsideDrawer>
        </CSSTransition>
    );
    return ReactDOM.createPortal(drawer, document.getElementById(`drawer-hook`) as HTMLElement);
};

export default SideDrawer;
