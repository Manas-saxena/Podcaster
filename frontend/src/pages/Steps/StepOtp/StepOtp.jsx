import React,{useState} from 'react'
import TextInput from '../../../components/shared/TextInput/TextInput'

const StepOtp = ({setOtp}) => {
  

  return (
    <TextInput type='text' placeholder='otp' onChange={(e)=>{setOtp(e.target.value)}} ></TextInput>
  )
}

export default StepOtp