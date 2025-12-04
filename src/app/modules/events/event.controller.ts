import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { eventService } from './event.service';


// Create Event
const eventCreate = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const bodyData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const payload = {
        ...bodyData,
        profileImage: req.file?.path,
    }
    const result = await eventService.eventCreate(payload, userId);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Event Created Successfully',
        data: result
    });
});

// Update Event (Host Only)
const updateEvent = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const eventId = req.params.id;

    const bodyData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const payload = {
        ...bodyData,
        profileImage: req.file?.path,
    };

    const result = await eventService.updateEvent(eventId, payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Event Updated Successfully',
        data: result
    });
});

// delete Event (Host Only)
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const eventId = req.params.id;

    const result = await eventService.deleteEvent(eventId, userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Event Deleted Successfully',
        data: result
    });
});

// Get All Events
const getAllEvent = catchAsync(async (req: Request, res: Response) => {

    const result = await eventService.getAllEvent();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Event Deleted Successfully',
        data: result
    });
});

// user join event 
const joinEvent = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const eventId = req.params.eventId;

    const result = await eventService.joinEvent(eventId, userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Joined Event Successfully',
        data: result
    });
});


// View Participants
const getParticipants = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const eventId = req.params.id;

    const result = await eventService.getParticipants(eventId, userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Participants Found',
        data: result
    });
});



export const eventController = {
    eventCreate,
    updateEvent,
    deleteEvent,
    getAllEvent,
    joinEvent,
    getParticipants,
};
