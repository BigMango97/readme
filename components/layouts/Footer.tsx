import React from 'react'
import { footerMenu } from '@/datas/staticData'
import { footerMenuType } from '@/types/static/staticDataType'
import Image from 'next/image'
import style from '@/components/layouts/Footer.module.css'
import { useRouter } from 'next/router'

export default function Footer() {



  return (
    <footer className={style.mainFooter}>
      <nav>
        <ul>
        {
          footerMenu.map((item:footerMenuType) => (
            <FooterMenuItem item={item} key={item.id}/>
          ))
        }
        </ul>
      </nav>
    </footer>
  )
}

const FooterMenuItem = (props:{item:footerMenuType}) => {

  const router = useRouter()
  
  return (
    <li key={props.item.id} className={router.pathname !== props.item.link ? style.active : ''}>
      <Image src={props.item.iconUrl} alt={props.item.title} width={72} height={72} priority/>
    </li>
  )
}
