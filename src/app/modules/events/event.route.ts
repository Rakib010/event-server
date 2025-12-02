import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { eventController } from './event.controller';
import { Role } from '../user/user.interface';

const router = Router();

router.post('/events', checkAuth(Role.host), eventController.eventCreate);

router.patch('/events/:id', checkAuth(Role.host), eventController.updateEvent);

router.get('/events/:id/participants', checkAuth(Role.host), eventController.getParticipants);



export const eventRoutes = router;
