// Import stylesheets
import './style.css';
import { Colours, ColoursHelper } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;

// container for the spinner
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];

const colourDiv = document.getElementById('colourResult');
const statsResultsDiv = document.getElementById('statsResults');
const colourSlt: HTMLSelectElement = document.getElementById(
  'colourSelect'
) as HTMLSelectElement;
const bodyPartSlt: HTMLSelectElement = document.getElementById(
  'bodyPartSelect'
) as HTMLSelectElement;
const historyTable: HTMLTableElement = document.getElementById(
  'historyTable'
) as HTMLTableElement;
const historyTableBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
  document.getElementById('historyTableBody')
);
colourSlt.addEventListener('change', statsBtnHandler);
bodyPartSlt.addEventListener('change', statsBtnHandler);

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let bp in BodyParts) {
  if (isNaN(Number(bp))) {
    bodyPartsArray.push(bp);
  }
}

//populate the Colour and BodyPart select elements
let count = 0;
for (let c in Colours) {
  if (isNaN(Number(c))) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = c;
    newOption.value = count.toString();
    count++;
    colourSlt.add(newOption);
  }
}
count = 0;
for (let c in BodyParts) {
  if (isNaN(Number(c))) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = c;
    newOption.value = count.toString();
    count++;
    bodyPartSlt.add(newOption);
  }
}

// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));

const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
statsBtn.addEventListener('click', statsBtnHandler);

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let randColour = Math.floor(Math.random() * coloursArray.length);
  selectedColour = coloursArray[randColour];

  // TODO randomly select bodyPart from array
  let randBodyPart = Math.floor(Math.random() * bodyPartsArray.length);
  selectedBodyPart = bodyPartsArray[randBodyPart];

  spinBtn.disabled = true;

  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle);
  // TODO set colourDiv and bodyPartP to the randomly spun results
  colourDiv.style.backgroundColor = selectedColour;
  bodyPartP.innerHTML = selectedBodyPart;
  spinBtn.disabled = false;
  addToHistory();
}

// TODO add the newly spun result to the history table
function addToHistory() {
  //create new SpinRecord
  let spinResult: SpinRecord = new SpinRecord(
    ColoursHelper.get(selectedColour),
    BodyPartsHelper.get(selectedBodyPart),
    spinCount
  );

  //store it in the array
  spinHistoryArray.push(spinResult);

  createHistoryRow(spinResult);
}
function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23

  let colour: Colours = ColoursHelper.colours[colourSlt.selectedIndex];
  let bodyPart: BodyParts =
    BodyPartsHelper.bodyParts[bodyPartSlt.selectedIndex];
  let amount: number = getAmount(colour, bodyPart);
  let lastSpun: number = getLastSpun(colour, bodyPart);

  let colString: string = colourSlt.selectedOptions[0].innerHTML;
  let bpString: string = bodyPartSlt.selectedOptions[0].innerHTML;
  statsResultsDiv.innerHTML =
    colString +
    ' ' +
    bpString +
    ' spun ' +
    amount +
    ' times' +
    '<br>' +
    colString +
    ' ' +
    bpString +
    ' last spun at num ' +
    lastSpun;
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
  let count: number = 0;
  for (let spin of spinHistoryArray) {
    if (spin.colour === colour && spin.bodyPart === bodyPart) {
      count++;
    }
  }
  return count;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  let largestNum: number = 0;
  for (let spin of spinHistoryArray) {
    if (
      spin.colour === colour &&
      spin.bodyPart === bodyPart &&
      spin.num > largestNum
    ) {
      largestNum = spin.num;
    }
  }
  return largestNum;
}

function createHistoryRow(spinResult: SpinRecord) {
  //create new table row with cells
  let newHistoryRow = historyTableBody.insertRow();
  let cellNum = newHistoryRow.insertCell(0);
  let cellColour = newHistoryRow.insertCell(1);
  let cellBodyPart = newHistoryRow.insertCell(2);

  //change test of cells to match new SpinRecord
  cellNum.innerHTML = spinResult.num.toString();
  cellColour.innerHTML = coloursArray[spinResult.colour];
  cellBodyPart.innerHTML = bodyPartsArray[spinResult.bodyPart];
  spinCount++;
}
