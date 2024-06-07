const express = require("express");
const users = require('./MOCK_DATA.json')
const app = new express();
const PORT = 8000

//Routes
//JSON api
app.get('/api/users',(req,res)=>{
    return res.json(users)
})

//HTML document
app.get('/users',(req,res)=>{
    const html  = `
    <h1>Non Straight Users</h1>
    <ul>
    ${users.map(user=>{
        if(user.gender != 'Male' && user.gender != 'Female')
        {
            return `<li>${user.first_name} - ${user.gender}</li>`
        }
    }).join("")}
    </ul>
    `
    res.send(html)
})


app.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id === id)
    return res.json(user)
})
.patch((req,res)=>{
    //TODO
    res.json({status : "pending"})
})
.delete((req,res)=>{
    //TODO
    res.json({status : "pending"})
})


app.post('/api/users',(req,res)=>{
    //TODO
    res.json({status : "pending"})
})

/* app.patch('/api/users/:id',(req,res)=>{
    //TODO
    res.json({status : "pending"})
})

app.delete('/api/users/:id',(req,res)=>{
    //TODO
    res.json({status : "pending"})
})
 */
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})