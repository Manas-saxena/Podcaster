import React from 'react'
import styles from './TextInput.module.css'

const TextInput = ({children,...rest}) => {
  return (
    <div className={styles.phoneInput}>
        {children}
        <input {...rest} />
    </div>
  )
}

export default TextInput