import React from 'react'

const generateMenuItem = (MenuItem) => {
  const menuItems = []

  for (let i = 10; i < 90; i += 1) {
    menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
  }

  return menuItems
}

export default generateMenuItem
