import React from 'react'
import style from '@/components/pages/login/Login.module.css'
import Image from 'next/image'
export default function Login() {
  return (

    <div className={style.backgroundImg}>
      <div className={style.logo}>
      <Image src = "/assets/images/icons/logo.svg" alt="logo" width={320} height={80}/>
      </div>
      <div className={style.loginBtn}>
        <Image src = "/assets/images/loginButton.png" alt="loginBtn" width={320} height={58}/>
      </div>
    </div>
    
  )
}
