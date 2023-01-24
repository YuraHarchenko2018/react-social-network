import React from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Box } from '@mui/material'
import { searchUsers, setIsSearchFlag } from '../../../../../redux/reducers/users'

function SearchUsers() {
  const dispatch = useDispatch()

  const handleSearchChange = (e) => {
    dispatch(searchUsers(e.target.value))
    dispatch(setIsSearchFlag(!!e.target.value))
  }

  return (
    <Box sx={{ height: 30, padding: '15px' }}>
      <TextField
        id="outlined-basic"
        label="Search Users"
        size="small"
        variant="outlined"
        autoComplete="off"
        onChange={handleSearchChange}
        sx={{ width: '300px' }}
      />
    </Box>
  )
}

export default SearchUsers
