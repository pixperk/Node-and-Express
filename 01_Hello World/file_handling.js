const fs = require("fs");

//Async modules expect a callback and do not return anything
//whereas sync modules do not take callback and return

//fs module is built in node js

/* fs.writeFileSync("./test.txt", "Hello World!");//sync call to create a file
 */

//Async
//fs.writeFile("./test.txt", "Hello World Async", (err) => {});
//overwrites existing file if it already exists

//can't put the result into variable in readFile[async]
/* const result = fs.readFileSync('./contacts.txt','utf-8')
console.log(result); */

//async [doesn't return anything]
fs.readFile("./contacts.txt", "utf-8", (err, res) => {
  if (err) console.log(err);
  else console.log(res);
});

fs.appendFileSync("./test.txt", `${Date.now()} Hey User\n`)

fs.cpSync('./test.txt','./copy.txt')

//fs.unlinkSync('./copy.txt')

console.log(fs.statSync('./test.txt'))

fs.mkdirSync('my-docs')
fs.mkdirSync('files/temp/ignore',{recursive:true})