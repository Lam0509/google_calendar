import express, {Router} from 'express';
import UserController from "../controllers/user.controller";

const UserRouter: Router = express.Router();

UserRouter.get('/:id', UserController.getOtherUsers);
UserRouter.post('/', UserController.addUser);

export default UserRouter;