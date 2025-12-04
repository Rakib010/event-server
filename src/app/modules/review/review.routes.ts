
import { reviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { Router } from "express";


const router = Router();

router.post(
    "/:eventId",
    checkAuth(Role.user),
    reviewController.createReview
);

router.get(
    "/hosts/ratings/:hostId",
    reviewController.getHostRatings
);

export const reviewRoutes = router;