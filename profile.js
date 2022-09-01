function randomID(params) {
    const id = Math.floor(Math.random() * 100000000 + '');
    return id;
}
/*******************************************************************************************************************/
/*******************************************************************************************************************/
/*JS For the Profile Page*/
//Adding an image 
function readURL(input) {
    if (input.files && input.file[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#propic').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
    readURL(this);
}

//Function to submit developer
function submitUser(e) {
    //Getting values from the form and assigning variable names to the values
    const getInputValue = id => document.getElementById(id).value;
    const firstname = getInputValue('firstname');
    const lastname = getInputValue('lastname');
   
    const username = getInputValue('username');
    const email = getInputValue('email');
    //Random user ID
    const devID = randomID();
  
    //Exception Handling to catch the empty fields and displaying error message using the modal
    if ((devID.length == 0) || (firstname.length == 0) || (lastname.length == 0) || (username.length == 0) || (email.length == 0)) {
      alert("Please fill all fields with required data.");
      document.getElementById('add-user').setAttribute("data-toggle", "modal");
      document.getElementById('add-user').setAttribute("data-target", "#emptyField")
    }
    else {
      document.getElementById('add-user').removeAttribute("data-toggle", "modal");
      document.getElementById('add-user').removeAttribute("data-target", "#emptyField")
      //Creating a User object with the variables and adding them into an array
      const user = { 
        devID,
        firstname,
        lastname,
        username,
        email,
      };
      let users = [];
      if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
  
      //Call the fetch and display the user after pressing the add add user button
      fetchUsers();
    }
}
  
//Function To Delete A User
const deleteUser = devID => {
    const users = JSON.parse(localStorage.getItem('users'));
    const remainingUsers = users.filter(user => ((user.devID) != devID))
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(remainingUsers));
    fetchUsers();
}
  
//Function to fetch developer
const fetchUsers = () => {
  
    const users = JSON.parse(localStorage.getItem('users'));
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
  
    for (var i = 0; i < users.length; i++) {
      const { 
        devID,
        firstname,
        lastname,
        username,
        email,
      } = users[i];
  
      usersList.innerHTML += `<div class="well">
                                <h5>User ID: ${devID} </h6>
                                <h4>First Name: ${firstname} </h2>
                                <h4>Last Name: ${lastname} </h3>
                                <h5>Username: ${username} </h4>
                                <h5>Email: ${email} </h5> 
                                <button onclick="deleteUser(${devID})" class="btn btn-danger">Delete Developer</button>             
                                </div>`;
    }
}
fetchUsers();
/*******************************************************************************************************************/
/*******************************************************************************************************************/