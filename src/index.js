import "./styles.css";
import data from "./data.json";

var inputMass = document.getElementById("inputMass");
var inputMassUnit = document.getElementById("inputMassUnit");
var inputHeight = document.getElementById("inputHeight");
var inputHeightUnit = document.getElementById("inputHeightUnit");

var cbVeg = document.getElementById("vegetarianChckbox");
var cbVegan = document.getElementById("veganChckbox");

var mealsList = document.getElementById("mealsList");

var massUnit = 0;
var heightUnit = 0;

var isVeg = false;
var isVegan = false;

var text = document.getElementById("text");

var mBMI = 0;

cbVeg.addEventListener("change", function () {
  isVeg = cbVeg.checked;
});

cbVegan.addEventListener("change", function () {
  isVegan = cbVegan.checked;
});

inputMassUnit.addEventListener("change", function () {
  var value = inputMassUnit.options[inputMassUnit.selectedIndex].value;
  massUnit = parseInt(value, 10);
  if (inputMass.value.length !== 0 && inputHeight.value.length !== 0) {
    calculateBMI(inputMass.value, inputHeight.value, massUnit, heightUnit);
  } else {
    text.innerHTML = "";
  }
});

inputHeightUnit.addEventListener("change", function () {
  var value = inputHeightUnit.options[inputHeightUnit.selectedIndex].value;
  heightUnit = parseInt(value, 10);
  if (inputMass.value.length !== 0 && inputHeight.value.length !== 0) {
    calculateBMI(inputMass.value, inputHeight.value, massUnit, heightUnit);
  } else {
    text.innerHTML = "";
  }
});

inputMass.addEventListener("input", function () {
  if (inputMass.value.length !== 0 && inputHeight.value.length !== 0) {
    calculateBMI(inputMass.value, inputHeight.value, massUnit, heightUnit);
  } else {
    text.innerHTML = "";
  }
});

inputHeight.addEventListener("input", function () {
  if (inputMass.value.length !== 0 && inputHeight.value.length !== 0) {
    calculateBMI(inputMass.value, inputHeight.value, massUnit, heightUnit);
  } else {
    text.innerHTML = "";
  }
});

function calculateBMI(mass, height, massUnit, heightUnit) {
  mass = convertToKG(mass, massUnit);
  height = convertToM(height, heightUnit);

  var BMI = mass / (height * height);
  BMI = Math.round(BMI * 10) / 10;

  text.innerHTML = "BMI is " + BMI + ": " + checkBMI(BMI);

  mBMI = BMI;
  localStorage.setItem("bmi", BMI);
}

function convertToKG(mass, unit) {
  if (unit === 0) {
    return mass;
  } else if (unit === 1) {
    return mass * 0.453592;
  }
}

function convertToM(height, unit) {
  switch (unit) {
    case 0:
      return height;
    case 1:
      return height / 100;
    case 2:
      return height * 0.0254;
    case 3:
      return height * 0.3048;
    default:
      return height;
  }
}

function checkBMI(BMI) {
  if (BMI < 18.5) {
    return "underweight";
  } else if (BMI < 25) {
    return "healthy weight";
  } else if (BMI < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}

document.getElementById("btnGenerateMeals").onclick = function () {
  var mealsGenerated = [];
  var foodsIncluded = [];

  mealsList.innerHTML = "";

  if (
    inputMass.value.toString().length !== 0 &&
    inputHeight.value.toString().length !== 0
  ) {
    for (var i = 0; i < data.meals.length; i++) {
      if (mBMI < 18.5) {
        if (data.meals[i].health < 300) {
          if (checkMeal(data.meals[i], foodsIncluded)) {
            mealsGenerated.push(data.meals[i]);
            foodsIncluded.push(data.meals[i].food);
          }
        }
      } else if (mBMI < 25) {
        break;
      } else if (mBMI < 30) {
        if (data.meals[i].health > 300) {
          if (checkMeal(data.meals[i], foodsIncluded)) {
            mealsGenerated.push(data.meals[i]);
            foodsIncluded.push(data.meals[i].food);
          }
        }
      } else {
        if (data.meals[i].health > 400) {
          if (checkMeal(data.meals[i], foodsIncluded)) {
            mealsGenerated.push(data.meals[i]);
            foodsIncluded.push(data.meals[i].food);
          }
        }
      }
    }

    localStorage.setItem("meal", mealsGenerated[0].name);
    var mealList = [];

    for (var x = 0; x < mealsGenerated.length; x++) {
      mealList.push(mealsGenerated[x].name);
    }

    localStorage.setItem("mealList", mealList);

    if (mealsGenerated.length === 0) {
      mealsList.innerHTML =
        "You have a Healthy Weight! Keep eating what you are eating. It seems to be working.";
    } else {
      for (var n = 0; n < mealsGenerated.length; n++) {
        let li = document.createElement("li");
        li.innerHTML = mealsGenerated[n].name;
        mealsList.appendChild(li);
      }
    }
  }
};

function checkMeal(meal, foodsIncluded) {
  if (isVegan) {
    if (meal.vegan && !foodsIncluded.includes(meal.food)) {
      return true;
    } else {
      return false;
    }
  } else if (isVeg) {
    if (meal.veg && !foodsIncluded.includes(meal.food)) {
      return true;
    } else {
      return false;
    }
  } else if (!foodsIncluded.includes(meal.food)) {
    return true;
  } else {
    return false;
  }
}
