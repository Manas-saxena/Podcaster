import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import StepOtp from '../Steps/StepOtp/StepOtp'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'

const steps={
    1:StepPhoneEmail,
    2:StepOtp,
}
const Login = () => {
  const [step , setStep] = useState(1);
  
  const StepComponent = steps[step];
  
  const onNext =(e)=>{
    e.preventDefault();
    setStep(step+1);
  }

  return (
    <Card>
      <StepComponent/>
      <Button onclick={onNext} text='Next' icon='arrow_forward'></Button>
    </Card>
  )
}

export default Login