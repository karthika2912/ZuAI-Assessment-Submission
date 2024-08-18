import React from 'react'
import ResultPage from '../components/ResultPage'
import LeftPanel from '../components/LeftPanel'

const result = () => {
  return (
    <div className="flex">
      <LeftPanel/><ResultPage/>
    </div>
  )
}

export default result