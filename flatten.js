let ans = flattenSome([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]

// function flatten(arr) {
//     return arr.reduce((acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), []);
// }

function flattenOnlyNumbers(array) {
    return array
      .join()
      .split(',')
      .map((numStr) => Number(numStr));
  }
console.log(ans)
function flattenSome(arr){
    while(arr.some(Array.isArray)){
        arr = [].concat(...arr);
    }
    return arr;
}