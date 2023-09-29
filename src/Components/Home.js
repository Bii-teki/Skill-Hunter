import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { dataContext } from "../data/DataContextProvider";
import Card from "./Card";
import CareerDetails from "./CareerDetails";
import Filter from "./Filter";
import "./home.css"
import NoResultsCard from "./NoResultsCard";
import Newsletter from "./Newsletter";

function Home() {
  const { careerData, setCareerData } = useContext(dataContext);
  const [careerId, setCareerId] = useState();
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

   // State to store the selected location from the filter dropdown
  const [selectedLocation, setSelectedLocation] = useState("");

  // State to store the filtered data based on both search term and location
  const [filteredData, setFilteredData] = useState([]);


  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("")

  // Function to update the search term
  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  // Function to update the selected location based on filter dropdown selection
  function handleLocationFilter(filterLocation) {
    setSelectedLocation(filterLocation);
  }


  // Update the filteredData when careerData, searchTerm, or selectedLocation changes
  
  useEffect(() => {
    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    // Filter the careerData based on the search term
    const searchedData = careerData.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //set filteredData to searchedData: no location is selected in this case
    let filteredData = searchedData;

    // If a location is selected, further filter based on location
    if (selectedLocation) {
      filteredData = searchedData.filter(
        (career) => career.location.toLowerCase() === selectedLocation.toLocaleLowerCase()
      )
    }

    // Update the filteredData state with the result; search term, location selected, or both
    setFilteredData (filteredData)

    if (leftSection && rightSection) {
      leftSection.addEventListener("scroll", handleLeftScroll);
    }

    return () => {
      if (leftSection) {
        leftSection.removeEventListener("scroll", handleLeftScroll);
      }
    };

  }, [careerData, searchTerm, selectedLocation])


  function getCareerIdFromCard(id) {
    // console.log(id);
    setCareerId(id);
  }

  // Function to handle the filter change and update filteredData
  function handleFilterChange (filteredCareers) {
    setFilteredData (filteredCareers)
  }

  // Create JSX for displaying career cards based on the filteredData
  const displayCareerdata = filteredData.map((career) => {
    return (
      <span key={career.id}>
        {" "}
        <Card onButtonClick={getCareerIdFromCard} career={career} />
      </span>
    );
  });

  const handleLeftScroll = () => {
    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.style.top = `${leftSectionRef.current.scrollTop}px`;
    }
  };


  return (
    <>
      <div>
        <div className="grid grid-cols-2 justify-center">
          <div>
            <section className="py-px lg:pb-18 mb-1 bg-gray-100 overflow-hidden">
            {/* adjustable viewheight */}
              <div ref={leftSectionRef} style={{ overflowY: "auto", height: "82vh" }} className="container px-4 mx-auto mb-10">

                {/* Search bar and filter dropdown */}
                <div className="search-bar relative flex max-w-3xl mb-5 mt-5 mx-auto">
                  <input
                    type="text"
                    id="default-search"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search"
                    className="w-full px-4 text-gray-800 border border-gray-900 rounded-lg"
                  />
                  <Filter onFilter={handleFilterChange} onLocationFilter={handleLocationFilter} />
                </div>

                {/* Render the filtered careers */}
                {displayCareerdata.length === 0 ? (
                  <NoResultsCard />
                  ) : (
                    displayCareerdata
                )}

              </div>
            </section>
          </div>

          <div ref={rightSectionRef} style={{ overflowY: "auto"}}  className="max-w-1xl px-4 py-4 mx-auto ">
            <CareerDetails careerData={careerData} careerId={careerId} />
          </div>
        </div>
      </div>
      <Newsletter />

    </>
  );
}

export default Home;
