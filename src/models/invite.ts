import { FamilyMember, IFamily } from "./family";

export interface IInvite {
    _id: string;
    family: {
        _id: IFamily['_id'];
        name: IFamily['name'];
        description: IFamily['description'];
        memberCount: IFamily['memberCount'];
    },
    from: FamilyMember;
    to: FamilyMember;
    createdAt: string;
    updatedAt: string;
}