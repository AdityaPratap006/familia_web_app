import React, { useState, createContext } from 'react';

interface ISideDrawerContext {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


export const SideDrawerContext = createContext<ISideDrawerContext>({
    isOpen: false,
    open: () => null,
    close: () => null,
});

export const SideDrawerProvider: React.FC = (props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawerHandler = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawerHandler = () => {
        setIsDrawerOpen(false);
    }

    return (
        <SideDrawerContext.Provider
            value={{
                isOpen: isDrawerOpen,
                open: openDrawerHandler,
                close: closeDrawerHandler,
            }}
        >
            {props.children}
        </SideDrawerContext.Provider>
    );
} 
