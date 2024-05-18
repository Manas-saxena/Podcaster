import React, { useEffect, useState } from 'react'
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from "./StepPhoneEmail.module.css"

const phoneEmailMap={
  'phone':Phone,
  'email':Email
}
const StepPhoneEmail = ({title,setPhoneEmail}) => {
  const [type , setType] = useState('phone');
  let Component=phoneEmailMap[type]
  const toggle=(e)=>{
    e.preventDefault()
    setType(e.target.closest('button').name)
    title(e.target.closest('button').name)
  }
  return (
    <>
    <div className={styles.buttonWrapper}>
      <button className={`${styles.phoneEmailButton} ${type === 'phone'?styles.selected:''}`} onClick={toggle} name='phone'>
        <img src="./images/mobile.png" alt="mobile" />
      </button>
      <button className={`${styles.phoneEmailButton} ${type === 'email'?styles.selected:''}`} onClick={toggle} name='email'>
        <img src="./images/email.png" alt="mobile" />
      </button>
    </div>
    <Component setPhoneEmail={setPhoneEmail}></Component>
    </>
  )
}

export default StepPhoneEmail