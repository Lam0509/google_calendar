import {useSelector} from "react-redux";
import {Button, Dialog, DialogContent} from "@mui/material";
import AddUserForm from "./AddUserForm";
import {useState} from "react";

export default function AccountsTable() {

    const users = useSelector(state => state.user)

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <div className='mt-4'>
            <div>
                <Button variant="contained" onClick={handleClick}>Add new user</Button>
            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider">
                    {users.map((user, index) => {
                        return (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{user.User_name}</td>
                                <td>{user.User_image}</td>
                                <td>{user.User_email}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div>
                <Dialog
                    onClose={handleCloseDialog}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullWidth='sm'
                >
                    <DialogContent dividers>
                        <AddUserForm close={handleCloseDialog}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}