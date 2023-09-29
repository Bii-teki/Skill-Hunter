import React, {useState, useEffect, useRef} from 'react'
import View from './View'
import NewJob from './NewJob'
import AdminCareerDetails from "./AdminCareerDetails";
import AdminLoadDetailOnInitialRender from "./AdminLoadDetailOnInitialRender";


function Admin({ jobs, PostFormObjectToServer, deleteFromServer }) {

  
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
 
  const [show, setShow] = useState(false);
  const [showRenderOnLoad, setShowRenderOnLoad] = useState(false);
  const [careerDetails, setCareerDetail] = useState({});
  const sendSatateToCareerDetails = { careerDetails, setCareerDetail };
  const [isStatic, setIsStatic] = useState(false);
  console.log(isStatic);

  useEffect(()=>{
    

    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    if (leftSection && rightSection) {
      leftSection.addEventListener("scroll", handleLeftScroll);
    }

    return () => {
      if (leftSection) {
        leftSection.removeEventListener("scroll", handleLeftScroll);
      }
    };
  }, [])

  const handleLeftScroll = () => {
    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.style.top = `${leftSectionRef.current.scrollTop}px`;
    }
  };

  console.log(jobs);
  const btnText = show ? "Close Form" : "Post Job";

  return (
    <div className='grid grid-cols-2 justify-center'> 
      <div ref={leftSectionRef} style={{ overflowY: "auto", height: "82vh" }}>   
        <View 
         jobs={jobs}
         onClickDetails={sendSatateToCareerDetails}
         setIsStatic={setIsStatic}
         setShowRenderOnLoad={setShowRenderOnLoad}
         showRenderOnLoad={showRenderOnLoad}
         deleteFromServer={deleteFromServer}
         />
        </div> 

        <div>  
        <button  className="bg-indigo-500 px-7 py-2  mt-10 ml-56 rounded-md text-md text-white font-semibold">Do you want to create jobs?</button>  
        <button
            className="text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "Read Less" : "Read More"}
          </button>  
        <button className="text-blue-600 dark:text-blue-400 hover:underline"
          id="fortmButton"
          onClick={() => {
            setShow(!show);
          }}
        >
          {btnText}
        </button>
        {show ? (
<>
           
          <NewJob PostFormObjectToServer={PostFormObjectToServer} />
</>
          
        ) : (
          <div id="career-detail-admin-section">
            {showRenderOnLoad ? (
              <AdminCareerDetails
                careerDetails={careerDetails}
                isStatic={isStatic}
              />
            ) : (
              <AdminLoadDetailOnInitialRender />
            )}
          </div>
        )}
      </div>
    </div>

    //right section scroll - remove the height property: ref={rightSectionRef} style={{ overflowY: "auto", height: "500px" }}
  )
}

export default Admin
