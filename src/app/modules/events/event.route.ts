import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { eventController } from './event.controller';
import { Role } from '../user/user.interface';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post('/',
    checkAuth(Role.host),
    multerUpload.single('file'),
    eventController.eventCreate);

router.patch('/:id',
    checkAuth(Role.host),
    multerUpload.single('file'),
    eventController.updateEvent);

router.get('/all-events',
    eventController.getAllEvent);

router.get('/delete-events/:id',
    checkAuth(Role.host),
    eventController.deleteEvent);

router.get('/participants/:id',
    checkAuth(Role.host),
    eventController.getParticipants);



export const eventRoutes = router;
