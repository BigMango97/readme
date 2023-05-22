import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import style from '@/components/ui/CountViewUi.module.css'

export default function CountViewUi(props:{ icon:string, count:number, color: 'white' | 'black' | 'gray', flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse' }) {

  const [changeCnt, setChangeCnt] = useState<string>('')
  useEffect(() => {
    if(props.count > 100000000) {
      setChangeCnt(`${Math.floor(props.count / 100000000)}b`)
    } else if (props.count > 1000000) {
      setChangeCnt(`${Math.floor(props.count / 1000000)}m`)
    } else if (props.count > 1000) {
      setChangeCnt(`${Math.floor(props.count / 1000)}k`)
    } else {
      setChangeCnt(`${props.count}`)
    }

  },[props.count])
  return (
    <div className={style.countWrap} style={{flexDirection:props.flexDirection}}>
      <div className={props.color ? `${style.icon} ${style[props.color]}`:`${style.icon}`}>
        <Image src={props.icon} alt='icon' width={72} height={72} priority/>
      </div>
      <p className={props.color && `${style[props.color]}`}>{changeCnt}</p>
    </div>
  )
}
