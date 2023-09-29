import React, {  createContext } from "react";
import { useState, useEffect } from "react";

const dataContext = createContext();
function DataContextProvider({ children }) {
  const [careerData, setCareerData] = useState([]);
  const [faqData, setFaqData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [newlyPosted ,setNewlyPosted] =useState(false)
  
  const [isDeleted,setIsDeleted]=useState([])

  useEffect(() => {
    fetch(`  http://localhost:3000/careers`)
      .then((res) => res.json())
      .then((data) => setCareerData(data))
      .finally(setIsLoading(false));

    fetch(`  http://localhost:3000/faq`)
      .then((res) => res.json())
      .then((data) => setFaqData(data))
      .finally(setIsLoading(false));
  }, [newlyPosted,isDeleted]);
  
  function PostFormObjectToServer(newFormObject) {
    console.log(newFormObject);
    setNewlyPosted(!newlyPosted);
    fetch(`   http://localhost:3000/careers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormObject),
    });
    setCareerData()
    // .then((res) => res.json())
    // .then((data) => (data));
  }
  function deleteFromServer(deleteId){
    console.log(deleteId)
  
      fetch(`https://skill-hunter-server.onrender.com/careers/${deleteId}`,{
        method:"DELETE",
        headers:
        {"content-type":"application/json"},
      })
      .then(res=>res.json())
      .then((data)=>{
        setIsDeleted(data)
      
      })
     .finally(setIsDeleted(true))
    
  }


  const values = {
    careerData,
    setCareerData,
    setIsLoading,
    PostFormObjectToServer,
    deleteFromServer,
    faqData,
    setFaqData
  };
  return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
}

export default DataContextProvider;
export { dataContext };

//https://skill-hunter-server.onrender.com/careers
//http://localhost:3000/careers