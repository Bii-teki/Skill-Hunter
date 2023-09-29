import React from "react";
import { useState } from "react";

function AdminCareerDetails({ careerDetails }) {
  const [isShowMore, setIsShowMore] = useState(false);
  //date
  //type
  //title
  //location
  //company

  const toggleReadMoreLess = ({ careerDetailss }) => {
    console.log(careerDetailss);
    setIsShowMore();
  };
  
  return (
    <div>
      {" "}
      <div className="max-w-2xl px-8 py-4 mx-auto mt-10 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-600 dark:text-gray-900">
            {careerDetails.posted}
          </span>
          <h3 className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
            {careerDetails.type}
          </h3>
        </div>
        <div class="mt-2">
          <button
            className="text-2xl font-bold text-gray-900"
          >
            {careerDetails.title}
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <img
              src="https://stackdiary.com/140x100.png"
              alt="Author"
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            />
            <button className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              John Doe
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Description</h3>

          <p className="mb-6">{careerDetails.description}</p>

          {isShowMore && (
            <p>
              sapiente exercitationem odio quia, animi eos distinctio tempora,
              ipsum hic vitae modi eum nostrum id perspiciatis impedit dolores.
            </p>
          )}

          <button
            className="text-blue-600 dark:text-blue-400 hover:underline"
            onClick={toggleReadMoreLess}
          >
            {isShowMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminCareerDetails;
