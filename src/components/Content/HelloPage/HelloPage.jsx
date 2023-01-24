import React from 'react'
import s from './HelloPage.module.css'

function HelloPage() {
  return (
    <div className={s.helloPageWrapper}>
      <h2>Hello 👋</h2>
      <p>It&lsquo;s my first React-Redux App</p>
      <p>Here I was learning how to create and setup Redux Store</p>
      <p>How to create Redux reducers and manage state</p>
      <p>How working functionals components</p>
      <p>And many other features</p>
      <p>Date: 01 Oct 2022</p>
    </div>
  )
}

export default HelloPage
