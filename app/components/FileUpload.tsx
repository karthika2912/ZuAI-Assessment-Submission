'use client'
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dropdown from './Dropdown';
import stars from '../images/stars.svg';
import Image from 'next/image';
import DropZone from './Dropzone';
import Card from './Card';
import Robot from '../images/Robot.svg' 
import displayImage from '../images/display-img.svg'
import {useStore} from '../store/courseWork'
import StarsColor from '../images/stars-color.svg'

const FileUpload = () => {
    const course_options = ["Essay", "Research Paper", "Lab Report", "Case Study", "Group Project", "Presentation", "Fieldwork", "Capstone Project", "Problem Set", "Portfolio"];
    const subject_options =["English Literature", "History", "Biology", "Business Management", "Engineering", "Communications", "Environmental Science", "Computer Science", "Mathematics", "Fine Arts"]
 
    const [filedata, setFile] = useState<File | null>(null);  // Set the type to File or null
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState(null);
    const [subject, setSubject] = useState(null);
    const fileData = useStore((state) => state.fileData);
    const setCourseworkData = useStore((state) => state.setCourseData);
    const createEvaluation = useStore((state) => state.createEvaluation);
    const loadEvaluation = useStore((state) => state.loadEvaluation);

    const [resetDropdown, setResetDropdown] = useState(false); 
    const [resetFile , setResetFile] = useState(false)

    const router = useRouter();

    const handleNavigation = () => {
      router.push('/result'); 
    };

    const handleCourse = (selected: any) => {
      setCourse(selected);
    };

    const handleSubject = (selected: any) => {
      setSubject(selected);
    };

    const handleReset = () => {
      setResetDropdown(true);
      setTimeout(() => setResetDropdown(false), 0); 
      setResetFile(true)
      setTimeout(()=> setResetFile(false),0)
    };

    const handleFormSubmit = (e : any) => {
      e.preventDefault();
  
      if (!fileData) {
        alert('Please upload a file first!');
        return;
      }
      
 
      const courseworkData = {
        course,
        subject,
        title,
        file: fileData[fileData.length-1].uploadDate,
      };
  
      setCourseworkData(courseworkData);
      setTitle('')
      handleReset();
      
      alert('Coursework saved successfully!');
      
      handleNavigation()
    };

    
    return (
      <div className ='flex gap-5'>
        <div className="mt-5 w-[45rem] ml-10">
        <div className="text-4xl font-extrabold text-[#1E2026] mt-6">
          Hey IB Folks ! Unsure about the quality of your answers? <span className='text-[#6947BF]'>We get you.</span>
        </div>
        <div className="bg-[#FCFBFDB8] p-4 rounded-lg mt-5">
          <div className="w-auto h-[200px] bg-white rounded-lg">
            <DropZone resetFile={resetFile}/>
          </div>
          <div className="mt-4">
            <p className="text-[#7A8196] text-sm">Select your course & subjects*</p>
            <div className="flex gap-4 mt-2">
              <Dropdown options={course_options} onSelect={handleCourse} title="Coursework Type" resetSelected={resetDropdown} />
              <Dropdown options={subject_options} onSelect={handleSubject} title="Subject" resetSelected={resetDropdown} />
            </div>
            <p className="text-[#7A8196] text-sm mt-2 mb-1">Enter your essay title*(Required)</p>
            <input
              type="text"
              placeholder="how nation works....."
              value={title}  
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border border-slate-400 w-[20rem] focus:outline-none rounded-3xl text-sm"
            />
            <button
              className={`flex items-center gap-2 px-1 py-1 rounded-3xl text-white w-[15rem] mt-9 ${ (fileData && course && title && subject) ? 'bg-[#6947BF]' : ' bg-[#ADB8C9]'}`}
              onClick={handleFormSubmit}
            >
              <div className="flex items-center justify-center bg-[#EAF0F2] w-[30px] h-[30px] rounded-full">
                <Image
                  src={(fileData && title && course && subject) ? StarsColor:stars}
                  alt="Arrow"
                  className="rounded-full"
                />
              </div>
              Evaluate your Score
            </button>
          </div>
        </div>
        
      </div>
      <div className = "mt-7 flex flex-col items-center">
        <Image src={Robot} alt='img' height={130}/>
        <Image src={displayImage} alt='img' height={440}/>
      </div>
      </div>
    );
}

export default FileUpload;
