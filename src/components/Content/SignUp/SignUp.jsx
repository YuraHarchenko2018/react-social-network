import React from "react"
import s from './SignUp.module.css'

const SignUp = (props) => {
    return (
        <div className={s.signUpWrapper}>
            <div className={s.signUpWindow}>
                <div className={s.titleWrapper}>
                    <h2>Sign Up</h2>
                </div>
                <div className={s.signUpInputsWrapper}>
                    <input className={s.emailInput} placeholder="email@gmail.com" />
                    <input className={s.passwordInput} placeholder="qwerty" type="password" />
                    <input className={s.passwordInput} placeholder="qwerty" type="password" />
                </div>
                <div className={s.submitBtnWpapper}>
                    <button className={s.submitBtn}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp