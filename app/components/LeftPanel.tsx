import React from 'react';
import Image from 'next/image';
import logo from '../images/logo.svg'
import dashboard from '../images/dashboard.svg'
import filecopy from '../images/file_copy.svg'
import book from '../images/book_4.svg'
import quiz from '../images/quiz.svg'
import profile from '../images/profile.svg'
const LeftPanel = () => {
  return (
    <div className="w-[52px] min-h-[100vh] bg-[#F8FAFC] rounded-xl m-1 p-1 flex flex-col items-center justify-between">
      <Image 
      src={logo}
      alt="Description of the image"
      width={500}
      height={500}
      className="rounded-md mt-4"
      />
      <div className="flex flex-col justify-center items-center gap-4 mt-5">
        <div className="w-[36px] h-[36px] rounded-full bg-[#6947BF] flex justify-center items-center">
        <Image 
            src={dashboard}
            alt="Description of the image"
            width={20}
            height={20}
            className="rounded-md"
        />
        </div>
        <Image 
            src={book}
            alt="Description of the image"
            width={20}
            height={20}
            className="rounded-md"
        />
        <Image 
            src={filecopy}
            alt="Description of the image"
            width={20}
            height={20}
            className="rounded-md"
        />
        <Image 
            src={quiz}
            alt="Description of the image"
            width={20}
            height={20}
            className="rounded-md"
        />
      </div>
      <Image 
        src={profile}
        alt="Description of the image"
        width={500}
        height={500}
        className="rounded-md mt-auto"
      />
    </div>
  )
}

export default LeftPanel