import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Navigation.module.css'
const Navigation = () => {
  const brandStyle = {
    color:'#fff',
    textDecoration:'none',
    fontWeight:'Bold',
    fontSize:'22px',
    display:'flex',
    alignItem:'center',
    gap:'10px'
  }
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img className="logo" src="./images/hand.png" alt="logo" />
        <span>Podcaster</span>
      </Link>
    </nav>
  )
}

export default Navigation