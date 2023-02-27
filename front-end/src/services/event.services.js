import {Axios} from "../configs/axios";

export class EventServices {
    static getEventsOfUser(userId) {
        return Axios.get(`events/${userId}`);
    }

    static addEvent(values) {
        return Axios.post(`events`, values);
    }

    static addUserIntoEvent(data) {
        return Axios.post(`events/add-user`, data);
    }

    static deleteEvent(id) {
        return Axios.delete(`events`, {
            params: {
                eventId: id
            }
        });
    }
}
