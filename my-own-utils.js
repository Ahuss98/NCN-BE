exports.convertToNestedArray = function(arrOfObjects) {
    const nestedData = [];
    for (let obj of arrOfObjects) {
      let tempArray = [];
      for (const key in obj) {
        tempArray.push([key, obj[key]]);
      }
      nestedData.push(tempArray);
    }
    return nestedData;
  }