
'use client'
import React, { useEffect, useState } from 'react'
import Card from './Card'


const MyCoursework = () => {

  const [data, setData] = useState<any>()
  useEffect(() => {
    const  fetchData = async () => {
        const response = await fetch('http://localhost:4000/evaluation')
        const res = await response.json()

        setData(res)
        
    }
    fetchData()
  },[])
  return (
   <div className=" mt-9 ml-9">
    <p className = "text-[rgb(91,97,112)] text-xl font-semibold">My coursework</p>
     <div className="flex gap-5 flex-wrap p-5 ">
        {
          data && data.map((item:any,index:number) => {
            return <div key={index}> <Card data={item}/> </div>
          })
        }
    </div> 
   </div>
  )
}

export default MyCoursework