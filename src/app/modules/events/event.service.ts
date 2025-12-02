import AppError from '../../errorHelpers/AppError';
import { IEvent } from './event.interface';
import { Event } from './event.model';


// Create Event
const eventCreate = async (payload: Partial<IEvent>, hostId: string) => {
    payload.host = hostId;
    console.log('Host ID:', hostId);
    return await Event.create(payload);
};

// Update (Only Host Who Created It)
const updateEvent = async (eventId: string, payload: any, hostId: string) => {
    const event = await Event.findById(eventId);

    if (!event) throw new AppError(404, "Event not found");

    if (event.host.toString() !== hostId)
        throw new AppError(403, "You can only update your own events");

    return await Event.findByIdAndUpdate(eventId, payload, { new: true });
};

// Get Participants (Host Only)
const getParticipants = async (eventId: string, hostId: string) => {
    const event = await Event.findById(eventId).populate('participants');

    if (!event) throw new AppError(404, "Event not found");

    if (event.host.toString() !== hostId)
        throw new AppError(403, "You are not the host of this event");

    return event.participants;
};



export const eventService = {
    eventCreate,
    updateEvent,
    getParticipants,

};
