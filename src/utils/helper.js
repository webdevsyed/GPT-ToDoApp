export function recreateObjectsFromArrays(arrays) {
  const keys = arrays[0];
  const objects = [];

  for (let i = 1; i < arrays.length; i++) {
    const values = arrays[i];
    const obj = {};

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const value = values[j];
      obj[key] = value;
    }

    objects.push(obj);
  }

  return objects;
}

export function createArrayFromObject(obj) {
  // Get the keys of the object
  const keys = Object.keys(obj[0]);

  // Create an array to store the result
  const result = [keys];

  // Loop through each task object and add its values to the result array
  for (let i = 0; i < obj.length; i++) {
    const values = [];
    for (let j = 0; j < keys.length; j++) {
      values.push(obj[i][keys[j]]);
    }
    result.push(values);
  }

  return result;
}

export const parseModOutput = (inputStr) => {
  // console.log(inputStr)
  const arrayStartIndex = inputStr.indexOf("[[");

  // Extract the text and array strings
  let textStr = inputStr.slice(0, arrayStartIndex).trim();
  let arrayStr = inputStr.slice(arrayStartIndex).trim();

  //Remove any text after and before array
  let checkedArray = checkArray(arrayStr)

  //Remove any unwanted keywords in the reply
  let checkedTextStr= checkString(textStr)
  // Convert the array string to an actual array
  const array = JSON.parse(checkedArray);
  // console.log(textStr)
  // console.log(array)
  return [checkedTextStr, array];
}


function checkArray(arrayStr) {

  const arrayStartIndex = arrayStr.indexOf("[[");
  const arrayEndIndex = arrayStr.indexOf("]]");

  if (arrayEndIndex == -1 || arrayStartIndex == -1) {
    console.log("Array not found")
    console.log(arrayStr)
  }
  arrayStr = arrayStr.slice(0, arrayEndIndex + 2).trim();
  arrayStr = arrayStr.slice(arrayStartIndex).trim();

  return (arrayStr)
}

function checkString(textStr) {

  if (textStr.includes("MODIFIED ARRAY:")) {
    textStr = textStr.replace("MODIFIED ARRAY:","")
  }
  if (textStr.includes("CLEARHISTORYNOW")) {
    textStr = textStr.replace("CLEARHISTORYNOW","")
  }
  if (textStr.includes("TASK LIST:")) {
    textStr = textStr.replace("TASK LIST:","")
  }

  return (textStr)
}



export function reorderArray(arr) {
  const heading = arr.shift();
  const newItem = arr.pop();
  return [heading, newItem, ...arr];
}

export function addHeader(array){
  if(array[0][0] == "TaskName"){
    return array
  }
  else{
    array = [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"],...array]
    return array
  }
}



const arr = [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"], ["Visit school to collect result", "20-Apr-2023", "No", "Medium", "60 minutes", "Medium", ["Education"], "School", "2:00 PM", "20-Apr-2023"], ["Complete Imarat.in ASAP", "27-Apr-2023", "", "High", "180 minutes", "High", ["Programming", "Coding", "Learning"], "Home", "", "20-Apr-2023"], ["Add a readme to TodoApp", "27-Apr-2023", "", "Low", "30 minutes", "Low", ["Programming", "Coding"], "Home", "", "20-Apr-2023"], ["Update Swiggy app", "27-Apr-2023", "", "Medium", "120 minutes", "Medium", ["Programming", "Coding"], "Office", "", "20-Apr-2023"], ["Upload TodoApp to Github", "27-Apr-2023", "", "Medium", "60 minutes", "Medium", ["Programming", "Coding"], "Home", "", "20-Apr-2023"], ["Send mail to Mr. Qasim", "20-Apr-2023", "", "High", "30 minutes", "High", ["Communication"], "Home", "", "20-Apr-2023"], ["Complete testing class by Akshay", "20-Apr-2023", "", "High", "90 minutes", "High", ["Programming", "Learning", "Coding"], "Home", "", "20-Apr-2023"], ["Sort all clothes as part of home cleaning", "27-Apr-2023", "", "Low", "30 minutes", "Low", ["Cleaning", "Organizing"], "Home", "", "20-Apr-2023"], ["Arrange all my documents as part of home cleaning", "27-Apr-2023", "", "Low", "60 minutes", "Low", ["Cleaning", "Organizing"], "Home", "", "20-Apr-2023"], ["Install and explore React Native Elements", "03-May-2023", "", "Medium", "60 minutes", "Medium", ["Programming", "Coding", "Learning"], "Home", "", "20-Apr-2023"]]