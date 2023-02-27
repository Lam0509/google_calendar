import {Button, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MobileDateTimePicker} from "@mui/x-date-pickers/MobileDateTimePicker";
import UsersSelectInput from "./UsersSelectInput";
import {useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";

export default function EventEditDialog(props) {

    const currentUser = useSelector(state => state.auth.currentUser)

    console.log(props.eveInfo.event._def.extendedProps.users)

    const [event, setEvent] = useState({
        title: props.eveInfo.event._def.title,
        date: dayjs(props.eveInfo.event._def.extendedProps.eveDate),
        users: props.eveInfo.event._def.extendedProps.users.map(user => {if (user.name !== currentUser.name) {return user.name}}),
        location: props.eveInfo.event._def.extendedProps.location,
        description: props.eveInfo.event._def.extendedProps.description
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

    const handleCloseEditDialog = () => {
        props.close();
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <h2 className='mb-3'>
                Edit event
            </h2>
            <TextField id="outlined-basic" name='title' label="Title" variant="outlined" fullWidth className='mb-3' value={event.title} onChange={(e) => handleChangeInput(e)}/>
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
            <UsersSelectInput change={handleChangeSelectInput} users={event.users}/>
            <TextField className='mt-3' name='location' id="outlined-basic" value={event.location} label="Location" variant="outlined" fullWidth onChange={(e) => handleChangeInput(e)} />
            <TextField
                value={event.description}
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
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
            </div>
        </>
    )
}