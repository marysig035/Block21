// Function to delete a party
async function deleteParty(id) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      // Remove the party from the list
      parties = parties.filter(party => party.id !== id);

      // Render the updated list
      renderParties();
    } catch (error) {
      console.error('Error deleting party:', error);
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
  async function fetchParties() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      parties = data.slice(0, 5); // Limit the number of parties for demo
      renderParties();
    } catch (error) {
      console.error('Error fetching parties:', error);
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
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
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
    } catch (error) {
      console.error('Error adding party:', error);
    }
  }

  // Append the form to the body
  document.body.appendChild(partyForm);

  // Initial fetching of parties
  fetchParties();