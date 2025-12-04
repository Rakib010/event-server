import AppError from '../../errorHelpers/AppError';
import { IEvent } from './event.interface';
import { Event } from './event.model';


// Create Event
const eventCreate = async (payload: Partial<IEvent>, hostId: string) => {
    payload.host = hostId;
    return await Event.create(payload);
};

// Update Event (Host Only)
const updateEvent = async (eventId: string, payload: Partial<IEvent>, hostId: string) => {
    const event = await Event.findById(eventId);

    if (!event) throw new AppError(404, "Event not found");

    if (!event.host || event.host.toString() !== hostId)
        throw new AppError(403, "You can only update your own events");

    return await Event.findByIdAndUpdate(eventId, payload, { new: true });
};

// delete event (host only)
const deleteEvent = async (eventId: string, hostId: string) => {
    const event = await Event.findById(eventId);

    if (!event) throw new AppError(404, "Event not found");

    if (!event.host || event.host.toString() !== hostId)
        throw new AppError(403, "You can only delete your own events");

    return await Event.findByIdAndDelete(eventId);
};

// get all events (public)
const getAllEvent = async () => {
    return await Event.find();
};

// Get Participants (Host Only)
const getParticipants = async (eventId: string, hostId: string) => {

    const event = await Event.findById(eventId).populate('participants');

    if (!event) throw new AppError(404, "Event not found");

    if (!event.host || event.host.toString() !== hostId)
        throw new AppError(403, "You are not the host of this event");

    return event.participants;
};



export const eventService = {
    eventCreate,
    updateEvent,
    deleteEvent,
    getAllEvent,
    getParticipants,

};
