const express = require("express");

const {connectMongoDB} = require('./connection')
const userRouter = require('./routes/user')
const {logReqRes} = require('./middlewares')

const app = new express();
const PORT = 8000;


//Connection with mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/practice-app")
.then(()=>console.log("MongoDB Connection Successful"))
.catch((err)=>console.log("MongoDB Connection Error: ",err))

// Middleware
app.use(express.urlencoded({ extended: false })); //puts data in req.body

app.use(logReqRes('log.txt'))

//Routes
app.use('/api/users',userRouter)


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
