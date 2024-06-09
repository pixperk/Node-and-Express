const express = require("express");
const fs = require("fs");
const app = new express();
const mongoose = require("mongoose");
const PORT = 8000;

//Connection with mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/practice-app")
  .then(() => console.log("Connection with Mongo DB successful!"))
  .catch((error) => console.log("Mongo DB Connection Error :", error));

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false })); //puts data in req.body

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()} : ${req.method} : ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// Routes
// JSON API
app.get("/api/users", async(req, res) => {
  const allDbUsers = await User.find({})
  console.log(req.headers);
  res.setHeader("X-MyName", "Something"); //custom Header
  //AlWAYS ADD X TO CUSTOM HEADERS
  return res.json(allDbUsers);
});

// HTML document
app.get("/users", async(req, res) => {
  const allDbUsers = await User.find({})
  const html=`
  <ul>
  ${allDbUsers.map((user)=>`<li>${user.firstName} ${user.lastName}[${user.gender}] - ${user.jobTitle}</li>`).join("")}
  </ul>
  `
  res.send(html);
});

//GET, PATCH, DELETE
app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ error: "User Not Found" });
    return res.json(user);
  })
  .patch(async(req, res) => {
    const updatedData = req.body;
    await User.findByIdAndUpdate(req.params.id, updatedData,{
      new: true,
      runValidators: true,
  })
    return res.json({status : 'Success'})
  })
  .delete(async(req, res) => {
   await User.findByIdAndDelete(req.params.id)
   return res.json({status : 'Success'})
  });

//POST
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result:", result);
  return res.status(201).json({ msg: "Creation successful!" });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
