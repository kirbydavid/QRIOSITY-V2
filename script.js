// usda fetch
function fetchUSDAData(query) {
   return fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=fEFUuaodX1TRMM5G8nl59Knfkul2CTZhztMMsCNu`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     }
   })
   .then(response => {
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   });
 }
 
 // nutritionix fetch
 function fetchNutritionixData(query) {
   return fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'x-app-id': 'fec30a29',
       'x-app-key': 'aeaf7777cd89a85c211ec24a12d84215' 
     },
     body: JSON.stringify({
       "query": query
     })
   })
   .then(response => {
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   });
 }
 
 // daily values
 const dailyValues = {
   totalFat: 78,
   saturatedFat: 20,
   cholesterol: 300,
   sodium: 2300,
   totalCarbohydrates: 275,
   dietaryFiber: 28,
   sugars: 50,
   calcium: 1300,
   iron: 18,
   potassium: 4700,
   vitaminA: 900,
   vitaminC: 90,
   vitaminD: 20
 };
 
 // item 
 const query = "Carrots, raw";
 
 // wait for both to complete fetching
 Promise.all([fetchUSDAData(query), fetchNutritionixData(query)])
   .then(([usdaData, nutritionixData]) => {
     // logs to
     console.log('USDA Data:', usdaData);
     console.log('Nutritionix Data:', nutritionixData);
 
     // extract ng usda
     const foodData = usdaData.foods[0]; 
     const foodNutrients = foodData.foodNutrients; 
 
     // Debugging output: Log all nutrients to find the exact name
     console.log('All nutrients:', foodNutrients);
 
     // Extract the required nutrient values
     const totalFat = getNutrientValue(foodNutrients, 'Total lipid (fat)');
     const saturatedFat = getNutrientValue(foodNutrients, 'Fatty acids, total saturated');
     const transFat = getNutrientValue(foodNutrients, 'Fatty acids, total trans');
     const cholesterol = getNutrientValue(foodNutrients, 'Cholesterol');
     const sodium = getNutrientValue(foodNutrients, 'Sodium, Na');
     const totalCarbohydrates = getNutrientValue(foodNutrients, 'Carbohydrate, by difference');
     const dietaryFiber = getNutrientValue(foodNutrients, 'Fiber, total dietary');
     const sugars = getNutrientValue(foodNutrients, 'Total Sugars');
     const vitaminA = getNutrientValue(foodNutrients, 'Vitamin A, IU');
     const vitaminC = getNutrientValue(foodNutrients, 'Vitamin C, total ascorbic acid');
     const vitaminD = getNutrientValue(foodNutrients, 'Vitamin D (D2 + D3), International Units');
     const calcium = getNutrientValue(foodNutrients, 'Calcium, Ca');
     const iron = getNutrientValue(foodNutrients, 'Iron, Fe');
     const potassium = getNutrientValue(foodNutrients, 'Potassium, K'); 
     const protein = getNutrientValue(foodNutrients, 'Protein');
 
     // Debugging output
     console.log('Potassium data:', potassium);
 
     // Update the HTML elements with the extracted values
     document.getElementById('calories').textContent = nutritionixData.foods[0].nf_calories;
     document.getElementById('nf_total_fat').innerText = formatNutrient(totalFat);
     document.getElementById('nf_saturated_fat').innerText = formatNutrient(saturatedFat);
     document.getElementById('nf_trans_fat').innerText = formatNutrient(transFat);
     document.getElementById('nf_cholesterol').innerText = formatNutrient(cholesterol);
     document.getElementById('nf_sodium').innerText = formatNutrient(sodium);
     document.getElementById('nf_carbs').innerText = formatNutrient(totalCarbohydrates);
     document.getElementById('nf_fiber').innerText = formatNutrient(dietaryFiber);
     document.getElementById('nf_sugars').innerText = formatNutrient(sugars);
     document.getElementById('nf_vitamin_a').innerText = formatNutrient(vitaminA);
     document.getElementById('nf_vitamin_c').innerText = formatNutrient(vitaminC);
     document.getElementById('nf_vitamin_d').innerText = formatNutrient(vitaminD); 
     document.getElementById('nf_calcium').innerText = formatNutrient(calcium);
     document.getElementById('nf_iron').innerText = formatNutrient(iron);
     document.getElementById('nf_potassium').innerText = formatNutrient(potassium);
     document.getElementById('nf_protein').innerText = formatNutrient(protein);
 
     // Update the daily value percentage for each of the nutrients
     updateDailyValue('nf_total_fat', totalFat.value, 'totalFat');
     updateDailyValue('nf_saturated_fat', saturatedFat.value, 'saturatedFat');
     updateDailyValue('nf_trans_fat', transFat.value, 'transFat');
     updateDailyValue('nf_cholesterol', cholesterol.value, 'cholesterol');
     updateDailyValue('nf_sodium', sodium.value, 'sodium');
     updateDailyValue('nf_carbs', totalCarbohydrates.value, 'totalCarbohydrates');
     updateDailyValue('nf_fiber', dietaryFiber.value, 'dietaryFiber');
     updateDailyValue('nf_sugars', sugars.value, 'sugars');
     updateDailyValue('nf_vitamin_a', vitaminA.value, 'vitaminA');
     updateDailyValue('nf_vitamin_c', vitaminC.value, 'vitaminC');
     updateDailyValue('nf_vitamin_d', vitaminD.value, 'vitaminD');
     updateDailyValue('nf_calcium', calcium.value, 'calcium');
     updateDailyValue('nf_iron', iron.value, 'iron');
     updateDailyValue('nf_potassium', potassium.value, 'potassium');
     updateDailyValue('nf_protein', protein.value, 'protein');
   })
   .catch(error => {
     console.error('There has been a problem with your fetch operation:', error);
   });
 
 // gets the nutrient value from the array
 function getNutrientValue(foodNutrients, nutrientName) {
   const nutrient = foodNutrients.find(n => n.nutrientName === nutrientName);
   return {
     value: nutrient ? nutrient.value : '0',
     unit: nutrient ? nutrient.unitName.toLowerCase() : ''
   };
 }
 
 // function to calc daily value
 function updateDailyValue(elementId, nutrientValue, nutrientName) {
   const element = document.getElementById(elementId);
   const percentageElement = element ? element.nextElementSibling : null;
 
   if (element) {
     element.innerText = formatNutrient({value: nutrientValue, unit: ''});
     if (percentageElement) {
       percentageElement.innerText = calcDailyValue(nutrientValue, nutrientName);
     }
   }
 }
 
 // Formula to calculate the daily value
 function calcDailyValue(nutrientValue, nutrientName) {
   const dv = dailyValues[nutrientName];
   if (dv) {
     return Math.round((nutrientValue / dv) * 100) + '%';
   }
   return '0%';
 }
 
 // formatter
 function formatNutrient(nutrient) {
   return nutrient.value + ' ' + nutrient.unit;
 }
 