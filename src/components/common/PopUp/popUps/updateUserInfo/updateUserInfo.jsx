import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Button, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material'
import generateMenuItem from '../../../../../utils/helpers/generateMenuItem';
import { setIsShow } from '../../../../../redux/reducers/popup'
import { updateUserInfo } from '../../../../../redux/reducers/profile'
import { getPopUpPayload } from '../../../../../redux/selectors/popup'
import containerStyle from '../../PopUpContainer.module.css'
import { serverLink } from '../../../../../constants/common'
import s from './updateUserInfo.module.css'

function UpdateUserInfoPopUp() {
  const dispatch = useDispatch()
  const {
    id, name, age, avatarImg,
  } = useSelector(getPopUpPayload)
  const userAvatarImgLink = serverLink + avatarImg

  const [newName, setNewName] = useState(name)
  const [newAge, setNewAge] = useState(age)
  const [newAvatar, setNewAvatar] = useState(null)

  const [localAvatar, setLocalAvatar] = useState(userAvatarImgLink)

  const handleApproveBtn = async () => {
    dispatch(updateUserInfo({
      userId: id,
      name: newName,
      age: newAge,
      file: newAvatar,
    }))
    dispatch(setIsShow({ isShow: false }))
  }

  const handleOnChangeUserNameInput = ({ target }) => {
    setNewName(target.value)
  }

  const handleOnChangeUserAgeInput = ({ target }) => {
    setNewAge(target.value)
  }

  const handleChangeLocalAvatar = (imageFile) => {
    const reader = new FileReader()

    reader.addEventListener('load', (e) => {
      setLocalAvatar(e.target.result)
    })

    reader.readAsDataURL(imageFile)
  }

  const handleOnChangeAvatarInput = (e) => {
    const imageFile = e.target.files[0]
    setNewAvatar(imageFile)
    handleChangeLocalAvatar(imageFile)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.avatarWrapper}>
        <Avatar
          alt="Avatar"
          src={localAvatar}
          sx={{ width: 33, height: 33 }}
        />
        <Button sx={{ height: 30 }} variant="contained" component="label">
          Upload
          <input onChange={handleOnChangeAvatarInput} hidden accept="image/*" multiple type="file" />
        </Button>
      </div>
      <div className={s.inputWrapper}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={newName}
          onChange={handleOnChangeUserNameInput}
        />
      </div>
      <div className={s.inputWrapper}>
        <AgeSelect
          age={newAge}
          handleChange={handleOnChangeUserAgeInput}
        />
      </div>
      <button type="button" onClick={handleApproveBtn} className={containerStyle.approveBtn}>Approve</button>
    </div>
  )
}

function AgeSelect({ age, handleChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        {
          generateMenuItem(MenuItem)
        }
      </Select>
    </FormControl>
  )
}

export default UpdateUserInfoPopUp
