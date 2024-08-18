import Image from "next/image";
import Link from "next/link";
import LeftPanel from "./components/LeftPanel";
import FileUpload from "./components/FileUpload";
import Card from "./components/Card";
import MyCoursework from "./components/MyCoursework";
import ExploreCoursework from "./components/ExploreCoursework";


export default function Home() {
  return (
    <main className='flex gap-2'>
      <LeftPanel/>
      <div className = "ml-12 mt-9">
      <FileUpload/>
      <MyCoursework/>
      <ExploreCoursework/>
      </div>
    </main>
    
  );
}
