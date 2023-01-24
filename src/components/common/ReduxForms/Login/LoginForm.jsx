import React from 'react'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, maxLength50 } from '../../../../utils/formValidators/validators'
import s from './LoginForm.module.css'

const getExactForm = (props) => <ExactForm {...props} />

function LoginForm({ onSubmit, isFetching, isOccurError }) {
  return (
    <Form
      onSubmit={onSubmit}
      isFetching={isFetching}
      isOccurError={isOccurError}
      render={getExactForm}
    />
  )
}

function LoginInput({ input, meta, ...props }) {
  const isError = meta.touched && meta.active && meta.error
  const inputClass = isError ? s.loginInputError : s.loginInput

  return (
    <div className={`${s.loginInputWrapper} ${s.loginFormItems}`}>
      <input {...input} {...props} className={inputClass} />
      {isError && <span className={s.errorBlock}>{meta.error}</span>}
    </div>
  )
}

function ExactForm({ handleSubmit, isFetching, isOccurError }) {
  return (
    <div className={s.loginWindow}>
      <div className={`${s.fetchingBlock} ${s.loginBlocks}`}>
        {isFetching ? ' Sending...' : ''}
      </div>
      <div className={`${s.loginFormBlock} ${s.loginBlocks}`}>
        <form onSubmit={handleSubmit}>
          <div className={`${s.loginTitleWrapper} ${s.loginFormItems}`}>
            <span className={s.loginTitle}>Login</span>
          </div>
          <Field
            name="email"
            placeholder="email@gmail.com"
            validate={composeValidators(required, maxLength50)}
            component={LoginInput}
          />
          <Field
            name="password"
            placeholder="password"
            type="password"
            validate={composeValidators(required, maxLength50)}
            component={LoginInput}
          />
          <div className={`${s.submitLoginButtonWrapper} ${s.loginFormItems}`}>
            <button type="submit" className={s.submitLoginButton}>Submit</button>
          </div>
        </form>
      </div>
      <div className={`${s.asyncErrorBlock} ${s.loginBlocks}`}>
        {isOccurError ? 'Password or Email is incorrect' : ''}
      </div>
    </div>
  )
}

export default LoginForm
