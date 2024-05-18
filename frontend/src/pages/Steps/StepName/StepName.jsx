import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import style from './StepName.module.css'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { setName as setNameStore } from '../../../store/activateSlice'
import { useSelector, useDispatch } from 'react-redux'

const StepName = ({next}) => {
  const {name : nameFromState} = useSelector((state)=>state.activate)
  const [name,setName] = useState(nameFromState)
  const dispatch = useDispatch();

  const onNext =()=>{
    if(!name) return 
    dispatch(setNameStore(name))
    next()
  }
  return (
    <Card title="What’s your full name?" icon='./images/goggle.png'>
      <TextInput type='text' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)} ></TextInput>
      <div className={style.nameDesclaimer}>
        <span>People use real names at </span>
        <span>codershouse 😄</span>
      </div>
      <Button text='Next' icon='arrow_forward' onclick={onNext}></Button>
    </Card>
    
  )
}

export default StepName