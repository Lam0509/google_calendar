import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogContent} from "@mui/material";
import AddEventForm from "./AddEventForm";
import io from 'socket.io-client'
import {notifyActions} from "../../features/notify/notifySlice";
import Snackbar from '@mui/material/Snackbar';
import EventInfoDialog from "./EventInfoDialog";
import {EventServices} from "../../services/event.services";
import {eventActions} from "../../features/event/eventSlice";
const socket = io.connect('http://localhost:8000')

export default function Calendar() {

    const waitingEvents = useSelector(state => state.notify.waitingEvents)

    const [eventInfo, setEventInfo] = useState('')
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    let events = useSelector(state => state.event)

    events = events.map(event => {
        let newEvent = {...event}
        newEvent.eveDate = newEvent.date
        return newEvent
    })

    console.log(waitingEvents)

    const dispatch = useDispatch()

    const [openAddEventDialog, setOpenAddEventDialog] = useState(false)

    const [openInfoDialog, setOpenInfoDialog] = useState(false)

    const user = useSelector(state => state.auth.currentUser)

    const handleClickBtn = () => {
        setOpenAddEventDialog(true)
    }

    const handleCloseAddEventDialog = () => {
        setOpenAddEventDialog(false)
    }

    const handleCloseInfoDialog = () => {
        setOpenInfoDialog(false)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b className='me-1'>{eventInfo.timeText}</b>
                <i className='me-3'>{eventInfo.event.title}</i>
            </>
        )
    }

    const handleEventClick = (clickInfo) => {
        setEventInfo(clickInfo)
        setOpenInfoDialog(true)
    }

    useEffect(() => {
        socket.on('event_deleted', (data) => {
            const eventIds = events.map(event => {return event.id})
            if (eventIds.includes(+data.id)) {
                EventServices.getEventsOfUser(user.id)
                    .then((res) => {
                        dispatch(eventActions.getAllEvents(res.data))
                        setSnackbar({
                            severity: "success",
                            message: 'A event has been deleted'
                        })
                        setOpenSnackBar(true);
                    })
            }
        })
    }, [socket])

    useEffect(() => {
        socket.on('receive_invitation', (data) => {
            if (data.users.includes(user.name)) {
                setSnackbar({
                    severity: "success",
                    message: 'You have an invitation'
                })
                setOpenSnackBar(true);
                dispatch(notifyActions.addNotify(data))
            }
        })
    }, [socket])


    return (
        <>
            <div className='mt-3'>
                <Button variant="contained" onClick={handleClickBtn}>Add new event</Button>
            </div>
            <div className='mt-3'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={events}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                />
            </div>
            <div>
                <Dialog
                    onClose={handleCloseAddEventDialog}
                    aria-labelledby="customized-dialog-title"
                    open={openAddEventDialog}
                    fullWidth='sm'
                >
                    <DialogContent dividers>
                        <AddEventForm close={handleCloseAddEventDialog}/>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Dialog
                    onClose={handleCloseInfoDialog}
                    aria-labelledby="customized-dialog-title"
                    open={openInfoDialog}
                    fullWidth='sm'
                >
                    <DialogContent dividers>
                        <EventInfoDialog eveInfo={eventInfo} close={handleCloseInfoDialog}/>
                    </DialogContent>
                </Dialog>
            </div>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar} severity={snackbar.severity} message={snackbar.message} />
        </>
    )
}