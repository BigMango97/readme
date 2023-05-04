import React from 'react'
import style from '@/components/pages/search/Search.module.css'
export default function RecommendTags() {
  return (
    <div className={style.recommendTagContainer}>
      <button className={style.recommendTag}> #로맨스판타지 </button>
      <button className={style.recommendTag}> #천재 </button>
      <button className={style.recommendTag}> #먼치킨 </button>
      <button className={style.recommendTag}> #경영/기업 </button>
      <button className={style.recommendTag}> #외국인남/혼혈 </button>
      <button className={style.recommendTag}> #소유욕/독점욕 </button>
    </div>
  )
}
