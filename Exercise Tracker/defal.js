function addExercise() {
  const sets = document.getElementById('sets').value;
  const reps = document.getElementById('reps').value;
  const exerciseName = document.getElementById('exerciseName').value;
  const exerciseType = document.getElementById('exerciseType').value;

  const exercise = {
    sets: sets,
    reps: reps,
    name: exerciseName,
    type: exerciseType
  };

  const exerciseList = document.getElementById('exercise-list');
  const listItem = document.createElement('li');
  listItem.textContent = `${exercise.sets} sets x ${exercise.reps} reps - ${exercise.name} (${exercise.type})`;
  exerciseList.appendChild(listItem);

  listItem.textContent = `${exercise.sets} sets x ${exercise.reps} reps - ${exercise.name}`;
  
  // Add class based on exercise type
  listItem.classList.add(exercise.type);

  exerciseList.appendChild(listItem);

    // Clear input fields
  document.getElementById('sets').value = '';
  document.getElementById('reps').value = '';
  document.getElementById('exerciseName').value = '';
  document.getElementById('exerciseType').selectedIndex = 0; // Reset dropdown to the first option
}

function saveToLocalStorage() {
  const exerciseList = document.getElementById('exercise-list').innerHTML;
  localStorage.setItem('exerciseList', exerciseList);
  // Save the current list to past lists
  const date = new Date().toLocaleDateString();
  const muscleGroup = document.getElementById('exerciseType').value;
  const pastList = { date, muscleGroup };
  const pastLists = JSON.parse(localStorage.getItem('pastLists')) || [];
  pastLists.push(pastList);
  localStorage.setItem('pastLists', JSON.stringify(pastLists));

  // Refresh display of past lists
  displayPastLists();
}
/*
document.addEventListener('DOMContentLoaded', () => {
  // Existing DOMContentLoaded event listener
  // ...

  // Display past lists when the page loads
  displayPastLists();
});

  alert('List saved to local storage.');
*/

function emailExercises() {
  const exerciseList = document.getElementById('exercise-list').innerHTML;
  // Logic to email the exercise list (not implemented)
  alert('List emailed successfully.');
}

function startNewList() {
  const exerciseList = document.getElementById('exercise-list');
  exerciseList.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedList = localStorage.getItem('exerciseList');
  if (savedList) {
    document.getElementById('exercise-list').innerHTML = savedList;
  }
});

// Existing JavaScript code remains unchanged

function displayPastLists() {
  const pastListsContainer = document.getElementById('past-lists-container');
  pastListsContainer.innerHTML = '';

  // Retrieve past lists from local storage (assuming stored as JSON)
  const pastLists = JSON.parse(localStorage.getItem('pastLists')) || [];

  pastLists.forEach(list => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.innerHTML = `
      <div>Date: ${list.date}</div>
      <div>Muscle Group: ${list.muscleGroup}</div>
    `;
    pastListsContainer.appendChild(listItem);
  });
}

function saveToPastList() {
  const date = prompt("Enter the date (e.g., YYYY-MM-DD):");
  const workoutName = prompt("Enter the name of the workout:");

  if (date && workoutName) {
    const pastListsContainer = document.getElementById('past-lists-container');

    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.innerHTML = `
      <div>Date: ${date}</div>
      <div>Workout Name: ${workoutName}</div>
      <div><a href="#" onclick="viewPastWorkoutDetails(event)">View Details</a></div>
    `;

    pastListsContainer.appendChild(listItem);
  }
}

function viewPastWorkoutDetails(event) {
  // Retrieve details of the selected workout and display them
  const date = event.target.parentNode.parentNode.children[0].textContent.replace('Date: ', '');
  const workoutName = event.target.parentNode.parentNode.children[1].textContent.replace('Workout Name: ', '');

  alert(`Details for workout on ${date} (${workoutName}): \n\n[Placeholder for workout details]`);
}

// Existing JavaScript code remains unchanged

function clearLocalStorage() {
  localStorage.clear();
  alert('Local storage cleared.');
}