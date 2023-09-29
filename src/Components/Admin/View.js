import React, { useState, useEffect } from "react";

function View({jobs, deleteFromServer }) {
 

    const [data, setData] = useState([]);
    const[editor, setEditor] = useState(false)
    const [formData, setFormData] = useState({});
    const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch data on component mount (Read operation)
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(' http://localhost:3000/careers');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch(' http://localhost:3000/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      fetchData(); // Fetch data again after adding new item (optional)
      setFormData({});
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`http://localhost:3000/careers/${id}`, {
        method: 'PUT', // or 'PATCH' for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      fetchData(); // Fetch data again after updating item (optional)
      setFormData({});
      setEditingId(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await fetch(` http://localhost:3000/careers/${id}`, {
        method: 'DELETE',
      });
      fetchData(); // Fetch data again after deleting item (optional)
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (career) => {
    setFormData(career);
    setEditingId(career.id);    
    setEditor(true)
  };
  
  if (editor){

return(
<>

<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"  id="modal-id">
   	<div class="absolute bg-black opacity-80 inset-0 z-0"></div>
    <div class="w-full max-w-5xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
    
      <div class="">
       
        <div class="text-center p-5 flex-auto justify-center">
        <div class="w-full px-24 z-10">
                <h1 class="text-5xl mb-2 font-bold text-left tracking-wide">Create or Update Job</h1>                
            </div>
           <button class="mb-2 md:mb-0 bg-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-100"
              
                type="button"
                    onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
                  >  {editingId ? 'Edit' : 'Create'}
                     </button>
                   <div className="grid grid-cols-2 gap-2 justify-center">   
                      <div>
                      <label for="title" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Title</label>
                        <input
                        type="text"
                         value={formData.title || ''}
                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}                        
                        id="title" 
                        name="title"
                        class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                       </div>                      
                       <div>
                       <label for="company" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Company</label>
                        <input
                         id="company"
                         type="text"
                         name="company"
                         value={formData.company || ''}
                         onChange={(e) => setFormData({ ...formData, company: e.target.value })}                        
                
                         class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Safaricom LTD" />
                        </div> 
                         </div> 
                        <div className="grid grid-cols-2 gap-2 justify-center">   
                    <div>
                    <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <select 
                    id="location"  
                    name="location"                  
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}  
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Location</option>
                      <option value="US">Nairobi</option>
                      <option value="CA">Mombasa</option>
                      <option value="FR">Nakuru</option>
                      <option value="DE">Nyeri</option>
                    </select>
                    </div>                      
                       <div>                       
                            <label for="type" class="block mb-2 text-1xl font-medium text-gray-900 dark:text-white">Job Type</label>
                            <select                             
                            name="type"
                            type="text"
                             value={formData.type || ''}
                                 onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                               id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected>Full-Time</option>
                              <option value="US">Part-Time</option>
                              <option value="CA">Contract</option>
                              <option value="FR">Internship</option>
                            </select>
                            </div> 
                        </div> 
                        <div className="grid grid-cols-2 gap-2 justify-center">   
                      <div>
                      <label for="salary" class="text-gray-800 text-1xl font-bold leading-tight tracking-normal">Salary</label>
                        <input
                         value={formData.salary || ''}
                         onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        name="salary"
                        id="salary" class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Salary..." />
                       </div>                      
                       <div>
                       <label for="experience" class=" text-1xl text-gray-800  font-bold leading-tight tracking-normal">Experience</label>
                        <input id="experience"
                           name="experience"
                           type="text"
                            value={formData.experience || ''}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Experience....." />
                        </div> 
                         </div>                                 
                        <label for="details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                        <textarea 
                         name="details"
                         type="text"
                         value={formData.details || ''}
                         onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        id="details" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description"
                         name="description"
                         type="text"
                          value={formData.description || ''}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        <label for="skills" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skills</label>
                         <textarea id="skills" rows="3"
                         name="skills"
                         type="text"
                          value={formData.skills || ''}
                              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                         class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
           <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button onClick={()=>setEditor(false)}
             class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel
            </button>
            <button 
            onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
            class="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
               {editingId ? 'Update' : 'Create'}</button>
        </div>
      </div>
    </div>
  </div>


</>



)

}

else{




  const displayCareerdata = data.map((career) => {



    return (
      <>
        <div class="max-w-3xl mx-auto">
          <div class="flex flex-wrap ">
            <div class="w-full p-1">
              <button
                class="block p-6 bg-white hover:bg-opacity-50 transform hover:-translate-y-1 rounded-lg transition duration-500"
                href="#"
              >
                <div class="flex flex-wrap items-center justify-between -m-2">
                  <div className="w-auto p-2">
                    <h3 className="mb-1 font-semibold tracking-tight">
                      {career.title}
                    </h3>
                    <p className="text-lg">{career.company}</p>
                    <p className="text-lg">{career.location}</p>

                    <div className="mt-3">
                      <span className="bg-gray-300 mr-3 px-2.5 py-1.5 rounded-lg">
                        {career.type}
                      </span>
                      <span className="bg-green-100 mr-3 px-2.5 py-1.5 rounded-lg">
                        {" "}
                        <i class="fa fa-money-bills"></i> $
                        {career.salary.toLocaleString()} per year
                      </span>
                      <button
                        type="button"
                        className="text-gray-900 border border-gray-300 px-2 py-1 rounded-lg"
                      >
                        {career.experience}+ years
                      </button>
                    </div>
                    <p className="pt-4">{career.description.slice(0,60)}</p>
                  </div>

                  <div class="w-auto p-2">
                    <div class="grid justify-items-end mt-6">
                      <button
                        class="inline-block  w-40 px-4 py-2 text-white font-semibold tracking-tight bg-blue-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200"
                        href="#"
                      >
                        View Details
                      </button>
                      <button
                      onClick={() => handleEdit(career)}                     
                      
                        class="inline-block mt-2 w-40 px-4 py-2 text-white font-semibold tracking-tight bg-green-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200"
                        href="#"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(career.id)}
                        class="inline-block mt-2 w-40 px-4 py-2 text-white font-semibold tracking-tight bg-red-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200"
                       
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <section class="py-24 lg:pb-36 bg-gray-100 overflow-hidden">
        <div class="container px-4 mx-auto">{displayCareerdata}</div>
      </section>
    </>
  );
}}

export default View;
