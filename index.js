const express = require("express")
const axios = require("axios")
const cors = require("cors")

const uuid = require("uuid")
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

const users = []

app.get("/users", (request, response) => {
  return response.json(users)
})

app.post("/users", (request, response) => {
  const { name, age } = request.body
  const newUser = { id: uuid.v4(), name, age }

  users.push(newUser)

  return response.status(201).json(newUser)
})

app.put("/users/:id", (request, response) => {
  return response.json(users)
})

app.delete("/users/:id", (request, response) => {
  return response.json(users)
})

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port} 🚀`)
})
