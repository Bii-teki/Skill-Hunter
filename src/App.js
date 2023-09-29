import React, {useState, useEffect} from "react";
import "./App.css";
import "./index.css";
//context
import { useContext } from "react";
import { dataContext } from "./data/DataContextProvider";
//Routes
import { Route, Routes } from "react-router-dom";
//components

import NavBar from "./Components/NavBar";
import Loader from "./Components/Loader";

import RoutingComponent from "./Components/RoutingComponent";

function App() {
  const { careerData, setCareerData } = useContext(dataContext);
  // console.log(careerData);

  const [loaded, setLoaded] = useState(false);

//   the useEffect will run on the first rendering of the App component
//   after two seconds (about how long it takes for the data to load)
//   the loaded state will become true
  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App">


{/* using a ternary operator to determine which component to display
    based on the loaded state. If loaded is false the Loader is rendered */}
      {!loaded ? (
        <div className="flex w-full mt-52 justify-center">
          {/* <span class="loader"></span> */}
        <Loader />
        </div>
         
      ) : (
        <>
        <NavBar />
        <RoutingComponent />
        </>
        
      )}

      
    </div>
  );
}

export default App;
