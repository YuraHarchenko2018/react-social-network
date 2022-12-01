import React from 'react';
import { TextField, Box } from '@mui/material';
import { searchFriends, setIsSearchFlag } from 'redux/reducers/users';
import { useDispatch } from 'react-redux';

const SearchFriends = () => {
    const dispatch = useDispatch()

    const handleSearchChange = (e) => {
        // @ts-ignore
        dispatch(searchFriends(e.target.value))
        dispatch(setIsSearchFlag(!!e.target.value))
    }

    return (
        <Box sx={{ height: 30, padding: '15px' }}>
            <TextField id="outlined-basic" label="Search Friends"
                size="small"
                variant="outlined"
                onChange={handleSearchChange}
                sx={{ width: '300px' }}
            />
        </Box>
    )
}

export default SearchFriends