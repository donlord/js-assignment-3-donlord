'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO copy chooseRandom() from previous assignment
const chooseRandom = exports.chooseRandom = (array, numItems) => {
  if (array === undefined) {
    return [];
  }
  if (array.length <= 2) {
    return array;
  }
  if (numItems > array.length || numItems === undefined) {
    numItems = Math.floor(Math.random() * array.length);
  }
  let indexArray = [];
  // Fill indexArray with random indices
  while (indexArray.length != numItems) {
    let randInt = Math.floor(Math.random() * array.length);
    if (indexArray.length === 0) {
      indexArray.push(randInt);
    }
    let inArray = false;
    // check to see if randomInt is in the indexed array, if so continue else add it to the indexArray
    for (let i = 0; i < indexArray.length; i++) {
      if (indexArray[i] === randInt) {
        inArray = true;
      }
    }
    if (inArray == false) {
      indexArray.push(randInt);
    }
  }
  // return the new array with the random values from indices indicated in indexArray
  let filteredArray = [];
  for (let i = 0; i < indexArray.length; i++) {
    filteredArray.push(array[indexArray[i]]);
  }
  return filteredArray;
};

// TODO copy createPrompt() from previous assignment
const createPrompt = exports.createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let arrObjs = [];
  for (let x = 0; x < numQuestions; x++) {
    let qObj = {};
    qObj['type'] = 'input';
    qObj['name'] = `question-${x + 1}`;
    qObj['message'] = `Enter question ${x + 1}`;
    arrObjs.push(qObj);
    for (let j = 0; j < numChoices; j++) {
      let aObj = {};
      aObj['type'] = 'input';
      aObj['name'] = `question-${x + 1}-choice-` + (j + 1);
      aObj['message'] = `Enter answer choice ${j + 1} for question ${x + 1}`;
      arrObjs.push(aObj);
    }
  }
  return arrObjs;
};

const objMaker = (name, message, choices) => {
  return {
    type: 'list',
    name: name,
    message: message,
    choices: choices
  };
};

// TODO implement createQuestions()
const createQuestions = exports.createQuestions = inputObject => {
  if (inputObject === undefined || inputObject[1] === undefined || inputObject === {} || typeof inputObject === 'undefined' || Object.keys(inputObject).length === 0) {
    return [];
  }

  let questions = [];
  let keys = 'question-1';
  let choices = [];
  let qCounter = 1;
  let message = '';
  let name = '';
  console.log(inputObject[0]);
  for (let i = 0; i < inputObject.length; i++) {
    if (keys === inputObject[i][0]) {
      message = inputObject[i][1];
      name = inputObject[i][0];
    } else if (inputObject[i][0].includes(keys)) {
      choices.push(inputObject[i][1]);
    } else {
      let questionObj = objMaker(name, message, choices);
      questions.push(questionObj);
      choices = [];
      message = inputObject[i][1];
      keys = inputObject[i][0];
      name = inputObject[i][0];
      qCounter++;
    }
  }
  let questionObj = objMaker(name, message, choices);
  questions.push(questionObj);
};

// TODO export above functions