import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useSelector} from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function UsersSelectInput(props) {

    console.log(props.users)

    const otherUsers = useSelector(state => state.user)
    const theme = useTheme();
    const [personName, setPersonName] = React.useState(props.users && props.users.length !== 0 && props.users[0] !== undefined ? props.users : []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        props.change(value)
    };

    return (
        <div className='mt-3'>
            <FormControl sx={{ m: 0, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Add user</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Add user" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {otherUsers.map((user) => (
                        <MenuItem
                            key={user.User_name}
                            value={user.User_name}
                            style={getStyles(user.User_name, personName, theme)}
                        >
                            {user.User_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}