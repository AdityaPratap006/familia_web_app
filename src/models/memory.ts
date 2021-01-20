type MemoryType = 'birthday' | 'anniversary' | 'first job' | 'promotion' | 'graduated';

export interface IMemory {
    _id: string;
    date: string;
    family: {
        _id: string;
        name: string;
    };
    type: MemoryType;
    content: string;
    createdAt: string;
    updatedAt: string;
}