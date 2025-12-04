export enum EventStatus {
    OPEN = "open",
    FULL = "full",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
}

export interface IEvent {
    _id: string;
    name: string;
    type: string;
    date: Date;
    time: string;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    description: string;
    profileImage?: string;
    joiningFee: number;

    status: EventStatus;
    host?: string; 
    participants: string[]; 

    createdAt?: Date;
    updatedAt?: Date;
}
