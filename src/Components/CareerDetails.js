import React, {useContext, useState} from "react";
import { dataContext } from "../data/DataContextProvider";
import RenderJobOnLoad from "./RenderJobOnLoad";
import Apply from "./Apply";

function CareerDetails({ careerData, careerId }) {
  const [isShowMore, setIsShowMore] = useState(false);
      
  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };

  const { isLoading } = useContext(dataContext);
  // console.log(careerId);
  // console.log(careerData);
  const currentCareerDetail = careerData.find(
    (Career) => Career.id === careerId
  );

  if (!currentCareerDetail) {
    // const displyCareerOnInitialLoad = careerData[0].title;
    // console.log(displyCareerOnInitialLoad);
    return isLoading ? <h1>Loading....</h1> : <RenderJobOnLoad />;
  }

  return (
    <div>

      {!currentCareerDetail ? (
        <h1>LOADING...</h1>
      ) : (
        <div className="max-w-2xl px-8 mt-4 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">
              {currentCareerDetail.posted}
            </span>
            <button
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
              {currentCareerDetail.type}
            </button>
          </div>
          <div className="mt-2">
            <button
              
              className="text-2xl font-bold text-gray-900"
            >
              {currentCareerDetail.title}
            </button>
            <button className="mt-2 text-gray-600 font-bold dark:text-gray-700">
              {currentCareerDetail.location}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
          <button  onClick={toggleReadMoreLess}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isShowMore ? "Close" : "Apply"}
         
        </button>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 "
            >
              Save
            </button>
            <button
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Read more ⟶
            </button>
            <div className="flex items-center">
              <img
                src="#140x100.png"
                alt="Author"
                className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <button className="font-bold text-gray-700 cursor-pointer">
                {currentCareerDetail.company}
              </button>
            </div>
          </div>
        </div>
      )}
      {isShowMore && (
          <>
       <Apply />
  </>
  )}
      <div className="max-w-2xl px-8 mt-4 text-left py-4 mx-auto">
        <p>{currentCareerDetail.details}</p>

        <p></p>
      </div>
    </div>
  );
}

export default CareerDetails;

