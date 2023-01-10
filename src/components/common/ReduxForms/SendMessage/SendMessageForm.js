import React from 'react'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, maxLenght1000 } from '../../../../utils/formValidators/validators'

import s from "./SendMessageForm.module.css"


const SendMessageForm = ({ onSubmit }) => {
  return <Form onSubmit={onSubmit} render={ExactForm} />
}

const ExactForm = ({ handleSubmit, form }) => (
  <form onSubmit={event => {
    handleSubmit(event)
    form.reset()
  }}>
    <Field
      name="message"
      placeholder="Message here..."
      validate={composeValidators(required, maxLenght1000)}
      component={MessageInput}
    />
  </form>
)

const MessageInput = ({ input, meta, ...props }) => (
  <div className={s.messageInputWrapper}>
    <input {...input} {...props} autoComplete="off" className={s.messageInput} />
  </div>
)

export default SendMessageForm