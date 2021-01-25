import React, { useEffect, useRef } from 'react';
import { MdDelete } from 'react-icons/md';
import { PostMenuItem, PostMenuItemIconContainer, PostMenuItemLabel, PostMenuItemList, StyledPostMenu } from './style';

interface PostMenuProps {
    show: boolean;
    closeMenu: () => void;
}

const PostMenu: React.FC<PostMenuProps> = ({ show, closeMenu }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        }

        document.addEventListener("mousedown", e => handleClickOutside(e));
        return () => {
            document.removeEventListener("mousedown", e => handleClickOutside(e));
        };
    }, [closeMenu]);

    return (
        <StyledPostMenu ref={menuRef} className={`${!show && 'hidden'}`}>
            <PostMenuItemList>
                <PostMenuItem>
                    <PostMenuItemIconContainer>
                        <MdDelete className="icon" />
                    </PostMenuItemIconContainer>
                    <PostMenuItemLabel>DELETE</PostMenuItemLabel>
                </PostMenuItem>
            </PostMenuItemList>
        </StyledPostMenu>
    );
};

export default PostMenu;
