import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDetectTouchOutside } from '../../../hooks/useDetectTouchOutside.hook';
import { PostMenuButton, PostMenuContainer, PostMenuItem, PostMenuItemIconContainer, PostMenuItemLabel, PostMenuItemList, StyledPostMenu } from './style';

interface PostMenuProps {

}

const PostMenu: React.FC<PostMenuProps> = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenuHandler = () => {
        setMenuOpen(prevState => !prevState);
    }

    const closeMenuHandler = () => {
        setMenuOpen(false);
    }

    const { ref: menuRef } = useDetectTouchOutside<HTMLDivElement>({
        condition: menuOpen,
        onInsideTouch: toggleMenuHandler,
        onOutsideTouch: closeMenuHandler,
    });

    return (
        <PostMenuContainer ref={menuRef}>
            <PostMenuButton >
                <FaEllipsisH className="icon" onClick={toggleMenuHandler} />
            </PostMenuButton>
            {menuOpen && (
                <StyledPostMenu >
                    <PostMenuItemList>
                        <PostMenuItem>
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
