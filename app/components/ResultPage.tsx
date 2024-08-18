'use client'
import React, { useEffect, useState } from 'react'
import PDFViewer from './PDFViewer'
import CircularProgressRing from './CircularProgressRing'
import Right from '../images/tick.svg'
import Image from 'next/image'
import Info from '../images/info.svg'
import {useStore} from '../store/courseWork'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const ResultPage = () => {

  const pdfUrl = 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
  const score = 12
  const maxScore = 20
  const [evaluation,setEvaluation] = useState()
  const { loadEvaluationData, evaluationData } = useStore();
  const [currentEvaluation,setCurrentEvaluation]=useState(null)
  const [fileObj,setFileObj] = useState<any>(null)
  const [fileURL , setFileURL] = useState<any>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadEvaluationData();
      } catch (error) {
        console.error('Failed to load evaluation data:', error);
      }
    };

    fetchData();
  }, [loadEvaluationData]);
  useEffect(() => {
    if (evaluationData) {
      evaluationData.then((res:any) => setEvaluation(res))
    }
  }, [evaluationData]);

  useEffect(() => {
    if(evaluation && evaluation.length>0){
      setCurrentEvaluation(evaluation[evaluation.length-1])
      
    }
    
  },[evaluation])

  useEffect(()=>{
    if(currentEvaluation){
      getFile(currentEvaluation.coursework_id.file)
      
    }
  },[currentEvaluation])
  
  const getFile = (fileId:any) => {
    let fileData = JSON.parse(localStorage.getItem('fileData'))
    if(fileData!=null){
      
      let  file_obj = fileData.find((res:any) => res.uploadDate == fileId)
      setFileObj(file_obj)
      getFileURL()
    }

  }

  const getFileURL = () =>{
    if(fileObj){
      const base64Data = fileObj.content.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      setFileURL(blobUrl)
    }
  }
  return (
    
   <div className = 'w-[100%] h-[80%] flex'>
     <div className='w-fit h[100%] mt-5'>
      <div className='flex bg-[#f5f5f5] p-3 rounded-b-none rounded-2xl items-center justify-between'>
      { fileObj && (<div className='text-sm font-semibold bg-white px-2 py-1 rounded-full'>{fileObj.name}</div>)}
      
      </div>
     {fileURL && (<div className='bg-white pb-1 rounded-t-none rounded-xl pl-1'> <PDFViewer fileUrl={fileURL}/></div>)}
      </div>
    <div className='ml-3 mt-9 w-[28rem]' >
      <div className='flex bg-white p-3 rounded-3xl  justify-between items-center'>
        <div className='ml-2'>
          <p className='text-[14px] text-[#3D404B]'>Overall Score</p>
          <h4 className ='text-[20px] text-[#7A8196] font-bold'>Remark : <span className='text-[#3CC28A]'>Good</span></h4> 
          <p className='text-[12px] text-[#98A1BB]'>Evaluated on 23 Jul 2024</p>
        </div>
        <div>
       {currentEvaluation && currentEvaluation.overall_score && ( <CircularProgressRing score={currentEvaluation.overall_score} maxScore={maxScore} size={80} strokeWidth={10} />)}
        </div>
      </div>
      <div className='p-2 mt-5 bg-white w-[28rem] rounded-3xl'>
      <Accordion type="single" collapsible>
      <AccordionItem value="section-1">
        <AccordionTrigger className="p-4 bg-white">
          <div className='flex items-center justify-between'>
          {currentEvaluation && currentEvaluation.criteriaA_score && ( <CircularProgressRing score={currentEvaluation.criteriaA_score} maxScore={maxScore} size={80} strokeWidth={10} />)}
          <div className='flex flex-col items-start ml-3'>
              <p className='text-[12px] text-[#98A1BB]'>Cirteria A</p>
              <h3 className='text-[14px] text-[#3D404B]'>Understanding Knowledge Questions</h3>
          </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 bg-white border-white rounded-lg">
          <div>
            <p className='text-[12px] text-[#98A1BB]'>The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines.</p>
            <h1 className='text-[14px] text-[#3D404B] font-bold mt-3'>Strengths</h1>
            <div className='border border-[#3CC28AB8] p-1 rounded-xl bg-[#d2f8e8b8]'>
              <p className='flex text-[12px] text-[#3D404B] items-start gap-2'><Image src={Right} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Right} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>

            </div>
            <h1 className='text-[14px] text-[#3D404B] font-bold mt-3'>Scope of Improvement</h1>
            <div className ='border border-[#f3bb2d05]-100 p-1 rounded-xl bg-[#f7d37705]'>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Info} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Info} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>

            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      </Accordion>
      </div>
      <div className='p-2 mt-5 bg-white w-[28rem] rounded-3xl'>
      <Accordion type="single" collapsible >
      <AccordionItem value="section-1">
        <AccordionTrigger className="p-4 bg-white">
          <div className='flex items-center justify-between'>
          {currentEvaluation && currentEvaluation.criteriaB_score && ( <CircularProgressRing score={currentEvaluation.criteriaB_score} maxScore={maxScore} size={80} strokeWidth={10} />)}
          <div className='flex flex-col items-start ml-3'>
              <p className='text-[12px] text-[#98A1BB]'>Cirteria B</p>
              <h3 className='text-[14px] text-[#3D404B]'>Understanding Knowledge Questions</h3>
          </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 bg-white border-white rounded-lg">
          <div>
            <p className='text-[12px] text-[#98A1BB]'>The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines.</p>
            <h1 className='text-[14px] text-[#3D404B] font-bold mt-3'>Strengths</h1>
            <div className='border border-[#3CC28AB8] p-1 rounded-xl bg-[#d2f8e8b8]'>
              <p className='flex text-[12px] text-[#3D404B] items-start gap-2'><Image src={Right} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Right} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>

            </div>
            <h1 className='text-[14px] text-[#3D404B] font-bold mt-3'>Scope of Improvement</h1>
            <div className ='border border-[#f3bb2d05]-100 p-1 rounded-xl bg-[#f7d37705]'>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Info} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Info} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>

            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      </Accordion>
      </div>
      <div className='p-2 mt-5 bg-white w-[28rem] rounded-3xl'>
      <Accordion type="single" collapsible>
      <AccordionItem value="section-1">
        <AccordionTrigger className="p-4 bg-white">
          <div className='flex items-center justify-between'>
          {currentEvaluation && currentEvaluation.criteriaC_score && ( <CircularProgressRing score={currentEvaluation.criteriaC_score} maxScore={maxScore} size={80} strokeWidth={10} />)}
          <div className='flex flex-col items-start ml-3'>
              <p className='text-[12px] text-[#98A1BB]'>Cirteria C</p>
              <h3 className='text-[14px] text-[#3D404B]'>Understanding Knowledge Questions</h3>
          </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 bg-white rounded-lg">
          <div>
            <p className='text-[12px] text-[#98A1BB]'>The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines.</p>
            <h1 className='text-[14px] text-[#3D404B] font-bold mt-3'>Strengths</h1>
            <div className='border border-[#3CC28AB8] p-1 rounded-xl bg-[#d2f8e8b8]'>
              <p className='flex text-[12px] text-[#3D404B] items-start gap-2'><Image src={Right} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Right} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>

            </div>
            <h1 className='text-[14px] text-[#3D404B] font-bold mt-3'>Scope of Improvement</h1>
            <div className ='border border-[#f3bb2d05]-100 p-1 rounded-xl bg-[#f7d37705]'>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Info} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
              <p className='flex  text-[12px] text-[#3D404B] items-start gap-2'><Image src={Info} alt="img" className='mt-2'/> Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>

            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      </Accordion>
      </div>
      
    </div>
   </div>
  )
}

export default ResultPage