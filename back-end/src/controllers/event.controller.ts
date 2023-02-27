import { Request, Response } from "express";
import {EventServices} from "../services/event.services";

class EventController {

    static async getEventsOfUser(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            EventServices.getEventsOfUser(userId)
                .then(user => {
                    res.json(user.events)
                }).catch(err => {
                    res.json(err)
            })
        }
        catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async addEvent(req: Request, res: Response) {
        let {userId, title, date, location, description} = req.body
        await EventServices.addEvent(userId, title, date, location, description)
            .then(() => {
                res.status(200).json({message: 'Add new event successfully!'})
            }).catch(error => {
                res.json(error)
        })
    }

    static addUserIntoEvent(req: Request, res: Response) {
        let {userId, eventName} = req.body;
        EventServices.addUserIntoEvent(eventName, userId)
            .then(() => {
                res.status(200).json({message: 'Invite new user successfully!'})
            }).catch(error => {
                res.json(error)
        })
    }

    static deleteEvent(req: Request, res: Response) {
        let eventId = req.query.eventId;
        EventServices.deleteEvent(eventId)
            .then(() => {
                res.status(200).json({message: 'Deleted event successfully!'})
            }).catch(error => {
                res.json(error)
        })
    }
}

export default EventController;