export enum EventStatus {
    OPEN = "Open",
    FULL = "Full",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
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
    image?: string;
    joiningFee: number;

    status: EventStatus;
    host: string; 
    participants: string[]; 

    createdAt?: Date;
    updatedAt?: Date;
}
