import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { BackDropContainer } from './style';

interface BackDropProps {
    show: boolean;
    overSideDrawer?: boolean;
    onClick?: () => void;
}

const BackDrop: React.FC<BackDropProps> = (props) => {
    const backDrop = (
        <CSSTransition
            in={props.show}
            timeout={100}
            classNames={{
                enterActive: `enter-active`,
                enterDone: `enter-done`,
                exitActive: `exit-active`,
                exit: `exit`,
            }}
            mountOnEnter
            unmountOnExit
        >
            <BackDropContainer key="backdrop" onClick={props.onClick} overSideDrawer={props.overSideDrawer}></BackDropContainer>
        </CSSTransition>
    );

    return ReactDOM.createPortal(
        backDrop,
        document.getElementById('backdrop-hook') as HTMLElement
    );
};

export default BackDrop;
