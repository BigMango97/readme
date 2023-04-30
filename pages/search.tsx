import React from 'react'
import style from '@/components/pages/search/Search.module.css'
import Image from 'next/image'
import Footer from '@/components/layouts/Footer'
import SearchBox from '@/components/pages/search/SearchBox'
import RecentSearchTop from '@/components/pages/search/RecentSearchTop'
import RecentSearchItems from '@/components/pages/search/RecentSearchItems'
import RecommendTags from '@/components/pages/search/RecommendTags'
import RecommendTop from '@/components/pages/search/RecommendTop'

export default function search() {
  return (
    <>
    <SearchBox/>
    <RecentSearchTop/>
    <RecentSearchItems/>
    <RecommendTop/>
    <RecommendTags/>
    <Footer/>
      </>
    
  )
}

