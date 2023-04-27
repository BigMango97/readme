import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props:{ children : ReactNode } ) {

  return (
    <>
    <Header />
    <div>{props.children}</div>
    <Footer />
    </>
  )
}