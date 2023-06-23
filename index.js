// Get form values
let personForm = document.getElementById("person-form");
const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const dobEl = document.getElementById('dob');
const emailEl = document.getElementById('email');
const phoneNumberEl = document.getElementById('mobile');
const cityEl = document.getElementById('city');
const pincodeEl = document.getElementById('pincode');
let errorMessageEl = document.getElementById("err-msg");
let listEl = document.getElementById("persons-list");
let addBtnEl = document.getElementById("Add-Button");
let searchBtnEl = document.getElementById("search-btn");

function getPersonDetailsFromLocalStorage() {
    let stringifiedPersonDetails = localStorage.getItem("personsData");
    let parsedDetails = JSON.parse(stringifiedPersonDetails);
    if (parsedDetails === null) {
        return [];
    } else {
        return parsedDetails;
    }
    console.log("getting details from local storage");
}

let persons = getPersonDetailsFromLocalStorage();
let filteredPersons = [];
filteredPersons.sort();
console.log(persons);
//localStorage.clear();


// Validate form values
function validatePerson(firstName, lastName, dob, email, phoneNumber, pincode) {
    let isValid = true;

    // Validate email format

    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
        errorMessageEl.classList.remove("d-none");
        console.log(email);
    } else {
        isValid = false;

        errorMessageEl.classList.add("d-none");
        console.log(false);
    }

    // Validate phone number format
    const phoneNumberRegex = /^[0-9]{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
        errorMessageEl.classList.remove("d-none");
        console.log(phoneNumber);
    } else {
        isValid = false;

        errorMessageEl.classList.add("d-none");
        console.log("Invalid Number");
    }

    // Validate age (above 18 years)
    let dt1 = new Date();
    let dt2 = new Date(dob);
    let diff = (dt1.getTime() - dt2.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    let age = (Math.round(diff / 365.25));
    if (age > 18) {
        errorMessageEl.classList.remove("d-none");
        console.log(age);
    } else {
        isValid = false;

        errorMessageEl.classList.add("d-none");
        console.log("invalid Age");
    }

    // Validate pincode format
    const pincodeRegex = /^[0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) {

        errorMessageEl.classList.remove("d-none");
        console.log(pincode);
    } else {
        isValid = false;
        errorMessageEl.textContent = "**Please Enter Valid Pincode";
        errorMessageEl.classList.add("d-none");
        console.log("invalid pincode");
    }
    console.log(isValid);

    return isValid;
}


function addPerson() {
    // Get form input values
    const firstName = firstNameEl.value;
    const lastName = lastNameEl.value;
    const dob = dobEl.value;
    const email = emailEl.value;
    const phoneNumber = phoneNumberEl.value;
    const city = cityEl.value;
    const pincode = pincodeEl.value;

    // Validate the person's details
    const isValid = validatePerson(firstName, lastName, dob, email, phoneNumber, pincode);

    if (isValid) {
        // Create a new person object`
        errorMessageEl.classList.add("d-none");
        console.log("updatingArray");
        const person = {
            firstName,
            lastName,
            dob,
            email,
            phoneNumber,
            city,
            pincode
        };

        // Add the person to the array
        persons.push(person);
        createPersonCard(person);
        //console.log(persons[0]);
        // clear the form 
        firstNameEl.value = "";
        lastNameEl.value = "";
        dobEl.value = "";
        emailEl.value = "";
        phoneNumberEl.value = "";
        cityEl.value = "";
        pincodeEl.value = "";
        // Refresh the persons list
        // saving persons details in Local storage
        localStorage.setItem("personsData", JSON.stringify(persons));
        console.log("saved in localStorage");
        //showPersons(currentPage);
    } else {
        errorMessageEl.classList.remove("d-none");
    }


}

// Perform validation for each field and display error message if necessary

// Add person to the list if all fields are valid
/* All fields are valid */

// Add the person to the persons list section
let personsList = document.getElementById("persons-list");
// Create a new person card or add a row to the table
function createPersonCard(person) {
    let cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cardsContainer", "d-flex", "flex-row");
    let personCard = document.createElement("div");
    personCard.classList.add("person-card", "shadow", "d-flex", "flex-column", "justify-content-center");
    let personFirstName = document.createElement("p");
    personFirstName.textContent = "First Name: " + person.firstName;
    personFirstName.classList.add("details");
    personCard.appendChild(personFirstName);

    let personLasttName = document.createElement("p");
    personLasttName.textContent = "Last Name: " + person.lastName;
    personLasttName.classList.add("details");
    personCard.appendChild(personLasttName);

    let personDob = document.createElement("p");
    personDob.textContent = "Date Of Birth: " + person.dob;
    personDob.classList.add("details");
    personCard.appendChild(personDob);

    let personMail = document.createElement("p");
    personMail.textContent = "Email: " + person.email;
    personMail.classList.add("details");
    personCard.appendChild(personMail);


    let contactNO = document.createElement("p");
    contactNO.textContent = "MObile No: " + person.phoneNumber;
    contactNO.classList.add("details");
    personCard.appendChild(contactNO);

    let personCity = document.createElement("p");
    personCity.textContent = "City: " + person.city;
    personCity.classList.add("details");
    personCard.appendChild(personCity);

    let personPincode = document.createElement("p");
    personPincode.textContent = "Pincode: " + person.pincode;
    personPincode.classList.add("details");
    personCard.appendChild(personPincode);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    personCard.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIconContainer.appendChild(deleteIcon)
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeletePerson(personCard)
    }
    cardsContainer.appendChild(personCard)
    listEl.appendChild(cardsContainer);
}

function searchPersons() {
    let searchInput = document.getElementById('search-input').value.toLowerCase();
    filteredPersons = persons.filter(person =>
        person.firstName.toLowerCase().includes(searchInput) ||
        person.lastName.toLowerCase().includes(searchInput) ||
        person.email.toLowerCase().includes(searchInput) ||
        person.phoneNumber.includes(searchInput) ||
        person.city.toLowerCase().includes(searchInput) ||
        person.pincode.includes(searchInput)
    );
}

function onDeletePerson() {
    listEl.removeChild(personCard)
}

for (let eachPerson of persons) {
    createPersonCard(eachPerson);
}

// Implementing Pagination
function showPersons(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const personsToDisplay = filteredPersons.length > 0 ? filteredPersons : persons;

    const personsList = document.getElementById('personsList');
    personsList.innerHTML = ''; // Clear the list

    for (let i = startIndex; i < endIndex && i < personsToDisplay.length; i++) {
        const person = personsToDisplay[i];
    }
}

searchBtnEl.onclick = function() {
    listEl.innerHTML = ""
    searchPersons();
    for (let eachPerson of filteredPersons) {
        createPersonCard(eachPerson);
    }
    console.log(filteredPersons);
}


// Clear the form fields
addBtnEl.onclick = function() {
    //onAddingPerson(firstName, lastName, dob, email, city, pincode);
    addPerson();
    let persons = getPersonDetailsFromLocalStorage();

};


personForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and page refreshing
});
