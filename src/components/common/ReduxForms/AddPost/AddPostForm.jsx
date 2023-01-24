import React from 'react'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, maxLength2000 } from '../../../../utils/formValidators/validators'

import s from './AddPostForm.module.css'

const getExactForm = (props) => <ExactForm {...props} />

function AddPostForm({ onSubmit }) {
  return <Form onSubmit={onSubmit} render={getExactForm} />
}

function PostTextarea({ input, meta, ...props }) {
  const isError = meta.touched && meta.active && meta.error
  const textareaClass = isError ? s.postTextareaError : s.postTextarea

  return (
    <div className={s.postTextareaWrapper}>
      <textarea {...input} {...props} className={textareaClass} />
      {isError && <div><span className={s.errorBlock}>{meta.error}</span></div>}
    </div>
  )
}

function ExactForm({ handleSubmit, reset }) {
  return (
    <form onSubmit={(event) => {
      handleSubmit(event).then(() => {
        console.log(reset)
        reset() // or could be passed directly to then()
      })
    }}
    >
      <div className={s.postCreatorWrapper}>
        <div className={s.addPostTitleWrapper}>
          <span className={s.addPostTitle}>Create new post</span>
        </div>
        <Field
          name="postText"
          placeholder="Text some wonder here..."
          validate={composeValidators(required, maxLength2000)}
          component={PostTextarea}
        />
        <div className={s.submitPostButtonWrapper}>
          <button type="submit" className={s.submitPostButton}>Post</button>
        </div>
      </div>
    </form>
  )
}

export default AddPostForm
