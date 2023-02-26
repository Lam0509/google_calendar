import {Button, TextField} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import {useState} from "react";
import dayjs from 'dayjs';
import UsersSelectInput from "./UsersSelectInput";
import io from 'socket.io-client'
import moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {EventServices} from "../../services/event.services";
import {eventActions} from "../../features/event/eventSlice";
const socket = io.connect('http://localhost:8000')

export default function AddEventForm(props) {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.currentUser)

    const [event, setEvent] = useState({
        title: '',
        date: dayjs(new Date()),
        users: [],
        location: '',
        description: ''
    })

    const handleChangeDate = (newValue) => {
        setEvent({...event, date: newValue})
    }

    const handleChangeInput = (e) => {
        setEvent({...event, [e.target.name]: e.target.value})
    }

    const handleChangeSelectInput = (values) => {
        setEvent({...event, users: values})
    }

    const handleSubmit = async () => {
        event.date = moment(event.date.$d).format('YYYY-MM-DD HH:mm:ss')
        event.userId = user.id
        await EventServices.addEvent(event)
            .then(async () => {
                EventServices.getEventsOfUser(user.id)
                    .then(async (res) => {
                        dispatch(eventActions.getAllEvents(res.data))
                        props.close()
                        await socket.emit('send_invitation', event)
                    })
            }).catch(error => {
            console.log(error)
        })
    }

    const handleCloseDialog = () => {
        props.close();
    }

    return (
        <>
            <h2 className='mb-3'>
                Add new event
            </h2>
            <TextField id="outlined-basic" name='title' label="Title" variant="outlined" fullWidth className='mb-3' onChange={(e) => handleChangeInput(e)}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    label="Choose date"
                    value={event.date}
                    name='date'
                    onChange={(newValue) => {
                        handleChangeDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <UsersSelectInput change={handleChangeSelectInput}/>
            <TextField className='mt-3' name='location' id="outlined-basic" label="Location" variant="outlined" fullWidth onChange={(e) => handleChangeInput(e)} />
            <TextField
                name='description'
                className='mt-3'
                id="outlined-multiline-static"
                label="Description"
                multiline
                cols={20}
                rows={5}
                onChange={(e) => handleChangeInput(e)}
            />
            <div className='mt-3'>
                <Button variant="contained" onClick={handleSubmit} className='me-2' >Save</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </div>
        </>
    )
}