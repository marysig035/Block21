// User enters the website to find a list of names, dates, times, locations, and descriptions

// Get party elements 
const partiesContainer = document.getElementById('parties-container');
const newPartyFormContainer = document.getElementById('new-party-form');

// Variable for our API URL
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events'

// Function to delete a party
async function deleteParty(id) {
    try {
        await fetch(API_URL, {
        method: 'DELETE',
        });

        // Remove the party from the list
        parties = parties.filter(party => party.id !== id);

        // Render the updated list
        renderParties();
    }   catch (error) {
        console.error(error);
        }
}

// Function to render parties on the webpage
function renderParties() {
    const partyList = document.getElementById('partyList');
    partyList.innerHTML = ''; // Clear the existing list

    parties.forEach(party => {
        const li = document.createElement('li');
        li.innerHTML = `
        <strong>${party.title}</strong> - ${party.body}
        <button onclick="deleteParty(${party.id})">Delete</button>
        `;
        partyList.appendChild(li);
    });
}
// Function to fetch parties from the server
    const fetchAllParties = async () => {
        try {
            const response = await fetch(API_URL);
            const parties = await response.json();
            console.log(parties);
            return parties; 
        } catch (error) {
            console.error(error);
        }
    }

// Array to store party data
let parties = [];

// Form to add a new party
    const partyForm = document.createElement('form');
    partyForm.innerHTML = `
        <h2>Schedule a New Party</h2>
        <label for="title">Title:</label>
        <input type="text" id="title" required>
        <br>
        <label for="body">Description:</label>
        <input type="text" id="body" required>
        <br>
        <button type="button" onclick="addParty()">Submit</button>
        `;

// Function to add a new party
async function addParty() {
    try {
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        // Perform a POST request to add a new party
        const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
        });

        const newParty = await response.json();

        // Add the new party to the array
        parties.unshift(newParty);

        // Clear the form fields
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';

        // Render the updated list of parties
        renderParties();
    }   catch (error) {
        console.error(error);
        }
}

// Append the form to the body
document.body.appendChild(partyForm);

// Initial fetching of parties
fetchAllParties();