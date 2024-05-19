import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import styles from './StepAvatar.module.css'
import { setprofilePic} from '../../../store/activateSlice'
import { useSelector, useDispatch } from 'react-redux'
import { activate } from '../../../http'
import { setAuth } from '../../../store/authSlice'

const StepAvatar = () => {
  const {name,profilePic : profile } = useSelector((state)=>state.activate)
  const [avatar,setAvatar] = useState(profile)
  const dispatch = useDispatch();

  const onNext = async ()=>{
    try {
      const {data} = await activate({name,avatar});
      if(data.auth){
        dispatch(setAuth(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const captureImage =(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
      setAvatar(reader.result)
      dispatch(setprofilePic(reader.result));
    }

  }
  return (
    <Card title={`Okay, ${name}!`} icon='./images/monkey.png'>
      <span className={styles.subHeading}>How’s this photo?</span>
      <div className={styles.avatar}>
        <img src={profile} alt="profile" />
      </div>
      <label className={styles.avatarInput} htmlFor='setavatar'>Choose a different photo</label>
      <input type="file" accept="image/png, image/jpeg" hidden id='setavatar' onChange={captureImage} />
      <Button text='Next' icon='arrow_forward' onclick={onNext}></Button>
    </Card>
    
  )
}

export default StepAvatar