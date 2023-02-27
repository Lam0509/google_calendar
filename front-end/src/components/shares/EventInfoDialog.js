import CloseIcon from '@mui/icons-material/Close';
import {Button, Dialog, DialogContent} from "@mui/material";
import Chip from "@mui/material/Chip";
import moment from "moment";
import {EventServices} from "../../services/event.services";
import {useDispatch, useSelector} from "react-redux";
import {eventActions} from "../../features/event/eventSlice";
import io from 'socket.io-client'
import EventEditDialog from "./EventEditDialog";
import {useState} from "react";
const socket = io.connect('http://localhost:8000')

export default function EventInfoDialog(props) {

    const currentUser = useSelector(state => state.auth.currentUser)

    const [openEditDialog, setOpenEditDialog] = useState(false)

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    }

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true)
    }

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.currentUser)

    const handleCLoseInfoDialog = () => {
        props.close()
    }

    const handleDeleteEvent = () => {
        if (window.confirm(`Are you sure you want to delete the event '${props.eveInfo.event._def.title}'`)) {
            EventServices.deleteEvent(props.eveInfo.event._def.publicId)
                .then(() => {
                    EventServices.getEventsOfUser(user.id)
                        .then(async (res) => {
                            dispatch(eventActions.getAllEvents(res.data))
                            props.close()
                            await socket.emit('delete_event', {id: props.eveInfo.event._def.publicId, title: props.eveInfo.event._def.title})
                        })
                })
        }
    }

    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <CloseIcon onClick={handleCLoseInfoDialog} style={{cursor: "pointer"}} className='me-2'/>
                    <p className='m-0 fs-3'>Event Information</p>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Button onClick={handleOpenEditDialog} className='me-2' variant="contained" color="success">
                        Edit
                    </Button>
                    <Button onClick={handleDeleteEvent} variant="outlined" color="error">
                        Delete
                    </Button>
                </div>
            </div>
            <div style={{marginTop: '12px'}}>
                <div>Name: {props.eveInfo.event._def.title}</div>
                <div>Location: {props.eveInfo.event._def.extendedProps.location}</div>
                <div>Description: {props.eveInfo.event._def.extendedProps.description}</div>
                Participants: {props.eveInfo.event._def.extendedProps.users.map(user => {
                    if (user.name !== currentUser.name) {
                        return (
                            <Chip label={user.name} />
                        )
                    }
                })}
                <div>
                    Time: {moment(props.eveInfo.event._def.extendedProps.eveDate).format('HH:mm:ss DD/MM/YYYY')}
                </div>
            </div>
            <div>
                <Dialog
                    onClose={handleCloseEditDialog}
                    aria-labelledby="customized-dialog-title"
                    open={openEditDialog}
                    fullWidth='sm'
                >
                    <DialogContent dividers>
                        <EventEditDialog eveInfo={props.eveInfo} close={handleCloseEditDialog}/>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}