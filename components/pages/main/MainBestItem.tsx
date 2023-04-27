import React, { useEffect, useState } from 'react'
import { MainBestData } from '@/datas/dummy/mainBestItemData'
import { mainBestItemsType } from '@/types/model/mainDataType'
import style from '@/components/pages/main/MainBestItem.module.css'
import CountViewUi from '@/components/ui/CountViewUi'
import Image from 'next/image'

export default function MainBestItem() {

  const [bestData, setBestData] = useState<mainBestItemsType>()

  useEffect(() => {
    let randomNum = Math.floor(Math.random() * MainBestData.length)
    setBestData(MainBestData[randomNum])
  },[])

  return (
    <section className={style.bestItem}>
      <h2>Best Item</h2>
      {
        bestData &&
        <div className={style.bestItemCardWrap}>
          <h3>{bestData.title}</h3>
          <p>{bestData.author} | {bestData.status} | {bestData.categoryName}</p>
          <MiniAudioPlayer />
          <div className={style.bestItemImgWrap}>
            <Image src={bestData.thumbnailUrl} alt={bestData.title} width={1000} height={1000}/>
          </div>
          <div className={style.viewCountWrap}>
            <CountViewUi icon='/assets/images/icons/eye.svg' count={bestData.viewCount} color='white'/>
            <CountViewUi icon='/assets/images/icons/star.svg' count={bestData.rate} color='white'/>
            <CountViewUi icon='/assets/images/icons/list.svg' count={bestData.contentsCount} color='white'/>
          </div>
        </div>
      }
      
    </section>
  )
}

const MiniAudioPlayer = () => {

  return (
    <>
    </>
  )
}
