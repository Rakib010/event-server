

export interface IReview {
    user: string;
    host: string;
    event: string;
    rating: number;
    comment?: string;
}
export interface CreateReviewParams {
    userId: string;
    eventId: string;
    rating: number;
    comment: string;
}
