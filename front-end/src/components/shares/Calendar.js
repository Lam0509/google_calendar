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
const socket = io.connect('http://localhost:8000')

export default function Calendar() {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const events = useSelector(state => state.event)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const user = useSelector(state => state.auth.currentUser)

    const handleClickBtn = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
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
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

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
                />
            </div>
            <div>
                <Dialog
                    onClose={handleCloseDialog}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullWidth='sm'
                >
                    <DialogContent dividers>
                        <AddEventForm close={handleCloseDialog}/>
                    </DialogContent>
                </Dialog>
            </div>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar} severity={snackbar.severity} message={snackbar.message} />
        </>
    )
}