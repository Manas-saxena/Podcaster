import React from "react";
import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import {Link,useNavigate} from "react-router-dom"
import Button from "../../components/shared/Button/Button"

const Home = () => {
  const signInLinkStyle={
    color:'#0077FF',
    fontWeight:'bold',
    textdecoration:"none",
    marginLeft:'10px'
  }
  const navigate = useNavigate();
  const startRegister = (e)=>{
    e.preventDefault()
    navigate('/authenticate')
  }
  return (
    <div>
      <Card title='Welcome to podcaster!!' icon='./images/hand.png'>
      <p className={styles.text}>
        We’re working hard to get Codershouse ready for everyone! While we wrap
        up the finishing youches, we’re adding people gradually to make sure
        nothing breaks :
      </p>
      <div>
        <Button onclick={startRegister} text='Get your UserName' icon='arrow_forward'></Button>
      </div>
      <div className={styles.signinWrpper}>
        <span className={styles.hasInvite}>Have a invite text</span>
        {/* <Link style={signInLinkStyle} to='/login'>Sign in</Link> */}
      </div>
      </Card>
    </div>
  );
};

export default Home;
