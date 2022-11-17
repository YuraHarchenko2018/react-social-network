import React from 'react'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, maxLenght240 } from '../../../../utils/formValidators/validators'

import s from "./AddPostForm.module.css"


const AddPostForm = ({ onSubmit }) => <Form onSubmit={onSubmit} render={getExactForm} />

const getExactForm = (props) => <ExactForm {...props} />

const ExactForm = ({ handleSubmit, reset }) => (
  <form onSubmit={event => {
    handleSubmit(event).then(() => {
      console.log(reset)
      reset() // or could be passed directly to then()
    })
  }}>
    <div className={s.postCreatorWrapper}>
      <div className={s.addPostTitleWrapper}>
        <span className={s.addPostTitle}>Create new post</span>
      </div>
      <Field 
          name="postText" 
          placeholder="Text some wonder here..." 
          validate={composeValidators(required, maxLenght240)} 
          component={PostTextarea} 
      />
      <div className={s.submitPostButtonWrapper}>
        <button type="submit" className={s.submitPostButton}>Post</button>
      </div>
    </div>
  </form>
)

const PostTextarea = ({ input, meta, ...props }) => {
  const isError = meta.touched && meta.active && meta.error
  const textareaClass = isError ? s.postTextareaError : s.postTextarea

  return (
    <div className={s.postTextareaWrapper}>
      <textarea {...input} {...props} className={textareaClass} />
      {isError && <div><span className={s.errorBlock}>{meta.error}</span></div>}
    </div>
  )
}

export default AddPostForm