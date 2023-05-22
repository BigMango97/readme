import React from 'react'


export default function DetailTitle(props:{title:string, size:number, leftsize:string, bottomsize?:string, fontweight:number,color?:string}) {
  return (
    <div style={{fontSize:props.size,marginLeft:props.leftsize,marginBottom:props.bottomsize, fontWeight:props.fontweight, color:props.color}}>
      <p>{props.title}</p>
    </div>
  )
}
