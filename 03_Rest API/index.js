const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = new express();
const PORT = 8000;

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
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// HTML document
app.get("/users", (req, res) => {
  const html = `
    <h1>Non Straight Users</h1>
    <ul>
    ${users
      .map((user) => {
        if (user.gender != "Male" && user.gender != "Female") {
          return `<li>${user.first_name} - ${user.gender}</li>`;
        }
      })
      .join("")}
    </ul>
    `;
  res.send(html);
});

//GET, PATCH, DELETE
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updatedData = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users[userIndex] = { ...users[userIndex], ...updatedData };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }
      return res.json({ status: "success", user: users[userIndex] });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to delete user" });
      }
      return res.json({ status: "success", message: "User deleted" });
    });
  });

//POST
app.post("/api/users", (req, res) => {
  const body = req.body;
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to add user" });
    }
    return res.json({ status: "success", id: newUser.id });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
