import express, {Router} from 'express';
import AuthController from "../controllers/auth.controller";

const AuthRouter: Router = express.Router();

AuthRouter.post('/login', AuthController.login);

export default AuthRouter;






