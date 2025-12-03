import { Router } from "express";
import { authController } from "./auth.controller";
import { multerUpload } from "../../config/multer.config";

const route = Router()

route.post('/register',
    multerUpload.single("file"),
    authController.createUser)
route.post('/login', authController.login)
route.post('/refresh-token', authController.refreshAccessToken)
route.post('/logout', authController.accessTokenLogout)


export const authRoutes = route