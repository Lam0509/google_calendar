import express, {Router} from 'express';
import EventController from "../controllers/event.controller";

const EventRouter: Router = express.Router();

EventRouter.get('/:id', EventController.getEventsOfUser);
EventRouter.post('/', EventController.addEvent);
EventRouter.post('/add-user', EventController.addUserIntoEvent);

export default EventRouter;