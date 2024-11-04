/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react';
import './profile.css';
import Modal from './Model'; // Make sure this is imported correctly
import edit from './images/edit.png';
import dummyIcon from './images/logesh_2.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../store/userSlice';
import editIcon from './images/edit-icon.svg'
import saveIcon from './images/floppy-disk-regular.svg'
import linkIcon from './images/link-solid.svg'
import Amazon from './images/amazon.png'
import Google from './images/google.png'
import HeatMap from './HeatMap';
import leetcode from './images/leetcode.svg'
import hackerrank from './images/hackerrank.svg'
import github from './images/github.svg'
import userIcon from './images/user-icon-svgrepo-com (1).svg'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";




// import profile from './images/logesh.jpg'
import './Model.css';

const ProfilePage =  () => {
  // Get user data from Redux store

  const userData = useSelector(selectUser);
  console.log(userData);

  // Initialize state variables
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || '');
  const [skills, setSkills] = useState(userData?.skills || []);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);
  const [isShowMoreProjectsOpen, setIsShowMoreProjectsOpen] = useState(false);
  const [isShowMoreExperiencesOpen, setIsShowMoreExperiencesOpen] = useState(false);
  const [isShowMoreEducationOpen,setIsShowMoreEducationOpen] = useState(false);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);


  const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);

  const [isAddProfileDetailsOpen, setIsAddProfileDetailsOpen] = useState(false);

  const [loading,setLoading] = useState(false);
  const [userdata, setUserdata] = useState({
    name: '',
    tagline: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    if (userData) {
      setAboutText(userData.about || '');
      setSkills(userData.skills || []);
      setUserdata({
        name: userData.name || '',
        tagline: userData.tagline || '',
        city: userData.city || '',
        state: userData.state || '',
        country: userData.country || '',
      });
    }
  }, [userData]);

  

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    media: []
  });

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    media: []
  });

  const [newEducation, setNewEducation] = useState({
    title: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: '',
    media: []
  });


  // State for visible items
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(5);
  const [visibleExperiencesCount, setVisibleExperiencesCount] = useState(5);
  const [visibleEducationCount, setVisibleEducationCount] = useState(5);

  // Save updated about section
  const handleSaveAbout = async () => {
    setIsEditingAbout(false);
    setLoading(true);
    try{
    // console.log("aboutText : ", process.env.REACT_APP_saveabout_api);
    const updateUser = await fetch(process.env.REACT_APP_saveabout_api, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "about": aboutText
      })
    });
    
    const data = await updateUser.json();
    setLoading(false);
    
    // console.log("data : ", data);
    window.location.reload(); // Reload the page to clear state and redirect to login
    }catch(error){
      setLoading(false);
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Saving About Section';
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
  };

  const handleUpdateDetails = async () => {
    setLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_addskill_api, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userdata, state: state, city: city, country: country }),
      });
      
      if (!response.ok) throw new Error('Failed to update profile details');
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.error(error);
    }
  };

  // Add a new skill
  const handleAddSkill = async () => {
    const newSkill = prompt('Enter new skill:');
    
    if (newSkill) {
      setLoading(true);

      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      try{
      const updateUser = await fetch(process.env.REACT_APP_addskill_api, {
        method: process.env.REACT_APP_addskill_method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "skills": updatedSkills
        })
      });
      const data = await updateUser.json();
      // console.log("data : ", data);
      setLoading(false);
      window.location.reload(); // Reload the page to clear state and redirect to login
    }catch(error){
      setLoading(false);
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Adding Skill';
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
    setLoading(false);
    }
  };

  // Add a new project
  const handleAddProject = async () => {
    setLoading(true);
    if (!newProject.title || !newProject.description) {
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = ("Please enter title and description for the project");
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        setLoading(false);
      return;
    }
    // Send new project data to the server (optional)
    try{
    const updateUser = await fetch(process.env.REACT_APP_addproject_api, {
      method: process.env.REACT_APP_addproject_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "projects": [...(userData?.projects || []), newProject]
      })
    });
    const data = await updateUser.json();
    // console.log("data : ", data);
    setIsAddProjectModalOpen(false);
    window.location.reload(); // Reload the page to clear state and redirect to login
    setLoading(false);  
  }catch(error){
      setLoading(false);
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Adding Project';
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
  };

  // Add a new experience
  const handleAddExperience = async () => {
    setLoading(true);

    // Send new experience data to the server (optional)
    try{
    const updateUser = await fetch(process.env.REACT_APP_addexperience_api , {
      method: process.env.REACT_APP_addexperience_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "experiences": [...(userData?.experiences || []), newExperience]
      })
    });
    const data = await updateUser.json();
    setLoading(false);
    // console.log("data : ", data);
    setIsAddExperienceModalOpen(false);
    window.location.reload(); // Reload the page to clear state and redirect to login
    }catch(error){
      setLoading(false);
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Adding Experience';
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
  };

  const handleAddEducation = async () => {
    setLoading(true);

    try{
    // Send new experience data to the server (optional)
    const updateUser = await fetch(process.env.REACT_APP_addexperience_api , {
      method: process.env.REACT_APP_addexperience_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "education": [...(userData?.education || []), newEducation]
      })
    });
    const data = await updateUser.json();
    // console.log("data : ", data);
    setIsShowMoreEducationOpen(false);
    setLoading(false);
    window.location.reload(); // Reload the page to clear state and redirect to login
    }catch(error){
      setLoading(false);
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Adding Education';
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
  };


  // Show More Projects
  const handleShowMoreProjects = () => {
    setVisibleProjectsCount((userData?.projects || []).length);
    setIsShowMoreProjectsOpen(true);
  };

  // Show More Experiences
  const handleShowMoreExperiences = () => {
    setVisibleExperiencesCount((userData?.experiences || []).length);
    setIsShowMoreExperiencesOpen(true);
  };

  // Show More Education
  const handleShowMoreEducation = () => {
    setVisibleEducationCount((userData?.education || []).length);
    setIsShowMoreEducationOpen(true);
  };

  // Fetch leetcode details

  

  // If no user data is available yet
  if (!userData){ return (<div className="buffer">
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
</div>)
  }

  return (
    
    <div className="container">
      {/* Profile Header */}
      {loading&&<div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div>}
      <div className="profile-header">
          <div className="profile-left">

          <div id="i400">
          <img

            src={userIcon}
            alt="Profile Picture"
            className="profile-picture"
          />
          </div>
          <div id="i402">
          <img onClick={() => setIsAddProfileDetailsOpen(true)} className='editbtn' style={{height:"10px"}} src={edit} alt="edit" />

          </div>
          <h2 style={{fontFamily:"Poppins",fontWeight:"600"}} id="pro-name">{userData.name}</h2>
          <p style={{fontFamily:"Poppins",fontSize:"14px"}}>{userData.tagline}</p>
          <p style={{fontSize:"14px"}} className="location">
            {userData.city}, {userData.state}, {userData.country}
          </p>

          </div>


          <div>
            <div className='heatmap-container'>
                <HeatMap msg={'Jan'}/>
                <HeatMap msg={'Feb'}/>
                <HeatMap msg={'Mar'}/>
                <HeatMap msg={'Apr'}/>
                <HeatMap msg={'May'}/>
                <HeatMap msg={'Sep'}/>
                <HeatMap msg={'Oct'}/>
                <HeatMap msg={'Nov'}/>
                <HeatMap msg={'Dec'}/>
            </div>
            <div className='images-con'>
                <a href="https://leetcode.com/u/vinukanth75/" target='blank'><img src={leetcode} className='logoo'></img></a>
                <a href="https://www.hackerrank.com/profile/vinukanth75" target='blank'><img src={hackerrank} className='logoo'></img></a>
                <a href="https://github.com/vinu75kanth" target='blank'><img src={github} className='logoo'></img></a>
            </div>
          </div>
      </div>

      <div className="complete">
        <div className="about">
          {/* About Section */}
          <div className="about1" id="i302">
          <div  className="about-section">
            <div className="about-section-a">
              <div className='simply'>
                <h3 >About</h3>
                {isEditingAbout ? (
                  <img onClick={handleSaveAbout} className='editbtn' src={saveIcon}></img>
                ) : (
                  <img className='editbtn' onClick={() => setIsEditingAbout(true)} src={editIcon}></img>
                )}
              </div>
              {isEditingAbout ? (
              
                <textarea
                  id="i303"
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="about-text"
                />
                
              ) : (
                <p id="405" style={{fontWeight:"400",fontSize:"15px"}}>{userData.about}</p>
              )}
            </div>
          </div>

          <div className="skills-section">
            <div className="skill-section-a">
              <div className='simply'>
                <h3>Skills</h3>
                <img className="addskill editbtn" onClick={handleAddSkill} src={editIcon}></img>
              </div>
              <div className="skills-list">
                {(userData.skills || []).map((skill, index) => (
                  <p key={index} className="skill-item">{skill.toUpperCase()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Experience Section */}
        <style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
        <h3 style={{fontWeight:"700"}} className="exp-h3">Experiences</h3>
        <div className="experience-section">
          {(userData.experiences || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={(experience.company === 'Amazon')?Amazon:
                  (experience.company === 'Google')?Google:'' || experience.media[0]} alt={experience.company} className="company-logo" />
                <p id="i401">{experience.company}</p>
              </div>
              <div id="exp1">
                <div > 
                <h4 id="hi10" className="title" >{experience.title}</h4>
                <p  id="hi11" style={{fontWeight:"500"}} >{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p id="hi510" className="description" style={{marginTop:"20px",fontWeight:"400"}}>{experience.description}</p>
                  </div>
              </div>
            </div>
          ))}
          {(userData.experiences || []).length > 5 && visibleExperiencesCount < (userData.experiences || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreExperiences}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddExperienceModalOpen(true)}>Add Experience</a>
        </div>

        {/* Projects Section */}
        <h3 style={{marginTop:"100px"}} className="exp-h3">Projects</h3>
        <div className="pro">
          <div className="projects-section">
            {(userData.projects || []).slice(0, visibleProjectsCount).map((project, index) => (
              <div key={index} className="project-item">
                <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h4 className="project-item-t" style={{fontSize:"17px"}}>{project.title}</h4>
                </div>
                <p className="project-item-s" style={{fontWeight:"500"}}>{project.description}</p>
                <div className='project-link-holder'>
                  {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>}
                  <img className='editbtn' src={linkIcon}></img>
                </div>
              </div>
            ))}
            {(userData.projects || []).length > 5 && visibleProjectsCount < (userData.projects || []).length && (
              <a href="#" className="show-more" onClick={handleShowMoreProjects}>Show More</a>
            )}
          </div>
          <a href="#" className="add-more-projects" onClick={() => setIsAddProjectModalOpen(true)}>Add Project</a>
        </div>
        <h3 style={{marginTop:"100px"}} className="exp-h3">Education</h3>
        <div className="experience-section">
          {(userData.education || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={(experience.institution === 'Amazon')?Amazon:
                  (experience.institution !== 'Amazon')?Google:'' || experience.media[0]} alt={experience.institution} className="company-logo" />
                <p id="i401" >{experience.institution}</p>
              </div>
              <div id="exp1">
                <div  >
                <h4 id="hi" className="title">{experience.institution}</h4>

                <h4 id="hi10" className="title">{experience.title}</h4>
                <p  id="hi11">{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p id="hi510"  className="description" style={{fontWeight:"500"}}>{experience.description}</p>
                
                </div>
                
              </div>
              

            </div>
          ))}
          {(userData.education || []).length > 5 && visibleExperiencesCount < (userData.education || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreEducation}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddEducationModalOpen(true)}>Add Education</a>
        </div>

      </div>


      
      <Modal isOpen={isAddProfileDetailsOpen} onClose={() => setIsAddProfileDetailsOpen(false)}>
          <h3>Update Profile Details</h3>
          <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleUpdateDetails(); }}>
            <input
              placeholder="Name"
              value={userdata.name}
              onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
              required
            />
            <input
              placeholder="TagLine"
              value={userdata.tagline}
              onChange={(e) => setUserdata({ ...userdata, tagline: e.target.value })}
              required
            />
            
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setCountry(e.name); // Set the selected country name
              setState(''); // Reset state and city when country changes
              setCity('');
            }}
            placeHolder="Select Country"
            value={countryid} // Set selected country id
          />
          <br />

          <StateSelect
            countryid={countryid}
            onChange={(e) => {
              setStateid(e.id);
              setState(e.name); // Set the selected state name
              setCity(''); // Reset city when state changes
            }}
            placeHolder="Select State"
            value={stateid} // Set selected state id
          />
          <br />

          <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
              setCity(e.name); // Set the selected city name
            }}
            placeHolder="Select City"
            value={city} // Set selected city name
          />
          <br />
            
            <button type="submit">Update Details</button>
          </form>
        </Modal>

      {/* Add Project Modal */}
      <Modal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)}>
        <h3>Add New Project</h3>
        <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
          <input
            
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Project Link"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          />
          <button type="submit">Add Project</button>
        </form>
      </Modal>

      {/* Add Experience Modal */}
      <Modal isOpen={isAddExperienceModalOpen} onClose={() => setIsAddExperienceModalOpen(false)}>
        <h3>Add New Experience</h3>
        <form className="addexperience" onSubmit={(e) => { e.preventDefault(); handleAddExperience(); }}>
          <input
            
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
            required
          />
          <input
            
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            required
          />
          <div>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            required
          />
          <button type="submit">Add Experience</button>
        </form>
      </Modal>


      <Modal isOpen={isAddEducationModalOpen} onClose={() => setIsAddEducationModalOpen(false)}>
        <h3>Add New Education</h3>
        <form className="addexperience" onSubmit={(e) => { e.preventDefault(); handleAddEducation(); }}>
          <input
            
            placeholder="Title"
            value={newEducation.title}
            onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
            required
          />
          <input
            
            placeholder="Institution or College or School"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            required
          />
          <div>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={newEducation.startDate}
              onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={newEducation.endDate}
              onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            value={newEducation.description}
            onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
            required
          />
          <button type="submit">Add Education</button>
        </form>
      </Modal>

      {/* Show More Projects Modal */}
      <Modal isOpen={isShowMoreProjectsOpen} onClose={() => setIsShowMoreProjectsOpen(false)}>
        <h3>All Projects</h3>
        <div className="projects-section">
          {(userData.projects || []).map((project, index) => (
            <div key={index} className="project-item">
              <h4 className="project-item-t">{project.title}</h4>
              <p className="project-item-s">{project.description}</p>
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>}
            </div>
          ))}
        </div>
      </Modal>

      {/* Show More Experiences Modal */}
      <Modal isOpen={isShowMoreExperiencesOpen} onClose={() => setIsShowMoreExperiencesOpen(false)}>
        <h3>All Experiences</h3>
        <div className="experience-section">
          {(userData.experiences || []).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={experience.media[0] || 'images/company-logo-placeholder.svg'} alt={experience.company} className="company-logo" />
                <p>{experience.company}</p>
              </div>
              <div>
                <h4 className="title">{experience.title}</h4>
                <p>{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="description">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>


      <Modal isOpen={isShowMoreEducationOpen} onClose={() => setIsShowMoreEducationOpen(false)}>
        <h3>All Educations</h3>
        <div className="experience-section">
          {(userData.education || []).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={experience.media[0] || 'images/company-logo-placeholder.svg'} alt={experience.company} className="company-logo" />
                <p>{experience.institution}</p>
              </div>
              <div>
                <h4 className="title">{experience.title}</h4>
                <p>{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="description">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
