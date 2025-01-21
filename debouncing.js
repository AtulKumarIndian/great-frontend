// Debouncing is a technique used to control how many times we allow a function to be executed over time. 
// When a JavaScript function is debounced with a wait time of X milliseconds, 
// it must wait until after X milliseconds have elapsed since the debounced function was last called. 
// You almost certainly have encountered debouncing in your daily lives before — when entering an elevator. 
// Only after X duration of not pressing the "Door open" button (the debounced function not being called) 
// will the elevator door actually close (the callback function is executed).

// Implement a debounce function which accepts a callback function and a wait duration. 
// Calling debounce() returns a function which has debounced invocations of the callback function following 
// the behavior described above.

let i = 0;
function increment(a) {
  i = i+a;
}
const debouncedIncrement = debounces(increment, 100);

// t = 0: Call debouncedIncrement().
debouncedIncrement(5); // i = 0
console.log(i, 'above setTimeout');

setTimeout(() => {
    debouncedIncrement(5);
    console.log(i , 'inside 1st setTimeout');
}, 110)

debouncedIncrement(); // i = 0
console.log(i, 'below setTimeout');

setTimeout(() => {
    debouncedIncrement();
    console.log(i , 'inside 3nd setTimeout');
}, 2000)
// t = 50: i is still 0 because 100ms have not passed.
//  Call debouncedIncrement() again.
// i = 0

// t = 100: i is still 0 because it has only
//  been 50ms since the last debouncedIncrement() at t = 50.

// t = 150: Because 100ms have passed since
//  the last debouncedIncrement() at t = 50,
//  increment was invoked and i is now 1 .
// Debounce with a cancel() method to cancel delayed invocations and a flush() method to immediately invoke them.
function debounces (func, wait) {
    let timeout; // creates a closure to store the timeout
    return function(...args) {
        timeout = null;
        clearTimeout(timeout); // clears the timeout each time the function is called
        timeout = setTimeout(() => {
            func.apply(this,args); // calls the function after the wait time
        }, wait);

    }
}