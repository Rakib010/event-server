import { Router } from 'express';
import { userController } from './user.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from './user.interface';


const route = Router()

route.patch('/:id', userController.userUpdate)
route.get('/', checkAuth(Role.admin), userController.getAllUsers)
route.get('/:id', checkAuth(Role.admin), userController.getUserById)
route.get('/me',  userController.getMe)




export const usersRoutes = route