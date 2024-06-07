const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log("Hello from Timer 1"), 0); //expired timeout

setImmediate(() => console.log("Hello from Immediate Fn 1"));

fs.readFile("sample.txt", "utf-8", () => {
  //CPU Intensive Work - Works inside thread pool[not the main event loop] .ALL 4 OPERATIONS RUN PARALLELY
  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "Password 1 Done");
  });

  crypto.pbkdf2("password2", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "Password 2 Done");
  });

  crypto.pbkdf2("password3", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "Password 3 Done");
  });

  crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "Password 4 Done");
  });

  crypto.pbkdf2("password5", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "Password 5 Done");
  });
  crypto.pbkdf2("password6", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "Password 6 Done");
  });
});

console.log("Hello from Top Level Code");
