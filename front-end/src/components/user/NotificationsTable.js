import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {EventServices} from "../../services/event.services";
import {eventActions} from "../../features/event/eventSlice";
import {notifyActions} from "../../features/notify/notifySlice";

export default function NotificationsTable() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.currentUser)

    const handleAccept = (title, id) => {
        const data = {
            eventName: title,
            userId: id
        }
        EventServices.addUserIntoEvent(data)
            .then(() => {
                EventServices.getEventsOfUser(user.id)
                    .then((res) => {
                        dispatch(eventActions.getAllEvents(res.data))
                        dispatch(notifyActions.acceptNotify(title))
                    })
            })
    }

    const handleDecline = (title) => {
        dispatch(notifyActions.declineNotify(title))
    }

    const waitingEvents = useSelector(state => state.notify.waitingEvents)

    return (
        <div className='mt-4'>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider">
                    {waitingEvents.map((item, index) => {
                        return (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                                <td>{item.location}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Button variant="contained" className='me-2' onClick={() => handleAccept(item.title, user.id)}>Accept</Button>
                                    <Button variant="contained" onClick={() => handleDecline(item.title)}>Decline</Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}