import { Router } from "express"
import { usersRoutes } from "../modules/user/user.route"
import { authRoutes } from "../modules/auth/auth.route"
import { eventRoutes } from "../modules/events/event.route"


const routes = Router()


routes.use('/api/v1/user', usersRoutes)
routes.use('/api/v1/auth', authRoutes)
routes.use('/api/v1/events', eventRoutes)


export default routes