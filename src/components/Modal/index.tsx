import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ModalContainer, ModalHeader, ModalContent, ModalFooter } from './style';
import BackDrop from '../BackDrop';

interface ModalOverlayProps {
    className?: string;
    style?: React.CSSProperties;
    headerClassName?: string;
    headerComponent: React.ReactNode;
    contentClassName?: string;
    footerClassName?: string;
    footerComponent?: React.ReactNode;
    onSubmit?: (event?: React.FormEvent<HTMLFormElement>) => void;
    overSideDrawer?: boolean;
}

const ModalOverlay: React.FC<ModalOverlayProps> = props => {
    const content = (
        <ModalContainer className={props.className} style={props.style} overSideDrawer={props.overSideDrawer}>
            <ModalHeader className={props.headerClassName}>
                <h2>{props.headerComponent}</h2>
            </ModalHeader>
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <ModalContent className={props.contentClassName}>
                    {props.children}
                </ModalContent>
                <ModalFooter className={props.footerClassName}>
                    {props.footerComponent}
                </ModalFooter>
            </form>
        </ModalContainer>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-hook') as HTMLElement);
}

interface ModalProps extends ModalOverlayProps {
    show: boolean;
    onCancel: () => void;
    overSideDrawer?: boolean;
}

const Modal: React.FC<ModalProps> = props => {
    return (
        <React.Fragment>
            <BackDrop show={props.show} onClick={props.onCancel} overSideDrawer={props.overSideDrawer} />
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames={{
                    enterActive: 'modal-enter-active',
                    enterDone: 'modal-enter-done',
                    exitActive: 'modal-exit-active',
                    exit: 'modal-exit',
                }}
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;
