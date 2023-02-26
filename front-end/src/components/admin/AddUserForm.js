import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {UserServices} from '../../services/user.services'
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../features/user/userSlice";
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000')

export default function AddUserForm(props) {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.auth.currentUser)

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleCLoseDialog = () => {
        props.close()
    }

    const handleSubmit = async () => {
        UserServices.addNewUser(user)
            .then(() => {
                UserServices.getOtherUsers(currentUser.id)
                    .then((res) => {
                        dispatch(userActions.getOtherUsers(res.data))
                        props.close()
                    })
            })
    }

    return (
        <>
            <h2 className='mb-3'>
                Add new user
            </h2>
            <TextField id="outlined-basic" name='name' label="Name" variant="outlined" fullWidth onChange={(e) => handleChange(e)} className='mb-3' />
            <TextField id="outlined-basic" name='email' label="Email" variant="outlined" fullWidth onChange={(e) => handleChange(e)} className='mb-3' />
            <TextField id="outlined-basic" name='password' label="Password" variant="outlined" fullWidth onChange={(e) => handleChange(e)} className='mb-3' />
            <Button variant="contained" onClick={handleSubmit} className='me-2' >Save</Button>
            <Button onClick={handleCLoseDialog}>Cancel</Button>
        </>
    )
}