import React from 'react'
import Image from 'next/image'
import Paper from '../images/Page-Image.svg'
import Avatar from '../images/avatar.svg'
import Clock from '../images/clock.svg'
import Word from '../images/words.svg'
import Rating from '../images/rating.svg'
import Language from '../images/language.svg'

const Card = ({data}) => {
    
  return (
    <>
        <div className='flex bg-[#D8E3F452]  p-2 rounded-md border border-slate-300 w-[28rem] g-[20px]'  >
            <div className="bg-white rounded-md p-2 w-[11rem]">
                <Image src={Paper} alt="Paper"/>
            </div>
            <div className="p-1 ml-3">
                <div className='w-[15rem] h-[3rem] overflow-hidden custom-truncate font-bold text-[14px]'>
                {data.title}
                </div>
                <div className='w-[13rem] h-[2rem] overflow-hidden custom-truncate text-[10px]  text-[#7A8196]'>
                {data.description} 
                </div>
                <div className="flex gap-1 flex-wrap mt-2">
                    <div className = "flex gap-1 w-fit px-2 py-1 rounded-full bg-white text-[12px]">
                        <Image src={Avatar} alt="img"/>
                        {data.subject}
                    </div>
                    <div className = "flex gap-1 w-fit px-2 py-1 rounded-full bg-white text-[12px]">
                        <Image src={Clock} alt="img"/>
                        {data.time}
                    </div>
                    <div className = "flex gap-1 w-fit px-2 py-1 rounded-full bg-white text-[12px]">
                        <Image src={Word} alt="img"/>
                        {data.words}
                    </div>
                    <div className = "flex gap-1 w-fit px-2 py-1 rounded-full bg-white text-[12px]">
                        <Image src={Rating} alt="img"/>
                        {data.overall_score}
                    </div>
                    <div className = "flex gap-1 w-fit px-2 py-1 rounded-full bg-white text-[12px]">
                        <Image src={Language} alt="img"/>
                        {data.subject}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card