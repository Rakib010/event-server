import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router()

route.post('/register', authController.createUser)
route.post('/login', authController.login)
route.post('/refresh-token', authController.refreshAccessToken)
route.post('/logout', authController.accessTokenLogout)


export const authRoutes = route