import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FamilyContext } from '../../../contexts/family.context';
import { GET_ALL_MEMORIES_IN_FAMILY } from '../../../graphql/memory/queries';
import { IMemory } from '../../../models/memory';
import LoadingBouncers from '../../LoadingBouncers';
import MemoryCard from '../MemoryCard';
import { StyledMemoriesGrid } from './style';

interface AllMemoriesResponse {
    allMemoriesInFamily: IMemory[];
}

const MemoriesGrid: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [fetchAllMemories, { data, loading, error }] = useLazyQuery<AllMemoriesResponse>(GET_ALL_MEMORIES_IN_FAMILY);

    useEffect(() => {
        if (currentFamily) {
            fetchAllMemories({
                variables: {
                    input: {
                        familyId: currentFamily._id,
                    },
                },
            });
        }
    }, [currentFamily, fetchAllMemories]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const renderMemoryCards = () => {
        if (!data) return null;

        const memories = data.allMemoriesInFamily;

        return memories.map(memory => (
            <MemoryCard
                key={memory._id}
                memory={memory}
            />
        ));
    }

    return (
        <>
            {loading && <LoadingBouncers />}
            <StyledMemoriesGrid>
                {renderMemoryCards()}
            </StyledMemoriesGrid>
        </>
    );
};

export default MemoriesGrid;
