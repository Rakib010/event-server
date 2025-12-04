import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const eventId = req.params.eventId;

    const { rating, comment } = req.body;

    const result = await reviewService.createReview({
        userId,
        eventId,
        rating,
        comment,
    });

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Review added successfully",
        data: result,
    });
});

const getHostRatings = catchAsync(async (req: Request, res: Response) => {
    const hostId = req.params.hostId;

    const result = await reviewService.getHostRatings(hostId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Host ratings fetched",
        data: result,
    });
});


export const reviewController = {
    createReview,
    getHostRatings
};