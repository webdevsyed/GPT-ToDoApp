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

  if (inputStr.includes("MODIFIED ARRAY:")) {
    const arrayStartIndex = inputStr.indexOf("MODIFIED ARRAY:");

    // Extract the text and array strings
    let textStr = inputStr.slice(0, arrayStartIndex).trim();
    let arrayStr = inputStr.slice(arrayStartIndex+15).trim();

    //Remove CLEARHISTORYNOW from arrayStr
    if (arrayStr.includes("CLEARHISTORYNOW")) {
      arrayStr = arrayStr.slice(0,-16);
    }

    if (arrayStr.charAt(arrayStr.length - 2)!== "]"){
      const arrayEndIndex = inputStr.indexOf("]]");
      arrayStr=arrayStr.slice(0,arrayEndIndex+3).trim()
    }

    // Convert the array string to an actual array
    const array = JSON.parse(arrayStr);

    // console.log(textStr)
    // console.log(array)
    return [textStr, array];
  } 
  else if (inputStr.includes("updated task list:")) {
    const arrayStartIndex = inputStr.indexOf("updated task list:");

    // Extract the text and array strings
    let textStr = inputStr.slice(0, arrayStartIndex+18).trim();
    let arrayStr = inputStr.slice(arrayStartIndex+18).trim();

    //Remove CLEARHISTORYNOW from arrayStr
    if (arrayStr.includes("CLEARHISTORYNOW")) {
      arrayStr = arrayStr.slice(0,-16);
    }
    if (arrayStr.charAt(arrayStr.length - 2)!== "]"){
      const arrayEndIndex = inputStr.indexOf("]]");
      arrayStr=arrayStr.slice(0,arrayEndIndex+3).trim()
    }
    // Convert the array string to an actual array
    const array = JSON.parse(arrayStr);

    // console.log(textStr)
    // console.log(array)
    return [textStr, array];
  }
  else {
    if (inputStr.includes("CLEARHISTORYNOW")) {
      return(inputStr.slice(0,-16));
    }
   else{
      return(inputStr)
    }
  }

}
