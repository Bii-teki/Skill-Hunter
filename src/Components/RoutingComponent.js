import React from "react";
import { useContext } from "react";
import { dataContext } from "../data/DataContextProvider";
//Routes
import { Route, Routes } from "react-router-dom";
//components
import Home from "../Components/Home";
import About from "../Components/About";
import Admin from "./Admin/Admin";
import Help from "./help/Help";
import Faq from "./help/Faq";
import ContactUs from "./help/ContactUs";

function RoutingComponent() {
  const { careerData, PostFormObjectToServer ,deleteFromServer} = useContext(dataContext);
  console.log(careerData);
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="about" element={<About />} />
      <Route
        path="admin"
        element={
          <Admin
            jobs={careerData}
            PostFormObjectToServer={PostFormObjectToServer}
            deleteFromServer={deleteFromServer}
            // editFromServer={handleEdit}
          />
        }
      />
      <Route path="help" element={<Help />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default RoutingComponent;
