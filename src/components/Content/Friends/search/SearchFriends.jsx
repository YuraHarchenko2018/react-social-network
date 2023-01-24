import React from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Box } from '@mui/material'
import { searchFriends, setIsSearchFlag } from '../../../../redux/reducers/users'

function SearchFriends() {
  const dispatch = useDispatch()

  const handleSearchChange = (e) => {
    dispatch(searchFriends(e.target.value))
    dispatch(setIsSearchFlag(!!e.target.value))
  }

  return (
    <Box sx={{ height: 30, padding: '15px' }}>
      <TextField
        id="outlined-basic"
        label="Search Friends"
        size="small"
        variant="outlined"
        autoComplete="off"
        onChange={handleSearchChange}
        sx={{ width: '300px' }}
      />
    </Box>
  )
}

export default SearchFriends
