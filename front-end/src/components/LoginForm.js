import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import {useState} from "react";
import AuthServices from "../services/auth.services";
import jwt_decode from "jwt-decode";
import {authActions} from "../features/auth/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {EventServices} from "../services/event.services";
import {eventActions} from "../features/event/eventSlice";
import {UserServices} from "../services/user.services";
import {userActions} from "../features/user/userSlice";

export default function LoginForm() {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [account, setAccount] = useState({
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        setAccount({...account, [event.target.name]: event.target.value})
    }

    const handleSubmit = () => {
        AuthServices.login(account)
            .then((res) => {
                localStorage.setItem('accessToken', res.data)
                let user = jwt_decode(res.data)
                dispatch(authActions.loggedIn(user))
                EventServices.getEventsOfUser(user.id)
                    .then(res => {
                        dispatch(eventActions.getAllEvents(res.data))
                        UserServices.getOtherUsers(user.id)
                            .then(res => {
                                dispatch(userActions.getOtherUsers(res.data))
                                if (user.role === 'admin') {
                                    navigate('/admin/home')
                                } else {
                                    navigate('/user/home')
                                }
                            })
                    })
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                            <p className="text-white-50 mb-3">Please enter your login and password!</p>

                            <MDBInput wrapperClass='mb-4 w-100' name='email' label='Email address' id='formControlLg' type='email' size="lg" onChange={(event) => handleChange(event)}/>
                            <MDBInput wrapperClass='mb-4 w-100' name='password' label='Password' id='formControlLg' type='password' size="lg" onChange={(event) => handleChange(event)}/>
                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                            <MDBBtn size='lg' onClick={handleSubmit}>
                                Login
                            </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

