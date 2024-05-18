import React, { useState } from 'react'
import styles from './Email.module.css'
import TextInput from '../../../../components/shared/TextInput/TextInput'

const Email = () => {
    const [email,setEmail] = useState('')
  return (
    <TextInput type="email" placeholder='abcd@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} ></TextInput>
  )
}

export default Email