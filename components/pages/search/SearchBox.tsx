import React from 'react'
import style from '@/components/pages/search/Search.module.css'
import Image from 'next/image'
export default function SearchBox() {
    return (
    <div className={style.searchBoxWarp}>
        <div className={style.searchBox}>
        <form action="">
        <Image src='/assets/images/searchBox.png' alt='searchBox' width={310} height={40}/>
        <input type="text" placeholder='Search'/>
        </form>
        <div className={style.searchIcon}>
            <Image src='/assets/images/icons/searchIcon.png' alt='searchIcon' width={22} height={22} />
        </div>
        <div className={style.searchClose}>
            <Image src='/assets/images/icons/searchCloseBtn.png' alt='searchCloseIcon' width={20} height={20} />
        </div>
    </div>
    </div>
    )
}
