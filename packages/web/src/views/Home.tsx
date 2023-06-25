import Swap from "@monorepo/ui-components/src/components/swap"
import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1  bg-gradient-to-r from-cyan-100 to-blue-200">
        <div className="flex flex-col text-left w-full mb-20  mt-20 lg:mt-20">
          
          <p className=" mx-6 lg:mx-28 leading-relaxed text-base text-gray-900">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-center ">usdc bridge </h1>
          </p>
        </div>
        <div className="flex       lg:mx-28 mb-60 ">
        <div className="p-4 m-auto w-full xl:w-1/2 2xl:w-1/3 ">
          <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
           <Swap></Swap>
            
          
          </div>
        </div>
      
        
        </div>
      </div>
    </div>
  )
}

export default Home
