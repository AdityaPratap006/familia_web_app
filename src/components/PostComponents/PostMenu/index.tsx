import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDetectTouchOutside } from '../../../hooks/detectTouchOutside.hook';
import { PostMenuButton, PostMenuContainer, PostMenuItem, PostMenuItemIconContainer, PostMenuItemLabel, PostMenuItemList, StyledPostMenu } from './style';

interface PostMenuProps {
    onDeleteRequest: () => void;

}

const PostMenu: React.FC<PostMenuProps> = ({ onDeleteRequest }) => {
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
        <PostMenuContainer ref={menuRef}>
            <PostMenuButton onClick={toggleMenuHandler} >
                <FaEllipsisH className="icon" />
            </PostMenuButton>
            {menuOpen && (
                <StyledPostMenu  >
                    <PostMenuItemList>
                        <PostMenuItem onClick={e => handleMenuOptionClick(onDeleteRequest)}>
                            <PostMenuItemIconContainer>
                                <MdDelete className="icon" />
                            </PostMenuItemIconContainer>
                            <PostMenuItemLabel>Delete Post</PostMenuItemLabel>
                        </PostMenuItem>
                    </PostMenuItemList>
                </StyledPostMenu>
            )}
        </PostMenuContainer>

    );
};

export default PostMenu;
