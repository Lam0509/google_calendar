import User from "../entity/user";
import {AppDataSource} from "../data-source";
import Event from "../entity/event";

let userRepo = AppDataSource.getRepository(User)
let eventRepo = AppDataSource.getRepository(Event)

export class EventServices {

    static getEventsOfUser(userId) {
        return userRepo.findOne({
            relations: {
                events: {
                    users: true
                }
            }, where: {
                id: userId
            }
        })
    }

    static async addEvent(userId, title, date, location, description) {
        let user = await userRepo.findOneBy({id: userId})
        let event = new Event()
        event.title = title
        event.date = date
        event.location = location
        event.description = description
        await eventRepo.save(event)
        let newEvent = await eventRepo.findOne({
            relations: {
                users: true
            }, where: {
                id: event.id
            }
        })
        newEvent.users = [...newEvent.users, user]
        return await eventRepo.save(newEvent)
    }

    static async addUserIntoEvent(eventName, userId) {
        let event = await eventRepo.findOne({
            relations: {
                users: true
            }, where: {
                title: eventName
            }
        })
        let user = await userRepo.findOneBy({id: userId})
        event.users = [...event.users, user]
        return await eventRepo.save(event)
    }

    static async deleteEvent(eventId) {
        let event = await eventRepo.findOneBy({id: eventId})
        await eventRepo.remove(event)
    }

}

