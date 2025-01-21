Array.prototype.myreduce = function (callback, initialValue) {
    let startingIndex = initialValue == undefined ? 1 : 0;
    let accumulator = initialValue == undefined ? this[0] : initialValue;

    if(initialValue == undefined && this.length == 0) throw new TypeError('Reduce of empty array with no initial value');
    
    for(let i = startingIndex; i< this.length; i++){
        if(i in this)  //sparse array
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

const sumOfSquares = (prev, curr, index, array) => prev + curr * array[index];

const sumOfSquares1 = (acc, item) => acc + item * item;

try{
    let res = [].myreduce(sumOfSquares1);
}
catch(e){
    console.error(e.message);
}
let res1 = [1,-2,,3].myreduce(sumOfSquares1);


console.log(res1, 'result'); // 30