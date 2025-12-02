import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { eventService } from './event.service';

// Create Event
const eventCreate = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    console.log('User ID:', userId);
    const result = await eventService.eventCreate(req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Event Created Successfully',
        data: result
    });
});

// Update Event (Host Only)
const updateEvent = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const eventId = req.params.id;

    const result = await eventService.updateEvent(eventId, req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Event Updated Successfully',
        data: result
    });
});

// View Participants
const getParticipants = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
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
    getParticipants,
};
