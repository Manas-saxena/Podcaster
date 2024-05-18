import React, { useState, useEffect } from 'react'
import styles from './Authenticate.module.css'
import StepOtp from '../Steps/StepOtp/StepOtp'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'
import {useNavigate} from 'react-router-dom'
import { sendOtp } from '../../http'
import { verifyOtp } from '../../http'
import {useDispatch} from 'react-redux'
import { setOtp as setOtpAction, setAuth} from '../../store/authSlice'
import { useSelector } from 'react-redux'

const steps={
    1:StepPhoneEmail,
    2:StepOtp,
    3:null
}
const Authenticate = () => {
  const [step , setStep] = useState(1);
  const [displayText, setDisplayText]= useState('phone')
  const [phoneEmail , setPhoneEmail] = useState('')
  const [otp, setOtp] = useState('')
  const StepComponent = steps[step];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {phone,otpHash} = useSelector((state)=> state.auth.otp)

  useEffect(() => {
    if(step === 3){
      navigate("/activate")
    }
  }, [step,navigate])
  const submitOtp = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await verifyOtp({phone , otp , hash:otpHash})
      dispatch(setAuth(data))

    }catch(err){
      console.log(err.response.data.message);
    }
  }
  const onNext = async (e)=>{
    e.preventDefault();
    if(!phoneEmail){
      console.log('Enter a valid phone number');
      return ;
    }
    const {data} = await sendOtp({phone:phoneEmail});
    console.log(data.otp)
    dispatch(
      setOtpAction({
      phone:data.phone,
      otpHash:data.hash
    })
  )
    setStep(step+1);
  }
  const changeTitle = (title)=>{
    setDisplayText(title)
  }

  return (
    <Card title={step ===1 ?`Enter your ${displayText}`:'Enter the code we just texted you'} icon={`./images/${step === 1?displayText:'otp'}.png`}>
      {step<3?<StepComponent setPhoneEmail={setPhoneEmail} setOtp={setOtp} title = {changeTitle}/>:""}
      <Button onclick={step===1 ? onNext : submitOtp} text='Next' icon='arrow_forward'></Button>
      {step ===1 ?<span className={styles.consent}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</span>:''}
    </Card>
  )
}

export default Authenticate