import React from 'react'
import style from '@/components/pages/search/Search.module.css'

export default function RecentSearchTop() {
  return (
    <div className={style.recentSearchTopWrap}>
      <div className={style.recentSearchTopTitle}>
          <h4>최근 검색어</h4>
      </div>
      <div className={style.recentSearchTopDelete}>
              <button>전체삭제</button>
      </div>
    </div>
  )
}
