let test = 'Hello World';

setTimeout(() => {
  test += 1;
  console.log(test);
}, 1000);

console.log(test);
