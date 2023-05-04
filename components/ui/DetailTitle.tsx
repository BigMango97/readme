import React from 'react'

export default function DetailTitle(props:{title:string, size:string, leftsize:string, fontweight:number}) {
  return (
    <div style={{fontSize:props.size,marginLeft:props.leftsize,fontWeight:props.fontweight}}>
      <p>{props.title}</p>
    </div>
  )
}
