import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDetectTouchOutside } from '../../../hooks/detectTouchOutside.hook';
import { ChatMessageMenuButton, ChatMessageMenuContainer, ChatMessageMenuItem, ChatMessageMenuItemIconContainer, ChatMessageMenuItemLabel, ChatMessageMenuItemList, StyledChatMessageMenu } from './style';

interface ChatMessageMenuProps {
    onDeleteRequest: () => void;
}

const ChatMessageMenu: React.FC<ChatMessageMenuProps> = ({ onDeleteRequest }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenuHandler = () => {
        setMenuOpen(prevState => !prevState);
    }

    const closeMenuHandler = () => {
        setMenuOpen(false);
    }

    const { ref: menuRef } = useDetectTouchOutside<HTMLDivElement>({
        onOutsideTouch: closeMenuHandler,
    });

    const handleMenuOptionClick = (task: () => void) => {
        task();
        setMenuOpen(false);
    }

    return (
        <ChatMessageMenuContainer ref={menuRef}>
            <ChatMessageMenuButton type="button" onClick={toggleMenuHandler}>
                <FaChevronDown className="icon" />
            </ChatMessageMenuButton>
            {menuOpen && (
                <StyledChatMessageMenu>
                    <ChatMessageMenuItemList>
                        <ChatMessageMenuItem onClick={() => handleMenuOptionClick(onDeleteRequest)}>
                            <ChatMessageMenuItemIconContainer>
                                <MdDelete className="icon" />
                            </ChatMessageMenuItemIconContainer>
                            <ChatMessageMenuItemLabel>Delete Message</ChatMessageMenuItemLabel>
                        </ChatMessageMenuItem>
                    </ChatMessageMenuItemList>
                </StyledChatMessageMenu>
            )}
        </ChatMessageMenuContainer>
    );
};

export default ChatMessageMenu;
