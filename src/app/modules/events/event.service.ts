/* eslint-disable @typescript-eslint/no-explicit-any */
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
const getAllEvent = async (query: Record<string, string>) => {
    const {
        title,
        location,
        category,
        date,
        sort = "-createdAt",
        page = "1",
        limit = "10",
    } = query;

    const filters: any = {};

    // search by title
    if (title) {
        filters.title = { $regex: title, $options: "i" };
    }
    //search by location
    if (location) {
        filters.location = { $regex: location, $options: "i" };
    }

    // filter by category
    if (category) {
        filters.category = category;
    }

    // filter by date(Exact Day)
    if (date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(start.getDate() + 1);

        filters.date = {
            $gte: start,
            $lt: end
        };
    }

    // pagination 
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // querying
    const events = await Event.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

    const total = await Event.countDocuments(filters);

    return {
        total,
        page: pageNum,
        limit: limitNum,
        events,
    };
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
