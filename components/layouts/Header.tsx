import Image from 'next/image'
import React from 'react'
import style from '@/components/layouts/Header.module.css'

export default function Header() {
  return (
    <header className={style.mainHeader}>
      <div className={style.logo}>
        <h1>readme</h1>
        <Image src='/assets/images/logo.svg' alt='logo' width={360} height={102} priority/>
      </div>
      <div className={style.mobileMenu}>
        <Image src='/assets/images/icons/menu.svg' alt='menuIcon' width={72} height={72} priority/>
      </div>
    </header>
  )
}
