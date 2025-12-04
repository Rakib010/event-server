import { Router } from 'express';
import { userController } from './user.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from './user.interface';
import { multerUpload } from '../../config/multer.config';


const route = Router()


route.patch('/:id',
    checkAuth(Role.user, Role.host),
    multerUpload.single("file"),
    userController.userUpdate)

route.get('/get-me', checkAuth(Role.user, Role.host), userController.getMe)

route.get('/', checkAuth(Role.admin), userController.getAllUsers)

route.get('/:id', checkAuth(Role.admin), userController.getUserById)





export const usersRoutes = route
