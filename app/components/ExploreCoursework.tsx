'use client'
import React, { useEffect, useState } from 'react'
import Card from './Card'

const ExploreCoursework = () => {

  const types =['All' , 'IA Example' , 'EE Example','IO Example','Tok Example']
  const [selected,setSelected] = useState(0)
  const [data, setData] = useState<any>([]) 
  const [filteredData, setFilteredData] = useState<any>([]) 
  
  useEffect(() => {
    const  fetchData = async () => {
        const response = await fetch('http://localhost:4000/explore_coursework')
        const res = await response.json()
        setData(res)
        setFilteredData(res)
    }
    fetchData()
  },[])

  useEffect (() => {
    if(data){
        let selectedType = types[selected]
        if(selected == 0){
            setFilteredData(data)
        }
        else{
            let response = data.filter((item:any) => item.type == selected)
            setFilteredData(response)
        }
    
    }5
  },[selected])


  return (
    <div className="ml-9 mt-5 mb-">
        <div className = "text-[#5B6170] text-xl font-semibold">Explore coursework</div>
        <div className="ml-5">
            <div className="flex gap-9 mt-5">
                {
                   types && types.map((item: any, index: number) => (
                    selected === index ? (
                        <div key={index} className="text-[16px] text-[#6947BF] bg-white py-1 px-2 rounded-lg font-semibold cursor-pointer">
                            {item} 
                        </div>
                    ) : (
                        <div key={index} className="text-[16px] py-1 px-2 text-[#98A1BB] cursor-pointer"  onClick={() => setSelected(index)}>
                            {item}
                        </div>
                    )
                ))
                
                }   
            </div>
            <div className="flex gap-5 flex-wrap mt-3">
                {
                     filteredData && filteredData.map((item : any,index:number) => {
                        return <div key={index}><Card data={item}/></div>
                    })
                }
                
            </div>
        </div>
    </div>
  )
}

export default ExploreCoursework