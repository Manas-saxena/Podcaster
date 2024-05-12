import React from 'react'
import Styles from './Button.module.css'

const Button = ({text,icon,onclick}) => {
  return (
        <button onClick={onclick} className={Styles.button}>
          <span>{text}</span>
          <img src={`./images/${icon}.png`} alt="icon" />
        </button>
  )
}

export default Button