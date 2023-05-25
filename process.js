// Assuming the button image element has an id of "swapButton"
const swapButton = document.getElementById("swapButton");
swapButton.addEventListener("click", swapUnits);

function swapUnits() {
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const tempText = fromUnit.textContent;
  fromUnit.textContent = toUnit.textContent;
  toUnit.textContent = tempText;

  const currentOption = determineSwapOption();
  return currentOption === "Imperial to Metric";
}

function determineSwapOption() {
  const fromUnit = document.getElementById("fromUnit").textContent;
  const toUnit = document.getElementById("toUnit").textContent;

  if (fromUnit === "Imperial" && toUnit === "Metric") {
    return "Imperial to Metric";
  } else if (fromUnit === "Metric" && toUnit === "Imperial") {
    return "Metric to Imperial";
  }

  return null; // Return null if the swap option is not determined
}
// Assuming the button element has an id of "mainButton"
const mainButton = document.getElementById("mainButton");
mainButton.addEventListener("click", handleConversion);

function handleConversion() {
  const input = document.getElementById("input").value;
  const swapOption = determineSwapOption();

  if (input.trim() !== "") {
    if (swapOption === "Imperial to Metric") {
      processInputAndOutput(input);
    } else if (swapOption === "Metric to Imperial") {
      processInputAndOutput1(input);
    }
  }
}
// Imperial to Metric
function processInputAndOutput() {
    class Unit {
      constructor(name, value, oppositeName) {
        this.name = name;
        this.value = value;
        this.oppositeName = oppositeName;
      }
    }
  
    function processInput(input, units) {
      var matchedUnits = [];
      var rewrittenText = input; // Initialize with original input
      var index = 0;
      var hasMatch = false;
  
      do {
        var currentChar = input[index];
  
        units.forEach(unit => {
          var regex = new RegExp(unit.name, "gi");
  
          if (rewrittenText.toLowerCase().includes(unit.name)) {
            matchedUnits.push(unit);
            rewrittenText = rewrittenText.replace(regex, "[REPLACED]");
            hasMatch = true;
          }
        });
  
        matchedUnits.forEach(unit => {
          var regex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*${unit.name}`, "gi");
          var match = regex.exec(input);
          if (match) {
            var number = parseFloat(match[1]);
            var result = number * unit.value;
            rewrittenText = rewrittenText.replace(match[0], `${result} ${unit.oppositeName}`);
            console.log(`Matched Unit: ${unit.name}`);
            console.log(`Number: ${number}`);
            console.log(`Result: ${result}`);
          }
        });
  
        index++;
      } while (index < input.length && hasMatch);
  
      console.log("Final Rewritten Text:", rewrittenText);
      return rewrittenText;
    }
  
    // Assuming the button click event is triggered by clicking the button with id "mainButton"
    document.getElementById("mainButton").onclick = function() {
      let input = document.getElementById("input").value;
  
      // Getting units to compare
      const fs = require('fs');
  
      fs.readFile('imperialUnits.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
  
        const lines = data.split('\n');
        const imperialUnits = lines
          .filter(line => line.trim() !== '');
  
        const units = imperialUnits.map(line => {
          const parts = line.split(' - ');
          const name = parts[0];
          const value = parseFloat(parts[1]);
          const oppositeName = parts[2];
          return new Unit(name, value, oppositeName);
        });
  
        const outputElement = document.getElementById("output");
        const rewrittenText = processInput(input, units);
        outputElement.textContent = rewrittenText;
      });
    };
  }
//Metric to Iperial
function processInputAndOutput1() {
    class Unit {
      constructor(name, value, oppositeName) {
        this.name = name;
        this.value = value;
        this.oppositeName = oppositeName;
      }
    }
  
    function processInput1(input, units) {
      var matchedUnits = [];
      var rewrittenText = input; // Initialize with original input
      var index = 0;
      var hasMatch = false;
  
      do {
        var currentChar = input[index];
  
        units.forEach(unit => {
          var regex = new RegExp(unit.name, "gi");
  
          if (rewrittenText.toLowerCase().includes(unit.name)) {
            matchedUnits.push(unit);
            rewrittenText = rewrittenText.replace(regex, "[REPLACED]");
            hasMatch = true;
          }
        });
  
        matchedUnits.forEach(unit => {
          var regex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*${unit.name}`, "gi");
          var match = regex.exec(input);
          if (match) {
            var number = parseFloat(match[1]);
            var result = number * unit.value;
            rewrittenText = rewrittenText.replace(match[0], `${result} ${unit.oppositeName}`);
            console.log(`Matched Unit: ${unit.name}`);
            console.log(`Number: ${number}`);
            console.log(`Result: ${result}`);
          }
        });
  
        index++;
      } while (index < input.length && hasMatch);
  
      console.log("Final Rewritten Text:", rewrittenText);
      return rewrittenText;
    }
  
    // Assuming the button click event is triggered by clicking the button with id "mainButton"
    document.getElementById("mainButton").onclick = function() {
      let input = document.getElementById("input").value;
  
      // Getting units to compare
      const fs = require('fs');
  
      fs.readFile('metricUnits.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
  
        const lines = data.split('\n');
        const metricUnits = lines
          .filter(line => line.trim() !== '');
  
        const units = metricUnits.map(line => {
          const parts = line.split(' - ');
          const name = parts[0];
          const value = parseFloat(parts[1]);
          const oppositeName = parts[2];
          return new Unit(name, value, oppositeName);
        });
  
        const outputElement = document.getElementById("output");
        const rewrittenText = processInput(input, units);
        outputElement.textContent = rewrittenText;
      });
    };
  }
