// Write your JavaScript code here!

	window.addEventListener("load", function() {
		let form = document.querySelector("form");
		form.addEventListener("submit", function(event) {
			// Set variables to DOM input objects.
			let pilotNameInput = document.querySelector("input[name=pilotName]");
 			let copilotNameInput = document.querySelector("input[name=copilotName]");
			let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
			let cargoMassInput = document.querySelector("input[name=cargoMass]");
			// Set variables to input objects' values, & trim them.
			let pilotNameValue = pilotNameInput.value.trim();
			let copilotNameValue = copilotNameInput.value.trim();
			let fuelLevelValue = fuelLevelInput.value.trim();
			let cargoMassValue = cargoMassInput.value.trim();
			// Alert user if not all fields have content.
 			if (pilotNameValue === "" || copilotNameValue === "" || fuelLevelValue === "" || cargoMassValue === "") {
				alert("All fields are required!");
				event.preventDefault();
			} else if (isNaN(fuelLevelValue)) {
				alert("Fuel Level must be a number");
				event.preventDefault();
			} else if (isNaN(cargoMassValue)) {
				alert("Cargo Mass must be a number");
				event.preventDefault();
			} else {
				let pilotStatus = document.getElementById("pilotStatus");
				let copilotStatus = document.getElementById("copilotStatus");
				pilotStatus.innerHTML = `Pilot ${pilotNameValue} is Ready`;
				copilotStatus.innerHTML = `Co-Pilot ${copilotNameValue} is Ready`;
 				let faultyItemsDiv = document.getElementById("faultyItems");
 				let launchStatusH2 = document.getElementById("launchStatus");
				if (fuelLevelValue < 10000) {
					faultyItemsDiv.style.visibility = "visible";
					let fuelStatus = document.getElementById("fuelStatus");
					fuelStatus.style.color = "red";
					fuelStatus.innerHTML = "There's not enough fuel for the journey.";
					launchStatusH2.innerHTML = "Shuttle not ready for launch.";
					launchStatusH2.style.color = "red";
					event.preventDefault();
				} else if (cargoMassValue > 10000) {
					faultyItemsDiv.style.visibility = "visible";
					let cargoStatus = document.getElementById("cargoStatus");
					cargoStatus.style.color = "red";
					cargoStatus.innerHTML = "There's too much mass for the shuttle to take off.";
					launchStatusH2.innerHTML = "Shuttle not ready for launch.";
					launchStatusH2.style.color = "red";
					event.preventDefault();
				} else {
					launchStatusH2.innerHTML = "Shuttle is ready for launch.";
					launchStatusH2.style.color = "green";
					event.preventDefault();
				}
			}		
		});
		let json = [];
		fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
			response.json().then(function(json) {
				const destination = document.getElementById("missionTarget");
				let index = 3;
				destination.innerHTML = `
					<h2>Mission Destination</h2>
					<ol>
					   <li>Name: ${json[index].name}</li>
					   <li>Diameter: ${json[index].diameter}</li>
					   <li>Star: ${json[index].star}</li>
					   <li>Distance from Earth: ${json[index].distance}</li>
					   <li>Number of Moons: ${json[index].moons}</li>
					</ol>
					<img src="${json[index].image}">
				`; // destination.innerHTML = ...
				index = (index + 1) % json.length;
			}); // response.json() ... function(json) {
		}); // fetch("https ... function(response) {
	});
  
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
