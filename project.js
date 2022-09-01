function randomID(params) {
    const id = Math.floor(Math.random() * 100000000 + '');
    return id;
}
//Function to submit project
function submitProject(e) {
    //Getting values from the form and assigning variable names to the values
    const getInputValue = id => document.getElementById(id).value;
    const projectName = getInputValue('projectName');
    const projectDescription = getInputValue('projectDescription');
    const projectID = randomID();
  
    //Exception Handling to catch the empty fields and displaying error message using the modal
    if ((projectName.length == 0) || (projectDescription.length == 0)) {
      alert("Please fill all fields with required data.");
      document.getElementById('add-project').setAttribute("data-toggle", "modal");
      document.getElementById('add-project').setAttribute("data-target", "#emptyField")
    }
    else {
      document.getElementById('add-project').removeAttribute("data-toggle", "modal");
      document.getElementById('add-project').removeAttribute("data-target", "#emptyField")
      //Creating a Project object with the variables and adding them into an array
      const project = { 
        projectName,
        projectDescription,
        projectID,
      };
      let projects = [];
      if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
      }
      projects.push(project);
      localStorage.setItem('projects', JSON.stringify(projects));
  
      //Call the fetch and display the projects after pressing the add project button
      fetchProjects();
    }
}

//Function To Delete A Project
const deleteProject = projectID => {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const remainingProjects = projects.filter(project => ((project.projectID) != projectID))
    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(remainingProjects));
    fetchProjects();
}

//Function to fetch projects
const fetchProjects = () => {
  
    const projects = JSON.parse(localStorage.getItem('projects'));
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
  
    for (var i = 0; i < projects.length; i++) {
      const { 
        projectName,
        projectDescription,
        projectID,
      } = projects[i];
  
      projectsList.innerHTML += `<div class="well">
                                <h5>Project ID: ${projectID} </h6>
                                <h4>Project Name: ${projectName} </h2>
                                <h4>Project Description: ${projectDescription} </h3>
                                <button onclick="deleteProject(${projectID})" class="btn btn-danger">Delete Project</button>             
                                </div>`;
    }
}
fetchProjects();