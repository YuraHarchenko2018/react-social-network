import React from 'react';
import { TextField, Box } from '@mui/material';
import { searchUsers, setIsSearchFlag } from 'redux/reducers/users';
import { useDispatch } from 'react-redux';

const SearchUsers = () => {
    const dispatch = useDispatch()

    const handleSearchChange = (e) => {
        // @ts-ignore
        dispatch(searchUsers(e.target.value))
        dispatch(setIsSearchFlag(!!e.target.value))
    }

    return (
        //  display="flex" justifyContent="center" alignItems="center"
        <Box sx={{ height: 30, padding: '15px' }}>
            <TextField id="outlined-basic" label="Search Users"
                size="small"
                variant="outlined"
                onChange={handleSearchChange}
                sx={{ width: '300px' }}
            />
        </Box>
    )
}

export default SearchUsers