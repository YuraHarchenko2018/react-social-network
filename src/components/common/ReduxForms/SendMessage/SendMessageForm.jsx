import React from 'react'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, maxLength1000 } from '../../../../utils/formValidators/validators'
import s from './SendMessageForm.module.css'

function MessageInput({ input, meta, ...props }) {
  return (
    <div className={s.messageInputWrapper}>
      <input {...input} {...props} autoComplete="off" className={s.messageInput} />
    </div>
  )
}

function ExactForm({ handleSubmit, form }) {
  return (
    <form onSubmit={(event) => {
      handleSubmit(event)
      form.reset()
    }}
    >
      <Field
        name="message"
        placeholder="Message here..."
        validate={composeValidators(required, maxLength1000)}
        component={MessageInput}
      />
    </form>
  )
}

function SendMessageForm({ onSubmit }) {
  return <Form onSubmit={onSubmit} render={ExactForm} />
}

export default SendMessageForm
