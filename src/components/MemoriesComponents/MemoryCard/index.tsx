import React from 'react';
import { IMemory } from '../../../models/memory';
import Card from '../../Card';

interface MemoryCardProps {
    memory: IMemory;
} 

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
    return (
        <Card>
            {memory.content}
        </Card>
    );
};

export default MemoryCard;
