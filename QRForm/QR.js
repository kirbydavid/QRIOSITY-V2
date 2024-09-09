// Update the form submission event handler to handle the ingredients table data
const form = document.getElementById('productForm'); // Get the form element
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Gather the ingredients table data
  const ingredientsTable = document.getElementById('ingredientsTable');
  const ingredients = [];
  const rows = ingredientsTable.rows;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const ingredient = {
      name: row.cells[1].textContent,
      quantity: row.cells[2].textContent,
      weight: row.cells[3].textContent,
      unit: row.cells[4].textContent,
      calories: row.cells[5].textContent,
    };
    ingredients.push(ingredient);
  }

  // Gather the form data
  const formData = new FormData(form);

  // Create a JSON object to store the form data
  const jsonData = {
    Product_Name: formData.get('Product_Name'),
    Description: formData.get('Description'),
    Origin: formData.get('Origin'),
    Expiration_Date: formData.get('Expiration_Date'),
    Allergen: formData.get('Allergen'),
    ingredients: ingredients,
  };

  // Send the JSON object to the server-side endpoint
  fetch('http://localhost:3000/save-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  // Clear the input fields
  Array.from(form.elements).forEach((input) => {
    if (input.type.toLowerCase() === 'text') {
      input.value = '';
    }
  });

  // Prevent the form from submitting in the traditional way
  return false;
});

function addIngredient() {
    const ingredientName = document.getElementById("ingredientInputBox").value;
  
    // Create a new row and cells
    const tableBody = document.getElementById("ingredientsList");
    const newRow = tableBody.insertRow();
  
    newRow.insertCell().textContent = 'IMAGE';
    newRow.insertCell().textContent = ingredientName;
    newRow.insertCell().textContent = ''; // Quantity
    newRow.insertCell().textContent = ''; // Weight
    newRow.insertCell().textContent = ''; // Unit
    newRow.insertCell().textContent = ''; // Calories
    newRow.insertCell().textContent = ''; // Food Group
  
    const deleteButtonCell = newRow.insertCell();
    deleteButtonCell.innerHTML = '<button class="remove-btn" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>';
  
    
  
    // Fetch nutrition data for the added ingredient
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'fec30a29', // Replace with your API ID
        'x-app-key': 'aeaf7777cd89a85c211ec24a12d84215' // Replace with your API Key
      },
      body: JSON.stringify({
        "query": ingredientName
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Update the table cells with the fetched data
      newRow.cells[1].textContent = data.foods[0].food_name;
      newRow.cells[2].textContent = data.foods[0].serving_qty;
      newRow.cells[3].textContent = data.foods[0].serving_weight_grams;
      newRow.cells[4].textContent = data.foods[0].serving_unit;
      newRow.cells[5].textContent = data.foods[0].nf_calories;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  
    // Show the table if it's currently hidden
    const ingredientsTable = document.getElementById("ingredientsTable");
    if (tableBody.rows.length > 0) {
      ingredientsTable.style.display = "table";
    }
  
    // Clear the input field
    document.getElementById("ingredientInputBox").value = "";
  }
  
  function deleteRow(button) {
    const row = button.parentNode.parentNode; // Get the row
    row.parentNode.removeChild(row); // Remove the row from the table body
  
    // Check if there are no rows left
    const tableBody = document.getElementById("ingredientsList");
    if (tableBody.rows.length === 0) {
      const ingredientsTable = document.getElementById("ingredientsTable");
      ingredientsTable.style.display = "none";
    }
  }