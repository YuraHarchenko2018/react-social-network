import React from 'react'
import { Form, Field } from 'react-final-form'
import {
  composeValidators, required, maxLength50, maxLength100,
} from '../../../../utils/formValidators/validators'
import s from './SignUpForm.module.css'

const getExactForm = (props) => <ExactForm {...props} />

function SignUpInput({ input, meta, ...props }) {
  const isError = meta.touched && meta.active && meta.error
  const inputClass = isError ? s.signUpInputError : s.signUpInput

  return (
    <div className={`${s.signUpInputWrapper} ${s.signUpFormItems}`}>
      <input {...input} {...props} className={inputClass} />
      {isError && <span className={s.errorBlock}>{meta.error}</span>}
    </div>
  )
}

function ExactForm({ handleSubmit, isFetching, isOccurError }) {
  return (
    <div className={s.signUpWindow}>
      <div className={`${s.fetchingBlock} ${s.signUpBlocks}`}>
        {isFetching ? ' Sending...' : ''}
      </div>
      <div className={`${s.signUpFormBlock} ${s.signUpBlocks}`}>
        <form onSubmit={handleSubmit}>
          <div className={`${s.signUpTitleWrapper} ${s.signUpFormItems}`}>
            <span className={s.signUpTitle}>Sign Up</span>
          </div>
          <Field
            name="name"
            placeholder="Name"
            validate={composeValidators(required, maxLength50)}
            component={SignUpInput}
          />
          <Field
            name="email"
            placeholder="email@gmail.com"
            validate={composeValidators(required, maxLength50)}
            component={SignUpInput}
          />
          <Field
            name="password"
            placeholder="password"
            type="password"
            validate={composeValidators(required, maxLength100)}
            component={SignUpInput}
          />
          <Field
            name="rePassword"
            placeholder="Confirm password"
            type="password"
            validate={composeValidators(required, maxLength100)}
            component={SignUpInput}
          />
          <Field
            name="age"
            placeholder="Age"
            type="number"
            validate={composeValidators(required, maxLength50)}
            component={SignUpInput}
          />
          <div className={`${s.submitLoginButtonWrapper} ${s.signUpFormItems}`}>
            <button type="submit" className={s.submitLoginButton}>Submit</button>
          </div>
        </form>
      </div>
      <div className={`${s.asyncErrorBlock} ${s.signUpBlocks}`}>
        {isOccurError ? 'Password or Email is incorrect' : ''}
      </div>
    </div>
  )
}

function SignUpForm({ onSubmit, isFetching, isOccurError }) {
  return (
    <Form
      onSubmit={onSubmit}
      isFetching={isFetching}
      isOccurError={isOccurError}
      render={getExactForm}
    />
  )
}

export default SignUpForm
