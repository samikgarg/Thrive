import "./styles.css";

//Getting variables
var inputAge = document.getElementById("inputAge");
var inputCategory = document.getElementById("inputxCategory");
var text = document.getElementById("text");
var BMI = localStorage.getItem("bmi");

var workoutListHTML = document.getElementById("workoutList");

//Adding event listeners for input

inputCategory.addEventListener("change", function () {
  //var value = inputCategory.options[inputCategory.selectedIndex].value;
  if (inputCategory.value.length !== 0) {
    calculateIntensity(inputAge.value, inputCategory.value, BMI);
  } else {
    text.innerHTML = "";
  }
});

inputAge.addEventListener("input", function () {
  calculateIntensity(inputAge.value, inputCategory.value, BMI);
});

//calculate intensity of workouts based on age, category and BMI
function calculateIntensity(age, category, bmi) {
  var ageValue = age / 70;
  ageValue = 1 - ageValue;
  var bmiValue;
  if (category == 0 || category == 2) {
    if (bmi < 18) {
      bmiValue = bmi / 45;
      bmiValue = 1 - bmiValue;
    } else {
      bmiValue = bmi / 45;
    }
  } else {
    bmiValue = bmi / 45;
  }

  var intensity = ageValue + bmiValue;
  localStorage.setItem("intensity", intensity);
}

document.getElementById("btnGenerateWorkout").onclick = function () {
  var intensity = localStorage.getItem("intensity");
  var i;
  if (intensity >= 2) {
    i = 6;
  } else {
    i = 2 * (round(intensity - 0.2, 0.5) + 1);
  }
  var workoutList = [];
  var category = inputCategory.value;

  if (category == 0) {
    workoutList.push("Plank: " + 10 * i + " seconds");
    workoutList.push("Russian Twists x " + 10 * i);
    workoutList.push("Flutter Kicks x " + 15 * i);
    workoutList.push("Leg Raise x " + 5 * i);
    workoutList.push("Sit-Ups x " + 10 * i);
  } else if (category == 1) {
    workoutList.push("Walk/Jog/Run: " + 5 * i + " mins");
    workoutList.push("High Knees x " + 10 * i);
    workoutList.push("Jumping Jacks x " + 15 * i);
    workoutList.push("Burpees x " + 5 * i);
    workoutList.push("Climbers x " + 5 * i);
  } else if (category == 2) {
    workoutList.push("Rowing Machine " + 1 * i + " mins");
    workoutList.push("Bicep Curls x " + 10 * i);
    workoutList.push("Tricep Curls x " + 10 * i);
    workoutList.push("Pull-Ups x " + 3 * i);
    workoutList.push("Deadlifts x " + 5 * i);
  } else if (category == 3) {
    workoutList.push("Butterfly Stretch: " + 1 * i + " mins");
    workoutList.push("Quadriceps Stretch x " + 2 * i);
    workoutList.push("Upward Dog x " + 3 * i);
    workoutList.push("Warrior Pose x " + 2 * i);
    workoutList.push("Side Bend x " + 10 * i);
  }

  localStorage.setItem("workout", workoutList);
  workoutListHTML.innerHTML = "";
  for (var n = 0; n < workoutList.length; n++) {
    let li = document.createElement("li");
    li.innerHTML = workoutList[n];
    workoutListHTML.appendChild(li);
  }

  console.log(workoutList);
};

function round(value, step) {
  step || (step = 1.0);
  var inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}
