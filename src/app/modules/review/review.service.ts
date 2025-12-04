import AppError from "../../errorHelpers/AppError";
import { Event } from "../events/event.model";
import { CreateReviewParams } from "./review.interface";
import { Review } from "./review.model";

const createReview = async ({
    userId,
    eventId,
    rating,
    comment
}: CreateReviewParams) => {
    const event = await Event.findById(eventId).populate("host");
    if (!event) throw new AppError(404, "Event not found");
    if (!event.host) throw new AppError(400, "Event host not found");

    // Check user attended this event
    const isParticipant = event.participants.some(participant => participant.equals(userId));
    if (!isParticipant)
        throw new AppError(403, "You can only review events you attended");

    // Host ID
    const hostId = event.host._id;

    // Check if already reviewed
    const existingReview = await Review.findOne({ user: userId, event: eventId });
    if (existingReview)
        throw new AppError(400, "Already reviewed");

    return await Review.create({
        user: userId,
        host: hostId,
        event: eventId,
        rating,
        comment
    });
};

const getHostRatings = async (hostId: string) => {
    const reviews = await Review.find({ host: hostId })
        .populate("user", "name profileImage");

    const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        (reviews.length || 1);

    return {
        averageRating: Number(avgRating.toFixed(1)),
        totalReviews: reviews.length,
        reviews,
    };
};


export const reviewService = {
    createReview,
    getHostRatings
};