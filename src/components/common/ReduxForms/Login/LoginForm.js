import React from 'react'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, maxLenght50 } from '../../../../utils/formValidators/validators'

import s from "./LoginForm.module.css"


const LoginForm = ({ onSubmit, isFetching, isOccurError }) => (
    <Form 
        onSubmit={onSubmit} 
        isFetching={isFetching} 
        isOccurError={isOccurError} 
        render={getExactForm} />
)

const getExactForm = (props) => <ExactForm {...props} />

const ExactForm = ({ handleSubmit, isFetching, isOccurError }) => {
    return (
        <div className={s.loginWindow}>
            <div className={`${s.fetchingBlock} ${s.loginBlocks}`}>
                { isFetching ? " Sending..." : '' }
            </div>
            <div className={`${s.loginFormBlock} ${s.loginBlocks}`}>
                <form onSubmit={handleSubmit}>
                    <div className={`${s.loginTitleWrapper} ${s.loginFormItems}`}>
                        <span className={s.loginTitle}>Login</span>
                    </div>
                    <Field 
                        name="email" 
                        placeholder="email@gmail.com" 
                        validate={composeValidators(required, maxLenght50)} 
                        component={LoginInput} 
                    />
                    <Field 
                        name="password" 
                        placeholder="password" 
                        type="password" 
                        validate={composeValidators(required, maxLenght50)} 
                        component={LoginInput} 
                    />
                    <div className={`${s.submitLoginButtonWrapper} ${s.loginFormItems}`}>
                        <button type="submit" className={s.submitLoginButton}>Submit</button>
                    </div>
                </form>
            </div>
            <div className={`${s.asyncErrorBlock} ${s.loginBlocks}`}>
                { isOccurError ? 'Password or Email is incorrect' : '' }
            </div>
        </div>
    )
}

const LoginInput = ({ input, meta, ...props }) => {
  const isError = meta.touched && meta.active && meta.error
  const inputClass = isError ? s.loginInputError : s.loginInput

  return (
    <div className={`${s.loginInputWrapper} ${s.loginFormItems}`}>
      <input {...input} {...props} className={inputClass} />
      {isError && <span className={s.errorBlock}>{meta.error}</span>}
    </div>
  )
}

export default LoginForm