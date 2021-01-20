import React from 'react';
import { IMemory } from '../../../models/memory';
import Card from '../../Card';
import { MemoryContent, MemoryDate, MemoryIconContainer, MemoryIconImage, MemoryType } from './style';
import BirthdayIcon from '../../../assets/memory-icons/birthday-cake.svg';
import AnniversaryIcon from '../../../assets/memory-icons/anniversary.svg';
import FirstJobIcon from '../../../assets/memory-icons/first-job.svg';
import GraduatedIcon from '../../../assets/memory-icons/graduated.svg';
import PromotionIcon from '../../../assets/memory-icons/promotion.svg';
import { getLocalDateText } from '../../../utils/dates';

interface MemoryCardProps {
    memory: IMemory;
}

const getMemoryIcon = (type: IMemory['type']) => {
    switch (type) {
        case 'birthday':
            return BirthdayIcon;
        case 'anniversary':
            return AnniversaryIcon;
        case 'first job':
            return FirstJobIcon;
        case 'graduated':
            return GraduatedIcon;
        case 'promotion':
            return PromotionIcon;
        default:
            return '';
    }
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {

    const memoryDay = getLocalDateText(memory.date).split(',').slice(1,2).join('');
    return (
        <Card>
            <MemoryType>{memory.type}</MemoryType>
            <MemoryIconContainer>
                <MemoryIconImage
                    alt={`${memory.type}`}
                    src={getMemoryIcon(memory.type)}
                />
            </MemoryIconContainer>
            <MemoryDate>{memoryDay}</MemoryDate>
            <MemoryContent>{memory.content}</MemoryContent>
        </Card>
    );
};

export default MemoryCard;
