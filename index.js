//Global Random ID function
function randomID(params) {
    const id = Math.floor(Math.random() * 100000000) + '';
    return id;
}
/*******************************************************************************************************************/
/*******************************************************************************************************************/
/*JS For The Index Page*/
//Function to submit an issue into the local storage
function submitIssue(e) {
    //Variable to get values from the form by ID
    const getInputValue = id => document.getElementById(id).value;

    //Getting values from the form and assigning variable names to the values
    const tittle = getInputValue('tittleTicket');
    const description = getInputValue('issueDescription');
    const the_person_discovered_problem = getInputValue('the_person_discovered_problem')
    const date_of_ticket_made = getInputValue('date_of_ticket_created');
    const what_project_ticket_is_for = getInputValue('what_project_ticket_is_for');
    const status_of_ticket_is = getInputValue('status');
    const severity = getInputValue('issueSeverity');
    const target_date = getInputValue('target_date');
    const actual_date_fixed = getInputValue('actual_date_fixed');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = randomID();
    //status = 'Open';
  
    //Exception Handling to catch the empty fields and displaying error message using the modal
    if ((tittle.length == 0) || (description.length == 0) || (assignedTo.length == 0)) {
      alert("Please fill all fields with required data.");
      document.getElementById('add-issue').setAttribute("data-toggle", "modal");
      document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
    }
    else {
      document.getElementById('add-issue').removeAttribute("data-toggle", "modal");
      document.getElementById('add-issue').removeAttribute("data-target", "#emptyField")
      //Creating an Issue object with the variables and adding them into an array
      const issue = { 
        id,
        tittle,
        description,
        the_person_discovered_problem,
        date_of_ticket_made,
        what_project_ticket_is_for,
        status_of_ticket_is,
        severity,
        target_date,
        actual_date_fixed,
        assignedTo,
      };
      let issues = [];
      if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
      }
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
  
      //Call the fetch issue to display the issues after pressing the add issue button
      fetchIssues();
    }
}
  
//Function To Close or Scratch an Issue
const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status_of_ticket_is = 'Closed';
    currentIssue.description = `<strike>${currentIssue.description}</strike>`
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
  
//Function To Delete An Issue
const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => ((issue.id) != id))
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    fetchIssues();
}
  
//Function To Fetch and Display Issues
const fetchIssues = () => {
  
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
  
    for (var i = 0; i < issues.length; i++) {
      const { 
        id,
        tittle,
        description,
        the_person_discovered_problem,
        date_of_ticket_made,
        what_project_ticket_is_for,
        status_of_ticket_is,
        severity,
        target_date,
        actual_date_fixed,
        assignedTo,
        //status 
      } = issues[i];
  
      issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status_of_ticket_is} </span></p>
                                <h2> ${tittle} </h2>
                                <h3> ${description} </h3>
                                <h4>Person Discovered Problem: ${the_person_discovered_problem} </h4>
                                <h5>Date Ticket Made: ${date_of_ticket_made} </h5>
                                <h1>Project: ${what_project_ticket_is_for} </h1>
                                <p>Priority: <span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <h5>Target Completition Date: ${target_date} </h5>
                                <h5>Date Issue Fixed: ${actual_date_fixed} </h5>
                                <p>Assigned To:<span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                                <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                                </div>`;
    }
}
fetchIssues();
/*******************************************************************************************************************/
/*******************************************************************************************************************/