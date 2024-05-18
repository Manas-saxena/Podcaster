import React,{useState} from 'react'
import styles from './Phone.module.css'
import TextInput from '../../../../components/shared/TextInput/TextInput'

const Phone = ({setPhoneEmail}) => {

  return (
    <TextInput type='text' placeholder='+91 8171728202' onChange={(e)=>{setPhoneEmail(e.target.value)}} ><img src="./images/flag.png" alt="flag" /></TextInput>
  )
}

export default Phone