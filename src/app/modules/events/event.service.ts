import AppError from '../../errorHelpers/AppError';
import { IEvent } from './event.interface';
import { Event } from './event.model';
import mongoose from "mongoose";

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

// joint event (user)
const joinEvent = async (eventId: string, userId: string) => {
    const event = await Event.findById(eventId);

    if (!event) throw new AppError(404, "Event not found");

    // check if event full
    if (event.participants.length >= event.maxParticipants) {
        throw new AppError(400, "Event is full");
    }

    // check if already joined
    if (event.participants.some(id => id.toString() === userId)) {
        throw new AppError(400, "Already joined");
    }

    // convert userId -> ObjectId
    event.participants.push(new mongoose.Types.ObjectId(userId));

    await event.save();
    return event;
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
    joinEvent,
    getParticipants,
};
